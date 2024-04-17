import express from "express";

async function fetchData() {
    try {
        const response = await fetch('https://fortnite-api.com/v2/cosmetics/br');
        if (!response.ok) {
            throw new Error("Could not fetch resource");
        }
        const data = await response.json();
        return data.data.filter((item:any) => item.type.value === 'outfit');
    } catch (error) {
        console.log(error);
        return [];
    }
}

const app = express();
app.set("port", 3000);
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", async (req, res) => {
    const data = await fetchData();
    const fortnite = data.data;
    res.render("landingspagina", { 
        fortnite : fortnite
    }); 
});
app.get("/index", async (req, res) => {
    const data = await fetchData();
    res.render("index", { 
        fortnite : data
    }); 
});
app.get("/login", async (req, res) => {
    const data = await fetchData();
    res.render("login", { 
        fortnite : data
    }); 
});
app.get("/favoritepagina", async (req, res) => {
    const data = await fetchData();
    res.render("favoritepagina", { 
        fortnite : data
    }); 
});
app.get("/characters/:id", async (req, res) => {
    const data = await fetchData();
    const fortniteId = req.params.id;
    const characters = data.filter((character:any) => character.id === fortniteId);
    if (!characters) {
        return res.status(404).send("Character not found");
    }
        res.render("cards", { fortnite: characters });
});
app.get("/blacklist", async (req, res) => {
    const data = await fetchData();
    res.render("blacklist", { 
        fortnite : data
    }); 
});
app.get("/registreer", async (req, res) => {
    const data = await fetchData();
    res.render("registreer", { 
        fortnite : data
    }); 
});
app.get("/detailpagina", async (req, res) => {
    const data = await fetchData();
    res.render("detailpagina", { 
        fortnite : data
    }); 
});
app.listen(app.get("port"), async()=>{
    console.log("server http://localhost:" + app.get("port"))
})