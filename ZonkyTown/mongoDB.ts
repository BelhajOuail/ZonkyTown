import { Collection, MongoClient } from "mongodb";
import { Character } from "./public/types/character";
import { User } from "./public/types/user";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const uri = process.env.URI || "mongodb+srv://ZonkyTown:123@zonkytown.iqttvfb.mongodb.net/";
const client = new MongoClient(uri);
const saltRounds : number = 10;
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

export async function findCharacterById(characterId: string) {
    try {
        const character = await collectionCharacters.findOne({ id: characterId });
        return character;
    } catch (error) {
        console.error("Er is een fout opgetreden bij het zoeken naar het karakter:", error);
        return null;
    }
}

export async function getRandomOutfits(count: number) {
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

        await collectionCharacters.insertMany(outfitsFromApi);

        console.log("Outfits zijn toegevoegd aan de database.");
    }
}

export async function getUsers() {
    return await collectionUsers.find({}).toArray();
}

export async function getUserByUsername(username : string) {
    return await collectionUsers.findOne({ username: username});//&& password
}

export async function updateUser(id: number, avatarImage: User) {
    return await collectionUsers.updateOne({ $oid: id }, { $set: avatarImage })
}

export async function getUserById(id: number) {
    return await collectionUsers.findOne({ $oid: id });
}

export async function loginUser(username: string, password: string) {
    if (username === "" || password === "") {
        throw new Error("Email and password required");
    }
    let user : User | null = await collectionUsers.findOne<User>({username: username});
    if (user) {
        if (await bcrypt.compare(password, user.password!)) {
            return user;
        } else {
            throw new Error("Password incorrect");
        }
    } else {
        throw new Error("User not found");
    }
}

export async function registerUser(username: string, password: string) {
    const existingUser = await collectionUsers.findOne({ username });

    if (existingUser) {
        throw new Error('Gebruikersnaam is al in gebruik.');
    }
    await collectionUsers.insertOne({ username, password});
}

export async function updateAvatar(imageAvatar: string, username : string) {
    collectionUsers.updateOne({ username: username }, { $set: { profileImage: imageAvatar } })
}

// Favorietengerelateerde bewerkingen

export async function findFavoriteSkinByUser(characterId: string,username : string) {
    const user = await collectionUsers.findOne({ username: username, "favoriteCharacter.id": characterId });

    const favoriteCharacter = (user as any).favoriteCharacter;

    if (favoriteCharacter) {
        const character = favoriteCharacter.find((char: any) => char.id === characterId);
        return character;
    } else {
        return null;
    }
}


export async function addCharacterToFavorite(characterId: string, username : string) {
    try {
        const character = await collectionCharacters.findOne({ id: characterId });

        if (!character) {
            console.error("Karakter niet gevonden");
            return;
        }

        const user = await collectionUsers.findOne({ "favoriteCharacter.id": character.id, username });

        const wins = 0;
        const losses = 0;
        const pickaxe = "/assets/images/mysteryitem.webp";
        const backpack = "/assets/images/mysteryitem.webp";
        const comment = ""; // Standaardwaardes voor favoritecharacter

        if (user) {
            await collectionUsers.updateOne(
                { username: username, "favoriteCharacter.id": character.id },
                { $set: { "favoriteCharacter.$.wins": wins, "favoriteCharacter.$.losses": losses, "favoriteCharacter.$.pickaxe": pickaxe, "favoriteCharacter.$.backpack": backpack, "favoriteCharacter.$.comment": comment } }
            );
        } else {
            await collectionUsers.updateOne(
                { username: username },
                { $addToSet: { favoriteCharacter: { $each: [{ ...character, wins, losses, pickaxe, backpack, comment }] } } }
            );
        }
    } catch (error) {
        console.error("Er is een fout opgetreden bij het toevoegen van het karakter aan favorieten:", error);
    }
}


export async function deleteCharacterFromFavorite(characterId: string, username : string) {
    try {
        await collectionUsers.updateOne(
            { username: username },
            { $pull: { favoriteCharacter: { id: characterId } } }
        );

    } catch (error) {
        console.error("Er is een fout opgetreden bij het verwijderen van het karakter:", error);

    }
}

// Blacklistedgerelateerde  bewerkingen
export async function addCharacterToBlacklist(characterId: string, reason: string, username : string) {
    try {
        const character = await collectionCharacters.findOne({ id: characterId });

        if (character) {
            const user = await collectionUsers.findOne({ username: username, "blacklistCharacter.id": character.id });

            if (user) {
                await collectionUsers.updateOne(
                    { username: username, "blacklistCharacter.id": character.id },
                    { $set: { "blacklistCharacter.$.reason": reason } }
                );
            } else {
                await collectionUsers.updateOne(
                    { username: username }, { $addToSet: { blacklistCharacter: { $each: [{ ...character, reason: reason }] } } }
                );
            }
        } else {
            console.error("Karakter niet gevonden");
        }
    } catch (error) {
        console.error("Er is een fout opgetreden bij het blacklisten van het karakter:", error);
    }
}

