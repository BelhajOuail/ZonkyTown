import session, { MemoryStore } from "express-session";
import { Character } from "../types/character";

declare module 'express-session' {
    export interface SessionData {
        backpack?: string; // Rugzak
        pickaxe?: string; // Pickaxe
        score?: number; // Score
    }
}

export default session({
    secret: process.env.SESSION_SECRET ?? "my-super-secret-secret",
    store: new MemoryStore(),
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
});

