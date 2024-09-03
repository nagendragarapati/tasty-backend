const Address = require('../models/addressModel')
const Restaurant = require('../models/restaurantModel')
const Food = require("../models/foodModel")

exports.createRestaurantService = async (req, user) => {
    try {
        const address = new Address({
            city: req.address.city,
            country: req.address.country,
            fullName: req.address.fullName,
            postalCode: req.address.postalCode,
            state: req.address.state,
            streetAddress: req.address.streetAddress,
        });

        const savedAddress = await address.save();

        const restaurant = new Restaurant({
            address: savedAddress,
            contactInformation: req.contactInformation,
            cuisineType: req.cuisineType,
            description: req.description,
            images: req.images,
            name: req.name,
            rating:req.rating,
            openingHours: req.openingHours,
            registrationDate: req.registrationDate,
            owner: user,
        })


        const savedRestaurant = await restaurant.save()
        return savedRestaurant;
    } catch (error) {
        throw new Error(`Failed to create restaurant: ${error.message}`);
    }
}

exports.findRestaurantById = async (id) => {
    try {
        const restaurant = await Restaurant.findById(id).populate("foods")
        if (!restaurant) {
            throw new Error(`Restaurant not found with this Id ${id}`)
        }
        return restaurant
    }
    catch (err) {
        throw new Error(`Error finding restaurant: ${err.message}`);

    }

}

exports.findAddressById = async (id) => {
    try {
        const address = await Address.findById(id)
        if (!address) {
            throw new Error(`Address not found with this Id ${id}`)
        }
        return address
    }
    catch (err) {
        throw new Error(`Error finding address: ${err.message}`);

    }

}

exports.createFoodItem = async (req, restaurant) => {

    try {
        const food = new Food({
            foodCategory: req.foodCategory,
            creationDate: new Date(),
            description: req.description,
            images: req.images,
            name: req.name,
            price: req.price,
            isSeasonal: req.isSeasonal,
            isVegetarian: req.isVegetarian,
            restaurant: restaurant._id,
            ingredients: req.ingredients,
        });

        await food.save()
        restaurant.foods.push(food._id)
        await restaurant.save()
        return food
    }
    catch (err) {
        throw new Error(`Failed to create food: ${err.message}`);
    }

}

exports.findFoodById = async (id) => {
    try {
        const food = await Food.findById(id)
        if (!food) {
            throw new Error(`food not found with this Id ${id}`)
        }
        return food
    }
    catch (err) {
        throw new Error(`Error finding food: ${err.message}`);

    }

}