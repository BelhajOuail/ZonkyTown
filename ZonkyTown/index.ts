import express from "express";
import router from "./public/router/fortnite";
import { connect } from './mongoDB';

const app = express();

app.set("port", 3001);
app.set("view engine", "ejs")
app.use(express.static("public"));

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/", router); 
app.listen(app.get("port"), async () => {
    connect();
    console.log("server http://localhost:" + app.get("port"));
});
