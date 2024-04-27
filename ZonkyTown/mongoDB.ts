import { Collection, MongoClient } from "mongodb";
import { Character } from "./public/types/character";
import { User } from "./public/types/user";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.URI || "mongodb+srv://ZonkyTown:123@zonkytown.iqttvfb.mongodb.net/";
const client = new MongoClient(uri);
//collections
const collectionCharacters: Collection<Character> = client.db("ZonkyTown").collection<Character>("Characters");
const collectionBackpacks: Collection<Character> = client.db("ZonkyTown").collection<Character>("Backpacks");
const collectionPickaxes: Collection<Character> = client.db("ZonkyTown").collection<Character>("Pickaxe");
const collectionUsers: Collection<User> = client.db("ZonkyTown").collection<User>("Users");

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}
//characters
export async function getCharacters() {
    return await collectionCharacters.find({}).toArray();
}
export async function getRandomOutfits(count: number): Promise<Character[]> {
    const randomOutfits: Character[] = await collectionCharacters.aggregate<Character>([
        { $sample: { size: count } }
    ]).toArray();

    return randomOutfits;
}
export async function loadCharactersFromApi() {
    const characters: Character[] = await getCharacters();

    if (characters.length == 0) {
        console.log("Database is leeg, characters uit API halen nu...");
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
        const apiResponse: { data: Character[] } = await response.json();

        const outfitsFromApi: Character[] = apiResponse.data.filter(character =>
            character.type.value === "outfit" &&
            ["TBD", null, "NPC", "Agent Jonesy"].includes(character.name) === false &&
            character.images.featured !== null &&
            character.images.icon !== null
        );

        // Invoegen van alle outfits in de database
        await collectionCharacters.insertMany(outfitsFromApi);

        console.log("Outfits zijn toegevoegd aan de database.");
    }

}
//users
export async function getUsers() {
    return await collectionUsers.find({}).toArray();
}
export async function updateUser(id: number, avatarImage: User) {
    return await collectionUsers.updateOne({ $oid: id }, { $set: avatarImage })
}
export async function getUserById(id: number): Promise<User | null> {
    return await collectionUsers.findOne({ $oid: id });
}
//backpacks
export async function getBackpacks() {
    return await collectionBackpacks.find({}).toArray();
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

//pickaxes
export async function getPickaxes() {
    return await collectionPickaxes.find({}).toArray();
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