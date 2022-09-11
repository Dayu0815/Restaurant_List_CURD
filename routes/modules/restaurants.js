const express = require("express")
const router = express.Router()
const Restaurant = require("../../models/Restaurant") //引用 Restaurant model

// 設定路由 get 新增餐廳頁面，記得刪除路由的前綴詞 /restaurants
router.get("/new", (req, res) => {
  res.render("new")
})

// 設定路由 post 新增餐廳，記得刪除路由的前綴詞 /restaurants
router.post("/new", (req, res) => {
  Restaurant.create(req.body)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})

// 設定路由 get 瀏覽特定一間餐廳，記得刪除路由的前綴詞 /restaurants
router.get("/:id", (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurantsData => res.render("show", { restaurantsData }))
    .catch(error => console.log(error))
})

// 設定路由 get 編輯餐廳頁面，記得刪除路由的前綴詞 /restaurants
router.get("/:restaurantId/edit", (req, res) => {
  const { restaurantId } = req.params
  Restaurant.findById(restaurantId)
    .lean()
    .then(restaurantsData => res.render("edit", { restaurantsData }))
    .catch(error => console.log(error))
})

//methodOverride(路由覆蓋機制) 設定路由post，改成put 讀取查詢資料庫，接住修改後資料，送往資料庫儲存_ Update
router.put("/:id", (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

//methodOverride(路由覆蓋機制) 設定路由post，改成delete 讀取查詢資料庫，刪除特定資料_ Delete
router.delete("/:id", (req, res) => {
  const id = req.params.id
  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect("/"))
    .catch(error => console.log(error))
})
//匯出 router路由器
module.exports = router