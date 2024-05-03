import UserSchema from "../../../../../../Configs/Database/Schemas/UserSchema";
import {ButtonInteraction, EmbedBuilder} from "discord.js";

function getTranslation(interaction: ButtonInteraction, commandName: string, key: string) {
    return interaction.client.translation(interaction.user, commandName, key);
}

function CreateEmbed(type: "success" | "error" | "not-registered", interaction: ButtonInteraction) {
    return new EmbedBuilder()
        .setColor(type === "success" ? "Random" : "DarkRed")
        .setTitle(getTranslation(interaction, "streamerUnregister", "embed-title-default"))
        .setDescription(getTranslation(interaction, "streamerUnregister", `embed-description-${type}`).replaceAll("{USERNAME}", interaction.user.username))
        .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL()
        })
}

export default async function continueUnregister(interaction: ButtonInteraction) {
    const [_, __, userId] = interaction.customId.split("::");
    
    if(userId !== interaction.user.id) return
    
    const getUser = await UserSchema.findById(interaction.user.id);
    
    if (!getUser!.twitch?.streamer?.id) {
        return await interaction.reply({
            embeds: [
                CreateEmbed("not-registered", interaction)
            ],
            ephemeral: true
        })
    }
    
    // Remove the user's twitch streamer information from the database.
    getUser!.twitch.streamer = undefined;
    getUser!.markModified("twitch")
    await getUser!.save();
    
    // I would remove all user's viewer information from the database here, but is it worth it?
    // Does it make any sense anyways? It might clutter if there's like a ton of streamers with
    // more tons of viewers, but until then, I'll leave it as it is.
    // But since I'm a man of culture ( a moron ), I'll say to the streamer that their viewers will have to
    // re-register themselves to the bot as viewers on an occasional streamer unregister.
    
    return await interaction.reply({
        embeds: [
            CreateEmbed("success", interaction)
        ],
        ephemeral: true
    })
}