import {model, Schema} from "mongoose";

interface IGuild {
    _id: string;
    channelConfigs: {
        memberCount?: {
            channelId: string;
            active: boolean
            channelName?: string;
        }
    }
}

// Define a memberCount schema
const memberCountSchema = new Schema({
    channelId: {type: String, required: true},
    channelName: {type: String, required: false, default: "Member Count: {COUNT}"},
}, {_id: false}); // _id is not needed for subdocument

const guildSchema = new Schema<IGuild>({
    _id: {type: String, required: true},
    channelConfigs: {
        // Make memberCount optional by using the memberCountSchema and marking it as not required
        memberCount: {type: memberCountSchema, required: false},
    }
});

export default model<IGuild>("guild", guildSchema);
