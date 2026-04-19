const express = require("express");
const router = express.Router();
const hostController = require("../controllers/hostController");
const multer = require("multer");
const path = require("path"); // 1. Path module zaroori hai

// 🔥 MULTER CONFIG
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 2. path.join use karein taaki folders sahi se milein
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ✅ ROUTES
router.get("/add-home", hostController.getAddHome);

// photo (name attribute) aur photoUrl (database field) ka dhyan rakhein
router.post(
  "/add-home",
  upload.single("photo"), // HTML form mein name="photo" hona chahiye
  hostController.postAddHome
);

router.get("/host-home-list", hostController.getHostHomes);

router.get("/edit-home/:homeId", hostController.getEditHome);

router.post(
  "/edit-home",
  upload.single("photo"),
  hostController.postEditHome
);

router.post("/delete-home/:homeId", hostController.postDeleteHome);

module.exports = router;