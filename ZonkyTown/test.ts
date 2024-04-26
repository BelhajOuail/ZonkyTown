import { } from '/workspaces/ZonkyTown/ZonkyTown/mongoDB';
import express from "express";
import { connect} from "./mongoDB";

const app = express();
app.set("port", 3001);
app.set("view engine", "ejs")
app.use(express.static("public"));

app.get("/", async (req, res) => {

    res.render("index"); 
});

app.listen(app.get("port"), async () => {
    await connect();
    console.log("server http://localhost:" + app.get("port"));
});
