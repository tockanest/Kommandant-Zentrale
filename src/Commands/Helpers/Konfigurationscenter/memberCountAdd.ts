import {ChatInputCommandInteraction} from "discord.js";
import GuildSchema from "../../../Configs/Database/Schemas/GuildSchema";
import alreadyConfigured from "./alreadyConfigured";

export default async function (interaction: ChatInputCommandInteraction, channel: string, name?: string) {
    const {guild, client} = interaction

    if (!guild) {
        return await interaction.reply({
            content: client.translation(interaction.user, "default", "notInGuild"),
        })
    }

    const guildData = await GuildSchema.findOne({_id: guild.id})

    if (!guildData || !guildData.channelConfigs.memberCount) {

        await GuildSchema.findOneAndUpdate({_id: guild.id}, {
            _id: guild.id,
            channelConfigs: {
                memberCount: {
                    channelId: channel,
                    active: true,
                    channelName: name,
                }
            }
        }, {
            upsert: true,
            setDefaultsOnInsert: true,
        })

        return interaction.reply({
            content: client.translation(interaction.user, "memberCount", "success"),
        })
    }

    const {channelId, channelName} = guildData.channelConfigs.memberCount!

    if (channelId && channelName) {
        return await alreadyConfigured(interaction, channel, name)
    }
}