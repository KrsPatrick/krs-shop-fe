import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ProductCard from "../../components/product-card/product-card.component"

import { ProductContext } from "../../context/product.context"

import "./category.styles.scss"

const Category = () => {
    const { category } = useParams()
    const {products} = useContext(ProductContext)
    const [categoryProducts, setCategoryProducts] = useState(products[category])

    useEffect(() => {
        setCategoryProducts(products[category])
        
    }, [category, products] )
        
    return (
       
        <div className="category-container">
            {categoryProducts && 
                categoryProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
    )

}

export default Category