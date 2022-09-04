// require packages used in the project
const express = require('express')
const mongoose = require('mongoose') //載入mongoose
const Store = require('./models/store') //載入 store model
const bodyParser = require('body-parser') //引用 body-parser
const app = express()
const port = 3000

// 設定 Express 使用的樣板引擎 (template engine) 
const exphbs = require('express-handlebars')

// setting 樣板引擎 (template engine)指定副檔名改寫成短檔名.hbs
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting Bootstrap 三組靜態檔案（static files）
app.use(express.static('public'))

// setting body parser
app.use(bodyParser.urlencoded({ extended: true }))


// 設定連線到 mongoDB，設定環境變數，將指定資訊傳入程式碼，在連線資料庫時傳入設定，直接把兩組設定合併，更新語法 
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
  Store.find()                             //取出 store model 裡的所有資料
    .lean()                               // 把 Mongoose 的 Model 物件，轉換成乾淨單純的 JS 資料陣列
    .then(stores => {
      const name = stores.forEach(store => store.name)
      res.render('index', { stores, name })// 將 stores 資料，傳給前端 index 樣版
    })
    .catch(error => console.error(error)) //如果發生意外，執行錯誤處理
})

// routes setting1 _create a variable to store restaurants
//app.get('/', (req, res) => {
// past the restaurant data into 'index' 局部模板（partial template）
// res.render('index', { store: Store.results })
//})

// routes setting2 _search .store_id
app.get('/stores/:store_id', (req, res) => {
  const store = storeList.results.find(store => store.id.toString() === req.params.store_id)
  res.render('show', { store: store })
})

// routes setting3 _search .condition
app.get('/search', (req, res) => {
  const condition = req.query.condition
  const keyword = req.query.keyword
  let conditionResult = ''

  // filter 餐廳名稱.name
  if (condition === 'name') {
    const stores = storeList.results.filter(store => {
      return store.name.includes(keyword)
    })

    // not found
    if (stores.length === 0) {
      conditionResult = '沒有您要找的資料 !!!'
      return res.render('index', { stores: storeList.results, keyword, name: condition, conditionResult })
    }

    conditionResult = `發現:${stores.length} 筆`
    return res.render('index', { stores: stores, keyword, name: condition, conditionResult })
  }

  //filter 餐廳類別.category
  if (condition === 'type') {
    const stores = storeList.results.filter(store => {
      return store.category.includes(keyword)
    })
    // not found
    if (stores.length === 0) {
      conditionResult = '沒有您要找的資料 !!!'
      return res.render('index', { stores: storeList.results, keyword, type: condition, conditionResult })
    }
    conditionResult = `發現:${stores.length} 筆`
    return res.render('index', { stores: stores, keyword: keyword, type: condition, conditionResult })
  }
  conditionResult = '請選擇條件!!!'
  res.render('index', { stores: storeList.results, keyword, conditionResult })
})

// render
//res.render('index', { stores: stores })})

// start and listen on The Express server
app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}`)
})