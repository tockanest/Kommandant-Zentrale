import WebSocket from "ws";

export default class WebSocketService {
    private static instance: WebSocketService;
    private readonly wss: WebSocket.Server;

    private constructor() {
        this.wss = new WebSocket.Server({
            port: 3001,
            host: "localhost",
            clientTracking: true,
            verifyClient: (info, cb) => {
                const validPaths = [
                    "/auth/twitch/finalize"
                ]

                if (info.req.url && !validPaths.includes(info.req.url)) {
                    cb(false, 404, "Not Found");
                    return;
                }

                cb(true);
            },
            backlog: 100,
            noServer: false,
        });

        // prevent the server from crashing
        this.wss.on("error", (err) => {
            console.error(err);
        });
    }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }

        return WebSocketService.instance;
    }

    public getWss() {
        return this.wss;
    }

    public close() {
        this.wss.close();
    }

    public on(event: string, cb: (ws: WebSocket) => void) {
        this.wss.on(event, cb);
    }
}