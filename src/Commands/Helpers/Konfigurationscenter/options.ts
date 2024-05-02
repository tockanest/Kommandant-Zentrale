import {ApplicationCommandOptionType} from "discord.js";

export default [
    {
        name: "server",
        description: "Provides configurations for the server.",
        descriptionLocalizations: {
            "pt-BR": "Habilita configurações para o servidor.",
            "de": "Stellt Konfigurationen für den Server bereit."
        },
        type: ApplicationCommandOptionType.SubcommandGroup,
        options: [
            {
                name: "member-count",
                nameLocalizations: {
                    "pt-BR": "contador-de-membros",
                    de: "mitgliederzahl"
                },
                description: "Setup the member count on a channel (Preferred if voice channel).",
                descriptionLocalizations: {
                    "pt-BR": "Configura a contagem de membros em um canal (preferencial se for canal de voz).",
                    de: "Richten Sie die Mitgliederzahl für einen Kanal ein (bevorzugt, wenn Sprachkanal)."
                },
                type: ApplicationCommandOptionType.Subcommand,
                options: [
                    {
                        name: "channel",
                        description: "The channel to set up the member count.",
                        descriptionLocalizations: {
                            "pt-BR": "O canal para configurar a contagem de membros.",
                            "de": "Der Kanal, um die Mitgliederzahl einzurichten."
                        },
                        type: ApplicationCommandOptionType.Channel,
                        required: true
                    },
                    {
                        name: "name",
                        description: "The name of the member count. (Will default to 'Member Count')",
                        descriptionLocalizations: {
                            "pt-BR": "O nome da contagem de membros. (Será padrão para 'Contagem de Membros')",
                            "de": "Der Name der Mitgliederzahl. (Wird standardmäßig auf 'Mitgliederzahl' gesetzt)"
                        },
                        type: ApplicationCommandOptionType.String,
                        required: false
                    }
                ]
            },
            {
                name: "member-count-remove",
                nameLocalizations: {
                    "pt-BR": "remover-contador-de-membros",
                    de: "mitgliederzahl-entfernen"
                },
                description: "Removes the member count configuration.",
                descriptionLocalizations: {
                    "pt-BR": "Remove a configuração do contador de membros.",
                    de: "Entfernt die Mitgliederzahlkonfiguration."
                },
                type: ApplicationCommandOptionType.Subcommand,
            }

        ]
    }
];