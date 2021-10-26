const express = require("express");
const app = express();
const path = require("path");
require("./models/dbConfig");
const mongoose = require("mongoose");

const Sauce = require("./models/Sauce");

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const sauceRoutes = require("./routes/sauces");
const userRoutes = require("./routes/user");

// CORS
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
  next(); // Pb error 500
});

app.use(express.json());

// Serialization
app.post("/api/sauces", (req, res, next) => {
  delete req.body.id; // Pb error 500
  console.log(req);
  const sauce = new Sauce({
    ...req.body,
  });
  console.log(req.body.id);
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) =>
      res.status(400).json({ message: "Objet non enregistré !" })
    );
});

// app.use("/api/sauces", (req, res, next) => {
//   const sauce = [
//     {
//       userId: "coucou",
//       name: "Huile",
//       manufacturer: "coucou",
//       description: "Huile",
//       mainPepper: "Huile",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       heat: 3,
//       likes: 1,
//       dislikes: 2,
//       usersLiked: [""],
//       usersDisliked: [""],
//     },
//     {
//       userId: "objetId",
//       name: "Mon premier objet",
//       manufacturer: "identifiant2",
//       description: "Les infos de mon deuxième objet",
//       mainPepper: "Ingrédient principal2",
//       imageUrl:
//         "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
//       heat: 3,
//       likes: 4,
//       dislikes: 1,
//       usersLiked: ["identifiant1"],
//       usersDisliked: ["identifiant2"],

//     },
//   ];
//   res.status(200).json(sauce);
// });

// app.use(express.json());

// Static image
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
