import {Events, GuildMember} from "discord.js";
import GuildSchema from "../../Configs/Database/Schemas/GuildSchema";
import Polyglot from "../../Configs/Classes/Bot/Handlers/LanguageHandlers";

export default {
    name: Events.GuildMemberAdd,
    execute: async (guildMember: GuildMember) => {
        const {guild} = guildMember;

        // Might have to change this to a different way of setting the user language, it might be a scalability issue in the future:
        // This is updating every user that's not on the database when a user joins a guild, this might get out of hand in the future.
        const polyglot = new Polyglot();
        await polyglot.loadUserSettings(guild.client);

        const guildData = await GuildSchema.findOne({_id: guild.id});

        if (!guildData || !guildData.channelConfigs.memberCount) return;

        const channel = guild.channels.cache.get(guildData.channelConfigs.memberCount.channelId);

        if (!channel) return;

        await channel.setName(guildData.channelConfigs.memberCount.channelName!.replace(/{COUNT}/g, guild.memberCount.toString()));
        return;

    }
} as CustomEvents
