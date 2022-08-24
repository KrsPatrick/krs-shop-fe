import { useContext } from "react"

import { Fragment } from "react"

import { ProductContext } from "../../context/product.context"
import CategoryPreview from "../../components/category-preview/category-preview.component"
import "./shop.styles.scss"

const Shop = () => {
    const {products} = useContext(ProductContext)
    console.log(products);
    return (
        <div className="shop-container">
        {
            Object.keys(products).map(title => {
                const productList = products[title]
                return <CategoryPreview key={title} title={title} products={productList} />
            })
        }
        </div>
    )

}

export default Shop