// 用户信息修改
const UPDATE_USER_MUTATION = `
    mutation update_profile_order($email: String!, $name: String!, $password: String!) {
        user: update_profile_profile(where: { email: { _eq: $email } }, _set: { name: $name, password: $password }) {
            returning {
                id
                email
                name
                password
            }
        }
    }
`

// 库存
const PRODUCT_QUERY = `
{
    product: profile_product {
        id
        img
        name
        price
    }
}
`;

// 库存名称查询
const PRODUCT_BY_SEARCH = `
    query productBySearch($text: String!) {
        product: profile_product(where: {name: {_like: $text}}) {
            id
            img
            name
            price
        }
    }
`

// 库存类别查询
const PRODUCT_BY_CATEGORY = `
    query productByCategory($category:  [String!]) {
        product: profile_product(where: { category: { _in: $category } }) {
            id
            img
            name
            price
        }
}
`

// 物品查询
const USER_DETAIL_BY_ID_QUERY = `
    query userById($id: Int!) {
        user: profile_profile_by_pk(id: $id) {
            id
            name
            email
            password
        }
    }
`;


// 物品查询
const PRODUCT_DETAIL_BY_ID_QUERY = `
    query productById($id: Int!) {
        product: profile_product_by_pk(id: $id) {
            id
            img
            name
            price
            stock
        }
    }
`;

// 用户购物车查询
const CART_DETAIL_BY_USER_ID_QUERY = `
query cartByUserId($user_id: Int!, $status: Int!) {
    cart: profile_cart(where: {user_id: {_eq: $user_id}, status: {_eq: $status}}) {
        id
        product_id
        count
        status
        product: cart_product {
            id
            name
            description
            price
            stock
            img
        }
    }
}
`;

// 加入购物车/收藏夹
const INSERT_CART_MUTATION = `
    mutation insert_cart($user_id: Int!, $product_id: Int!, $status: Int!, $count: Int!) {
        insert_profile_cart(objects: {user_id: $user_id, product_id: $product_id, status: $status, count: $count}, 
            on_conflict: {constraint: cart_user_id_product_id_status_key, update_columns: count}) {
            returning {
            id
            product_id
            count
            }
        }
    }

`;


// 删除购物车/收藏夹
const DELETE_CART_MUTATION = `
    mutation delete_profile_cart ($id: Int!){
        delete_profile_cart(where: {id: {_eq: $id}}){
            returning {
                id
                user_id
                product_id
            }
        }
    }
`;


// 用户地址查询
const LOCATION_BY_USER_ID_QUERY = `
    query locationByUserId($user_id: Int!) {
        location: profile_location(where: {user_id: {_eq: $user_id}, default: {_in: [1, 0]}}) {
            address
            area
            city
            default
            id
            postcode
            phone
            province
            user_id
            username
        }
    }
`;

// 增加地址
const INSERT_LOCATION_MUTATION = `
    mutation insert_location($default: Int!, $address: String!, $area: String!, $city: String!, $phone: String!, $postcode: String!, $province: String!, $user_id: Int!, $username: String!) {
        insertAddress: insert_profile_location(objects: { default: $default, address: $address, area: $area, city: $city phone: $phone, postcode: $postcode, province: $province, user_id: $user_id, username: $username }) {
            returning {
                address
                area
                city
                id
                phone
                postcode
                province
                user_id
                username
            }
        }
    }
`;


// 修改地址
const UPDATE_LOCATION_MUTATION = `
mutation update_location($id: Int!, $default: Int!, $address: String!, $area: String!, $city: String!, $phone: String!, $postcode: String!, $province: String!, $user_id: Int!, $username: String!) {
    updateAddress: update_profile_location(_set: { default: $default, address: $address, area: $area, city: $city, phone: $phone, postcode: $postcode, province: $province, user_id: $user_id, username: $username }, where: { id: { _eq: $id } }) {
        returning {
            address
            area
            city
            id
            phone
            postcode
            province
            user_id
            username
        }
    }
}
`;

