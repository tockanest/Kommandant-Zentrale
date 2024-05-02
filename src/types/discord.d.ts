import "discord.js";
import Polyglot from "../Configs/Classes/Bot/Handlers/LanguageHandlers";

declare module "discord.js" {
    export interface Client {
        translation: Polyglot["getTranslation"];
    }

    export interface User {
        lang: Polyglot["userLanguage"][User["id"]];
    }
}