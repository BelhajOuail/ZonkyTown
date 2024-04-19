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
function selectRandomSkins(skins: any[], count: number): any[] {
    const selectedSkins: any[] = [];
    const totalSkins = skins.length;
    const maxCount = Math.min(totalSkins, count);
    for (let i = 0; i < maxCount; i++) {
        const randomIndex = Math.floor(Math.random() * skins.length);
        selectedSkins.push(skins[randomIndex]);
        skins.splice(randomIndex, 1);
    }
    return selectedSkins;
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
    const randomSkins = selectRandomSkins(data, 50);
    res.render("index", { 
        fortnite : randomSkins
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
    const randomSkins = selectRandomSkins(data, 50);
    res.render("favoritepagina", { 
        fortnite : randomSkins
    }); 
});
app.get("/detailpagina/:id", async (req, res) => {
    const data = await fetchData();
    const fortniteId = req.params.id;
    const featured = data.find((fortnite:any) => fortnite.id === fortniteId);
    
    if (!featured) {
        return res.status(404).send("Character not found");
    }
    res.render("detailpagina", { character: featured });
});

app.get("/blacklist", async (req, res) => {
    const data = await fetchData();
    const randomSkins = selectRandomSkins(data, 15);
    res.render("blacklist", { 
        fortnite : randomSkins
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