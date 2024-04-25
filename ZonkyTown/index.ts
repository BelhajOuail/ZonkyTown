import express from "express";
import { Collection, MongoClient } from "mongodb"
import { connect} from "./mongoDB"
import { Character } from "./public/types/character";

import dotenv from "dotenv"; 
dotenv.config(); // zorg dat je .evn kan uitlezen

const uri= process.env.URI || "mongodb+srv://ZonkyTown:123@zonkytown.iqttvfb.mongodb.net/";
const bcrypt = require('bcrypt');



const app = express();
app.set("port", 3000);
app.set("view engine", "ejs")
app.use(express.static("public"));

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));


let fortniteData: Character[] = [];


async function fetchData() {
    try {
        const response = await fetch('https://fortnite-api.com/v2/cosmetics/br');
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data: any = await response.json();
        fortniteData = data.data.filter((item: any) => item.type.value === 'outfit');
    } catch (error) {
        console.log(error);
        fortniteData = [];
    }
}
fetchData();

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

app.get("/", (req, res) => {
    const fortnite = fortniteData;
    res.render("landingspagina", { fortnite });
});

app.get("/registreer", async (req, res) => {
    res.render("registreer", { fortnite: fortniteData });
});

app.post('/registreer', async (req, res) => {
    const client = new MongoClient(uri);

    try {
      
        await client.connect();
        const userCollection = await client.db('ZonkyTown').collection('users'); 
        const { name, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            res.render('registreer', {
                message: "Wachtwoorden komen niet overeen"
            });
            return;
        }

        const user = await userCollection.findOne({ username: name });
        if (user) {
            res.render('registreer', {
                message: "Gebruikersnaam al in gebruik"
            });
            return;
        }

        await userCollection.insertOne({ username: name, password: password });
        res.redirect('/login');

    } catch (e) {
        res.redirect('/login');

    } finally {
        await client.close();
    }
});

app.get("/login", async (req, res) => {
    const fortnite = fortniteData;
    res.render("login", { fortnite: fortniteData });
});

app.post('/login', async (req, res) => {
    const client = new MongoClient(uri);
    
    try {
      
        await client.connect();
        const userCollection = await client.db('ZonkyTown').collection('users'); 
        const info = req.body;
        const user = await userCollection.findOne({ username: info.name });
        if (!user || info.name != user.username ||  info.password != user.password ) {
            res.render('login', {
                message: 'Wrong username or password',
              });
            return;
          }
          
        
        res.redirect('/index');

    } catch (e) {

    } finally {
        await client.close();
    }
});

app.post

app.get("/index", (req, res) => {
    const randomSkins = selectRandomSkins(50);
    res.render("index", { fortnite: randomSkins });
});

app.get("/characters/:id", async (req, res) => {
    const fortniteId = req.params.id;
    const featured = fortniteData.find((fortnite: any) => fortnite.id === fortniteId);

    if (!featured) {
        return res.status(404).send("Character not found");
    }
    res.render("cards", { character: featured });
});





app.get("/favoritepagina", async (req, res) => {
    const randomSkins = selectRandomSkins(15);
    res.render("favoritepagina", { fortnite: randomSkins });
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
    const randomSkins = selectRandomSkins(15);
    res.render("blacklist", { fortnite: randomSkins });
});

app.get("/detailpagina", async (req, res) => {
    res.render("detailpagina", { fortnite: fortniteData });
});



app.listen(app.get("port"), async () => {
    connect();
    console.log("server http://localhost:" + app.get("port"));
});
