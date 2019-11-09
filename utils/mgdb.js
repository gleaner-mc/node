let mongodb = require('mongodb'); // 引入模块
let mongoCt = mongodb.MongoClient; // 创建客户端
let ObjectID = mongodb.ObjectID;


module.exports = ({
    url,dbName,collectionName,success,error
})=>{
    url = url || 'mongodb://127.0.0.1:27017';
    dbName = dbName || 'vue'
    mongoCt.connect(url,{useUnifiedTopology:true},(err,client)=>{
        if(err){
            error && error('库链接错误')
        }else{
            let db = client.db(dbName) // 链库
            let collection =db.collection(collectionName) // 链接集合
            success &&success({collection,client,ObjectID})
        }
    })
}