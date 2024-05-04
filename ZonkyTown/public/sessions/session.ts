import dotenv from "dotenv";
import session from "express-session";
import { User } from "../types/user";
import mongoDbSession from "connect-mongodb-session";
const MongoDBStore = mongoDbSession(session);

dotenv.config();

const mongoStore = new MongoDBStore({
    uri: process.env.URI || "mongodb+srv://ZonkyTown:123@zonkytown.iqttvfb.mongodb.net/",
    collection: "sessions",
    databaseName: "login-express",
});

declare module 'express-session' {
    export interface SessionData {
        user?: User;
    }
}

export default session({
    secret: process.env.SESSION_SECRET ?? "my-super-secret-secret",
    store: mongoStore,
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
});