// 删除地址
const DELETE_LOCATION_MUTATION = `
    mutation delete_profile_location ($id: Int!){
        deleteAddress: update_profile_location(_set: { default: -1}, where: {id: {_eq: $id}}){
            returning {
                id
                address
                area
                city
                id
                phone
                postcode
                province
                user_id
                username
            }
        }
    }
`;

// 用户默认地址查询
const DEFAULT_LOCATION_BY_USER_ID_QUERY = `
    query locationByUserId($user_id: Int!) {
        location: profile_location(where: {user_id: {_eq: $user_id}, default: {_eq: 1}}) {
            address
            area
            city
            default
            id
            postcode
            phone
            province
            user_id
            username
        }
    }
`;

// 创建订单
const CREATE_ORDER = `
    mutation insert_profile_order($cartTotal: numeric!, $count: Int!, $createAt: timestamptz, $location_id: Int!, $orderStatus: Int, $productTotal: numeric!, $updateAt: timestamptz, $user_id: Int!) {
        insert_profile_order(objects: {cartTotal: $cartTotal, count: $count, createAt: $createAt, location_id: $location_id, orderStatus: $orderStatus, productTotal: $productTotal, updateAt: $updateAt, user_id: $user_id}) {
            returning {
            user_id
            id
            orderStatus
            count
            cartTotal
            location_id
            productTotal
            }
        }
    }
`

// 创建订单物品
const CREATE_ORDER_PRODUCT = `
mutation insert_profile_order($cart_id: Int! $order_id: Int!, $count: Int!, $productPay: numeric!, $product_id: Int!) {
    insert_profile_orderProduct(objects: {count: $count, order_id: $order_id, productPay: $productPay, product_id: $product_id}) {
        returning {
        count
        order_id
        product_id
        }
    }
    delete_profile_cart(where: {id: {_eq: $cart_id}}){
        affected_rows
    }
}
`

// 查询订单
const ORDER_BY_USER_ID_STATUS = `
    query orderByUserId($user_id: Int!, $status: [Int!]) {
        orderbyprops: profile_order(where: {user_id: {_eq: $user_id}, orderStatus: {_in: $status}}) {
            cartTotal
            count
            createAt
            id
            location_id
            orderStatus
            productTotal
            updateAt
            user_id
        }
    }
`

// 查询订单物品
const ORDER_PRODUCT_BY_ORDER_ID = `
    query orderProductByOrderId($order_id: Int!) {
        orderProductbyprops: profile_orderProduct(where: {order_id: {_eq: $order_id}}) {
            count
            id
            order_id
            productPay
            product_id
            product {
                id
                img
                name
            }
        }
    }
`

// 修改订单状态
const UPDATE_ORDER_STATUS = `
    query updateOrderStatus($id: Int!, $orderStatus: Int!) {
        update_profile_order(where: {id: {_eq: $id}}, _set: {orderStatus: $orderStatus}) {
            returning {
                cartTotal
                count
                createAt
                id
                location_id
                orderStatus
                updateAt
                productTotal
                user_id
            }
        }
    }
`

// 删除订单
const DELETE_ORDER = `
    mutation delete_profile_order($order_id: Int!) {
        delete_profile_orderProduct(where: {order_id: {_eq: $order_id}}) {
            returning {
                id
            }
        }
        delete_profile_order(where: {id: {_eq: $order_id}}) {
            returning {
                id
                cartTotal
                count
                createAt
                id
                location_id
                orderStatus
                updateAt
                productTotal
                user_id
            }
        }
    }

`

const create_user = `
    mutation createuser($email: String, $updatedAt: String, $password: String, $telephone: String, $username: String, $createdAt: String, $openid: String, $id: ID!, $userData_id: ID) {
        createuser: create_user(email: $email updatedAt: $updatedAt password: $password telephone: $telephone username: $username createdAt: $createdAt openid: $openid id: $id userData_id: $userData_id) {
            result
            user {
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

const find_user_by_openid = `
    query userbyprops($openid: String) {
        userbyprops: user_by_props(openid: $openid) {
            id
        }
    }
