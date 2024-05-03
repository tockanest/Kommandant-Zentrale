import {ChatInputCommandInteraction, Guild} from "discord.js";
import UserSchema from "../../../../../Configs/Database/Schemas/UserSchema";

export default async function RegisterViewer(interaction: ChatInputCommandInteraction) {
    const guild = interaction.guild
    
    if(!guild) {
        return await interaction.reply({
            content: "This command can only be used in a server.",
            ephemeral: true
        })
    }
    
    const hasTwitchIntegration = await CheckGuild(guild);
    if(!hasTwitchIntegration) {
        return await interaction.reply({
            content: "This server doesn't have the Twitch integration enabled.",
            ephemeral: true
        })
    }
    
    console.log(hasTwitchIntegration)
}

async function CheckGuild(guild: Guild) {
    // Get if the guild has the Twitch integration enabled
    const twitchIntegration = (await guild.fetchIntegrations()).filter((integration) => {
        if(integration.type === "twitch") {
            return integration
        } else return null
    })
    
    if(twitchIntegration.size === 0) {
        return null
    }
    
    return twitchIntegration.first()
}