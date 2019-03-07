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
                img
                intro
                name
                price
                status
                stock
                unit
            }
            specificationStock_id{
                color
                size
                stock
                status
            }
        }
    }
`

const delete_userCart_by_id = `
    mutation delete_userCart($id: [String]) {
        delete_userCart(where: {
            id: {
                _in: $id
            }
        }) 
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
const orderbyprops = `
    query orderbyprops($deliveryTime: String, $updatedAt: String, $orderLogistics_id: ID, $payTime: String, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $userAddress_id: ID, $orderShipFee: Float, $count: Int, $user_id: ID, $productTotalPay: Float, $orderPay_id: ID) {
        orderbyprops: order_by_props(deliveryTime: $deliveryTime updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id payTime: $payTime orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus userAddress_id: $userAddress_id orderShipFee: $orderShipFee count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id) {
            deliveryTime
            updatedAt
            orderLogistics_id {
                updatedAt
                logisticsFee
                expressId
                createdAt
                consigneeTel
                id
                consignAddress
                LogisticsStatus
                consigneeName
            }
            payTime
            orderTotalPay
            createdAt
            orderStatus
            userAddress_id {
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
                area
                province
            }
            id
            orderShipFee
            count
            productTotalPay
            orderPay_id {
                id
                totalPay
                transactionId
                payTime
            }
        }
    }
`
const orderProduct_by_props = `
    query orderProductbyprops($remark: String, $updatedAt: String, $product_id: ID, $orderPay: Float, $createdAt: String, $order_id: ID, $count: Int, $productPay: Float, $user_id: ID) {
        orderProductbyprops: orderProduct_by_props(remark: $remark updatedAt: $updatedAt product_id: $product_id orderPay: $orderPay createdAt: $createdAt order_id: $order_id count: $count productPay: $productPay user_id: $user_id) {
            remark
            updatedAt
            unit
            product_id {
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
            orderPay
            createdAt
            order_id {
                deliveryTime
                updatedAt
    
                payTime
                orderTotalPay
                createdAt
                orderStatus
    
                id
                orderShipFee
                count
    
                productTotalPay
            }
            id
            count
            productPay
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
        }
    }
`

const create_order = `
    mutation createorder($deliveryTime: String, $updatedAt: String, $orderLogistics_id: ID, $payTime: String, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $userAddress_id: ID, $id: ID!, $orderShipFee: Float, $count: Int, $user_id: ID, $productTotalPay: Float, $orderPay_id: ID, 
                         $deleteId: [String]) {
        createorder: create_order(deliveryTime: $deliveryTime updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id payTime: $payTime orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus userAddress_id: $userAddress_id id: $id orderShipFee: $orderShipFee count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id) {
            result
            order {
                deliveryTime
                updatedAt
                orderLogistics_id {
                    updatedAt
                    logisticsFee
                    expressId
                    createdAt
                    consigneeTel
                    id
                    consignAddress
                    LogisticsStatus    
                    consigneeName
                }
                payTime
                orderTotalPay
                createdAt
                orderStatus
                userAddress_id {
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
                    area
                    province
                }
                id
                orderShipFee
                count
                productTotalPay
                orderPay_id {
                    id        
                    totalPay
                    transactionId
                    payTime
                }
            } 
        }
        delete_userCart(where: {
            id: {
                _in: $deleteId
            }
        }) 
    }
`

export {
    productbyprops,
    productbyid,
    cart_by_userid,
    delete_userCart_by_id,
    userAddressbyprops,
    orderbyprops,
    orderProduct_by_props,
    create_order
}