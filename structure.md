# 标准电商(简约版) 数据结构

## 用户系统

### user - 用户表

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
用户标识 | id | ID | key|不显示|前端|yes
用户微信标识 | openid | String ||不显示|前端|yes
用户名 | username | String ||显示|用户|yes
密码 | password | String | |显示|用户|yes
手机号码  | telephone | String ||显示|用户|option
邮箱 | email | String ||显示|用户|option
用户信息 | userData_id | String | |不显示|前端|yes
创建时间 | createdAt | String |
更新时间 | updatedAt | String |

### userData - 用户信息表(部分字段选择使用)

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
用户标识 | id | ID | key|不显示|前端|yes
昵称 | nickname | String ||显示|前端|yes
头像 | avatar | String ||显示|前端|yes
是否会员 | isVip | Boolean ||显示|前端|option
会员卡号 | vipCode | String ||显示|前端|option
积分 | userPoint | Int | |显示|前端|option
创建时间 | createdAt | String |
更新时间 | updatedAt | String |

### admin - 管理员表

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
用户标识 | id | ID | key|不显示|前端|yes
用户微信标识 | openid | String ||不显示|前端|yes
用户名 | username | String ||显示|用户|yes
密码 | password | String | |显示|用户|yes
手机号码  | telephone | String ||显示|用户|option
邮箱 | email | String ||显示|用户|option
创建时间 | createdAt | String |
更新时间 | updatedAt | String |

### userAddress - 用户收货地址表

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
标识 | id | ID | key|不显示|前端|yes
用户标识 | user_id | String | non-null|不显示|前端|yes
收货人姓名 | username | String | non-null|显示|用户|yes
收货人手机号码 | telephone | String | non-null|显示|用户|yes
省份 | province | String | non-null|显示|用户|yes
市  | city | String | non-null|显示|用户|yes
区 | area | String | non-null|显示|用户|yes
详细地址 | address | String | non-null|显示|用户|yes
邮编(可选) | postcode | String ||显示|用户|option
是否默认收货地址(0,1) | default | Int ||显示|用户|option
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |
删除时间 | deleteddAt | String |

### userSearch - 用户搜索历史表(选择使用)

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
标识 | id | ID | key|不显示|前端|yes
用户标识 | user_id | String | non-null|不显示|前端|yes
关键字 | keyword | Array | non-null-list|显示|用户|option
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |

### userCollect - 用户商品收藏表(选择使用)

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
标识 | id | ID | key|不显示|前端|yes
用户标识 | user_id | String | non-null|不显示|前端|yes
商品 | product_id | Array | non-null-list|不显示|前端|yes
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |

### userCart - 用户购物车商品表

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
购物车编码 | id | ID | key|不显示|前端|yes
用户标识 | user_id | String | non-null|不显示|前端|yes
商品 | product_id | String | non-null|不显示|前端|yes
规格 | specificationStock_id | String | non-null | 不显示 | 前端 | yes
数量 | count | Int | non-null|不显示|用户|yes
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |


## 商品系统

###  category  商品类别表

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
类别id | id | ID | key|不显示|前端|yes
名称 | name | String | non-null |显示|用户|yes
图标图片链接 | img | String | non-null | 不显示|用户|
顺序 | order | Int  |  | 不显示 | 管理员 |
状态(待用) | status | String | |显示|用户|
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |

### product 商品表

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
商品编码 | id | ID | key|不显示|前端|yes
商品类别idid | category_id_id | String | non-null|显示|用户|yes
名称 | name | String | non-null|显示|用户|yes
价格 | price | Double | non-null|显示|用户|yes
展示图片链接 | img | String ||显示|用户|yes
描述 | intro | String ||显示|用户|yes
总库存量 | stock | Int | |显示|用户|yes
可选单位(500g,1个...) | unit | String | non-null|显示|用户|option
状态(-1下架,0预售,1上架,2 售罄) | status | String | |显示|用户|yes
商家推荐 | recommend | Int |
打折利率(如：8.8折) | discountRate | Dounble | | |
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |

### specificationStock  商品规格库存表

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
规格库存id | id | ID | key|不显示|前端|yes
颜色 | color | String | | 显示 | 前端 | |
尺寸 | size | String  | String | 显示 | 前端 | |
规格滑动图片链接 | slideImg | String |list |显示|用户|yes
详情图片链接 | detailImg | String | list |显示|用户|yes
商品id | product_id | String | non-null |  |  前端 | yes
规格库存量 | stock | Int | |显示| 前端 | yes
状态(-1下架,0预售,1上架,2 售罄) | status | String | |显示|  |
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |


