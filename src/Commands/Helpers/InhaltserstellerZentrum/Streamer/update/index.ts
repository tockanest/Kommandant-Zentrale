import {ChatInputCommandInteraction} from "discord.js";
import UserSchema from "../../../../../Configs/Database/Schemas/UserSchema";

export default async function UpdateTwitchStreamer(interaction: ChatInputCommandInteraction) {
    const getUser = await UserSchema.findById(interaction.user.id);
    if (!getUser!.twitch?.streamer?.id) {
        return await interaction.reply({
            content: "You are not registered as a streamer.",
            ephemeral: true
        })
    }
    
    // Let's use the token and refreshToken to update the streamer's information.
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id: process.env.TWITCH_CLIENT_ID,
            client_secret: process.env.TWITCH_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: getUser!.twitch.streamer.refreshToken
        })
    })
    
    const twitch = await response.json() as {
        access_token: string;
        expires_in: number;
        refresh_token: string;
        scope: string[];
        token_type: string;
    }
    if (!twitch.access_token) {
        return await interaction.reply({
            content: "An error occurred while updating your streamer information.",
            ephemeral: true
        })
    }
    
    // Get the user's information again, like the username and profile picture.
    const getTwitchUser = await fetch("https://api.twitch.tv/helix/users", {
        method: "GET",
        headers: {
            authorization: `Bearer ${twitch.access_token}`,
            "client-id": `${process.env.TWITCH_CLIENT_ID}`
        }
    });
    
    const {data} = await getTwitchUser.json() as {
        data: [
            {
                id: string;
                login: string;
                profile_image_url: string
            }
        ]
    }
    
    // Update the user's information, including the new token, refreshToken and expiresIn, with the username.
    getUser!.twitch.streamer.token = twitch.access_token;
    getUser!.twitch.streamer.refreshToken = twitch.refresh_token;
    getUser!.twitch.streamer.expiresIn = twitch.expires_in;
    getUser!.twitch.streamer.username = data[0].login;
    getUser!.markModified("twitch.streamer");
    await getUser!.save();
    
    return await interaction.reply({
        content: "Your streamer information has been updated.",
        ephemeral: true
    })
    
}