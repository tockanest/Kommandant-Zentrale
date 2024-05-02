import {ChatInputCommandInteraction} from "discord.js";
import GuildSchema from "../../../Configs/Database/Schemas/GuildSchema";

export default async function (interaction: ChatInputCommandInteraction) {
    const {guild, client, user} = interaction;

    const getGuild = await GuildSchema.findOne({_id: guild!.id});

    if (!getGuild || !getGuild.channelConfigs.memberCount) {
        return interaction.reply({
            content: client.translation(user, "memberCount", "notConfigured"),
            ephemeral: true
        })
    }

    getGuild.channelConfigs.memberCount = undefined;
    getGuild.markModified("channelConfigs.memberCount");
    await getGuild.save();

    return interaction.reply({
        content: client.translation(user, "memberCount", "successRemove"),
        ephemeral: true
    })
}