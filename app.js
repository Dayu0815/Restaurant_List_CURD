// require packages used in the project
const express = require('express')
const mongoose = require('mongoose') //載入 mongoose
const bodyParser = require('body-parser') //請改用內建 body-parser，不需另外安裝載入
const methodOverride = require('method-override')//載入 middleware _method-override(路由覆蓋機制)
const routes = require('./routes') //載入 Router路由器
require('./config/mongoose') //載入 Mongoose連線設定

const Restaurant = require("./models/Restaurant") //載入 Restaurant model
const app = express()
const port = 3000

// 設定 Express 使用的樣板引擎 (template engine) 
const exphbs = require('express-handlebars')

// setting 樣板引擎 (template engine)指定副檔名改寫成短檔名.hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting Bootstrap 三組靜態檔案（static files）
app.use(express.static('public'))

//設定每一筆請求，都要透過 body-parser 前置處理，都要透過 methodOverride(路由覆蓋機制) 前置處理
//將 request 導入 Router路由器
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(routes)

// 設定連線 mongoDB，設定環境變數，將指定資訊傳入程式碼，在連線資料庫時傳入設定，直接把兩組設定合併，更新語法 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料連線狀態_連線異常_連線成功 顯示訊息
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})


// start and listen on The Express server
app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}`)
})
