const express = require('express')
const router = express.Router()
const home = require('./modules/home') //引入 home模組程式碼
const restaurants = require('./modules/restaurants') //引入 restaurants模組程式碼

//將網址結構符合 / 字串的request 導向 home 模組
//將網址結構符合 /restaurants 字串的request 導向 restaurants 模組
router.use('/', home) //如果 request路徑是 / ，就執行 modules/home裡的程式碼
router.use('/restaurants', restaurants)

//匯出 router路由器
module.exports = router