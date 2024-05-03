import {ChatInputCommandInteraction, Client, EmbedBuilder, PermissionFlagsBits, User} from "discord.js"
import options from "../Helpers/InhaltserstellerZentrum/options";
import registerStreamer from "../Helpers/InhaltserstellerZentrum/Streamer/register";
import UnregisterStreamer from "../Helpers/InhaltserstellerZentrum/Streamer/unregister";
import UpdateTwitchStreamer from "../Helpers/InhaltserstellerZentrum/Streamer/update";

export default {
    name: "twitch",
    description: "A Configuration Command that provides options for streamers.",
    descriptionLocalizations: {
        "pt-BR": "Um comando de configuração que propõe opções para manter a integridade do servidor.",
        "de": "Ein Konfigurationsbefehl, der Optionen zur Aufrechterhaltung der Serverintegrität bereitstellt."
    },
    guildOnly: true,
    options,
    async execute({interaction, user, client}: {
        interaction: ChatInputCommandInteraction,
        user: User,
        client: Client
    }) {
        
        const command = interaction.options.getSubcommandGroup() as "streamer" | "viewer";
        
        
        switch (command) {
            case "streamer": {
                const subCommand = interaction.options.getSubcommand() as StreamerSubCommands;
                switch (subCommand) {
                    case "register": {
                        try {
                            await registerStreamer(interaction);
                            break;
                        } catch (e: any) {
                            return await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("DarkRed")
                                        .setTitle(interaction.client.translation(interaction.user, "streamerRegister", "embed-title-default"))
                                        .setDescription(interaction.client.translation(interaction.user, "streamerRegister", "embed-description-error").replaceAll("{USERNAME}", interaction.user.username))
                                        .setAuthor({
                                            name: interaction.user.username,
                                            iconURL: interaction.user.displayAvatarURL()
                                        })
                                ],
                                ephemeral: true
                            })
                        }
                    }
                    case "unregister": {
                        try {
                            await UnregisterStreamer(interaction);
                            break;
                        } catch (e: any) {
                            console.log(e.message)
                            return await interaction.reply({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor("DarkRed")
                                        .setTitle(interaction.client.translation(interaction.user, "streamerRegister", "embed-title-default"))
                                        .setDescription(interaction.client.translation(interaction.user, "streamerRegister", "embed-description-error").replaceAll("{USERNAME}", interaction.user.username))
                                        .setAuthor({
                                            name: interaction.user.username,
                                            iconURL: interaction.user.displayAvatarURL()
                                        })
                                ],
                                ephemeral: true
                            })
                        }
                    }
                    case "update": {
                        try {
                            await UpdateTwitchStreamer(interaction);
                            break;
                        } catch (e: any) {
                            return await interaction.reply({
                                content: client.translation(user, "streamerRegister", "errorUpdating"),
                                ephemeral: true
                            })
                        }
                    }
                    default: {
                        return await interaction.reply({
                            content: client.translation(user, "streamerRegister", "invalidSubCommand"),
                            ephemeral: true
                        })
                    }
                }
                break;
            }
            case "viewer": {
                return await interaction.reply({
                    content: "This command is not yet implemented.",
                    ephemeral: true
                })
            }
        }
    }
} as Command;