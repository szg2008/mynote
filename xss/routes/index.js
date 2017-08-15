var express = require('express');
var router = express.Router();

var commments = {};

function html_encode(str) {
    var s = '';
    if(str.length == 0) return ''
    s = str.replace(/&/g,'&gt;');
    s = str.replace(/</g,'&lt;');
    s = str.replace(/>/g,'&gt;');
    s = str.replace(/\s/g,'&nbsp;');
    s = str.replace(/\'/g,'&#39;');
    s = str.replace(/\"/g,'&#quot;');
    s = str.replace(/\n/g,'<br/>');
    return s;
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.set('X-XSS-Protection',0);
    res.render('index', { title: 'Xss'});
});

router.get('/comment',function(req,res,next){
    commments.v = html_encode(req.query.comment);
    res.end();
})

router.get('/getComment',function(req,res,next){
    res.json({
        comment:commments.v
    })
})

module.exports = router;
