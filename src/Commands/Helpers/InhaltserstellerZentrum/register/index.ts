import {ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import UserSchema from "../../../../Configs/Database/Schemas/UserSchema";
import WebSocketService from "../../../../Modules/WebSocket";

export default async function registerStreamer(interaction: ChatInputCommandInteraction) {

    const getUser = await UserSchema.findById(interaction.user.id);
    if (getUser!.twitch?.streamer.id) {
        return await interaction.reply({
            embeds: [
                CreateEmbed("already-registered", interaction, [
                    {
                        login: getUser!.twitch.streamer.username,
                        profile_image_url: `https://static-cdn.jtvnw.net/jtv_user_pictures/${getUser!.twitch.streamer.id}-profile_image-70x70.png`
                    }
                ])
            ],
            ephemeral: true
        })
    }

    const redirectUri = process.env.TWITCH_REDIRECT_URI;
    const userId = interaction.user.id;
    const fullUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.TWITCH_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code&scope=user:read:email+chat:read&state=${userId}`;

    await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setColor("Random")
                .setTitle(interaction.client.translation(interaction.user, "streamerRegister", "embed-title-default"))
                .setDescription(interaction.client.translation(interaction.user, "streamerRegister", "embed-description-start").replaceAll("{USERNAME}", interaction.user.username).replaceAll("{URL}", fullUrl))
                .setFooter({
                    text: interaction.client.translation(interaction.user, "streamerRegister", "embed-footer-start"),
                    iconURL: interaction.user.displayAvatarURL(),
                })
        ],

        ephemeral: true
    });

    return await CreateRegisterWs(userId, interaction);
}

function CreateEmbed(type: "success" | "error" | "timeout" | "already-registered", interaction: ChatInputCommandInteraction, data: any[] | undefined) {
    return new EmbedBuilder()
        .setColor(type === "success" ? "Random" : "DarkRed")
        .setTitle(interaction.client.translation(interaction.user, "streamerRegister", "embed-title-default"))
        .setDescription(interaction.client.translation(interaction.user, "streamerRegister", `embed-description-${type}`).replaceAll("{USERNAME}", data ? data[0].login : interaction.user.username))
        .setAuthor({
            name: data ? data[0].login : interaction.user.username,
            iconURL: data ? data[0].profile_image_url : interaction.user.displayAvatarURL()
        })
}

async function CreateRegisterWs(userId: string, interaction: ChatInputCommandInteraction) {

    try {
        const wss = WebSocketService.getInstance();

        wss.on("connection", ws => {

            ws.on("message", async (message) => {
                const {userId: user, twitch} = JSON.parse(message.toString()) as {
                    userId: string,
                    twitch: {
                        access_token: string;
                        refresh_token: string;
                        scope: string[];
                        token_type: string;
                        expires_in: number;
                    }
                };

                if (user === userId) {

                    const getTwitchUsername = await fetch("https://api.twitch.tv/helix/users", {
                        method: "GET",
                        headers: {
                            authorization: `Bearer ${twitch.access_token}`,
                            "client-id": `${process.env.TWITCH_CLIENT_ID}`
                        }
                    });

                    const {data} = await getTwitchUsername.json() as {
                        data: [
                            {
                                id: string;
                                login: string;
                                profile_image_url: string
                            }
                        ]
                    }

                    const getUser = await UserSchema.findById(userId);
                    if (!getUser) {
                        return interaction.editReply({
                            content: interaction.client.translation(interaction.user, "default", "notInDatabase").replaceAll("{ADDITIONAL INFO}", "Please run the command `/force database` and try again.")
                        })
                    }

                    getUser.twitch = {
                        streamer: {
                            id: data[0].id,
                            username: data[0].login,
                            token: twitch.access_token,
                            refreshToken: twitch.refresh_token,
                            expiresIn: twitch.expires_in
                        }
                    }
                    getUser.markModified("twitch");
                    getUser.save();

                    return interaction.editReply({
                        embeds: [
                            CreateEmbed("success", interaction, data)
                        ]
                    }).then(() => {
                        interaction.user.send({
                            embeds: [
                                CreateEmbed("success", interaction, data)
                            ]
                        })
                    })
                } else {
                    return interaction.editReply({
                        embeds: [
                            CreateEmbed("error", interaction, undefined)
                        ]
                    })
                }
            })
        })

        wss.on("error", (err) => {
            console.error(err);
        })

        setTimeout(async () => {
            await interaction.editReply({
                embeds: [
                    new EmbedBuilder()
                        .setColor("DarkRed")
                        .setTitle(interaction.client.translation(interaction.user, "streamerRegister", "embed-title-default"))
                        .setDescription(interaction.client.translation(interaction.user, "streamerRegister", "embed-description-timeout").replaceAll("{USERNAME}", interaction.user.username))
                        .setAuthor({
                            name: interaction.user.username,
                            iconURL: interaction.user.displayAvatarURL()
                        })
                ]
            });
        }, 180000)
    } catch (e: any) {
        throw new Error(e.message);
    }
}