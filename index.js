require('dotenv').config();
const express = require('express');
const { Probot } = require('probot');

const app = express();
const port = 3100

// Initialisation de l'app probot
const probot = new Probot({appId: process.env.APP_ID, privateKey: process.env.PRIVATE_KEY});

// Middleware pour intercepter les requêtes GitHub
app.use('/', (req, res, next) => {
    // vérification de la signature HMAC (est ce que la requête vient de GitHub)
    res.json("J'attends la création d'un nouveau repertoire github...")
    if (probot.webhooks.verify(req, res, next)){
        // si la requête est valide, elle est passé a l'app probot
        probot.webhooks.receive(req, res, next);
    }else {
        res.status(400).send('Invalid request');
    }
});

// mise en place d'un ecouteur d'évènement qui écoute la création d'un répertoire GitHub

probot.on('repository.created', async (context) => {
    const repository = context.payload.repository;
    const repoFullName = repository.full_name;

    // code qui ajoute le webhook au dépôt Github 
})

app.listen(port, () => console.log(`http://localhost:${port}`));