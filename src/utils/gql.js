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

const userAddressbyprops = `
    query userAddressbyprops($address: String, $updatedAt: String, $telephone: String, $default: Int, $city: String, $username: String, $postcode: String, $createdAt: String, $deletedAt: String, $user_id: ID, $area: String, $province: String) {
        userAddressbyprops: userAddress_by_props(address: $address updatedAt: $updatedAt telephone: $telephone
default: $default city: $city username: $username postcode: $postcode createdAt: $createdAt deletedAt: $deletedAt user_id: $user_id area: $area province: $province) {
        address
        updatedAt
        telephone
        default
        city
        username
        postcode
        createdAt
        deletedAt
        id
        user_id {
            email
            updatedAt
            password
            telephone
            username
            createdAt
            openid
            id
        }
        area
        province
    }
}
`
export {
    productbyprops,
    productbyid,
    cart_by_userid,
    userAddressbyprops
}