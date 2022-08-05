import "./category-item.styles.scss"

const CategoryItem = ({ category }) => {
    const { title, imageUrl } = category
    return (
    <div className="category-container">
        <span className="background-image" style={{backgroundImage: `url(${imageUrl})`}}></span>
      <div className="category-body-container">
        <h2>{title}</h2>
        <p> shop now</p>
      </div>
    </div>
    )

}

export default CategoryItem