`

const user_by_id = `
    query userbyid($id: ID) {
        userbyid: user_by_id(id: $id) {
            email
            updatedAt
            password
            telephone
            username
            createdAt
            openid
            id
            userData_id {
                id
                nickname
                avatar
                isVip
                vipCode
                userPoint
                createdAt
                updatedAt
            }
        }
    }
`

const update_user = `
    mutation updateuser($id: ID, $email: String, $updatedAt: String, $where: user_filter, $password: String, $telephone: String, $username: String, $createdAt: String, $openid: String, $userData_id: ID) {
        updateuser: update_user(id: $id email: $email updatedAt: $updatedAt where: $where password: $password telephone: $telephone username: $username createdAt: $createdAt openid: $openid userData_id: $userData_id) {
            result
            user {
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

const category_by_props = `
    query categorybyprops($sort_by: category_sort_by, $limit: Int, $status: String) {
        categorybyprops: category_by_props(sort_by: $sort_by limit: $limit status: $status) {
            id
            text:name
            icon:img
            status
        }
    }
`

const update_category = `
    mutation updatecategory($id: ID, $img: String, $order: Int, $status: String, $updatedAt: String) {
        updatecategory: update_category(id: $id img: $img order: $order status: $status updatedAt: $updatedAt) {
            result
            category {
                id
                name
                img
                order
                status
                createdAt
                updatedAt
            }
        }
    }
`

const delete_category = `
    mutation deletecategory($id: ID) {
        deletecategory: delete_category(id: $id)
    }
`

const create_category = `
    mutation createcategory($id: ID!, $name: String, $img: String, $order: Int, $status: String, $createdAt: String, $updatedAt: String) {
        createcategory: create_category(id: $id name: $name img: $img order: $order status: $status createdAt: $createdAt updatedAt: $updatedAt) {
            result
            category {
                id
                name
                img
                order
                status
                createdAt
                updatedAt
            }
        }
    }
`

const productbyprops = `
    query productbyprops($recommend: Int, $where: product_filter, $sort_by: product_sort_by, $limit: Int, $unit: String, $order_by: OrderBy, $name: String, $filter: Filter, $status: String, $price: Float, $category_id: ID, $img: String, $stock: Int, $skip: Int) {
        productbyprops: product_by_props(recommend: $recommend where: $where sort_by: $sort_by limit: $limit unit: $unit order_by: $order_by name: $name filter: $filter status: $status price: $price category_id: $category_id img: $img stock: $stock skip: $skip) {
            recommend
            category_id{
                id
                name
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
            discountRate
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
            discountRate
        }

        spec: specificationStock_by_props(product_id: $id ) {
            id
            color
            size
            slideImg
            detailImg
            stock
            status
        }
    }
`
const specificationStock_by_props = `
    query specificationStockbyprops($product_id: ID) {
        specificationStockbyprops: specificationStock_by_props(product_id: $product_id) {
            updatedAt
            color
            createdAt
            size
            slideImg
            status
            id
            detailImg
            stock
        }
    }
`

const create_specificationStock = `
    mutation createspecificationStock($updatedAt: String, $color: String, $product_id: ID, $createdAt: String, $size: String, $slideImg: String, $status: String, $id: ID!, $detailImg: String, $stock: Int) {
        createspecificationStock: create_specificationStock(updatedAt: $updatedAt color: $color product_id: $product_id createdAt: $createdAt size: $size slideImg: $slideImg status: $status id: $id detailImg: $detailImg stock: $stock) {
            result
            specificationStock {
                updatedAt
                color

                createdAt
                size
                slideImg
                status
                id
                detailImg
                stock
            }
        }
    }
`

const delete_specificationStock = `
    mutation deletespecificationStock($id: ID) {
        deletespecificationStock: delete_specificationStock(id: $id)
    }

`

const update_specificationStock = `
    mutation updatespecificationStock($id: ID, $updatedAt: String, $color: String, $size: String, $slideImg: String, $status: String, $detailImg: String, $stock: Int) {
        updatespecificationStock: update_specificationStock(id: $id updatedAt: $updatedAt color: $color size: $size slideImg: $slideImg status: $status detailImg: $detailImg stock: $stock) {
            result
            specificationStock {
                updatedAt
                color
                createdAt
                size
                slideImg
                status
                id
                detailImg
                stock
            }
        }
    }
`

const create_userCart = `
    mutation createuserCart($id: ID!, $user_id: ID, $product_id: ID, $specificationStock_id: ID, $count: Int, $createdAt: String, $updatedAt: String) {
        createuserCart: create_userCart(id: $id user_id: $user_id product_id: $product_id specificationStock_id: $specificationStock_id count: $count createdAt: $createdAt updatedAt: $updatedAt) {
            result
            userCart {
                id
                user_id {
                    id
                }
                product_id {
                    recommend
                    unit
                    name
                    status
                    id
                    intro
                    price
                    img
                    stock
                    discountRate
                }
                specificationStock_id {
                    id
                    color
                    size
                    stock
                    status
                }
                count
                createdAt
                updatedAt
            }
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
                discountRate
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

const update_userCart = `
    mutation updateuserCart($id: ID, $specificationStock_id: ID, $count: Int, $updatedAt: String, $where: userCart_filter) {
        updateuserCart: update_userCart(id: $id specificationStock_id: $specificationStock_id count: $count updatedAt: $updatedAt where: $where) {
            result
            userCart {
                id
                product_id {
                    id
                }
                specificationStock_id {
                    updatedAt
                    color
                    size
                    slideImg
                    status
                    id
                    detailImg
                    stock
                }
                count
                createdAt
                updatedAt
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

const create_update_userAddress = `
    mutation createuserAddress( $id: ID!, $address: String, $updatedAt: String, $telephone: String, $default: Int, $city: String, $username: String, $postcode: String, $createdAt: String, $deletedAt: String, $user_id: ID, $area: String, $province: String,
                               $updateID: ID!, $updateDefault: Int, $newUpdatedAt: String) {
        createuserAddress: create_userAddress(id: $id address: $address updatedAt: $updatedAt telephone: $telephone default: $default city: $city username: $username postcode: $postcode createdAt: $createdAt deletedAt: $deletedAt user_id: $user_id area: $area province: $province) {
            result
            userAddress {
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
        }
        updateuserAddress: update_userAddress(id: $updateID default: $updateDefault updatedAt: $createdAt) {
            result
            userAddress {
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
        }
    }
`

const update_userAddress = `
    mutation updateuserAddress($id: ID, $address: String, $updatedAt: String, $where: userAddress_filter, $telephone: String, $default: Int, $city: String, $username: String, $postcode: String, $createdAt: String, $deletedAt: String, $user_id: ID, $area: String, $province: String,
                               $updateID: ID!, $updateDefault: Int, $newUpdatedAt: String) {
        updateAddress: update_userAddress(id: $id address: $address updatedAt: $updatedAt where: $where telephone: $telephone default: $default city: $city username: $username postcode: $postcode createdAt: $createdAt deletedAt: $deletedAt user_id: $user_id area: $area province: $province) {
            result
            userAddress {
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
        }
        updateuserAddress: update_userAddress(id: $updateID default: $updateDefault updatedAt: $createdAt) {
            result
            userAddress {
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
        }
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

const delete_address = `
    mutation deleteuserAddress($id: ID) {
        deleteuserAddress: delete_userAddress(id: $id)
    }
`

const orderbyprops = `
    query orderbyprops($updatedAt: String, $orderLogistics_id: ID, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $count: Int, $user_id: ID, $productTotalPay: Float, $orderPay_id: ID) {
        orderbyprops: order_by_props(updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id) {
            updatedAt
            orderLogistics_id {
                deliveryTime
                serviceStore
                updatedAt
                logisticsFee
                expressId
                createdAt

                consigneeTel
                id
                expressName
                consignAddress
                LogisticsStatus

                consigneeName
            }
            orderTotalPay
            createdAt
            orderStatus
            id
            count
            productTotalPay
            orderPay_id {
                updatedAt
                tradeNo
                transactionId
                time
                createdAt
                openid
                id
                totalFee

                cashFee
            }
        }
    }
`

const order_by_id = `
    query orderbyid($id: ID) {
        orderbyid: order_by_id(id: $id) {
            remark
            updatedAt
            orderLogistics_id {
                deliveryTime
                serviceStore
                updatedAt
                logisticsFee
                expressId
                createdAt
                consigneeTel
                id
                expressName
                consignAddress
                LogisticsStatus

                consigneeName
            }
            orderTotalPay
            createdAt
            orderStatus
            id
            count
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
            productTotalPay
            orderPay_id {
                updatedAt
                tradeNo
                transactionId
                time
                createdAt
                openid
                id
                totalFee

                cashFee
            }
        }
    }
`

const update_order = `
    mutation updateorder($id: ID, $updatedAt: String, $orderStatus: String, $orderPay_id: ID) {
        updateorder: update_order(id: $id updatedAt: $updatedAt orderStatus: $orderStatus orderPay_id: $orderPay_id) {
            result
            order {
                remark
                updatedAt

                orderTotalPay
                createdAt
                orderStatus

                id
                count

                productTotalPay
            }
        }
    }
`

const delete_order = `
    mutation deleteorder($id: ID) {
        deleteorder: delete_order(id: $id)
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
                discountRate
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
    mutation createorder($remark: String, $updatedAt: String, $orderLogistics_id: ID, $orderTotalPay: Float, $createdAt: String, $orderStatus: String, $userAddress_id: ID, $id: ID!, $count: Int, $user_id: ID, $productTotalPay: Float, $orderPay_id: ID,
                         $deliveryTime: String, $serviceStore: String, $logisticsFee: Float, $expressId: String, $order_id: ID, $consigneeTel: String, $orderLogisticsId: ID!, $expressName: String, $consignAddress: String, $LogisticsStatus: String, $consigneeName: String
                         $deleteId: [String]) {
        createorder: create_order(remark: $remark updatedAt: $updatedAt orderLogistics_id: $orderLogistics_id orderTotalPay: $orderTotalPay createdAt: $createdAt orderStatus: $orderStatus userAddress_id: $userAddress_id id: $id count: $count user_id: $user_id productTotalPay: $productTotalPay orderPay_id: $orderPay_id) {
            result
            order {
                remark
                updatedAt
                orderLogistics_id {
                    deliveryTime
                    serviceStore
                    updatedAt
                    logisticsFee
                    expressId
                    createdAt
                    consigneeTel
                    id
                    expressName
                    consignAddress
                    LogisticsStatus
                    consigneeName
                }
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
                count
                productTotalPay
                orderPay_id {
                    updatedAt
                    tradeNo
                    transactionId
                    time
                    createdAt
                    openid
                    id
                    totalFee

                    cashFee
                }
            }
        }
        createorderLogistics: create_orderLogistics(deliveryTime: $deliveryTime serviceStore: $serviceStore updatedAt: $updatedAt logisticsFee: $logisticsFee expressId: $expressId createdAt: $createdAt order_id: $order_id consigneeTel: $consigneeTel id: $orderLogisticsId expressName: $expressName consignAddress: $consignAddress LogisticsStatus: $LogisticsStatus user_id: $user_id consigneeName: $consigneeName) {
            result
            orderLogistics {
                deliveryTime
                serviceStore
                updatedAt
                logisticsFee
                expressId
                createdAt
                order_id {
                    remark
                    updatedAt

                    orderTotalPay
                    createdAt
                    orderStatus

                    id
                    count

                    productTotalPay
                }
                consigneeTel
                id
                expressName
                consignAddress
                LogisticsStatus
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
                consigneeName
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

const create_product = `
    mutation createproduct($recommend: Int, $updatedAt: String, $unit: String, $name: String, $createdAt: String, $status: String, $id: ID!, $intro: String, $discountRate: Float, $price: Float, $category_id: ID, $img: String, $stock: Int) {
        createproduct: create_product(recommend: $recommend updatedAt: $updatedAt unit: $unit name: $name createdAt: $createdAt status: $status id: $id intro: $intro discountRate: $discountRate price: $price category_id: $category_id img: $img stock: $stock) {
            result
            product {
                recommend
                updatedAt
                unit
                name
                createdAt
                status
                id
                intro
                discountRate
                price
                img
                stock
            }
        }
    }
`

const update_product = `
    mutation updateproduct($id: ID, $recommend: Int, $updatedAt: String, $where: product_filter, $unit: String, $name: String, $createdAt: String, $status: String, $intro: String, $discountRate: Float, $price: Float, $category_id: ID, $img: String, $stock: Int) {
        updateproduct: update_product(id: $id recommend: $recommend updatedAt: $updatedAt where: $where unit: $unit name: $name createdAt: $createdAt status: $status intro: $intro discountRate: $discountRate price: $price category_id: $category_id img: $img stock: $stock) {
            result
            product {
                recommend
                updatedAt
                unit
                name
                createdAt
                status
                id
                intro
                discountRate
                price

                img
                stock
            }
        }
    }
`

const delete_product_by_id = `
    mutation deleteproduct($id: ID) {
        deleteproduct: delete_product(id: $id)
    }
`

const slideshow_by_props = `
    query slideshowbyprops($updatedAt: String, $where: slideshow_filter, $sort_by: slideshow_sort_by, $limit: Int, $order_by: OrderBy, $name: String, $createdAt: String, $filter: Filter, $status: Int, $img: String, $skip: Int) {
    slideshowbyprops: slideshow_by_props(updatedAt: $updatedAt where: $where sort_by: $sort_by limit: $limit order_by: $order_by name: $name createdAt: $createdAt filter: $filter status: $status img: $img skip: $skip) {
        id
        name
        img
        status
    }
  }
`

export {
    PRODUCT_QUERY,
    PRODUCT_BY_SEARCH,
    PRODUCT_BY_CATEGORY,
    PRODUCT_DETAIL_BY_ID_QUERY,
    CART_DETAIL_BY_USER_ID_QUERY,
    INSERT_CART_MUTATION,
    LOCATION_BY_USER_ID_QUERY,
    USER_DETAIL_BY_ID_QUERY,
    DELETE_CART_MUTATION,
    INSERT_LOCATION_MUTATION,
    UPDATE_LOCATION_MUTATION,
    DELETE_LOCATION_MUTATION,
    DEFAULT_LOCATION_BY_USER_ID_QUERY,
    CREATE_ORDER,
    CREATE_ORDER_PRODUCT,
    ORDER_BY_USER_ID_STATUS,
    ORDER_PRODUCT_BY_ORDER_ID,
    DELETE_ORDER,
    UPDATE_USER_MUTATION,

    create_user,
    find_user_by_openid,
    user_by_id,
    update_user,
    category_by_props,
    update_category,
    delete_category,
    create_category,
    productbyprops,
    productAndSpec_by_id,
    specificationStock_by_props,
    update_specificationStock,
    create_specificationStock,
    delete_specificationStock,
    create_userCart,
    cart_by_userid,
    update_userCart,
    delete_userCart_by_id,
    create_update_userAddress,
    update_userAddress,
    userAddressbyprops,
    user_default_address,
    delete_address,
    orderbyprops,
    order_by_id,
    update_order,
    delete_order,
    orderProduct_by_props,
    create_order,
    create_order_product,
    shop_by_props,
    create_shop,
    update_shop,
    create_product,
    update_product,
    delete_product_by_id,
    slideshow_by_props
}
