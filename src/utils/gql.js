const productbyprops = `
    query productbyprops($category: String, $updatedAt: String, $name: String, $createdAt: String, $status: String, $intro: String, $price: Float, $img: String, $stock: Int) {
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

const productbyid = `
    query productbyid($id: ID) {
        productbyid: product_by_id(id: $id) {
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

const cart_by_userid = `
    query findUserCart($user_id:ID){
        cartList:userCart_by_props(user_id:$user_id){
            count
            createdAt
            id
            product_id{
                category
                createdAt
                img
                intro
                name
                price
                status
                stock
                unit
                updatedAt
            }
        }
    }
`

export {
    productbyprops,
    productbyid,
    cart_by_userid
}