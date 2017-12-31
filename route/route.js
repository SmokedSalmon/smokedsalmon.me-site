//WeChat verification for server ownership

module.exports = function(app) {
  app.get('/wechat-m', function (req, res, next) {
    var query = req.query;
    var echostr = query.echostr;
    res.send(echostr);
  });
};