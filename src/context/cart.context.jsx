import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    
    const cartArr = cartItems.find(item => item.id === productToAdd.id)

    if(cartArr){
        return cartItems.map(items => {
            if (items.id === productToAdd.id){
                return {...items, quantity: items.quantity + 1}
            } else {
                return items
            }
        })
    }
    
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    
    const cartArr = cartItems.find(item => item.id === cartItemToRemove.id)

    if(cartArr.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    }
    
    return cartItems.map(items => {
        if (items.id === cartItemToRemove.id){
            return {...items, quantity: items.quantity - 1}
        } else {
            return items
        }
    })
}

const remove = (cartItems, removeItem) => cartItems.filter(cartItem => cartItem.id !== removeItem.id)

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    removeItem: () => {},
    quantity: 0,
    cartTotal: 0,
    
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItem] = useState([]);
    const [quantity, setQutantity] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => {
            return total + item.quantity
        }, 0)
        setQutantity(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, item) => {
            return total + item.quantity * item.price
        }, 0)
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItem(removeCartItem(cartItems, cartItemToRemove));
    }

    const removeItem = (removeItem) => {
        setCartItem(remove(cartItems, removeItem))
    }

    const value = {isCartOpen, cartTotal, setIsCartOpen, removeItem, removeItemFromCart, addItemToCart, cartItems, quantity, setQutantity}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}