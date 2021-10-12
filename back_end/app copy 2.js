const express = require('express');

const app = express();

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

app.use('/api/sauces', (req, res, next) => {
  const sauce = [
    {
      userId: 'objetId',
      name: 'Mon premier objet',
      manufacturer: 'identifiant1',
      description: 'Les infos de mon premier objet',
      mainPepper: 'Ingrédient principal1',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      heat: 3,
      likes: '4',
      dislikes: '1',
      usersLiked: 'identifiant1',
      usersDisliked: 'identifiant2',
      email: 'identifiant1@gmail.com',
      password: 'identifiant1',
    },
    {
      userId: 'objetId',
      name: 'Mon premier objet',
      manufacturer: 'identifiant2',
      description: 'Les infos de mon deuxième objet',
      mainPepper: 'Ingrédient principal2',
      imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
      heat: 3,
      likes: '4',
      dislikes: '1',
      usersLiked: 'identifiant1',
      usersDisliked: 'identifiant2',
      email: 'identifiant2@gmail.com',
      password: 'identifiant2',
    },
  ];
  res.status(200).json(sauce);
});



module.exports = app;