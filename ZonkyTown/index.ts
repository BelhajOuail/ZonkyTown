import express from "express";
import { connect } from "./mongoDB";
import router from "./public/router/fortnite";

const app = express();
app.set("port", 3000);
app.set("view engine", "ejs")
app.use(express.static("public"));

app.use("/", router); 

app.listen(app.get("port"), async () => {
    connect();
    console.log("server http://localhost:" + app.get("port"));
});
