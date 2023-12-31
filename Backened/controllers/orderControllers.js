import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

//@desc           create new order
//@router           post/api/orders
//@access           private

const addOrderItems = asyncHandler(async (req, res)=>{
    const{
        orderItem,
        shippingAddress,
        paymentMethod,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } =req.body

    if(orderItem.length=== 0){
        res.status(400)
        throw new Error('No Order Item')
        return
    }else{
        const order = new Order({
            orderItem,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

export { addOrderItems }