import {ApplicationCommandOption, ApplicationCommandOptionType} from "discord.js";

export default [
    {
        name: "streamer",
        description: "Provides configuration options for a Twitch Streamer.",
        descriptionLocalizations: {
            "pt-BR": "Fornece opções de configuração para um Streamer da Twitch.",
            "de": "Bietet Konfigurationsoptionen für einen Twitch-Streamer."
        },
        type: ApplicationCommandOptionType.SubcommandGroup,
        options: [
            {
                name: "register",
                nameLocalizations: {
                    "pt-BR": "registrar",
                    de: "registrieren"
                },
                description: "Registers you as a twich streamer.",
                descriptionLocalizations: {
                    "pt-BR": "Registra você como um streamer da twich.",
                    de: "Registriert dich als Twich-Streamer."
                },
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: "unregister",
                nameLocalizations: {
                    "pt-BR": "desregistrar",
                    de: "de-registrieren"
                },
                description: "Unregisters you as a twich streamer.",
                descriptionLocalizations: {
                    "pt-BR": "Desregistra você como um streamer da twich.",
                    de: "Meldet dich als Twich-Streamer ab."
                },
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: "update",
                nameLocalizations: {
                    "pt-BR": "atualizar",
                    de: "aktualisieren"
                },
                description: "Updates your twich streamer information.",
                descriptionLocalizations: {
                    "pt-BR": "Atualiza suas informações de streamer da twich.",
                    de: "Aktualisiert Ihre Twich-Streamer-Informationen."
                },
                type: ApplicationCommandOptionType.Subcommand,
            }
        ]
    } as ApplicationCommandOption,
    {
        name: "viewer",
        description: "Provides configuration options for a Twitch Viewer.",
        descriptionLocalizations: {
            "pt-BR": "Fornece opções de configuração para um Espectador da Twitch.",
            de: "Bietet Konfigurationsoptionen für einen Twitch-Zuschauer."
        },
        type: ApplicationCommandOptionType.SubcommandGroup,
        options: [
            {
                name: "register",
                nameLocalizations: {
                    "pt-BR": "registrar",
                    de: "registrieren"
                },
                description: "Registers you as a twich viewer.",
                descriptionLocalizations: {
                    "pt-BR": "Registra você como um espectador da twich.",
                    de: "Registriert dich als Twich-Zuschauer."
                },
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: "unregister",
                nameLocalizations: {
                    "pt-BR": "desregistrar",
                    de: "de-registrieren"
                },
                description: "Unregisters you as a twich viewer.",
                descriptionLocalizations: {
                    "pt-BR": "Desregistra você como um espectador da twich.",
                    de: "Meldet dich als Twich-Zuschauer ab."
                },
                type: ApplicationCommandOptionType.Subcommand,
            },
            {
                name: "update",
                nameLocalizations: {
                    "pt-BR": "atualizar",
                    de: "aktualisieren"
                },
                description: "Updates your twich viewer information.",
                descriptionLocalizations: {
                    "pt-BR": "Atualiza suas informações de espectador da twich.",
                    de: "Aktualisiert Ihre Twich-Zuschauer-Informationen."
                },
                type: ApplicationCommandOptionType.Subcommand,
            }
        ]
    } as ApplicationCommandOption,
] as ApplicationCommandOption[];