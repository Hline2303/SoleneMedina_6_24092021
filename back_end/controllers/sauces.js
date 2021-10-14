const Sauce = require("../models/Sauce");
const fs = require("fs");

exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  console.log(sauceObject._id);
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    disLikes: 0,
    usersLiked: [
    ],
    usersDisliked: []
  });

  sauce
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) =>
      res.status(400).json({ message: "L'objet n'a pas été enregistré !" })
    );
};

exports.likeSauce = (req, res, next) => {
  console.log("Likez votre sauce");
};

exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
        likes: 0,
    disLikes: 0,
    usersLiked: [
    ],
    usersDisliked: []
      }
    : { ...req.body };
  Sauce.udpateOne(
    { userId: req.params.id },
    { ...sauceObject, userId: req.params._id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) =>
      res.status(400).json({ message: "L'objet n'a pas été modifié !" })
    );
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ userId: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, 
      // 0, 0, [], [], A rajouter ?
      () => {
        Sauce.deleteOne({ userId: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) =>
            res.status(400).json({ message: "L'objet n'a pas été supprimé !" })
          );
      });
    })
    .catch((error) => res.status(500).json({ message: 'Erreur de suppression !' }));
};

exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ userId: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) =>
      res.status(404).json({ message: "L'objet n'a pas été trouvé !" })
    );
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) =>
      res.status(400).json({ message: "Les objets n'ont pas été trouvés !" })
    );
};
