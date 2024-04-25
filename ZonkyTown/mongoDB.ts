import { Collection, MongoClient } from "mongodb";
import { Character } from "./public/types/character";
import dotenv from "dotenv"; 

dotenv.config(); // zorg dat je .evn kan uitlezen

const uri = process.env.URI || "mongodb+srv://ZonkyTown:123@zonkytown.iqttvfb.mongodb.net/";
const client = new MongoClient(uri);
const collection: Collection<Character> = client.db("ZonkyTown").collection<Character>("Fortnite");

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

export async function getCharacters() {
    return await collection.find({}).toArray();
}

export async function loadCharactersFromApi() {
    const charachters: Character[] = await getCharacters();

    if (charachters.length == 0) {

        console.log("Database is leeg, characters uit API halen nu...")
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
        const characters: { data: Character[] } = await response.json();

        const filteredUsers: Character[] = characters.data.filter(character =>
            character.type.value === "outfit");

        console.log(filteredUsers);
        await collection.insertMany(filteredUsers);
    }
}

export async function connect() {
    try {
        await client.connect();
        await loadCharactersFromApi();
        console.log("Connected to database");
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}