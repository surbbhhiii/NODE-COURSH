const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  rating: { type: Number },
  // FIX: 'photo' ko 'photoUrl' se badal dein
  photoUrl: { type: String }, 
  description: { type: String },
  
  hostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  }
});

// Baaki pre-hook code same rahega...
homeSchema.pre("findOneAndDelete", async function () {
  const homeId = this.getQuery()["_id"];
  try {
    const Favourite = mongoose.model("Favourite");
    await Favourite.deleteMany({ homeId: homeId });
  } catch (err) {
    console.log("Error in Pre-hook:", err);
    throw err; 
  }
});

const Home = mongoose.model("Home", homeSchema);
module.exports = Home;