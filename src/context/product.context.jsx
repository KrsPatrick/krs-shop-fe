import { createContext, useState, useEffect } from "react";

import { addCollectionAndDocument, getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from "../shop-data.js"

export const ProductContext = createContext({
    products: {},
})

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState({})

    useEffect(() => {
        const getCategriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments()
            setProducts(categoryMap)
            
        }
        getCategriesMap()
    }, [])

    console.log(products);
    // useEffect(() => {
    //     addCollectionAndDocument("categories", SHOP_DATA)
    // })
    const value = {products}
    return (
        <ProductContext.Provider value={value} >{children}</ProductContext.Provider>
    )
}

    