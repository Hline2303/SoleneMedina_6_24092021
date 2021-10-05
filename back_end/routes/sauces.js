const express = require("express");
const router = express.Router();

const saucesCtrl = require("../controllers/sauces");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// CRUD routes
// Application des fonctions à la route
router.post("/", auth, multer, saucesCtrl.createThing);
// router.post("/:id/like", auth, multer, saucesCtrl.likeThing);
router.put("/:id", auth, multer, saucesCtrl.modifyThing);
router.delete("/:id", auth, saucesCtrl.deleteThing);
router.get("/:id", auth, saucesCtrl.getOneThing);
router.get("/", auth, saucesCtrl.getAllThings);

module.exports = router;
