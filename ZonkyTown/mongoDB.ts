import { Collection, MongoClient } from "mongodb";
import { Character } from "./public/types/character";
import { User } from "./public/types/user";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.URI || "mongodb+srv://ZonkyTown:123@zonkytown.iqttvfb.mongodb.net/";
const client = new MongoClient(uri);
// Collections
const collectionCharacters: Collection<Character> = client.db("ZonkyTown").collection<Character>("Characters");
const collectionBackpacks: Collection<Character> = client.db("ZonkyTown").collection<Character>("Backpacks");
const collectionPickaxes: Collection<Character> = client.db("ZonkyTown").collection<Character>("Pickaxe");
export const collectionUsers: Collection<User> = client.db("ZonkyTown").collection<User>("users");

// Functie om de MongoDB-verbinding te sluiten
async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

// Karaktergerelateerde bewerkingen
export async function getCharacters() {
    return await collectionCharacters.find({}).toArray();
}

export async function findCharacterById(characterId: string): Promise<Character | null> {
    try {
        const character = await collectionCharacters.findOne({ id: characterId });
        return character;
    } catch (error) {
        console.error("Er is een fout opgetreden bij het zoeken naar het karakter:", error);
        return null;
    }
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

// Gebruikersgerelateerde bewerkingen
export async function getUsers() {
    return await collectionUsers.find({}).toArray();
}

export async function getUserByUsername(){
    return await collectionUsers.findOne({ username:"miaw" });
}

export async function updateUser(id: number, avatarImage: User) {
    return await collectionUsers.updateOne({ $oid: id }, { $set: avatarImage })
}

export async function getUserById(id: number): Promise<User | null> {
    return await collectionUsers.findOne({ $oid: id });
}

export async function loginUser(username: string, password: string) {
    const user = await collectionUsers.findOne({username:username});
    return user !== null && username === user.username && password === user.password;
}

export async function registerUser(username: string, password: string) {
    const existingUser = await collectionUsers.findOne({ username });

    if (existingUser) {
        throw new Error('Gebruikersnaam is al in gebruik.');
    }
    const profileImage : string = "/assets/icons/questionpf.png"
    await collectionUsers.insertOne({ username, password, profileImage});
}

export async function updateAvatar(imageAvatar: string) {
    collectionUsers.updateOne({username: "miaw"}, {$set: {profileImage: imageAvatar}})
}

// Favorietengerelateerde bewerkingen
export async function copyCharacterToUser(characterId: string) {
    try {
        // Zoek het karakterobject op basis van de opgegeven id in collectionCharacters
        const character = await collectionCharacters.findOne({ id: characterId });

        // Controleer of het karakterobject is gevonden
        if (!character) {
            console.error("Karakter niet gevonden");
            return; // Stop hier als het karakter niet is gevonden
        }

        // Voeg het gevonden karakterobject toe aan de gebruiker in collectionUsers
        await collectionUsers.updateOne(
            { username: "miaw" }, 
            { $addToSet: { favoriteCharacter: character } }
        );

        console.log("Karakter succesvol gekopieerd naar de gebruiker!");
    } catch (error) {
        console.error("Er is een fout opgetreden bij het kopiëren van het karakter naar de gebruiker:", error);
        // Handel de fout af
    }
}

export async function deleteCharacterFromUser(characterId: string) {
    try {
        // Zoek de gebruiker op basis van de opgegeven gebruikersnaam
        await collectionUsers.updateOne(
            { username: "miaw" },
            { $pull: { favoriteCharacter: { id: characterId } } }
        );

        console.log("Karakter succesvol verwijderd van de gebruiker!");
    } catch (error) {
        console.error("Er is een fout opgetreden bij het verwijderen van het karakter van de gebruiker:", error);
        // Handel de fout af
    }
}

// Backpack-gerelateerde bewerkingen
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

// Pickaxe-gerelateerde bewerkingen
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

// Verbinding maken met de database
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
