const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHomes);
storeRouter.get("/bookings", storeController.getBookings);

// 1. Favourite Page dikhane ke liye (GET)
storeRouter.get("/favourites", storeController.getFavouriteList);
storeRouter.post("/favourites", storeController.postAddToFavourite); 

storeRouter.get("/homes/:homeId", storeController.getHomesDetails);

module.exports = storeRouter;