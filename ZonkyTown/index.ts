import express from "express";
fetchData()
async function fetchData() {
    try {
        const response = await fetch("https://fortnite-api.com/v2/cosmetics/br");
        
        if (!response.ok) {
            throw new Error("could not fetch resource");
            
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

const app = express();
app.set("port", 3000);
app.set("view engine", "ejs")
app.use(express.static("public"))

app.get("/", async (req, res) => {
    const data = await fetchData();
    res.render("landingspagina", { 
        fortnite : data
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