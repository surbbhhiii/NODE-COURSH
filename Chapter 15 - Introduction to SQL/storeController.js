const Favourite = require("../models/favourite");
const Home = require("../models/home");

// 🏠 1. Home Page (Index) - Corrected
exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then(([homes]) => {
      res.render("store/index", {
        registeredHomes: homes,
        pageTitle: "airbnb Home",
        currentPage: "index",
      });
    })
    .catch(err => console.log(err));
};

// 🏠 2. All Homes List - Fixed variable names
exports.getHomes = (req, res, next) => {
  Home.fetchAll()
    .then(([homes]) => {
      res.render("store/home-list", {
        registeredHomes: homes,
        pageTitle: "Homes List",
        currentPage: "homes",
      });
    })
    .catch(err => console.log(err));
};

// 🔍 3. Home Details Page - Fixed Callback to Promise
exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId)
    .then(([rows]) => {
      const home = rows[0]; // Database array return karta hai
      if (!home) {
        return res.redirect("/homes");
      }
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Detail",
        currentPage: "homes",
      });
    })
    .catch(err => console.log(err));
};

// ⭐ 4. Favourite List - Fixed fetchAll usage
exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favIds) => {
    Home.fetchAll()
      .then(([allHomes]) => {
        // favIds string bhi ho sakti hai, isliye toString() safety ke liye
        const favHomes = allHomes.filter((home) => 
          favIds.includes(home.id.toString())
        );
        res.render("store/favourite-list", {
          favouriteList: favHomes,
          pageTitle: "My Favourites",
          currentPage: "favourites",
        });
      })
      .catch(err => console.log(err));
  });
};

// Rest of the functions (Favourites and Bookings) remain same if they use callbacks
exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;
  Favourite.addToFavourite(homeId, (error) => {
    if (error) console.log("Error:", error);
    res.redirect("/favourites");
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};

exports.postDeleteFavourite = (req, res, next) => {
  const homeId = req.body.id; 
  Favourite.deleteById(homeId, (err) => {
    if (err) console.log("Error:", err);
    res.redirect("/favourites");
  });
};