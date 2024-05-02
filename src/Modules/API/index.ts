import Fastify from "fastify";
import WebSocket from "ws";

const API = Fastify();


API.get("/auth/twitch/callback", async (req, res) => {
    const {
        code,
        state
    } = req.query as {
        code: string,
        state: string
    };

    if (!code || !state) {
        return res.code(400).send({
            error: "No code or state provided"
        });
    }

    // Post request to https://id.twitch.tv/oauth2/token
    try {
        const response = await fetch("https://id.twitch.tv/oauth2/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.TWITCH_CLIENT_ID,
                client_secret: process.env.TWITCH_CLIENT_SECRET,
                code,
                grant_type: "authorization_code",
                redirect_uri: process.env.TWITCH_REDIRECT_URI
            })
        });

        const data = await response.json() as {
            access_token: string;
            refresh_token: string;
            scope: string[];
            token_type: string;
            expires_in: number;
        };

        // Send data to the WebSocket server
        const wsResponse = new Promise((resolve, reject) => {
            const ws = new WebSocket(`ws://localhost:3001/auth/twitch/finalize`);
            ws.on("open", () => {
                ws.send(JSON.stringify({
                    userId: state,
                    twitch: data
                }));
                ws.close();
                resolve("WebSocket communication successful");
            });
            ws.on("error", (err) => {
                ws.close()
                if (err.message.includes("ECONNREFUSED")) {
                    reject({
                        message: "Failed to send data to the internal WebSocket Server.\nThis might happen if the server has restarted since the last time you authenticated.\nPlease try again"
                    });
                } else {
                    reject(err.message);
                }
            });
        });

        await wsResponse;

        return res.send({
            message: "WebSocket communication successful"
        });

    } catch (e: any) {
        return res.code(500).send({
            error: e.message
        });
    }
});

API.listen({
    port: 3000
}).then(
    () => console.log("API is running on port 3000")
).catch(
    (err) => console.error(err)
)