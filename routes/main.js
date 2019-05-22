var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('main_view/homepage', {title : 'Design Your Website'});
});

module.exports = router;
