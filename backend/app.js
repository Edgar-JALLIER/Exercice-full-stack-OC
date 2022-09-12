const express = require("express");
const app = express();

app.use(express.json());

//Permet de gérer la sécurité entre le serveur du back et celui du front => ici on autorise certains accès
app.use((req, res, next) => {
  //d'autoriser l'accès à notre API depuis n'importe quelle origine '*'
  res.setHeader("Access-Control-Allow-Origin", "*");
  //d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  //d'envoyer des requêtes avec les méthodes mentionnées
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});

/** 
//Un middleware est un bloc de code qui traite les requêtes et réponses de votre application.
app.use((req, res, next) => {
  //renvoi une réponse en JSON
  res.json({ message: "requete est bien recu" });
  //next pour passer au prochain élément du middleware
  next();
});
app.use((req, res) => {
  console.log("Réponse envoyée avec succès !");
});
**/

app.post("/api/stuff", (req, res, next) => {
  //on a accès au contenu du corps de la requête grace à "app.use(express.json());"
  console.log(req.body);
  //il faut envoyer une réponse sinon la requête plante côté utilisateur
  res.status(201).json({
    message: "Objet créé !",
  });
});

//argument pour trouver l'URL visé par l'application (endpoint)
app.get("/api/stuff", (req, res, next) => {
  //création de 2 objets + le prix est en centime pour éviter les erreurs
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl: "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl: "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  //renvoi le staut 200 pour dire que c'est réussi et envoi une réponse JSON des objets
  res.status(200).json(stuff);
});

module.exports = app;
