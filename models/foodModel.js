const mongoose = require('mongoose');

// Define the Food schema
const FoodSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  foodCategory: String,
  images: [String],
  available: Boolean,
  quantity:Number,
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
  },
  isVegetarian: Boolean,
  isSeasonal: Boolean,
  ingredients: [String],
  creationDate: {
    type: Date,
    default: Date.now,
  },
});

// Define and export the Food model
const Food = mongoose.model('Food', FoodSchema);
module.exports = Food;
