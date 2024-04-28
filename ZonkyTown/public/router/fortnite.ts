import { Router } from 'express';
import { Character } from '../types/character';
import { User } from '../types/user';
import { Collection, MongoClient } from "mongodb";
import { getRandomOutfits,getCharacters, loginUser, registerUser, updateAvatar,getUserByUsername } from '../../mongoDB';
import dotenv from "dotenv";

dotenv.config();



let fortniteData: Character[] = [];

let avatars: any[] = [];// Deze array kan aangepast worden, zodat we gebruik maken van api collection.
const router = Router();

router.get("/", (req, res) => {
    const fortnite = fortniteData;
    res.render("landingspagina", { fortnite });
});

router.get("/index", async (req, res) => {
    const randomSkins = await getRandomOutfits(50);
    const profile = await getUserByUsername();
    res.render("index", { fortnite: randomSkins, profile:profile });
});

router.get("/registreer", async (req, res) => {
    res.render("registreer", { fortnite: fortniteData });
});

router.post('/registreer', async (req, res) => {
    const { name, password, confirmPassword } = req.body;
    
    try {
        if (password !== confirmPassword) {
            return res.render('registreer', {
                message: 'Wachtwoorden komen niet overeen.'
            });
        }

        await registerUser(name, password);
        res.redirect('/login');
    } catch (error) {
        console.error('Er is een fout opgetreden tijdens het registreren:', error);
        res.render('registreer', {
            message: 'Gebruikersnaam is al in gebruik.'
        });
    }
});

router.get("/login", async (req, res) => {
    const fortnite = fortniteData;
    
    res.render("login", { fortnite: fortnite});
});
router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const loggedIn = await loginUser(name, password);
        if (!loggedIn) {
            return res.render('login', {
                message: 'Foute gebruikersnaam of wachtwoord!',
            });
        }
        return res.redirect('/index');
    } catch (error) {
        console.error('Er is een fout opgetreden tijdens het inloggen:', error);
        return res.redirect('/login');
    }
});

router.get("/characters/:id", async (req, res) => {
    const fortniteId = req.params.id;
    // const image = req.body.avatar;
    const profile = await getUserByUsername();

    const characters: Character[] = await getCharacters();

    const featured = characters.find((character) => character.id === fortniteId);
    if (!featured) {
        return res.status(404).send("Character niet gevonden");
    }
    res.render("cards", { character: featured, profile:profile });
});

router.post('/characters/:id', async (req, res) => {
    const favorite = req.body.favorite;
    const blacklist = req.body.blacklist;
    const avatar = req.body.avatar;
    updateAvatar(avatar);
 
});

router.get("/favoritepagina", async (req, res) => {
    const randomSkins = await getRandomOutfits(5);
    const profile = await getUserByUsername();
    res.render("favoritepagina", { fortnite: randomSkins, profile:profile });
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
    const profile = await getUserByUsername();
    res.render("blacklist", { fortnite: randomSkins, profile:profile});
});

export default router;