let express = require('express');
let router = express.Router();
let mgdb = require('../../utils/mgdb')

router.delete('/', (req, res, next) => {
    console.log(req.body)
    req.session['1909']=undefined;
    
  res.send({err:0,msg:'注销成功'})
})

module.exports = router;