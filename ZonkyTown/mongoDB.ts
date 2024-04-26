import { Collection, MongoClient } from "mongodb";
import { Character } from "./public/types/character";
import dotenv from "dotenv"; 

dotenv.config(); // zorg dat je .evn kan uitlezen

const uri = process.env.URI || "mongodb+srv://ZonkyTown:123@zonkytown.iqttvfb.mongodb.net/";
const client = new MongoClient(uri);
const collectionCharacters: Collection<Character> = client.db("ZonkyTown").collection<Character>("Characters");
const collectionBackpacks: Collection<Character> = client.db("ZonkyTown").collection<Character>("Backpacks");
const collectionPickaxes: Collection<Character> = client.db("ZonkyTown").collection<Character>("Pickaxe");

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
    return await collectionCharacters.find({}).toArray();
}
export async function getBackpacks() {
    return await collectionBackpacks.find({}).toArray();
}
export async function getPickaxes() {
    return await collectionPickaxes.find({}).toArray();
}


export async function loadCharactersFromApi() {
    const charachters: Character[] = await getCharacters();

    if (charachters.length == 0) {

        console.log("Database is leeg, characters uit API halen nu...")
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
        const characters: { data: Character[] } = await response.json();

        const filteredCharacters: Character[] = characters.data.filter(character =>
            character.type.value === "outfit");
        
        console.log(filteredCharacters);
        await collectionCharacters.insertMany(filteredCharacters);
    }
}

export async function loadBackpacksFromApi() {
    const backpacks: Character[] = await getBackpacks();

    if (backpacks.length == 0) {

        console.log("Database is leeg, backpacks uit API halen nu...")
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
        const backpacks: { data: Character[] } = await response.json();

        const filteredBackpacks: Character[] = backpacks.data.filter(backpacks =>
            backpacks.type.value === "backpack");
        
        console.log(filteredBackpacks);
        await collectionBackpacks.insertMany(filteredBackpacks);
    }
}

export async function loadPickaxesFromApi() {
    const pickaxes: Character[] = await getPickaxes();

    if (pickaxes.length == 0) {

        console.log("Database is leeg, pickaxes uit API halen nu...")
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
        const pickaxes: { data: Character[] } = await response.json();

        const filteredPickaxes: Character[] = pickaxes.data.filter(pickaxes =>
            pickaxes.type.value === "pickaxe");
        
        console.log(filteredPickaxes);
        await collectionPickaxes.insertMany(filteredPickaxes);
    }
}

export async function connect() {
    try {
        await client.connect();
        await loadCharactersFromApi();
        await loadBackpacksFromApi();
        await loadPickaxesFromApi();
        console.log("Connected to database");
        process.on("SIGINT", exit);
    } catch (error) {
        console.error(error);
    }
}