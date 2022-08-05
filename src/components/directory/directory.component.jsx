import CategoryItem from "../category-item/category-item.component"
import categories from "../categories/categories.component"

import "./directory.styles.scss"

const Directory = () => {
    return(
        <div className="categories-container">
      {categories.map(category => (
       <CategoryItem key={category.id} category={category} />
      ))}

      
    </div>
    )
}

export default Directory