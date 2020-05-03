// 載入express
const express = require('express')
const app = express()
//載入樣板引擎(handlebars)
const exphbs = require('express-handlebars')
//載入JSON
const restaurantList = require('./restaurant.json')
//定義和伺服器有關的變數
const port = 3000
//使用express傳送res給使用者
app.get('/', (req, res) => {
  // res.send(`This is restaurant page`)
  res.render('index', { restaurants: restaurantList.results })
})
//設定路由提供靜態檔案
app.use(express.static('public'))
//設定樣板引擎(engine/set)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
// 建立動態路由，透過req.params取得內容
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(e => e.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})
// 建立搜尋功能，透過req.query取得網址?後的查詢字串
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})
//監聽並啟用伺服器
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})