import { Router } from 'express';
import { Character } from '../types/character';
import { getRandomOutfits, loginUser, updateAvatar, getUserByUsername, addCharacterToFavorite, deleteCharacterFromFavorite, addCharacterToBlacklist, findCharacterById, deleteCharacterFromBlacklist, getRandomBackpack, findFavoriteSkinByUser, updateCharacterScores, getRandomPickaxe, updateBackpackIntoFavorite, deleteBackpackFromFavorite, updatePickaxeIntoFavorite, deletePickaxeFromFavorite, updateCommentIntoFavorite, deleteCommentFromFavorite, updateReasonBlacklist, createUser } from '../../mongoDB';
import dotenv from "dotenv";

dotenv.config();

let fortniteData: Character[] = [];
const router = Router();

router.get("/", (req, res) => {
    const fortnite = fortniteData;
    res.render("landingspagina", { fortnite });
});

router.get("/index", async (req, res) => {
    const sessionUser = req.session.user;
    const randomSkins = await getRandomOutfits(150);
    const profile = await getUserByUsername(sessionUser!.username);
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
        const userAdded = await createUser(name, password);
        if (userAdded) {
            res.redirect('/login');
        } else {
            res.render('registreer', {
                message: 'Gebruikersnaam is al in gebruik.'
            });
        }
    } catch (error) {
        console.error('Er is een fout opgetreden tijdens het registreren:', error);
        res.render('registreer', {
            message: 'Er is een fout opgetreden tijdens het registreren.'
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
        if (loggedIn) {
            req.session.user = { username, password };
            return res.redirect('/index');
        } else {
            return res.render('login', {
                message: 'Foute gebruikersnaam of wachtwoord!',
            });
        }
    } catch (error) {
        console.error('Er is een fout opgetreden tijdens het inloggen:', error);
        return res.render('login', {
            message: 'Er is een fout opgetreden tijdens het inloggen.',
        });
    }
});
router.get("/logout", async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

router.post("/logout", async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

router.get("/characters/:id", async (req, res) => {
    const fortniteId = req.params.id;
    const sessionUser = req.session.user;
    const profile = await getUserByUsername(sessionUser!.username);
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
    const sessionUser = req.session.user;
    
    try {
        if (avatar !== undefined) {
            await updateAvatar(avatar, sessionUser!.username);
        } else if (favorite !== undefined) {
            await addCharacterToFavorite(favorite, sessionUser!.username);
            await deleteCharacterFromBlacklist(favorite, sessionUser!.username);
            res.redirect("/favoritepagina");
        } else if (blacklist !== undefined) {
            await addCharacterToBlacklist(blacklist, reason, sessionUser!.username);
            await deleteCharacterFromFavorite(blacklist, sessionUser!.username);
            res.redirect("/blacklist");
        } else {
            res.redirect(`/characters/${fortniteId}`);
        }
    } catch (error) {
        console.error('Er is een fout opgetreden:', error);
        res.redirect(`/characters/${fortniteId}`);
    }
});



router.get("/favoritepagina", async (req, res) => {
    const sessionUser = req.session.user;
    const profile = await getUserByUsername(sessionUser!.username);
    res.render("favoritepagina", { profile: profile });
});

router.post("/deletefavorite/:id", async (req, res) => {
    const sessionUser = req.session.user;
    const deleteCharacter = req.body.deletefavorite;
    deleteCharacterFromFavorite(deleteCharacter, sessionUser!.username)
    setTimeout(() => {
        res.redirect("/favoritepagina/#characters");
    }, 200);
});


router.get("/detailpagina/:id", async (req, res) => {
    const sessionUser = req.session.user;
    const profile = await getUserByUsername(sessionUser!.username);
    const fortniteId = req.params.id;

    try {
        const featured = await findFavoriteSkinByUser(fortniteId, sessionUser!.username);

        if (!featured) {
            return res.status(404).send("Character niet gevonden");
        }
        const backpack = getRandomBackpack()
        const pickaxe = getRandomPickaxe()
        res.render("detailpagina", { character: featured, profile: profile, backpack: backpack, pickaxe: pickaxe });
    } catch (error) {
        console.error("Er is een fout opgetreden bij het laden van de karaktergegevens:", error);
        res.status(500).send("Er is een interne serverfout opgetreden");
    }
});

router.post("/detailpagina/:id", async (req, res) => {

    const fortniteId = req.params.id;
    const winCount = req.body.winCount;
    const lossCount = req.body.lossCount;
    const sessionUser = req.session.user;
    if (winCount > 0 || lossCount >= 3) {
        if (lossCount > 3 * winCount) {
            addCharacterToBlacklist(fortniteId, "personage trekt op niets", sessionUser!.username);
            deleteCharacterFromFavorite(fortniteId, sessionUser!.username);
            setTimeout(() => {
                res.redirect(`/blacklist/#characters`);
            }, 200);
        }
        else {
            await findFavoriteSkinByUser(fortniteId, sessionUser!.username);
            setTimeout(() => {
                res.redirect(`/detailpagina/${fortniteId}/#characters`);
                updateCharacterScores(fortniteId, winCount, lossCount, sessionUser!.username);
            }, 250);
        }
    }
    else {
        await findFavoriteSkinByUser(fortniteId, sessionUser!.username);
        setTimeout(() => {
            res.redirect(`/detailpagina/${fortniteId}/#characters`);
            updateCharacterScores(fortniteId, winCount, lossCount, sessionUser!.username);
        }, 250);
    }
});

router.post("/backpack/:id/", async (req, res) => {

    const fortniteId = req.params.id;
    const backpack = req.body.backpack
    const sessionUser = req.session.user;

    const randomBackpack = await getRandomBackpack();
    updateBackpackIntoFavorite(fortniteId, randomBackpack, sessionUser!.username);


    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}/#characters`);
    }, 200);
});

