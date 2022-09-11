const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/Restaurant")

// 設定路由 get 瀏覽全部餐廳
router.get("/", (req, res) => {
  Restaurant.find()
    .lean()                                   //取出  model 裡的所有資料
    .then(restaurantsData => res.render("index", { restaurantsData }))// 把 Mongoose 的 Model 物件，轉換成乾淨單純的 JS 資料陣列
    .catch(err => console.log(err)) //如果發生意外，執行錯誤處理
})

//匯出 router路由器
module.exports = router