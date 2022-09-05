// 載入 mongoose
const mongoose = require('mongoose')

// 載入 store model
const Store = require('../store')

// 載入種子資料
const storeSeed = require('./store.json').results

// 連線至資料庫
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料連線狀態_連線異常_連線成功 顯示訊息
const db = mongoose.connection
db.on('error', () =>
  console.log('Mongodb error')
)
db.once('open', () => {
  console.log('Mongodb connected')

  // 在資料庫建立種子資料
  
  //Store.create(storeSeed)
 // console.log('done')
})