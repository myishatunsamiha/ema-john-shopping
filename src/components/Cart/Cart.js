import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const { cart } = props;

    // const cartTotal = (previous, current) => {
    //     return previous + current.price;
    // }
    // const total = cart.reduce(cartTotal, 0);

    let totalPrice = 0, shipping = 0, totalItems = 0;
    for (const product of cart) {
        totalItems += product.quantity;
        totalPrice += product.quantity * product.price;
        shipping += product.quantity * product.shipping;
    }
    const tax = parseFloat((totalPrice * 0.10).toFixed(2));
    const grandTotal = totalPrice + shipping + tax;

    return (
        <div className='cart'>
            <h4>Order Summary</h4>
            <p>Selected Items: {totalItems}</p>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping: ${shipping}</p>
            <p>Tax: ${tax}</p>
            <p>Grand Total: ${grandTotal}</p>
        </div>
    );
};

export default Cart;