# 餐廳清單 <img src="https://stickershop.line-scdn.net/stickershop/v1/sticker/425269463/iPhone/sticker_animation@2x.png" alt="Minions" title="Minions Restaurant" width='30' height='30'/>

**1.本次專案收集了我們最喜歡的 8 家餐廳，目前有提供餐廳查詢服務，以利找出在地的美食。**

**2.本次專案增加「新增」、「刪除」及「修改」餐廳資料等 3 項功能，提供更多瀏覽餐廳資訊的選擇服務。**

## 功能列表

* 可以在首頁看到所有餐廳與簡介資料：

  * 照片
  * 名稱
  * 分類
  * 評分

* 可以點選查看餐廳的詳細資訊：

  * 類別
  * 地址
  * 電話
  * 描述
  * 圖片

* 可以透過點選地圖標示 <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Font_Awesome_5_solid_map-marked-alt.svg" width="20" height="20"> ，連結至 Google Map，以利查看餐廳正確位置

* 可以有 2 種方式搜尋餐廳：
  * 餐廳名稱
  * 餐廳類別
 
## 安裝步驟 <img src="https://octodex.github.com/images/minion.png" alt="Minions" title="Minions" width='30px' height='30px'/>
* step 1.
```
點選 Code / Clone / HTTPS 專案至本機電腦，或是打開 terminal 進行專案儲存，輸入：git clone https://github.com/Dayu0815/Restaurant_List_CURD.git
```
* step 2. 
```
設定環境變數連線 MongoDB，輸入：MONGODB_URI=mongodb+srv://<Your MongoDB Account>:<Your MongoDB Password>@cluster0.xxxx.xxxx.net/<Your MongoDB Table><?retryWrites=true&w=majority
```
* step 3. 
```
進入專案資料夾，在終端機輸入：cd Restaurant_List_CURD
```
* step 4.
```
安裝 npm 套件，依序安裝啟動器 npm init -y ，安裝 Express npm i express@4.17.1
```
* step 5. 
```
執行專案，在終端機輸入：npm run dev
```
* step 6.
```
於網址列，輸入：localhost:3000
```

## 重構專案項目
**1.路由語義化RESTful API： 透過 HTTP 動詞與資源名稱表達 CRUD 功能**

**2.重構路由器Express.Router： 運用 Express.Router，將主程式 app.js 裡的路由清單分離成獨立路由器**

**3.重構連線設定Mongoose：將連線設定抽取成共用的設定檔**

## 開發工具 <img src="https://stickershop.line-scdn.net/stickershop/v1/sticker/179854889/iPhone/sticker_animation@2x.png" alt="Minions" title="Minions" width='30px' height='30px'/>
- Node.js 16.16.0
- express 4.17.1
- express-handlebars 3.0.0
- method-override 3.0.0
- MongoDB
- mongoose 6.0.5

## 開發者 <img src="https://stickershop.line-scdn.net/stickershop/v1/sticker/425269466/iPhone/sticker_animation@2x.png" alt="Minions" title="Minions" width='30px' height='30px'/>
**Minions** 
