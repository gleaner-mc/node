let express = require('express');
let router = express.Router();
let mgdb = require('../../utils/mgdb')

router.get('/', (req, res, next) => { // api 下面的home
    // console.log('home')
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    //拿到携带参数
    let _id = req.query._id;
    if(_id){
        // 详情页
        getDetail(req,res,next,_id)
    }else{
        // 列表页
        let{_page,_limit,_sort,q}=req.query
        
        q = q ? {title:eval('/'+q +'/')} :{} // 全文检索
        mgdb({
            collectionName:'goods',
            success:({collection,client})=>{
                collection.find(q,{
                    limit:_limit,  // 一页多少条
                    skip:_page*_limit ,//跳过多少条
                    sort:{[_sort]:-1} //排序 默认降序（小于0）  _sort是属性 要变为变量加[]
                }).toArray((err,result)=>{
                    if(err){
                        res.send({ err: 1, msg: 'goods集合操作错误' })
                    }else{
                        res.send({ err: 0, data: result })   
                    }
                })
            }

        })
    }
})


router.get('/:id',(req,res,next)=>{
    getDetail(req, res, next, req.params.id) // 获取动态的接口id  req.params.id
    //拿到携带参数
  //兜库
  //返回值 浏览器
})


let getDetail = (req,res,next,_id)=>{
    mgdb({
        collectionName: 'goods',
        success: ({ collection, client, ObjectID }) => {
          collection.find({
            _id: ObjectID(_id)
          }, {
            }).toArray((err, result) => {
              if (err) {
                res.send({ err: 1, msg: 'home集合操作错误' })
              } else {
                if(result.length>0){
                  console.log(result.length)
                  res.send({ err: 0, data: result[0]})
                }else{
                  res.send({ err: 1, msg: '错误的id或者数据不存在' })
                }
                
              }
            })
        }
      })
}
module.exports = router;