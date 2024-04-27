import { Router } from 'express';
import { Character } from '../types/character';
import { User } from '../types/user';
import { Collection, MongoClient } from "mongodb";
import { getRandomOutfits,getCharacters, getUserById, updateUser, loadPickaxesFromApi } from '../../mongoDB';
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.URI || "mongodb+srv://ZonkyTown:123@zonkytown.iqttvfb.mongodb.net/";
const client = new MongoClient(uri);
const collection: Collection<Character> = client.db("ZonkyTown").collection<Character>("Characters");

let fortniteData: Character[] = [];

let avatars: any[] = [];// Deze array kan aangepast worden, zodat we gebruik maken van api collection.
const router = Router();

async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

router.get("/index", async (req, res) => {
    const randomSkins = await getRandomOutfits(50);
    res.render("index", { fortnite: randomSkins });
});

router.get("/", (req, res) => {
    const fortnite = fortniteData;
    res.render("landingspagina", { fortnite });
});

router.get("/registreer", async (req, res) => {
    res.render("registreer", { fortnite: fortniteData });
});

router.post('/registreer', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const userCollection = await client.db('ZonkyTown').collection('users');
        const { name, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            res.render('registreer', {
                message: 'Wachtwoorden komen niet overeen.'
            });
            return;
        }

        const user = await userCollection.findOne({ username: name });
        if (user) {
            res.render('registreer', {
                message: 'Gebruikersnaam is al in gebruik.'
            });
            return;
        }
        await userCollection.insertOne({ username: name, password: password });
        res.redirect('/login');

    } catch (e) {
        res.redirect('/registreer');

    } finally {
        await client.close();
    }
});

router.get("/login", async (req, res) => {
    const fortnite = fortniteData;
    res.render("login", { fortnite: fortniteData });
});

router.post('/login', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const userCollection = await client.db('ZonkyTown').collection('users');
        const info = req.body;
        const user = await userCollection.findOne({ username: info.name });
        if (!user || info.name != user.username || info.password != user.password) {
            res.render('login', {
                message: 'Foute gebruikersnaam of wachtwoord!',
            });
            return;
        }

        res.redirect('/index');

    } catch (e) {
        res.redirect('/login');

    } finally {
        await client.close();
    }
});

router.get("/characters/:id", async (req, res) => {
    const fortniteId = req.params.id;
    // const image = req.body.avatar;

    const characters: Character[] = await getCharacters();

    const featured = characters.find((character) => character.id === fortniteId);
    if (!featured) {
        return res.status(404).send("Character niet gevonden");
    }
    res.render("cards", { character: featured });
});

router.post("/characters/:id", async (req, res) => {
    const fortniteId = req.params.id;

    try {

        const characters: Character[] = await getCharacters();
        const avatar = characters.find((character) => character.id === fortniteId);

        if (!avatar) {
            return res.status(404).json({ error: "Character niet gevonden" });
        }

        // Voeg de avatar van het karakter toe aan de array avatars
        if (avatar.images && avatar.images.icon) {
            avatars.push(avatar.images.icon);
            avatars.forEach(avatar => {
                console.log(avatar);
            });
        } else {
            console.error('Kan avatar niet toevoegen: avatar ontbreekt voor het gekozen karakter');
        }

        res.render("cards", { character: avatar, avatarUrl: avatar.images.icon});
    } catch (error) {
        console.error("Er is een fout opgetreden bij het verwerken van het verzoek:", error);
    }
    finally {
        await client.close();
    }
});


router.get("/favoritepagina", async (req, res) => {
    const randomSkins = await getRandomOutfits(5);
    res.render("favoritepagina", { fortnite: randomSkins });
});

router.get("/detailpagina/:id", async (req, res) => {
    const fortniteId = req.params.id;
    const characters: Character[] = await getCharacters();

    const featured = characters.find((character) => character.id === fortniteId);

    if (!featured) {
        return res.status(404).send("Character niet gevonden");
    }
    res.render("detailpagina", { character: featured });
});

router.get("/blacklist", async (req, res) => {
    const randomSkins = await getRandomOutfits(5);
    res.render("blacklist", { fortnite: randomSkins });
});

export default router;