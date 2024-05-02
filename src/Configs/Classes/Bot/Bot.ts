import {Client, GatewayIntentBits, Partials} from "discord.js";

import EventHandler from "./Handlers/Events/EventHandler";
import CommandHandler from "./Handlers/Commands/CommandHandler";

import startDB from "../../Database";
import Polyglot from "./Handlers/LanguageHandlers";


export default class Bot {
    private client: Client;
    private debug: boolean = false;

    constructor(private token: string, debug: boolean = false) {
        this.client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildModeration,
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.MessageContent,
            ],
            partials: [
                Partials.GuildMember,
                Partials.Channel,
                Partials.Message,
                Partials.Reaction,
                Partials.User,
            ],
        });

        this.debug = debug;
    }

    public async start(): Promise<void> {
        await this.client
            .login(this.token)
            .then(() => {
                this.client.once("ready", async () => {
                    console.log(`Logged in as ${this.client.user!.tag}!`);
                    const events = new EventHandler(this.client);
                    await startDB();
                    events.loadEvents();

                    const commandHandler = new CommandHandler(
                        this.client,
                        this.debug
                    );
                    await commandHandler.loadCommands();

                    const polyglot = new Polyglot();
                    await polyglot.loadUserSettings(this.client);
                    this.client.translation = (user, commandName, textId): string => {
                        return polyglot.getTranslation(user, commandName, textId);
                    }

                    await this.client.user!.setAvatar("public/images/icons/KommandantZentrale.png").catch(console.error);
                    await this.client.user!.setUsername("Kommandant Zentrale");

                });
            })
            .catch((error) => {
                console.error("Error logging in:", error);
            });
    }
}