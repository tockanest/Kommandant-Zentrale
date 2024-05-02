import {connect, set} from "mongoose";

export default async function startDB(): Promise<void> {
    set(`strictQuery`, false);
    const c = await connect(process.env.DB_URI!);
    console.info(
        `\x1b[32m%s\x1b[0m`,
        "[ Database ]",
        `> Connected to DB ${c.connection.name}!`
    );
}