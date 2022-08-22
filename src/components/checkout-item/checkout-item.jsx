import { useContext } from "react"

import { CartContext } from "../../context/cart.context"

const CheckoutItem = ({product}) => {
    const {name, imageUrl, price} = product
    return (
        <div>item</div>
    )
}

export default CheckoutItem