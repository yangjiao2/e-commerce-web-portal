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
    query productbyprops($recommend: Int, $where: product_filter, $sort_by: product_sort_by, $limit: Int, $unit: String, $order_by: OrderBy, $name: String, $filter: Filter, $status: String, $price: Float, $category_id: ID, $img: String, $stock: Int, $skip: Int) {
        productbyprops: product_by_props(recommend: $recommend where: $where sort_by: $sort_by limit: $limit unit: $unit order_by: $order_by name: $name filter: $filter status: $status price: $price category_id: $category_id img: $img stock: $stock skip: $skip) {
            recommend
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

const productAndSpec_by_id = `
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
        
        spec: specificationStock_by_props(product_id: $id ) {
            id
            color
            size
            stock
            status
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

const shop_by_props = `
    query shopbyprops($limit: Int) {
        shopbyprops: shop_by_props(limit: $limit) {
            description
            address
            updatedAt
            telephone
            name
            createdAt
            status
            id
            slideshow
            notice
            intro
            img
        }
    }
`

const update_shop = `
    mutation updateshop($description: String, $address: String, $updatedAt: String, $where: shop_filter, $telephone: String, $name: String, $createdAt: String, $status: String, $id: ID, $slideshow: String, $notice: String, $intro: String, $img: String) {
        updateshop: update_shop(id: $id description: $description address: $address updatedAt: $updatedAt where: $where telephone: $telephone name: $name createdAt: $createdAt status: $status slideshow: $slideshow notice: $notice intro: $intro img: $img) {
            result
            shop {
                description
                address
                updatedAt
                telephone
                name
                createdAt
                status
                id
                slideshow
                notice
                intro
                img
            }
        }
    }
`

const create_shop = `
    mutation createshop($description: String, $address: String, $updatedAt: String, $telephone: String, $name: String, $createdAt: String, $status: String, $id: ID!, $slideshow: String, $notice: String, $intro: String, $img: String) {
        createshop: create_shop(description: $description address: $address updatedAt: $updatedAt telephone: $telephone name: $name createdAt: $createdAt status: $status id: $id slideshow: $slideshow notice: $notice intro: $intro img: $img) {
            result
            shop {
                description
                address
                updatedAt
                telephone
                name
                createdAt
                status
                id
                slideshow
                notice
                intro
                img
            }
        }
    }
`

export {
    category_by_props,
    productbyprops,
    productAndSpec_by_id,
    cart_by_userid,
    delete_userCart_by_id,
    userAddressbyprops,
    user_default_address,
    orderbyprops,
    orderProduct_by_props,
    create_order,
    create_order_product,
    shop_by_props,
    create_shop,
    update_shop
}