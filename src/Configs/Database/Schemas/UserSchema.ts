import {model, Schema} from "mongoose";

interface IUser {
    _id: string;
    username: string;
    language: string;
    twitch?: {
        streamer: {
            id: string;
            username: string;
            token: string;
            refreshToken: string;
            expiresIn: number;
        }
        viewer?: {
            viewerId: string;
            streamerId: string;
            token: string;
            refreshToken: string;
            expiresAt: number;
            viewData: {
                hoursWatched: number;
                lastWatched: number;
                viewStreak: number;
            }
        }[]
    }
}

const userSchema = new Schema<IUser>({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    language: {type: String, required: true},
    twitch: {
        streamer: {
            id: {type: String, required: false},
            username: {type: String, required: false},
            token: {type: String, required: false},
            refreshToken: {type: String, required: false},
            expiresIn: {type: Number, required: false}
        },
        viewer: [{
            viewerId: {type: String, required: false},
            streamerId: {type: String, required: false},
            token: {type: String, required: false},
            refreshToken: {type: String, required: false},
            expiresAt: {type: Number, required: false},
            viewData: {
                hoursWatched: {type: Number, required: false},
                lastWatched: {type: Number, required: false},
                viewStreak: {type: Number, required: false}
            }
        }]

    }
});

export default model<IUser>("user", userSchema);