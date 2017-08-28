+ dev-server.js
       // mock 数据
        var appData = require('../data.json')
        var seller = appData.seller
        var goods = appData.goods
        var ratings = appData.ratings
        
        // 定义路由
        var apiRoutes = express.Router()
        
        apiRoutes.get('/seller', function (req, res) {
          res.json({
            errno: 0,
            data: seller
          })
        })
        
        apiRoutes.get('/goods', function (req, res) {
          res.json({
            errno: 0,
            data: goods
          })
        })
        
        apiRoutes.get('/ratings', function (req, res) {
          res.json({
            errno: 0,
            data: ratings
          })
        })
        
        // 注册api
        app.use('/api', apiRoutes)
 
