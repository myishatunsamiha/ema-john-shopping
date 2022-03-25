import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { addToDb, getStoredCart, removeFromDb } from '../../utilities/fakedb.js'

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        console.log('products load before fetch');
        fetch('products.json')
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                console.log('products loaded');
            })
    }, []);

    useEffect(() => {
        console.log('local storage first line', products);
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }

            console.log('added Products are-> ', addedProduct);
        }
        console.log('local storage last line');
        setCart(savedCart);

    }, [products]);

    // const handleAddToCart = (product) => {
    //     let index = 0, flag = 0;
    //     for (const item in cart) {
    //         if (item.id === product.id) {
    //             cart.splice(index, index + 1);
    //             product.quantity += 1;
    //             flag = 1;
    //         }
    //         index += 1;
    //     }

    //     if (flag === 0)
    //         product.quantity = 1;

    //     const newCart = [...cart, product];
    //     setCart(newCart);
    //     addToDb(product.id);
    // }


    const handleAddToCart = (product) => {
        const existingProduct = cart.find(cartItem => product.id === cartItem.id);

        let newCart = [];
        if (!existingProduct) {
            product.quantity = 1;
            newCart = [...cart, product];
        } else {
            const otherItems = cart.filter(cartItem => product.id !== cartItem.id);
            product.quantity += 1;
            newCart = [...otherItems, product];
        }

        setCart(newCart);
        addToDb(product.id);
    }


    return (
        <div className="shop-container">
            <div className="products-container">
                {
                    products.map(product => <Product key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}></Product>)
                }

            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;