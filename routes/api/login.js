let express = require('express');
let router = express.Router();
let mgdb = require('../../utils/mgdb')
let bcrypt = require('bcrypt')


router.post('/', (req, res, next) => {
    console.log('login')
    let {username,password} = req.body
    mgdb({
        collectionName:'user',
        success:({collection,client})=>{
            collection.find({username},{}).toArray((err,result)=>{ // result返回一个数组
                if(err){
                    res.send({err:1,msg:'错误'})
                } else{
                    if(result.length>0){
                        let bl = bcrypt.compareSync(password, result[0].password); // true|false
                      if(bl){
                        
                        delete result[0].password

                        // 种cookie 留session
                        req.session['1909']=result[0]._id
                        console.log(req.session['1909'])
                        res.send({ err: 0, msg: '登录成功', data: result[0]})
                      }else{
                        res.send({ err: 1, msg: '用户名不存在或者密码有误1' })
                      }  
                    }else{
                        res.send({ err: 1, msg: '用户名不存在或者密码有误2' })
                    }
                }
                client.close() 
            })
            
        }
    })

})

module.exports = router;