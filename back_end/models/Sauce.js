const mongoose = require("mongoose");

const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: Array, default: [] },
  usersDisliked: { type: Array, default: [] },

  // likes: { type: Number, required: true },
  // dislikes: { type: Number, required: true },
  // usersLiked: { type: ["String <userId>"], required: true },
  // usersDisliked: { type: ["String <userId>"], required: true },
  // email: { type: String, required: true },
  // password: { type: String, required: true },
});
console.log(sauceSchema);

module.exports = mongoose.model("Sauce", sauceSchema);
