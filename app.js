// require packages used in the project
const express = require('express')
const mongoose = require('mongoose') //載入 mongoose
const bodyParser = require('body-parser') //請改用內建 body-parser，不需另外安裝載入
const methodOverride = require('method-override')//載入 middleware _method-override(路由覆蓋機制)

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

// 設定路由 get 瀏覽全部餐廳
app.get('/', (req, res) => {
  Restaurant.find()                       //取出 store model 裡的所有資料
    .lean()          // 把 Mongoose 的 Model 物件，轉換成乾淨單純的 JS 資料陣列
    .then(restaurantsData => res.render("index", { restaurantsData }))
    .catch(error => console.error(error)) //如果發生意外，執行錯誤處理
})

// 設定路由 get 搜尋特定餐廳
app.get("/search", (req, res) => {
  if (!req.query.keywords) {
    res.redirect("/")
  }

  const keywords = req.query.keywords
  const keyword = req.query.keywords.trim().toLowerCase()

  Restaurant.find({})
    .lean()
    .then(restaurantsData => {
      const filterRestaurantsData = restaurantsData.filter(
        data =>
          data.name.toLowerCase().includes(keyword) ||
          data.category.includes(keyword)
      )
      res.render("index", { restaurantsData: filterRestaurantsData, keywords })
    })
    .catch(err => console.log(err))
})

// 設定路由 get 新增餐廳頁面
app.get("/restaurants/new", (req, res) => {
  res.render("new")
})

// 設定路由 get 瀏覽特定一間餐廳
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurantsData => res.render('show', { restaurantsData }))
    .catch(error => console.log(error))
})

// 設定路由 post 新增餐廳
app.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// 設定路由 get 編輯餐廳頁面
app.get("/restaurants/:restaurantId/edit", (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render("edit", { restaurantData }))
    .catch(err => console.log(err))
})

//methodOverride(路由覆蓋機制) 設定路由post，改成put 讀取查詢資料庫，接住修改後資料，送往資料庫儲存_ Update
app.put("/restaurants/:id", (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`)) //完成編輯後，導向瀏覽特定餐廳頁面
    .catch(err => console.log(err))
})

//methodOverride(路由覆蓋機制) 設定路由post，改成delete 讀取查詢資料庫，刪除特定資料_ Delete
app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// start and listen on The Express server
app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}`)
})
