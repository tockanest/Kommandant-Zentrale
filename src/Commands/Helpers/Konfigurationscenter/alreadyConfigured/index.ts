import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";

export default async function (interaction: ChatInputCommandInteraction, channelId: string, channelName?: string) {

    const {client, guild} = interaction

    const row = new ActionRowBuilder().addComponents(
        [
            new ButtonBuilder()
                .setCustomId(`cancel::member-count::${interaction.id}`)
                .setStyle(ButtonStyle.Danger)
                .setLabel(client.translation(interaction.user, "memberCount", "cancel"))
                .setEmoji("✖️"),
            new ButtonBuilder()
                .setCustomId(`continue::member-count::${channelId}::${channelName}`)
                .setStyle(ButtonStyle.Primary)
                .setLabel(client.translation(interaction.user, "memberCount", "continue"))
                .setEmoji("➡️"),

        ]
    ) as ActionRowBuilder<ButtonBuilder>

    return await interaction.reply({
        embeds: [
            new EmbedBuilder()
                .setAuthor({
                    name: client.user!.username + " - " + client.translation(interaction.user, "memberCount", "alreadyConfiguredTitle"),
                    iconURL: client.user!.displayAvatarURL()
                })
                .setDescription(client.translation(interaction.user, "memberCount", "alreadyConfigured"))
                .setColor("Random")
                .setFooter({
                    text: guild!.name,
                    iconURL: guild!.iconURL()!,
                })
                .setTimestamp(new Date())
        ],
        components: [row]
    })
}