import "dotenv/config";
import "discord.js";
import StartBot from "./Configs/Classes/Bot/Bot";
import "./Modules/API/";

(async () => {
    await new StartBot(process.env.DISCORD_TOKEN!, true).start();

})();