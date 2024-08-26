const Restaurant = require('../models/restaurantModel')
const restaurantUtils = require("../utils/restaurantUtils")
const Food = require("../models/foodModel")
const Address = require('../models/addressModel')



exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate("address");
        res.status(200).json({
            data: restaurants
        })
    } catch (error) {
        res.json({
            message: error.message
        })
        throw new Error(`Failed to fetch restaurants: ${error.message}`);

    }
}

exports.getRestaurantById = async (req, res) => {
    const { id } = req.params
    try {
        const restaurant = await restaurantUtils.findRestaurantById(id)
        res.status(200).json({
            data: restaurant
        })
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

exports.createRestaurant = async (req, res) => {
    try {
        const user = req.user;
        const restaurant = await restaurantUtils.createRestaurantService(req.body, user);
        res.status(200).json(restaurant);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}

exports.createFood = async (req, res) => {

    const item = req.body

    try {

        const restaurant = await restaurantUtils.findRestaurantById(item.restaurant)

        const menuItem = await restaurantUtils.createFoodItem(item, restaurant)

        res.status(200).json({
            data: menuItem
        })

    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

exports.deleteRestaurantById = async (req, res) => {
    const { id } = req.params
    try {
        const restaurant = await restaurantUtils.findRestaurantById(id)
        await Address.deleteOne({ _id: restaurant.address })
        await Restaurant.deleteOne({ _id: id })
        res.send({
            status: 200,
            message: `Restaurant deleted with id ${id}`
        })
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Error while deleting restaurant' });
        }
    }
}

exports.deleteFoodById = async (req, res) => {
    const { id } = req.params
    try {
        await restaurantUtils.findFoodById(id)
        await Food.deleteOne({ _id: id })
        res.send({
            status: 200,
            message: `Food deleted with id ${id}`
        })
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Error while deleting Food' });
        }
    }
}

exports.deleteAddressById = async (req, res) => {
    const { id } = req.params
    try {
        await restaurantUtils.findAddressById(id)
        await Address.deleteOne({ _id: id })
        res.send({
            status: 200,
            message: `Address deleted with id ${id}`
        })
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Error while deleting Address' });
        }
    }
}

exports.updateFoodById = async (req, res) => {
    const { id } = req.params
    try {
        await restaurantUtils.findFoodById(id)
        await Food.updateOne(
            { _id: id },
            { $set: req.body }
        );
        res.send({
            status: 200,
            message: `Food updated with id ${id}`
        })
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Error while updating Food' });
        }
    }
}

exports.updateRestaurantById = async (req, res) => {
    const { id } = req.params
    try {
        await restaurantUtils.findRestaurantById(id)
        await Restaurant.updateOne({ _id: id }, { $set: req.body })
        res.send({
            status: 200,
            message: `Restaurant Updated with id ${id}`
        })
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Error while Updating restaurant' });
        }
    }
}

exports.updateAddressById = async (req, res) => {
    const { id } = req.params
    try {
        await restaurantUtils.findAddressById(id)
        await Address.updateOne({ _id: id }, { $set: req.body })
        res.send({
            status: 200,
            message: `Address Updated with id ${id}`
        })
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Error while Updating Address' });
        }
    }
}


