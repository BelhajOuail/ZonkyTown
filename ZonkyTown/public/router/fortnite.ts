import { Router } from 'express';
import fetch from 'node-fetch';
import { Character } from '../types/character';

let fortniteData: Character[] = [];

async function fetchData() {
    try {
        const response = await fetch('https://fortnite-api.com/v2/cosmetics/br');
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data:any = await response.json();
        fortniteData = data.data.filter((item: any) => item.type.value === 'outfit');
    } catch (error) {
        console.log(error);
        fortniteData = [];
    }
}

fetchData();

const router = Router();

function selectRandomSkins(count: number): Character[] {
    const validSkins = fortniteData.filter(character =>
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

router.get("/", (req, res) => {
    const fortnite = fortniteData;
    res.render("landingspagina", { fortnite });
});

router.get("/index", (req, res) => {
    const randomSkins = selectRandomSkins(50);
    res.render("index", { fortnite: randomSkins });
});

// Andere router handlers hier...
router.get("/characters/:id", async (req, res) => {
    const fortniteId = req.params.id;
    const featured = fortniteData.find((fortnite: any) => fortnite.id === fortniteId);

    if (!featured) {
        return res.status(404).send("Character not found");
    }
    res.render("cards", { character: featured });
});

router.get("/login", async (req, res) => {
    const fortnite = fortniteData;
    res.render("login", { fortnite: fortniteData });
});

router.get("/favoritepagina", async (req, res) => {
    const randomSkins = selectRandomSkins(15);
    res.render("favoritepagina", { fortnite: randomSkins });
});

router.get("/detailpagina/:id", async (req, res) => {
    const fortniteId = req.params.id;
    const featured = fortniteData.find((fortnite: any) => fortnite.id === fortniteId);

    if (!featured) {
        return res.status(404).send("Character not found");
    }
    res.render("detailpagina", { character: featured });
});

router.get("/blacklist", async (req, res) => {
    const randomSkins = selectRandomSkins(15);
    res.render("blacklist", { fortnite: randomSkins });
});

router.get("/registreer", async (req, res) => {
    res.render("registreer", { fortnite: fortniteData });
});

router.get("/detailpagina", async (req, res) => {
    res.render("detailpagina", { fortnite: fortniteData });
});

export default router;