import { Router } from 'express';
import { Character } from '../types/character';
import { Collection, MongoClient } from "mongodb";
import { connect, getCharacters, loadCharactersFromApi } from '../../mongoDB';
import dotenv from "dotenv";

dotenv.config(); // zorg dat je .evn kan uitlezen

const uri = process.env.URI || "mongodb+srv://ZonkyTown:123@zonkytown.iqttvfb.mongodb.net/";
const client = new MongoClient(uri);
const collection: Collection<Character> = client.db("ZonkyTown").collection<Character>("Fortnite");

let fortniteData: Character[] = [];


async function exit() {
    try {
        await client.close();
        console.log("Disconnected from database");
    } catch (error) {
        console.error(error);
    }
    process.exit(0);
}

async function selectRandomSkins(count: number): Promise<Character[]> {

    const characters: Character[] = await getCharacters();

    const validSkins = characters.filter(character =>
        character.name !== "TBD" &&
        character.name !== null &&
        character.name !== "NPC" &&
        character.name !== "Agent Jonesy" &&
        character.images.featured !== null &&
        character.images.icon !== null);

    const selectedSkins: Character[] = [];
    const totalSkins = validSkins.length;
    const maxCount = Math.min(totalSkins, count);

    for (let i = 0; i < maxCount; i++) {
        const randomIndex = Math.floor(Math.random() * validSkins.length);
        selectedSkins.push(validSkins[randomIndex]);
        validSkins.splice(randomIndex, 1);
    }
    return selectedSkins;
}



const router = Router();
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


router.get("/index", async (req, res) => {
    const randomSkins = await selectRandomSkins(50);
    res.render("index", { fortnite: randomSkins });
});

router.get("/characters/:id", async (req, res) => {
    const fortniteId = req.params.id;
    const characters: Character[] = await getCharacters();

    const featured = characters.find((character) => character.id === fortniteId);

    if (!featured) {
        return res.status(404).send("Character niet gevonden");
    }
    res.render("cards", { character: featured });
});

router.get("/favoritepagina", async (req, res) => {
    const randomSkins = await selectRandomSkins(5);
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
    const randomSkins = await selectRandomSkins(5);
    res.render("blacklist", { fortnite: randomSkins });
});

// router.get("/detailpagina", async (req, res) => {
//     res.render("detailpagina", { fortnite: fortniteData });
// });

export default router;