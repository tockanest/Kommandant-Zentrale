import {Events, GuildMember} from "discord.js";
import GuildSchema from "../../Configs/Database/Schemas/GuildSchema";
import Polyglot from "../../Configs/Classes/Bot/Handlers/LanguageHandlers";

export default {
    name: Events.GuildMemberRemove,
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
        
        if (channel.name.includes("{COUNT}")) {
            return await channel.setName(guildData.channelConfigs.memberCount.channelName!
                .replace(/{COUNT}/g, guild.memberCount.toString()))
        } else {
            // Let's use the default database name for the channel name
            const dbName = guildData.channelConfigs.memberCount.channelName!;
            // Then we'll use it to update the new channel name, it must include a {COUNT} to be able to update the member count.
            if (!dbName.includes("{COUNT}")) {
                // If there's nothing, then we'll just get the channel name, split it, get the number and then rearrange it with the updated count.
                const channelName = channel.name;
                const split = channelName.split(" ");
                //Let's get the number from the split array.
                const number = split.filter((s) => !isNaN(parseInt(s)))[0];
                // get the index of the number in the array.
                const index = split.indexOf(number);
                // remove the number from the array.
                split.splice(index, 1);
                // add the new number to the array.
                split.splice(index, 0, guild.memberCount.toString());
                // join the array back to a string.
                const newChannelName = split.join(" ");
                // update the channel name.
                return await channel.setName(newChannelName);
            }
            
            return await channel.setName(dbName.replace(/{COUNT}/g, guild.memberCount.toString()));
            
        }
    }
} as CustomEvents
