// require packages used in the project
const express = require('express')
const mongoose = require('mongoose') //載入mongoose

const app = express()
const port = 3000

// require express-handlebars 設定在 Express 使用的樣板引擎 (template engine)
const exphbs = require('express-handlebars')

//設定連線到 mongoDB，設定環境變數，將指定資訊傳入程式碼，在連線資料庫時傳入設定，直接把兩組設定合併成一個物件，更新語法 
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

//取得資料連線狀態
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})



// routes setting1 _create a variable to store restaurants ，.send使用反引號（`）
app.get('/', (req, res) => {
  // past the restaurant data into 'index' 局部模板（partial template）
  res.render('index', { stores: storeList.results })
})

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