export async function deleteCharacterFromBlacklist(characterId: string, username : string) {
    try {
        const character = await collectionCharacters.findOne({ id: characterId });

        await collectionUsers.updateOne(
            { username: username },
            { $pull: { blacklistCharacter: { id: characterId } } }
        );

    } catch (error) {
        console.error("Er is een fout opgetreden bij het verwijderen van de geblackliste karakter:", error);
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

export async function getRandomBackpack() {
    const randomBackpack = await collectionBackpacks.aggregate([
        { $sample: { size: 1 } }
    ]).next();


    if (randomBackpack && randomBackpack.images && randomBackpack.images.icon) {
        return randomBackpack.images.icon;
    } else {
        return '/assets/images/mysteryitem.webp';
    }
}

export async function updateBackpackIntoFavorite(characterId: string, backpackUrl: string, username : string) {

    const character = await collectionCharacters.findOne({ id: characterId });

    if (character) {
        const user = await collectionUsers.findOne({ username: username, "favoriteCharacter.id": character.id });

        if (user) {
            await collectionUsers.updateOne(
                { username: username, "favoriteCharacter.id": character.id },
                { $set: { "favoriteCharacter.$.backpack": backpackUrl } }
            );
        }
    }
}

export async function deleteBackpackFromFavorite(characterId: string, username : string) {

    const character = await collectionCharacters.findOne({ id: characterId });

    if (character) {
        const user = await collectionUsers.findOne({ username: username, "favoriteCharacter.id": character.id });

        if (user) {
            await collectionUsers.updateOne(
                { username: username, "favoriteCharacter.id": character.id },
                { $set: { "favoriteCharacter.$.backpack":  '/assets/images/mysteryitem.webp'} }
            );
        }
    }
}



// Pickaxe-gerelateerde bewerkingen
export async function getRandomPickaxe() {
    const randomPickaxe = await collectionPickaxes.aggregate([
        { $sample: { size: 1 } }
    ]).next();


    if (randomPickaxe && randomPickaxe.images && randomPickaxe.images.icon) {
        return randomPickaxe.images.icon;
    } else {
        return '/assets/images/mysteryitem.webp';
    }
}

export async function updatePickaxeIntoFavorite(characterId: string, pickaxeUrl: string, username : string) {

    const character = await collectionCharacters.findOne({ id: characterId });

    if (character) {
        const user = await collectionUsers.findOne({ username: username, "favoriteCharacter.id": character.id });

        if (user) {
            await collectionUsers.updateOne(
                { username: username, "favoriteCharacter.id": character.id },
                { $set: { "favoriteCharacter.$.pickaxe": pickaxeUrl } }
            );
        }
    }
}

export async function deletePickaxeFromFavorite(characterId: string, username : string) {

    const character = await collectionCharacters.findOne({ id: characterId });

    if (character) {
        const user = await collectionUsers.findOne({ username: username, "favoriteCharacter.id": character.id });

        if (user) {
            await collectionUsers.updateOne(
                { username: username, "favoriteCharacter.id": character.id },
                { $set: { "favoriteCharacter.$.pickaxe":  '/assets/images/mysteryitem.webp'} }
            );
        }
    }
}

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

//Score-gerelateerde bewerkingen

export async function updateCharacterScores(characterId: string, winCount: number, lossCount: number, username : string) {
    try {
        if (winCount !== undefined && lossCount !== undefined) {
            const user = await collectionUsers.findOne({ username: username, "favoriteCharacter.id": characterId });
            console.log(winCount)
            console.log(lossCount)
            if (user) {
                await collectionUsers.updateOne(
                    { username: username, "favoriteCharacter.id": characterId },
                    { $set: { "favoriteCharacter.$.wins": winCount, "favoriteCharacter.$.losses": lossCount } }
                );


            } else {
                console.error("Gebruiker niet gevonden of karakter niet in favorietenlijst");

            }
        } else {
            console.error("winCount of lossCount is leeg.");
        }
    } catch (error) {
        console.error("Er is een fout opgetreden bij het bijwerken van de karaktergegevens:", error);
    }
}

//Comment-gerelateerde bewerkingen

export async function updateCommentIntoFavorite(characterId: string, comment: string, username : string) {

    const character = await collectionCharacters.findOne({ id: characterId });

    if (character) {
        const user = await collectionUsers.findOne({ username: username, "favoriteCharacter.id": character.id });

        if (user) {
            await collectionUsers.updateOne(
                { username: username, "favoriteCharacter.id": character.id },
                { $set: { "favoriteCharacter.$.comment": comment } }
            );
        }
    }
}

export async function deleteCommentFromFavorite(characterId: string, username : string) {

    const character = await collectionCharacters.findOne({ id: characterId });

    if (character) {
        const user = await collectionUsers.findOne({ username: username, "favoriteCharacter.id": character.id });

        if (user) {
            await collectionUsers.updateOne(
                { username: username, "favoriteCharacter.id": character.id },
                { $set: { "favoriteCharacter.$.comment":  ''} }
            );
        }
    }
}

//password hashing
export async function createUser(username :string | undefined, password : string | undefined) {
    const profileImage: string = "/assets/icons/questionpf.png"
    if (username === undefined || password === undefined) {
        throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in environment");
    }
    await collectionUsers.insertOne({
        username: username,
        password: await bcrypt.hash(password, saltRounds)
    });
    collectionUsers.updateOne({ username: username }, { $set: { profileImage: profileImage } })
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
