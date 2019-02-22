const productbyprops =
    `query productbyprops($category: String, $updatedAt: String, $name: String, $createdAt: String, $status: String, $intro: String, $price: Float, $img: String, $stock: Int) {
        productbyprops: product_by_props(category: $category updatedAt: $updatedAt name: $name createdAt: $createdAt status: $status intro: $intro price: $price img: $img stock: $stock) {
            category
            updatedAt
            unit
            name
            createdAt
            status
            id
            intro
            price
            img
            stock
        }
    }
`

export {
    productbyprops
}