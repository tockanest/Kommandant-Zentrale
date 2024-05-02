import {Client} from "discord.js";
import loadEvents from "./loadEvents";

export default class EventHandler {
    constructor(private client: Client) {
    }

    public loadEvents(): void {
        this.loadGenericEvents(
            loadEvents,
            this.client,
            "[Erro: Eventos] > No events to be loaded were found!"
        );
    }

    private loadGenericEvents(
        eventsToLoad: CustomEvents[],
        target: any,
        errorMsg: string
    ): void {
        if (eventsToLoad.length === 0) console.log(errorMsg);

        for (const event of eventsToLoad) {
            const {name, execute, once} = event;

            const callback = (...args: any[]) =>
                execute(...args, target, this.client);

            if (once) {
                target.once(name, callback);
            } else {
                target.on(name, callback);
            }
        }
    }
}