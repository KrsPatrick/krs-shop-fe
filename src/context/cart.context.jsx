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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    quantity: 0,
    
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItem] = useState([]);
    const [quantity, setQutantity] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, item) => {
            return total + item.quantity
        }, 0)
        setQutantity(newCartCount)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItem(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, quantity, setQutantity}
    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}