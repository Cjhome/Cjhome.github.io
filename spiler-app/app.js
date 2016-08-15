var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var app = express();

var crawler = require('crawler')
var db = require('./db')
var url = require('url')
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// var indexPage = 1

// function doSpider(url) {
//   var c = new crawler({
//     maxConnections: 10,
//     callback: function (error, result, $) {
//       $('.list li').each(function (index, a) {
//         var imgUrl = $(a).find('.o-img a img').attr('src')
//         console.log(imgUrl)
//         var title = $(a).find('.o-img a img').attr('title')
//         console.log(title)
//         var author = $(a).find('.o-author a').text()
//         console.log(author)
//         var fiction = new db.Fiction()///object对象
//         fiction.imgUrl = imgUrl
//         fiction.title = title
//         fiction.author = author
//         fiction.save((err) => {
//           if (err) {
//             console.log(err)
//           } else {

//           }
//         })
//         // }

//       })
//       console.log(`--------第${indexPage}读取完成----------`)
//       if (indexPage < 10000) {
//         indexPage++
//         doSpider('http://kankandou.com/book/%E5%B0%8F%E8%AF%B4/' + indexPage)//递归
//       }
//     }
//   })
//   c.queue(url)
// }

// doSpider('http://kankandou.com/book/%E5%B0%8F%E8%AF%B4')

app.get('/spiler/:page', (req, res) => {
  var page = req.params.page
  page = page || 1
  var pageSize = 16
  /**
   * 获取数据的总数   total 有多少条数据
   */
  db.Fiction.find().count((err, total) => {
    if (err) {
      console.log(err)
    }
    ///分成几页显示
    var pageCount = Math.ceil(total / pageSize)
    if (page > pageCount) {
      page = pageCount
    }
    if (page < 1) {
      page = 1
    }
    /***
     * skip()跳过多少条数据
     limit() 显示多少条数据
     */
    db.Fiction.find().skip((page - 1) * pageSize).limit(pageSize).exec((err, data) => {
      res.json({data: data})
    })
  })
})

app.listen(3000, (req, res) => {
  console.log('3分的努力，7分的付出.........')
})