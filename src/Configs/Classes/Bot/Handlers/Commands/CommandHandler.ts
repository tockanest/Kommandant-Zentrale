import {
    ApplicationCommand,
    ChatInputApplicationCommandData,
    Client,
    Collection,
    GuildMember,
    Interaction,
} from "discord.js";
import loadCommands from "./loadCommands";

export default class CommandHandler {
    private globalCommands: Map<string, Command> = new Map();
    private guildCommands: Map<string, Command> = new Map();


    private guildCommandsCache: Map<
        string,
        Collection<string, ApplicationCommand>
    > = new Map();

    constructor(private client: Client, private debug: boolean = false) {
        this.client.on("interactionCreate", this.handleInteraction.bind(this));
    }

    public async loadCommands(): Promise<void> {
        for (const command of loadCommands) {
            if (command.guildOnly) {
                this.guildCommands.set(command.name, command);
            } else {
                this.globalCommands.set(command.name, command);
            }
        }

        try {
            await this.CacheCommands();
            await this.syncCommands();
        } catch (error) {
            console.error("Failed to load or sync commands:", error);
        }
    }

    private async CacheCommands() {
        if (!this.client.application) {
            console.error("Client application is undefined.");
            return;
        }

        const guildFetchPromises = this.client.guilds.cache.map(
            async (guild) => {
                const commands = await guild.commands.fetch();
                this.guildCommandsCache.set(guild.id, commands);
            }
        );

        await Promise.all(guildFetchPromises);
    }

    private async handleInteraction(interaction: Interaction) {
        if (!interaction.isCommand()) return;

        const command =
            this.globalCommands.get(interaction.commandName) ||
            this.guildCommands.get(interaction.commandName);

        if (!command) return;
        if (
            command.roles &&
            !this.hasRequiredRole(interaction, command.roles)
        ) {
            return;
        }

        const args: CommandExecuteArgs = {
            interaction,
            client: this.client,
            user: interaction.user,
            guild: interaction.guild,
            mention: interaction.options.resolved?.users?.first(),
        };

        command.execute(args);
    }

    private hasRequiredRole(
        interaction: Interaction,
        roles: string[]
    ): boolean {
        const member = interaction.member as GuildMember;
        return roles.some((role) => member.roles.cache.has(role));
    }

    private async GlobalCommands() {
        const existingGlobalCommand =
            await this.client.application!.commands.fetch();

        for (const command of this.globalCommands.values()) {
            const commandData = this.createCommandData(command);
            const existingCommand = existingGlobalCommand.find(
                (cmd) => cmd.name === command.name
            );

            if (!existingCommand) {
                await this.client.application!.commands.create(commandData);

                this.logDebug(
                    "magenta",
                    `Command Handler`,
                    `Created ${command.name}`,
                    "info"
                );
            } else {
                if (
                    this.isCommandDifferent(existingCommand, commandData) &&
                    !command.guildOnly
                ) {
                    await this.client.application!.commands.edit(
                        existingCommand.id,
                        commandData
                    );
                    this.logDebug(
                        "magenta",
                        `Command Handler`,
                        `Edited/Updated ${command.name}`,
                        "info"
                    );
                }
            }
        }

        await this.removeOrphanedCommands(existingGlobalCommand);
    }

    private async GuildCommands() {
        const existingGuildCommands = this.guildCommandsCache;

        for (const command of this.guildCommands.values()) {
            if (command.guildOnly) {
                const commandData = this.createCommandData(command);

                this.client.guilds.cache.forEach(async (guild) => {
                    const existingCommand = existingGuildCommands
                        .get(guild.id)
                        ?.find((cmd) => cmd.name === command.name);

                    if (!existingCommand) {
                        await guild.commands.create(commandData);

                        this.logDebug(
                            "magenta",
                            `Command Handler`,
                            `Created ${command.name} in ${guild.name}`,
                            "info"
                        );
                    } else {
                        if (
                            this.isCommandDifferent(
                                existingCommand,
                                commandData
                            ) &&
                            command.guildOnly
                        ) {
                            await guild.commands.edit(
                                existingCommand.id,
                                commandData
                            );
                            this.logDebug(
                                "magenta",
                                `Command Handler`,
                                `Edited/Updated ${command.name} in ${guild.name}`,
                                "info"
                            );
                        }
                    }

                    await this.removeOrphanedCommands(
                        existingGuildCommands.get(guild.id)!,
                        "guild"
                    );
                });
            }
        }
    }

    private async syncCommands(): Promise<void> {
        await this.GlobalCommands();
        await this.GuildCommands();
    }

