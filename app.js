// require packages used in the project
const express = require('express')
const bodyParser = require('body-parser') //請改用內建 body-parser，不需另外安裝載入
const methodOverride = require('method-override')//載入 middleware _method-override(路由覆蓋機制)
const routes = require('./routes') //載入 Router路由器
require('./config/mongoose') //載入 Mongoose連線設定

const app = express()
const port = 3000

// 設定 Express 使用的樣板引擎 (template engine) 
const exphbs = require('express-handlebars')

// setting 樣板引擎 (template engine)指定副檔名改寫成短檔名.hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting Bootstrap 三組靜態檔案（static files）
app.use(express.static('public'))

//設定每一筆請求，都要透過 body-parser，都要透過 methodOverride(路由覆蓋機制) 前置處理
//將 request 導入 Router路由器
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(routes)

// start and listen on The Express server
app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}`)
})
