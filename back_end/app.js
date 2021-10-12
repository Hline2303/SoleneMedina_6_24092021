const express = require("express");
const app = express();
const path = require("path");
require("./models/dbConfig");
const mongoose = require("mongoose");

const Thing = require('./models/Thing');

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,  
  { useNewUrlParser: true, 
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !')
);


const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.post("/api/sauces", (req, res, next) => {
  delete req.body.userId
  const thing = new Thing({
...req.body
  });
  thing.save()
  .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
  .catch(error => res.status(400).json({ error }));
});

app.use("/api/sauces", (req, res, next) => {
  const sauce = [
    {
      userId: "objetId",
      name: "Mon premier objet",
      manufacturer: "identifiant1",
      description: "Les infos de mon premier objet",
      mainPepper: "Ingrédient principal1",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      heat: 3,
      likes: "4",
      dislikes: "1",
      usersLiked: "identifiant1",
      usersDisliked: "identifiant2",
      email: "identifiant1@gmail.com",
      password: "identifiant1",
    },
    {
      userId: "objetId",
      name: "Mon premier objet",
      manufacturer: "identifiant2",
      description: "Les infos de mon deuxième objet",
      mainPepper: "Ingrédient principal2",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      heat: 3,
      likes: "4",
      dislikes: "1",
      usersLiked: "identifiant1",
      usersDisliked: "identifiant2",
      email: "identifiant2@gmail.com",
      password: "identifiant2",
    },
  ];
  res.status(200).json(sauce);
});

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
