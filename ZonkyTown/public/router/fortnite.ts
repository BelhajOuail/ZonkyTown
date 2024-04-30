import { Router } from 'express';
import { Character } from '../types/character';
import { User } from '../types/user';
import { getRandomOutfits, loginUser, registerUser, updateAvatar, getUserByUsername, addCharacterToFavorite, deleteCharacterFromFavorite, addCharacterToBlacklist, findCharacterById, deleteCharacterFromBlacklist } from '../../mongoDB';
import dotenv from "dotenv";

dotenv.config();

let fortniteData: Character[] = [];
const router = Router();


router.get("/", (req, res) => {
    const fortnite = fortniteData;
    res.render("landingspagina", { fortnite });
});

router.get("/index", async (req, res) => {
    const randomSkins = await getRandomOutfits(50);
    const profile = await getUserByUsername();
    res.render("index", { fortnite: randomSkins, profile: profile });
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
    res.render("login", { fortnite: fortnite });
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
    const profile = await getUserByUsername();
    try {
        const featured = await findCharacterById(fortniteId);

        if (!featured) {
            return res.status(404).send("Character niet gevonden");
        }
        res.render("cards", { character: featured, profile: profile });

    } catch (error) {
        console.error("Er is een fout opgetreden bij het laden van de karaktergegevens:", error);
        res.status(500).send("Er is een interne serverfout opgetreden");
    }
});


router.post('/avatar/:id', async (req, res) => {
    const fortniteId = req.params.id;
    const avatar = req.body.avatar;
    const favorite = req.body.favorite;
    const blacklist = req.body.blacklist;
    const reason = req.body.reason;

    console.log(avatar)
    if (avatar !== undefined) {
        updateAvatar(avatar);
    } 
    else if (favorite !== undefined) {
        addCharacterToFavorite(favorite)
        deleteCharacterFromBlacklist(favorite) // als die in blacklist zat wordt die er uit gehaald, anders heb je dezelfde skin in favoriet en blacklist

    } else if (blacklist !== undefined) {
        addCharacterToBlacklist(blacklist, reason)
        deleteCharacterFromFavorite(blacklist) // als die in blacklist zat wordt die er uit gehaald, anders heb je dezelfde skin in favoriet en blacklist
    }

    res.redirect(`/characters/${fortniteId}`);
});


router.get("/favoritepagina", async (req, res) => {
    const profile = await getUserByUsername();
    res.render("favoritepagina", { profile: profile });
});


router.post("/deletefavorite/:id", async (req, res) => {
    const deleteCharacter = req.body.deletefavorite;
    deleteCharacterFromFavorite(deleteCharacter)
    res.redirect("/favoritepagina");
});


router.get("/detailpagina/:id", async (req, res) => {
    const profile = await getUserByUsername();
    const fortniteId = req.params.id;

    try {
        const featured = await findCharacterById(fortniteId);

        if (!featured) {
            return res.status(404).send("Character niet gevonden");
        }

        res.render("detailpagina", { character: featured, profile: profile });
    } catch (error) {
        console.error("Er is een fout opgetreden bij het laden van de karaktergegevens:", error);
        res.status(500).send("Er is een interne serverfout opgetreden");
    }
});


router.get("/blacklist", async (req, res) => {
    const profile = await getUserByUsername();
    res.render("blacklist", { profile: profile });
});

router.post("/deleteblacklist/:id", async (req, res) => {
    const reason = req.body.reason;
    const deleteCharacter = req.body.deleteblacklist;
    deleteCharacterFromBlacklist(deleteCharacter)
    res.redirect("/blacklist");
});

export default router;
