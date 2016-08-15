var db = require('mongoose')
db.connect('mongodb://localhost/spiler-app_db')
var Fiction = db.model('fiction',{
    title:{type:String,default:''},
    imgUrl:{type:String,default:''},
    author:{type:String,default:''},
})
///导出模板
module.exports = {
    Fiction:Fiction
}


