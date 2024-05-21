import { createConnection, Connection } from "mongoose";

const options: Object = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

const madeURI = () => {
    if (process.env.NODE_ENV === "development") {
        const flint = `${process.env.MONGO_URI}/test`
        return flint
    }
    const flint = `${process.env.MONGO_URI}/production`
    return flint;
}

export const ACCOUNT_DB: Connection = createConnection(
    madeURI() as string,
    options
);

ACCOUNT_DB.on("error", (error) => {
    console.error("Error establishing Account Connectiong: ", error);
    process.exit(1);
});

ACCOUNT_DB.once("open", () => {
    console.log("DB connection established successfully: ")
});