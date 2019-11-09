let express = require('express');
let router = express.Router();
let mgdb = require('../../utils/mgdb')

router.get('/', (req, res, next) => {
    console.log('user')
    if(req.session['1909']){
        console.log('取到了')
        mgdb({
            collectionName:'user',
            success:({collection,client,ObjectID})=>{
                collection.find({
                    _id:ObjectID(req.session['1909'])
                },{}).toArray((err,result)=>{ // result返回一个数组
                    if(err){
                        res.send({err:1,msg:'错误'})
                    } else{
                        if (result.length > 0) {
                            
                            delete result[0].password
                            res.send({ err: 0, data: result[0] })
                          } else {
                            res.send({ err: 1, msg: '用户名不存在或者密码有误' })
                          }
                    }
                    client.close() 
                })
                
            }
        })
    }else{
        res.send({err:1,msg:'未登录'})
    }
})

module.exports = router;