## 订单系统

### order - 订单信息表

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
订单编号 | id | ID | key|不显示|前端|yes
用户 | user_id | String | non-null|不显示|前端|yes
收货地址|userAddress_id|String|non-null|不显示|前端|yes
客户下单留言 | remark | String | |显示|用户|option
商品总价 | productTotalPay | Double | non-null|显示|前端|yes
实际总付款 | orderTotalPay | Double | non-null|显示|前端|yes
商品总数量 | count | Int | non-null|显示|用户|yes
订单状态(0未付款,1已付款,2已发货,3已签收) | orderStatus | String | non-null|显示|前端|yes
支付结果 | orderPay_id | String | non-null|显示|前端|yes
物流 | orderLogistics_id | String ||显示|前端|option
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |

### orderProduct - 订单商品表

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
订单编号 | id | ID | key|不显示|前端|yes
用户 | user_id | String | non-null|不显示|前端|yes
订单 | order_id | String | non-null|不显示|前端|yes
商品 | product_id | String |  non-null|不显示|前端|yes
规格 | specificationStock_id | String |  non-null|不显示|前端|yes
下单时商品名称 | productName | String | non-null |显示|前端|yes
下单时商品图片 | productImg | String | non-null |显示|前端|yes
下单时商品价格 | productPrice | Double | non-null |显示|前端|yes
下单时商品颜色 | productColor | String |   |显示|前端|yes
下单时商品尺寸 | productSize |  String |  |显示|前端|yes
支付结果 | orderPay_id | String | non-null|显示|前端|yes
购买单位(500g,1个...) | unit | String | non-null|显示|前端|yes
数量 | count | Int | non-null|显示|用户|yes
商品总价 | productPay | Double ||显示|前端|yes
此商品实付款 | orderPay | Double | non-null|显示|前端|yes
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |

### orderLogistics - 订单物流表

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
订单编号 | id | ID | key|不显示|前端|yes
用户 | user_id | String | non-null|不显示|前端|yes
订单 | order_id | String | non-null|不显示|前端|yes
快递名(包含上门自提) | expressName | String |  |  显示 | 用户 |
发货快递单号 | expressId | String | non-null|显示|用户|yes
发货地(包含服务门店) | serviceStore |  | 显示 |
收货人姓名 | consigneeName | String | non-null显示|用户|yes
收货人Tel | consigneeTel | String | non-null显示|用户|yes
收货人地址 | consignAddress | String | non-null显示|用户|yes
发货时间 | deliveryTime | String ||显示|前端|option
物流状态 | LogisticsStatus | String 显示|后端|yes
物流运费 | logisticsFee | Double |显示|后端|yes
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |

### orderPay - 订单支付表(暂未设计退款售后)
微信支付返回结果

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
订单编号 | id | ID | key|不显示|前端|yes
用户 | user_id | String | non-null|不显示|前端|yes
微信用户id | openid | String | non-null | 不显示 | 后端 |
订单号 | tradeNo | String | non-null|不显示|后端|yes
支付金额 | totalFee | Double | non-null|显示|后端|yes
支付金额 | cashFee | Double | non-null|显示|后端|yes
交易单号 | transactionId | String | non-null | 后端 |
微信返回时间 | time | String | non-null | 后端 |
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |

## 管理商铺系统

### shop 店铺表

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
规格库存id | id | ID | key|不显示|前端|yes
店铺名称 | name | String | non-null | 显示 | 管理员 | |
联系电话 | telephone | String |  | 显示 | 管理员 | |
店铺图片 | img | list | | 显示 | 管理员 | |
轮播图 | slideshow | list  |  | 显示 | 管理员 |  |
地址 | address | String  |  | 显示 | 管理员 | |
简介 | intro | String |  | 显示 |   管理员  |
描述 | description | String |  | 显示  |   管理员  |
公告 | notice | String | |显示|  管理员  |
状态() | status | String | |显示|  |
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |

### slideshow 首页轮播图

字段含义 | 字段名 | 字段类型 | 字段描述|显示类型|填写方|必填？|
---|---|--- |---|---|--- |---
id | id | ID | key|显示|前端|yes
名称 | name | String  |  | 显示 | 管理员 |  |
图片 | img | String |non-null | 显示 | 管理员 | yes
展示状态(1:展示   0:不展示) |  status | Int | non-null |
创建时间 | createdAt | String | non-null
更新时间 | updatedAt | String |
