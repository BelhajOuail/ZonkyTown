import express from "express";
import { Character } from "./public/types/character";

let fortniteData : any;
async function fetchData() {
    try {
        const response = await fetch('https://fortnite-api.com/v2/cosmetics/br');
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        return data.data.filter((item: any) => item.type.value === 'outfit');
    } catch (error) {
        console.log(error);
        return [];
    }
}
function selectRandomSkins(skins: Character[], count: number): Character[] {   
    
    const validSkins = skins.filter(character =>
        character.name !== "TBD" &&
        character.name !== null &&
        character.name !== "NPC" &&
        character.name !== "Agent Jonesy" &&
        character.images.featured !== null &&
        character.images.icon !== null
    );

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

const app = express();
app.set("port", 3000);
app.set("view engine", "ejs")
app.use(express.static("public"));

(async () => {
    fortniteData = await fetchData();
})();

app.get("/", async (req, res) => {
    const fortnite = fortniteData.data;
    res.render("landingspagina", {
        fortnite: fortnite
    });
});
app.get("/index", async (req, res) => {
    const randomSkins = selectRandomSkins(fortniteData, 50000);
    res.render("index", {
        fortnite: randomSkins
    });
});
app.get("/characters/:id", async (req, res) => {
    const fortniteId = req.params.id;
    const featured = fortniteData.find((fortnite: any) => fortnite.id === fortniteId);

    if (!featured) {
        return res.status(404).send("Character not found");
    }
    res.render("cards", { character: featured });
});
app.get("/login", async (req, res) => {
    res.render("login", {
        fortnite: fortniteData
    });
});
app.get("/favoritepagina", async (req, res) => {
    const randomSkins = selectRandomSkins(fortniteData, 15);
    res.render("favoritepagina", {
        fortnite: randomSkins
    });
});
app.get("/detailpagina/:id", async (req, res) => {
    const fortniteId = req.params.id;
    const featured = fortniteData.find((fortnite: any) => fortnite.id === fortniteId);

    if (!featured) {
        return res.status(404).send("Character not found");
    }
    res.render("detailpagina", { character: featured });
});

app.get("/blacklist", async (req, res) => {
    const randomSkins = selectRandomSkins(fortniteData, 15);
    res.render("blacklist", {
        fortnite: randomSkins
    });
});
app.get("/registreer", async (req, res) => {
    res.render("registreer", {
        fortnite: fortniteData
    });
});
app.get("/detailpagina", async (req, res) => {
    res.render("detailpagina", {
        fortnite: fortniteData
    });
});
app.listen(app.get("port"), async () => {
    console.log("server http://localhost:" + app.get("port"));
})