router.post("/deletebackpack/:id/", async (req, res) => {

    const fortniteId = req.params.id;
    const deletebackpack = req.body.deletebackpack
    const sessionUser = req.session.user;

    deleteBackpackFromFavorite(fortniteId, sessionUser!.username);

    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}/#characters`);
    }, 200);
});

router.post("/pickaxe/:id/", async (req, res) => {

    const fortniteId = req.params.id;
    const pickaxe = req.body.pickaxe
    const sessionUser = req.session.user;

    const randomPickaxe = await getRandomPickaxe();
    updatePickaxeIntoFavorite(fortniteId, randomPickaxe, sessionUser!.username);

    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}/#characters`);
    }, 200);
});

router.post("/deletepickaxe/:id/", async (req, res) => {

    const fortniteId = req.params.id;
    const deletepickaxe = req.body.deletepickaxe
    const sessionUser = req.session.user;

    deletePickaxeFromFavorite(fortniteId, sessionUser!.username);

    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}/#characters`);
    }, 200);
});

router.post('/comment/:id', async (req, res) => {

    const fortniteId = req.params.id;
    const comment = req.body.comment;
    const sessionUser = req.session.user;

    updateCommentIntoFavorite(fortniteId, comment, sessionUser!.username)

    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}/#characters`);
    }, 200);
});

router.post('/deletecomment/:id', async (req, res) => {

    const fortniteId = req.params.id;
    const sessionUser = req.session.user;

    deleteCommentFromFavorite(fortniteId, sessionUser!.username)

    setTimeout(() => {
        res.redirect(`/detailpagina/${fortniteId}/#characters`);
    }, 200);
});

router.get("/blacklist", async (req, res) => {
    const sessionUser = req.session.user;

    const profile = await getUserByUsername(sessionUser!.username);
    res.render("blacklist", { profile: profile });
});

router.post("/deleteblacklist/:id", async (req, res) => {
    const reason = req.body.reason;
    const deleteCharacter = req.body.deleteblacklist;
    const sessionUser = req.session.user;
    deleteCharacterFromBlacklist(deleteCharacter, sessionUser!.username)
    setTimeout(() => {
        res.redirect("/blacklist/#characters");
    }, 200);
});

router.post("/changereason/:id", async (req, res) => {
    try {
        const fortniteId = req.params.id;
        const reason = req.body.newreason;
        const sessionUser = req.session.user;

        await updateReasonBlacklist(fortniteId, reason, sessionUser!.username);

        setTimeout(() => {
            res.redirect("/blacklist/#characters");
        }, 200);
    } catch (error) {
        console.error('Error while updating reason:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;