import { Router } from 'express';
import { Character } from '../types/character';
import { User } from '../types/user';
import { getRandomOutfits, loginUser, registerUser, updateAvatar, getUserByUsername, addCharacterToFavorite, deleteCharacterFromFavorite, addCharacterToBlacklist, findCharacterById, deleteCharacterFromBlacklist, getRandomBackpack, findFavoriteSkinByUser, updateCharacterScores,getRandomPickaxe, updateBackpackIntoFavorite, deleteBackpackFromFavorite,  updatePickaxeIntoFavorite, deletePickaxeFromFavorite, updateCommentIntoFavorite, deleteCommentFromFavorite } from '../../mongoDB';
import dotenv from "dotenv";
import { render } from 'ejs';
import { userInfo } from 'os';
import session from 'express-session';

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
    const { username, password } = req.body;
    try {
        const loggedIn = await loginUser(username, password);
        req.session.user = {username, password};
            
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
    setTimeout(() => {
        res.redirect("/favoritepagina");
    }, 200); 
});


router.get("/detailpagina/:id", async (req, res) => {
    const profile = await getUserByUsername();
    const fortniteId = req.params.id;

    try {
        const featured = await findFavoriteSkinByUser(fortniteId);

        if (!featured) {
            return res.status(404).send("Character niet gevonden");
        }
        const backpack = getRandomBackpack()
        const pickaxe = getRandomPickaxe()
        res.render("detailpagina", { character: featured, profile: profile, backpack:backpack, pickaxe:pickaxe});
    } catch (error) {
        console.error("Er is een fout opgetreden bij het laden van de karaktergegevens:", error);
        res.status(500).send("Er is een interne serverfout opgetreden");
    }
});

router.post("/detailpagina/:id", async (req, res) => {

    const fortniteId = req.params.id;
    const winCount = req.body.winCount;
    const lossCount = req.body.lossCount;

    if (winCount > 0 || lossCount >= 3) {
        if (lossCount > 3 * winCount ) {
            addCharacterToBlacklist(fortniteId, "personage trekt op niets");
            deleteCharacterFromFavorite(fortniteId);
            setTimeout(() => {
                res.redirect(`/blacklist`);
            }, 200); 
        }
        else{
            await findFavoriteSkinByUser(fortniteId);
            setTimeout(() => {
                res.redirect(`/detailpagina/${fortniteId}`);
                updateCharacterScores(fortniteId, winCount, lossCount);
            }, 250); 
        }
    }
    else{
        await findFavoriteSkinByUser(fortniteId);
        setTimeout(() => {
            res.redirect(`/detailpagina/${fortniteId}`);
            updateCharacterScores(fortniteId, winCount, lossCount);
        }, 250); 
    }
});

router.post("/backpack/:id/", async (req, res) => {

    const fortniteId = req.params.id;
    const backpack = req.body.backpack

    const randomBackpack = await getRandomBackpack();
    updateBackpackIntoFavorite(fortniteId, randomBackpack);
    

    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}`);
    }, 200); 
});

router.post("/deletebackpack/:id/", async (req, res) => {

    const fortniteId = req.params.id;
    const deletebackpack = req.body.deletebackpack
   
    deleteBackpackFromFavorite(fortniteId);

    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}`);
    }, 200); 
});

router.post("/pickaxe/:id/", async (req, res) => {

    const fortniteId = req.params.id;
    const pickaxe = req.body.pickaxe

    const randomPickaxe = await getRandomPickaxe();
    updatePickaxeIntoFavorite(fortniteId, randomPickaxe);
    
    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}`);
    }, 200); 
});


router.post("/deletepickaxe/:id/", async (req, res) => {

    const fortniteId = req.params.id;
    const deletepickaxe = req.body.deletepickaxe
   
    deletePickaxeFromFavorite(fortniteId);

    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}`);
    }, 200); 
});


router.post('/comment/:id', async(req, res) => {

    const fortniteId = req.params.id;
    const comment = req.body.comment;

    updateCommentIntoFavorite(fortniteId, comment)

    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}`);
    }, 200); 
});

router.post('/deletecomment/:id', async(req, res) => {

    const fortniteId = req.params.id;
    
    deleteCommentFromFavorite(fortniteId)

    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}`);
    }, 200); 
});

router.get("/blacklist", async (req, res) => {
    const profile = await getUserByUsername();
    res.render("blacklist", { profile: profile });
});

router.post("/deleteblacklist/:id", async (req, res) => {
    const reason = req.body.reason;
    const deleteCharacter = req.body.deleteblacklist;
    deleteCharacterFromBlacklist(deleteCharacter)
    setTimeout(() => {
        res.redirect("/blacklist");
    }, 200); 
});

export default router;
