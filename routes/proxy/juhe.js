let express = require('express')
let router = express.Router()
let http = require('http');


router.get('/',(reg,res,next)=>{
     /* let {start,count} = req.query;
  start = start || 1;
  count = count || 5; */ // 从多少开始 拿多少条 
  
  //http://v.juhe.cn/toutiao/index?type=&key=55f8053eba54dab5a301a00f45523164
  

  // 数据代理proxy:		request请求 抓取异步数据
  let options={
    hostname:'v.juhe.cn', //域名
    port:80, // 端口 
    path:`/toutiao/index?type=&key=55f8053eba54dab5a301a00f45523164`, // 接口
    method:'GET' // 请求方式 
  };

  let reqHttp = http.request(options,(resHttp)=>{
      let str = '';
      resHttp.on('data',(chunk)=>{
        str += chunk ;
      })
      resHttp.on('end',()=>{
          res.send(JSON.parse(str))
      })
  })

   //reqHttp 请求对象
   reqHttp.on('error', (err) => { console.log(err) });	//监听请求失败信息
   reqHttp.end();//一定 主动请求结束
})

module.exports = router;