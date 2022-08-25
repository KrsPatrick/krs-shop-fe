import { useContext } from "react"

import { ProductContext } from "../../context/product.context"
import CategoryPreview from "../../components/category-preview/category-preview.component"


const CategoriesPreview = () => {
    const {products} = useContext(ProductContext)
    return (
        <>
        {
            Object.keys(products).map(title => {
                const productList = products[title]
                return <CategoryPreview key={title} title={title} products={productList} />
            })
        }
        </>
    )

}

export default CategoriesPreview