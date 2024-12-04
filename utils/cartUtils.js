const Cart = require("../models/cartModel")
const Food = require("../models/foodModel")
const CartItem = require('../models/cartItemModel')


module.exports = {

    async findCartByUserId(userId) {
        let cart
        cart = await Cart.findOne({ customer: userId }).populate([{
            path: 'items',
            populate: {
                path: 'food',
                populate: { path: "restaurant", select: "_id" },
            }

        }])
        return cart
    },

    async addItemtoUserCart(foodId, userId) {
        const cart = await Cart.findOne({ customer: userId })
        const food = await Food.findById(foodId)

        const isPresent = await CartItem.findOne({
            cart: cart._id,
            food: food._id,
            userId
        })

        if (!isPresent) {
            const newItem = new CartItem({
                food: food._id,
                cart: cart._id,
                quantity: 1,
                userId,
                totalPrice: food.price,
            })
            const createdItem = await newItem.save()
            cart.items.push(createdItem)
            await cart.save()
            return createdItem
        }
        return isPresent

    },

    async deleteItemFromCart(foodId, userId) {
        let cart
        cart = await Cart.findOne({ customer: userId }).populate([{
            path: 'items',
            populate: {
                path: 'food',
                populate: { path: "restaurant", select: "_id" },
            }

        }])

        if (!cart) {
            throw new Error(`Cart not found for user ID ${userId}`);
        }
        cart.items = cart.items.filter((item) => !item.food._id.equals(foodId));
        await cart.save();
        await CartItem.findOneAndDelete({ food: foodId })
        return cart;

    },

    async incrementItem(cartItemId) {
        const cartItem = await CartItem.findById(cartItemId).populate('food')
        const price = cartItem?.food.price

        cartItem.quantity += 1
        cartItem.totalPrice = cartItem.quantity * price
        await cartItem.save()

        return "Incremented successfully"

    },

    async decrementItem(cartItemId, userId) {
        let cart
        cart = await Cart.findOne({ customer: userId }).populate([{
            path: 'items',
            populate: {
                path: 'food',
                populate: { path: "restaurant", select: "_id" },
            }

        }])

        if (!cart) {
            throw new Error(`Cart not found for user ID ${userId}`);
        }
        const cartItem = await CartItem.findById(cartItemId).populate('food')
        const foodId = cartItem?.food._id
        const price = cartItem?.food.price

        let message

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1
            cartItem.totalPrice -= price
            await cartItem.save()

            message = "Decremented successfully"
        }
        else {
            cart.items = cart.items.filter((item) => !item.food._id.equals(foodId));
            await cart.save();
            await CartItem.findOneAndDelete({ food: foodId })
            message = "Removed from cart successfully"
        }
        return message
    }
}