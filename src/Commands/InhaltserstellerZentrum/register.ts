import {ChatInputCommandInteraction, Client, EmbedBuilder, PermissionFlagsBits, User} from "discord.js"
import options from "../Helpers/InhaltserstellerZentrum/options";
import registerStreamer from "../Helpers/InhaltserstellerZentrum/register";

export default {
    name: "streamer",
    description: "A Configuration Command that provides options for streamers.",
    descriptionLocalizations: {
        "pt-BR": "Um comando de configuração que propõe opções para manter a integridade do servidor.",
        "de": "Ein Konfigurationsbefehl, der Optionen zur Aufrechterhaltung der Serverintegrität bereitstellt."
    },
    defaultMemberPermissions: [PermissionFlagsBits.ManageGuild, PermissionFlagsBits.Administrator],
    guildOnly: true,
    options,
    async execute({interaction, user, client}: {
        interaction: ChatInputCommandInteraction,
        user: User,
        client: Client
    }) {
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
                    // Unregister the user as a twitch streamer.
                    break;
                } catch (e: any) {
                    return await interaction.reply({
                        content: client.translation(user, "streamerRegister", "errorUnregistering"),
                        ephemeral: true
                    })
                }
            }
            case "update": {
                try {
                    // Update the user's twitch streamer information.
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
    }
} as Command;