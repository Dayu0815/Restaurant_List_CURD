const mongoose = require("mongoose") //載入mongoose
const Restaurant = require('../restaurant') // 載入 restaurant model
const db = require('../../config/mongoose') //載入 Mongoose連線設定
const restaurantList = require("../../restaurant.json").results // 載入種子資料


db.once('open', () => {
  console.log('Mongodb connected running script...')

  // 在資料庫建立種子資料
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!")
      db.close()
    })
    .catch(err => console.log(err))
})
