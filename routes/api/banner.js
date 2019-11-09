let express = require('express');
let router = express.Router();
let mgdb = require('../../utils/mgdb')

router.get('/', (req, res, next) => {
    console.log('banner',req.query._page,req.body._limit,req.query.sort)
})

module.exports = router;