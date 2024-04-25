import { Collection, MongoClient } from "mongodb";
import { Character } from "./public/types/character";

import dotenv from "dotenv"; 
dotenv.config(); // zorg dat je .evn kan uitlezen

const uri= process.env.URI || "mongodb+srv://ZonkyTown:123@zonkytown.iqttvfb.mongodb.net/";
const client = new MongoClient(uri);
const collection: Collection<Character> = client.db("ZonkyTown").collection<Character>("Characters");

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function connect() {
    try {
        await client.connect();
        console.log("Connected to database");
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}