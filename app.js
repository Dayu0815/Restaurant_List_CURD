// require packages used in the project
const express = require('express')
const mongoose = require('mongoose') //載入mongoose

const methodOverride = require('method-override')//引用 middleware _method-override

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

// setting 套用內建 body parser
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

// 設定路由 put 更新餐廳
app.put("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    //可依照專案發展方向自定編輯後的動作，這邊是導向到瀏覽特定餐廳頁面
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

// 設定路由 delete 刪除餐廳
app.delete("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// start and listen on The Express server
app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}`)
})
