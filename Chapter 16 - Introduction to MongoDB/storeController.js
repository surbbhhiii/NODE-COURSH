const Favourite = require("../models/favourite");
const Home = require("../models/home");

// 🏠 1. Home Page (Index)
exports.getIndex = (req, res, next) => {
  Home.fetchAll()
    .then((homes) => { 
      res.render("store/index", {
        registeredHomes: homes,
        pageTitle: "airbnb Home",
        currentPage: "index",
      });
    })
    .catch(err => {
      console.log("Error fetching index:", err);
      res.render("store/index", { registeredHomes: [], pageTitle: "Error", currentPage: "index" });
    });
};

// 🏠 2. All Homes List
exports.getHomes = (req, res, next) => {
  Home.fetchAll()
    .then((homes) => {
      res.render("store/home-list", {
        registeredHomes: homes,
        pageTitle: "Homes List",
        currentPage: "homes",
      });
    })
    .catch(err => console.log(err));
};

// 🔍 3. Home Details Page
exports.getHomesDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId)
    .then((home) => { 
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

// ⭐ 4. Favourite List (Filter Logic)
exports.getFavouriteList = (req, res, next) => {
  Favourite.getFavourites((favIds) => {
    Home.fetchAll()
      .then((allHomes) => {
    
        const favHomes = allHomes.filter((home) => 
          favIds.includes(home._id.toString()) 
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

// ❤️ 5. Add to Favourite
exports.postAddToFavourite = (req, res, next) => {
  
  const homeId = req.body.homeId || req.body.id; 
  Favourite.addToFavourite(homeId, (error) => {
    if (error) console.log("Error adding to fav:", error);
    res.redirect("/favourites");
  });
};

// 🗑️ 6. Delete Favourite
exports.postDeleteFavourite = (req, res, next) => {
  
  const homeId = req.body.homeId || req.body.id; 
  Favourite.deleteById(homeId, (err) => {
    if (err) console.log("Error deleting fav:", err);
    res.redirect("/favourites");
  });
};

// 📅 7. Get Bookings
exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "bookings",
  });
};