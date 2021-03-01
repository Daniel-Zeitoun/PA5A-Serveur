import * as express from "express";
const app = express();
app.get("/", (req, res) => {
    res.send("Bienvenue sur le Botnet-PA5A")
})
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
     console.log(`Le serveur est en ecoute sur http://localhost:${PORT}`)
})
