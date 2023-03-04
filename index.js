require('dotenv').config();
const { Probot } = require('probot');
const fetch = require('node-fetch');

const probot = new Probot({
  appId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY,
});

probot.on('repository.created', async (context) => {
    const repository = context.payload.repository;
    const repoFullName = repository.full_name;
    console.log(repoFullName);

  // Variables d'authentification
  const username = 'Vandal-William';
  const token = process.env.TOKEN_GITHUB;

  // Endpoint de l'API GitHub
  const api_url = 'https://api.github.com/';

  // Informations sur le nouveau répertoire
  const repo_owner = 'Hetic-Test';
  const repo_name = repoFullName;

  // Données du webhook
  const webhook_url = `http://localhost:3100/webhooks/rename.py`;
  const webhook_content_type = 'json';
  const webhook_events = ['push'];

  // Créer l'en-tête d'authentification pour les requêtes
  const headers = {
    Authorization: `Token ${token}`,
    Accept: 'application/vnd.github.v3+json',
  };

  // Récupérer l'ID du répertoire
  const url_repo = `${api_url}repos/${repo_owner}/${repo_name}`;
  fetch(url_repo, { headers })
    .then((response) => response.json())
    .then((data) => {
      const repo_id = data.id;

      // Créer le webhook pour le nouveau répertoire
      const url_webhook = `${api_url}repos/${repo_owner}/${repo_name}/hooks`;
      const data_webhook = {
        name: 'rename',
        active: true,
        events: webhook_events,
        config: {
          url: webhook_url,
          content_type: webhook_content_type,
        },
      };
      fetch(url_webhook, { method: 'POST', headers, body: JSON.stringify(data_webhook) })
        .then((response) => {
          if (response.status == 201) {
            console.log('Webhook créé avec succès.');
          } else {
            console.log('Erreur lors de la création du webhook :', response.status);
          }
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
});

module.exports = probot.load(app);