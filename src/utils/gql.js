const category_by_props = `
    query categorybyprops($sort_by: category_sort_by, $limit: Int, $status: String) {
        categorybyprops: category_by_props(sort_by: $sort_by limit: $limit status: $status) {
            id
            text:name
            icon:img
        }
    }
`

const productbyprops = `
    query productbyprops($category_id: ID, $updatedAt: String, $name: String, $createdAt: String, $status: String, $intro: String, $price: Float, $img: String, $stock: Int) {
        productbyprops: product_by_props(category_id: $category_id updatedAt: $updatedAt name: $name createdAt: $createdAt status: $status intro: $intro price: $price img: $img stock: $stock) {
            category_id{
                id
            }
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
            category_id{
                id
            }
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
                id
                img
                intro
                name
                price
                status
                stock
                unit
            }
            specificationStock_id{
                id
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
    query userAddressbyprops($user_id: ID) {
        userAddressbyprops: userAddress_by_props(user_id: $user_id) {
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
            telephone
            username
            openid
            id
        }
        area
        province
    }
}
`
const user_default_address = `
    query user_default_address($user_id: ID, $default: Int) {
        defaultAddress: userAddress_by_props(user_id: $user_id default: $default) { 
            id 
            default
            username        
            telephone
            province
            area
            city
            address
            user_id {
                openid
                id
            }                       
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
    query orderProductbyprops($order_id: ID) {
    orderProductbyprops: orderProduct_by_props(order_id: $order_id) {
        updatedAt
        productColor
        unit
        product_id {
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
        productSize
        orderPay
        createdAt
        productImg
        productName
        productPrice
        id
        count
        productPay
    }
}
`

const create_order = `
    mutation createorder($deliveryTime: String, $remark: String, $updatedAt: String, $orderLogistics_id: ID, $payTime: String, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $userAddress_id: ID, $id: ID!, $orderShipFee: Float, $count: Int, $user_id: ID, $productTotalPay: Float, $orderPay_id: ID, 
                         $deleteId: [String]) {
        createorder: create_order(deliveryTime: $deliveryTime remark: $remark updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id payTime: $payTime orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus userAddress_id: $userAddress_id id: $id orderShipFee: $orderShipFee count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id) {
            result
            order {
                deliveryTime
                remark
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

const create_order_product = `
    mutation createorderProduct($updatedAt: String, $productColor: String, $unit: String, $product_id: ID, $productSize: String, $orderPay: Float, $createdAt: String, $productImg: String, $productName: String, $specificationStock_id: ID, $order_id: ID, $productPrice: Float, $id: ID!, $count: Int, $productPay: Float, $user_id: ID, $orderPay_id: ID) {
        createorderProduct: create_orderProduct(updatedAt: $updatedAt productColor: $productColor unit: $unit product_id: $product_id productSize: $productSize orderPay: $orderPay createdAt: $createdAt productImg: $productImg productName: $productName specificationStock_id: $specificationStock_id order_id: $order_id productPrice: $productPrice id: $id count: $count productPay: $productPay user_id: $user_id orderPay_id: $orderPay_id) {
            result
            orderProduct {
                updatedAt
                productColor
                unit
    
                productSize
                orderPay
                createdAt
                productImg
                productName
    
                productPrice
                id
                count
                productPay
    
            }
        }
    }
`

export {
    category_by_props,
    productbyprops,
    productbyid,
    cart_by_userid,
    delete_userCart_by_id,
    userAddressbyprops,
    user_default_address,
    orderbyprops,
    orderProduct_by_props,
    create_order,
    create_order_product
}