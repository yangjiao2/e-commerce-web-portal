## 电商 React 网页端

效果演示：

[![Demo](./demo/demo.gif)](https://youtu.be/LguAMw4L5Uc)

## 项目介绍

此项目是一套电商系统，包括前台商城系统及后台管理系统。包含首页门户、商品推荐、商品搜索、商品展示、购物车、订单流程、个人信息等模块。

1 用户注册和登录
注册和登录是每个用户使用 app 必须要进行的操作，用户填写个人信息，包括用户名，密码，手机号等基本信息之后即可完成注册，后续用户若退出登录再登录时，需要输入之前注册时的用户名和密码。

2 主页商品浏览
用户登录成功后进入页面，主板块的上部分用轮播图来显示推出的最新商品，下边时导航栏，可切换主页，商品分类，个人信息等。

3 商品搜索
主页用来搜索商品，根据用户提供的关键字，设置关键词的超链接。

4 加入购物车
购物车页面用来管理选中但未支付的商品，用户可以在购物车内修改商品的数量或者删除商品，选中要支付的商品后自动统计价格。

5 商品收藏
用户点击收藏的商品，将其添加到收藏夹。每点击一次程序做一次判断，若完成收藏，则显示收藏成功。连续点击则判断是否收藏成功或取消收藏。

6 收货地址管理
用户提交订单后编辑收货地址，填写时并自动定位。

7 个人中心
个人中心可以查看自己的个人信息，查看订单，浏览记录。还有设置，关于等。

## 项目演示

### 后端技术

| 技术   | 说明               | 官网                           |
| ------ | ------------------ | ------------------------------ |
| Hasura | 开源引擎           | https://https://hasura.io/     |
| Apollo | graphql 数据库接口 | https://www.apollographql.com/ |

### 前端技术

| 技术             | 说明            | 官网                                                             |
| ---------------- | --------------- | ---------------------------------------------------------------- |
| AntDesign Mobile | 前端 UI 框架    | https://mobile.ant.design/                                       |
| Js-cookie        | cookie 管理工具 | https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie |
| AntDesign        | 图表库          | https://ant.design/components/icon/                              |

### 其他

| 技术    | 说明           | 官网                    |
| ------- | -------------- | ----------------------- |
| Webpack | 前端 UI 框架   | https://webpack.js.org/ |
| Babel   | 前端 HTTP 框架 | https://babeljs.io/     |

## 开发模块

#### npm

- 引入模块
- 部署开发

#### babel

- babel-core:
- babel-preset-env: 为了支持 ES5 | ES6 supporting part
- babel-preset-react: react 支持

#### webpack

- webpack-cli: 用 CLI 去 starting dev server | creating production build | etc.
- webpack-dev-server: 自动 refresh
- html-webpack-plugin: 创建 HTML 模版

## 项目框架

- 购物车
  为了增加代码复用率，我在数据库方面用`状态`来控制和表达物品的收藏，待付费，待发货，待完成等等的状态
  并且通过使用 `localStorage` 来读组建内部变量的增删改，减少数据库查询和更改请求数量
  通过传入`type`和`物品参数`，运用一个函数方程进行增加，改变，减少和删除数量，提高代码复用率

## 流程细节

1. react webpack babel 安装

```
npm init -y
npm i webpack webpack-cli webpack-dev-server
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react
npm i react react-dom
npm i html-webpack-plugin html-loader
npm i @apollo/client graphql graphql-tag apollo-boost @apollo/react-hooks @apollo/react-hoc
```

config babel in `.babelrc`
config webpack in `webpack.config.js`
package config with `--open --hot --mode development/production`

2. 设置开源数据库和引擎

Hasura GraphQL Engine：开源引擎，快速搭建 database & microservice & productiton-ready graphQL 后端

快速 deploy heroku 链接： https://dashboard.heroku.com/new?button-url=https%3A%2F%2Fhasura.io%2F&template=https%3A%2F%2Fgithub.com%2Fhasura%2Fgraphql-engine-heroku
Hasura 使用 Postgres 而且具有 hasura api explorer 可以快速增删数据库

```
heroku git:remote -a <HEROKU_APP_NAME>
git push heroku master
```

3. 数据库建立
   URI: https://xiyou-server.herokuapp.com/v1/graphql

- profile: 用户资料
  | column | type | property |
  | ---------------- | --------------- | ---------------------------------------------------------------- |
  Id | Int | nextval |
  Name | String | |
  Email | String | |  
  Password | String |

- cart: 购物车
  | column | type | property |
  | ---------------- | --------------- | ---------------------------------------------------------------- |
  Id | Int | nextval (自动递增) |
  User_id | Int | |
  Product_id| Int | |
  Count| Int | |
  Status| Int | |

* product: 商品
  | column | type | property |
  | ---------------- | --------------- | ---------------------------------------------------------------- |
  Id | Int | nextval|
  Name | String| |
  Price | Float| |
  Category | String| |
  Img | Json| |
  Stock | Int| |
  Description | String| nullable |

- location: 地址
  | column | type | property |
  | ---------------- | --------------- | ---------------------------------------------------------------- |
  Id | Int | nextval |
  User_id | Int | |
  Username | String | |
  Phone | String | |
  Province | String | |
  City | String | |
  Area | String | |
  Address | String | |
  Postcode | String | |
  Default | Int | default: 0 |

- order: 订单
  | column | type | property |
  | ---------------- | --------------- | ---------------------------------------------------------------- |
  Id | Int | nextval |
  User_id | Int | |
  Location_id | Int | |
  ProductTotal | Float | default: 0 |
  CartTotal | Float | default: 0 |
  Count | Int | default: 0 |
  OrderStatus | Int | default: 0 |
  CreateAt | timestamp | nullable |
  UpdateAt | timestamp | nullable |

* orderProduct: 订单商品
  | column | type | property |
  | ---------------- | --------------- | ---------------------------------------------------------------- |
  Id | Int | nextval |
  Product_id | Int | |
  order_id | Int | |
  count | Int | |
  productPay | Float | default: 0 |

4. 云端图片/ api

- 宣传滑动图片

滑动图片暂存在 https://imgbb.com/ 中，这是一个免费图片上传库
地址:

- https://ibb.co/ftM6r8b
- https://ibb.co/K9dwwFQ
- https://ibb.co/0y6nVjm
- https://ibb.co/V3Wjp5b

* 库存数据
  RapidAPI 有 Taobao API 的 淘宝鞋子数据
  从中提取到 Hasura Graphql Database (链接：https://xiyou-server.herokuapp.com/console/data/schema/profile/tables)

5. local 部署和 Heroku 部署
   local 部署:

   ```
   npm install
   npm start
   ```

   heroku 部署:
   package.json config:

   ```
   "engines": {
    "node": "12.11.1"
    },
   ```

   ```
    "scripts": {
    "start": "node --max_old_space_size=2560 scripts/start.js",
    "build": "node --max_old_space_size=2560 scripts/build.js",
    "test": "node scripts/test.js"
    },
   ```

6. favicon 制作
   https://realfavicongenerator.net/ 上传下载
   index.html 内加入 link 和 meta

   ```
   <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
   <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
   <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
   <link rel="manifest" href="/site.webmanifest">
   <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
   <meta name="msapplication-TileColor" content="#da532c">
   <meta name="theme-color" content="#ffffff">
   ```
