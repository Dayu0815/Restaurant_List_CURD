// 載入 mongoose
const mongoose = require('mongoose')

// 載入 store model
const Restaurant = require('../restaurant')

// 載入種子資料
const restaurantList = require("../../restaurant.json").results

// 連線至資料庫
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料連線狀態_連線異常_連線成功 顯示訊息
const db = mongoose.connection
db.on('error', () =>
  console.log('Mongodb error')
)
db.once('open', () => {
  console.log('running restaurantSeeder script...')

  // 在資料庫建立種子資料
  Restaurant.create(restaurantList)
    .then(() => {
      console.log("restaurantSeeder done!")
      
    })
    .catch(err => console.log(err))
})
console.log(restaurantList)