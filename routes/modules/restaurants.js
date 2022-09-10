const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/Restaurant")

// 設定路由 get 新增餐廳頁面
router.get("/restaurants/new", (req, res) => {
  res.render("new")
})

// 設定路由 get 瀏覽特定一間餐廳
router.get("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render("show", { restaurantData }))
    .catch(err => console.log(err))
})

// 設定路由 post 新增餐廳
router.post("/restaurants", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})

// 設定路由 get 編輯餐廳頁面
router.get("/restaurants/:restaurantId/edit", (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantData => res.render("edit", { restaurantData }))
    .catch(err => console.log(err))
})

//methodOverride(路由覆蓋機制) 設定路由post，改成put 讀取查詢資料庫，接住修改後資料，送往資料庫儲存_ Update
router.put("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndUpdate(restaurantId, req.body)
    .then(() => res.redirect(`/restaurants/${restaurantId}`))
    .catch(err => console.log(err))
})

//methodOverride(路由覆蓋機制) 設定路由post，改成delete 讀取查詢資料庫，刪除特定資料_ Delete
router.delete("/restaurants/:restaurantId", (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findByIdAndDelete(restaurantId)
    .then(() => res.redirect("/"))
    .catch(err => console.log(err))
})
//匯出 router路由器
module.exports = router