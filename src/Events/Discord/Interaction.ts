import {ButtonInteraction, Events, Interaction} from "discord.js";
import continueConfig from "./Helpers/Buttons/Configurations/continueConfig";
import continueUnregister from "./Helpers/Buttons/Streamers/Twitch/continueUnregister";

export default {
    name: Events.InteractionCreate,
    execute: (interaction: Interaction) => {
        if (interaction.isButton()) {
            const {customId} = interaction as ButtonInteraction;
            const [action, command] = customId.split("::");

            switch (command) {
                case "member-count": {
                    if (action === "continue") {
                        return continueConfig(interaction);
                    } else {
                        interaction.update({content: "Cancelled", embeds: [], components: []});
                        interaction.deleteReply()
                        return;
                    }
                }
                case "streamer-unregister": {
                    if(action === "continue") {
                        return continueUnregister(interaction);
                    } else {
                        interaction.update({content: "Cancelled", embeds: [], components: []});
                        interaction.deleteReply()
                        return;
                    }
                }
            }
        }
    }
} as CustomEvents