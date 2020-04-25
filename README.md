## 西柚电商 web app

## 项目介绍

`西柚电商`项目是一套电商系统，包括前台商城系统及后台管理系统。包含首页门户、商品推荐、商品搜索、商品展示、购物车、订单流程、会员中心。

## 项目演示

### 后端技术

| 技术     | 说明           | 官网                       |
| -------- | -------------- | -------------------------- |
| Hasura   | 开源引擎       | https://https://hasura.io/ |
| RabbitMq | 消息队列       | https://www.rabbitmq.com/  |
| Redis    | 分布式缓存     | https://redis.io/          |
| Apollo   | graphql 数据库 | www.apollographql.com/     |

### 前端技术

| 技术             | 说明                    | 官网                                   |
| ---------------- | ----------------------- | -------------------------------------- |
| AntDesign Mobile | 前端 UI 框架            | https://mobile.ant.design/             |
| Axios            | 前端 HTTP 框架          | https://github.com/axios/axios         |
| v-charts         | 基于 Echarts 的图表框架 | https://v-charts.js.org/               |
| Js-cookie        | cookie 管理工具         | https://github.com/js-cookie/js-cookie |
| AntDesign        | 进度条控件              | https://ant.design/components/icon/    |

## 开发模块

1. npm

- 引入模块
- 部署开发

2. babel

- babel-core:
- babel-preset-env: 为了支持 ES5, ES6 supporting part
- babel-preset-react: react 支持

3. webpack

- webpack-cli: 用 CLI 去 starting dev server, creating production build, etc.
- webpack-dev-server: 自动 refresh
- html-webpack-plugin: 创建 HTML 模版

## 项目框架

## 流程记录

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
- cart: 购物车
- product: 商品
- location: 地址

4. 云端图片/ api

1) 宣传滑动图片

滑动图片暂存在 https://imgbb.com/ 中，这是一个免费图片上传库
地址:

- https://ibb.co/ftM6r8b
- https://ibb.co/K9dwwFQ
- https://ibb.co/0y6nVjm
- https://ibb.co/V3Wjp5b

2. 库存数据
   RapidAPI 有 Taobao API 的 淘宝鞋子数据
   从中提取到 Hasura Graphql Database (链接：https://xiyou-server.herokuapp.com/console/data/schema/profile/tables)
