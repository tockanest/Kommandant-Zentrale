import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import UserSchema from "../../../../../Configs/Database/Schemas/UserSchema";

function getTranslation(interaction: ChatInputCommandInteraction, commandName: string, key: string) {
    return interaction.client.translation(interaction.user, commandName, key);
}

function CreateEmbed(type: "success" | "error" | "not-registered", interaction: ChatInputCommandInteraction) {
    return new EmbedBuilder()
        .setColor(type === "success" ? "Random" : "DarkRed")
        .setTitle(getTranslation(interaction, "streamerUnregister", "embed-title-default"))
        .setDescription(getTranslation(interaction, "streamerUnregister", `embed-description-${type}`).replaceAll("{USERNAME}", interaction.user.username))
        .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL()
        })
}

export default async function UnregisterStreamer(interaction: ChatInputCommandInteraction) {
    
    const getUser = await UserSchema.findById(interaction.user.id);
    if (!getUser!.twitch?.streamer?.id) {
        return await interaction.reply({
            embeds: [
                CreateEmbed("not-registered", interaction)
            ],
            ephemeral: true
        })
    }
    
    const row = new ActionRowBuilder().addComponents([
        new ButtonBuilder()
            .setCustomId(`cancel::streamer-unregister`)
            .setStyle(ButtonStyle.Danger)
            .setLabel(getTranslation(interaction, "streamerUnregister", "button-cancel"))
            .setEmoji("✖️"),
        new ButtonBuilder()
            .setCustomId(`continue::streamer-unregister::${interaction.user.id}`)
            .setStyle(ButtonStyle.Primary)
            .setLabel(getTranslation(interaction, "streamerUnregister", "button-continue"))
            .setEmoji("➡️")
    ]) as ActionRowBuilder<ButtonBuilder>
    
    // Create an embed and two buttons to confirm or cancel, then send it to the user.
    return await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setAuthor({
                    name: interaction.client.user!.username + " - " + getTranslation(interaction, "streamerUnregister", "embed-title-default"),
                    iconURL: interaction.client.user!.displayAvatarURL()
                })
                .setDescription(getTranslation(interaction, "streamerUnregister", "embed-description-warning"))
                .setColor("Random")
                .setFooter({
                    text: interaction.guild!.name,
                    iconURL: interaction.guild!.iconURL()!,
                })
                .setTimestamp(new Date())
        ],
        components: [row]
    })
    
}