import {ChatInputCommandInteraction, Client, PermissionFlagsBits, User} from "discord.js"
import options from "../Helpers/Konfigurationscenter/options";
import memberCount from "../Helpers/Konfigurationscenter/memberCountAdd";
import memberCountRemove from "../Helpers/Konfigurationscenter/memberCountRemove";

export default {
    name: "configuration",
    nameLocalizations: {
        "pt-BR": "configuração",
        "de": "konfigurationsbefehl",
    },
    description: "A Configuration Command that provides options for maintaining server integrity.",
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

        const subCommand = interaction.options.getSubcommand() as ConfigurationSubCommands;

        switch (subCommand) {
            case "member-count": {
                try {
                    const memberCountOptions = interaction.options.getChannel("channel", true)
                    const memberCountName = interaction.options.getString("name") as string | undefined;

                    await memberCount(interaction, memberCountOptions.id, memberCountName);

                    break;
                } catch (e: any) {
                    return await interaction.reply({
                        content: client.translation(user, "configuration", "errorAdding"),
                        ephemeral: true
                    })
                }
            }
            case "member-count-remove": {
                try {
                    await memberCountRemove(interaction);

                    break;
                } catch (e: any) {
                    return await interaction.reply({
                        content: client.translation(user, "configuration", "errorRemove"),
                        ephemeral: true
                    })
                }
            }
            default: {
                return await interaction.reply({
                    content: client.translation(user, "configuration", "invalidSubCommand"),
                    ephemeral: true
                })
            }
        }

    }
} as Command;