    private createCommandData(
        command: Command
    ): ChatInputApplicationCommandData {
        return {
            name: command.name,
            description: command.description,
            options: command.options,
            nameLocalizations: command.nameLocalizations,
            descriptionLocalizations: command.descriptionLocalizations,
            defaultMemberPermissions: command.defaultMemberPermissions,
        };
    }

    private isCommandDifferent(
        existingCommand: ApplicationCommand,
        commandData: ChatInputApplicationCommandData
    ): boolean {
        let arr: boolean[] = [];

        // Compare the command's primary properties
        if (
            existingCommand.name !== commandData.name ||
            existingCommand.description !== commandData.description ||
            !this.areLocalizationsEqual(
                existingCommand.nameLocalizations,
                commandData.nameLocalizations
            ) ||
            !this.areLocalizationsEqual(
                existingCommand.descriptionLocalizations,
                commandData.descriptionLocalizations
            ) ||
            existingCommand.defaultMemberPermissions !==
            commandData.defaultMemberPermissions
        ) {
            arr.push(true);
        } else {
            arr.push(false);
        }

        // Compare the options' length
        if (
            (existingCommand.options ?? []).length !==
            (commandData.options ?? []).length
        ) {
            arr.push(true);
        } else {
            arr.push(false);
        }

        // Compare each option
        for (let i = 0; i < (commandData.options ?? []).length; i++) {
            const existingOption = existingCommand.options[i];
            const commandOption = commandData.options![i];

            // If any option is different, return true

            if (
                !existingOption ||
                !existingOption.type ||
                !existingOption.name ||
                !existingOption.description
            ) {
                this.logDebug("red", "Command Handler", `Invalid Option for command ${existingCommand.name}:`, "error");
                throw new Error();
            }

            if (
                existingOption.type !== commandOption.type ||
                existingOption.name !== commandOption.name ||
                existingOption.description !== commandOption.description
            ) {
                arr.push(true);
            } else {
                arr.push(false);
            }
        }

        // Check on the array if there's a truthy value, if there is, return true to indicate that the command has changed.
        return arr.some((value) => value);
    }

    private areLocalizationsEqual(
        localizations1: any,
        localizations2: any
    ): boolean {
        const keys1 = Object.keys(localizations1 || {});
        const keys2 = Object.keys(localizations2 || {});

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (const key of keys1) {
            if (localizations1[key] !== localizations2[key]) {
                return false;
            }
        }

        return true;
    }

    private async removeOrphanedCommands(
        existingCommands: Collection<string, ApplicationCommand>,
        type: "global" | "guild" = "global"
    ): Promise<void> {
        switch (type) {
            case "global": {
                const registeredCommands = new Set(this.globalCommands.keys());
                const toDelete = existingCommands.filter(
                    (cmd) => !registeredCommands.has(cmd.name)
                );

                for (const cmd of toDelete.values()) {
                    await this.client.application!.commands.delete(cmd.id);
                    this.logDebug(
                        "magenta",
                        `Command Handler`,
                        `Deleted ${cmd.name}`,
                        "info"
                    );
                }
                break;
            }
            case "guild": {
                const registeredCommands = new Set(this.guildCommands.keys());
                const toDelete = existingCommands.filter(
                    (cmd) => !registeredCommands.has(cmd.name)
                );

                for (const cmd of toDelete.values()) {
                    await this.client.guilds.cache
                        .get(cmd.guild!.id)
                        ?.commands.delete(cmd.id);
                    this.logDebug(
                        "magenta",
                        `Command Handler`,
                        `Deleted ${cmd.name} in ${cmd.guild!.name}`,
                        "info"
                    );
                }
                break;
            }
        }
    }

    private logDebug(
        color: string,
        firstString: string,
        message: string,
        logType: string
    ) {
        if (this.debug) {
            const colorCodes: Record<string, string> = {
                red: "\x1b[31m",
                green: "\x1b[32m",
                yellow: "\x1b[33m",
                blue: "\x1b[34m",
                magenta: "\x1b[35m",
                cyan: "\x1b[36m",
                reset: "\x1b[0m",
            };

            const consoleMethods: Record<string, (...data: any[]) => void> = {
                log: console.log,
                error: console.error,
                warn: console.warn,
                info: console.info,
                debug: console.debug,
            };

            const chosenColor = colorCodes[color] || colorCodes.reset;
            const chosenMethod = consoleMethods[logType] || consoleMethods.log;

            chosenMethod(
                `${chosenColor}[ ${firstString} ]${colorCodes.reset}`,
                `${message}`
            );
        }
    }
}