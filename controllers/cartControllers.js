const Cart = require("../models/cartModel")
const cartService = require("../utils/cartUtils")

module.exports = {
    async createCart(user) {
        const cart = new Cart({ customer: user })
        const createdCart = cart.save()
        return createdCart
    },

    async addItemtoCart(req, res) {

        const foodId = req.body.foodId
        const user = req.user

        try {
            const cart = await cartService.addItemtoUserCart(foodId, user)
            res.status(200).json(cart)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    },

    async findUserCart(req, res) {
        const user = req.user

        try {
            const cart = await cartService.findCartByUserId(user)
            res.status(200).json(cart)
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    },


    async deleteCartItem(req, res) {
        const foodId = req.body.foodId
        const user = req.user

        try {
            await cartService.deleteItemFromCart(foodId,user)
            res.status(200).json({
                message:`Item deleted with ID: ${foodId}`
            })
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }

    },

    async incremetItemInCart(req,res){
        const cartItemId = req.body.cartItemId

        try{
            const incrementedItemMsg=await cartService.incrementItem(cartItemId)
            res.status(200).json({
                message:incrementedItemMsg
            })

        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    },
    async decrementItemInCart(req,res){
        const cartItemId = req.body.cartItemId
        const user = req.user

        try{
            const decrementedItemMsg=await cartService.decrementItem(cartItemId,user)
            res.status(200).json({
                message:decrementedItemMsg
            })

        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
}