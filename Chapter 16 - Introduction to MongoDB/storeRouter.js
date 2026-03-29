const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);

// Favourite Page (लिस्ट दिखाना)
storeRouter.get("/favourites", storeController.getFavouriteList);

// Favourite Add करना
storeRouter.post("/favourites", storeController.postAddToFavourite); 

// ✅ Favourite Delete करना (इसे चेक करें)
storeRouter.post("/favourites/delete", storeController.postDeleteFavourite);

storeRouter.get("/homes/:homeId", storeController.getHomesDetails);

module.exports = storeRouter;