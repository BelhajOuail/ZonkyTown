import { Router } from 'express';
import { Character } from '../types/character';
import { User } from '../types/user';
import { getRandomOutfits, getCharacters, loginUser, registerUser, updateAvatar, getUserByUsername, copyCharacterToUser, deleteCharacterFromUser, findCharacterById } from '../../mongoDB';
import dotenv from "dotenv";

dotenv.config();

let fortniteData: Character[] = [];

let avatars: any[] = []; // Deze array kan aangepast worden, zodat we gebruik maken van api collection.
const router = Router();

// Route voor de startpagina
router.get("/", (req, res) => {
    const fortnite = fortniteData;
    res.render("landingspagina", { fortnite });
});

// Route voor de indexpagina
router.get("/index", async (req, res) => {
    // Het verkrijgen van willekeurige outfits en gebruikersprofiel
    const randomSkins = await getRandomOutfits(50);
    const profile = await getUserByUsername();
    res.render("index", { fortnite: randomSkins, profile: profile });
});

// Route voor de registratiepagina
router.get("/registreer", async (req, res) => {
    res.render("registreer", { fortnite: fortniteData });
});

// Route voor het verwerken van registratieverzoeken
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

// Route voor de inlogpagina
router.get("/login", async (req, res) => {
    const fortnite = fortniteData;
    res.render("login", { fortnite: fortnite });
});

// Route voor het verwerken van inlogverzoeken
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

// Route voor het weergeven van een karakterkaart
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

// Route voor het verwerken van verzoeken om avatar- of favorietkarakterinformatie bij te werken
router.post('/avatar/:id', async (req, res) => {
    const fortniteId = req.params.id;
    const avatar = req.body.avatar;
    const favorite = req.body.favorite;
    const blacklist = req.body.blacklist;
    console.log("1_")

    console.log(avatar)
    if (avatar !== undefined) {
    console.log("2_")

        updateAvatar(avatar);
    console.log("3_")

    } else if (favorite !== undefined) {
    console.log("4_")

        copyCharacterToUser(favorite)
    console.log("5_")

    } else if (blacklist !== undefined) {
        // Handel blacklist-bewerking af indien nodig
    }
    console.log("6_")

    // Herlaad de pagina
    res.redirect(`/characters/${fortniteId}`);
});

// Route voor het weergeven van de favorietenpagina
router.get("/favoritepagina", async (req, res) => {
    const profile = await getUserByUsername();
    res.render("favoritepagina", { profile: profile });
});

// Route voor het verwerken van verzoeken om karakters te verwijderen van de favorietenlijst
router.post("/delete/:id", async (req, res) => {
    const deleteCharacter = req.body.delete;
    deleteCharacterFromUser(deleteCharacter)
    res.redirect("/favoritepagina");
});

// Route voor het weergeven van de detailpagina van een karakter
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

// Route voor het weergeven van de blacklistpagina
router.get("/blacklist", async (req, res) => {
    const randomSkins = await getRandomOutfits(5);
    const profile = await getUserByUsername();
    res.render("blacklist", { fortnite: randomSkins, profile: profile });
});

export default router;
