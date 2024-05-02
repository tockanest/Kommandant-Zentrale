import {ButtonInteraction} from "discord.js";
import GuildSchema from "../../../../../Configs/Database/Schemas/GuildSchema";

export default async function (interaction: ButtonInteraction) {
    const {guild, client, user} = interaction;

    const [action, command, channelId, channelName] = interaction.customId.split("::");

    console.log(interaction.customId)

    if (!channelId) {
        return interaction.update({
            content: client.translation(user, "configuration", "failedContinue").replace("{ERROR}", "Missing Channel Name"),
            embeds: [],
            components: []
        })
    } else if (!guild) return;

    const guildData = await GuildSchema.findOne({_id: guild.id});

    if (!guildData || !guildData.channelConfigs.memberCount) return;

    Object.assign(guildData.channelConfigs.memberCount, {
        channelId,
        active: true,
        channelName: channelName ?? "Member Count: {}"
    });
    guildData.markModified("channelConfigs.memberCount");
    await guildData.save();

    return await interaction.update({
        content: client.translation(user, "memberCount", "success"),
        embeds: [],
        components: []
    });
}