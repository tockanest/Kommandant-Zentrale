import {ChatInputApplicationCommandData, Client, CommandInteraction, Events, Guild, User,} from "discord.js";

declare global {

    type CustomEvents = {
        name: Events;
        execute: (...args: any[]) => void | Promise<void>;
        once: boolean;
    };

    type CommandExecuteArgs = {
        interaction: CommandInteraction | ChatInputCommandInteraction;
        client: Client;
        user: User;
        guild: Guild | null;
        mention?: User;
    };

    interface Command extends ChatInputApplicationCommandData {
        guildOnly?: boolean;
        roles?: string[];

        execute(args: CommandExecuteArgs): void;
    }

    type HeapSwitch = {
        [key: string]: string;
    };

    type ConfigurationSubCommands = "member-count" | "member-count-remove";
    type StreamerSubCommands = "register" | "unregister" | "update";

    type SupportedLanguages = "en-US" | "pt-BR" | "epo";
    type UserLanguages = { [userId: string]: SupportedLanguages };

    type CommandTranslations = {
        [key in "en-US" | "pt-BR" | "epo"]: string;
    };

    type CommandTranslation = {
        [commandString: string]: CommandTranslations;
    };

    type TranslationsExport = {
        supportedLanguages: ["en-US", "pt-BR", "epo"];
        translations: {
            [commandName: string]: CommandTranslation;
        };
    };
}

export {};