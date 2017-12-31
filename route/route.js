module.exports = function(app) {
  //WeChat verification for server ownership
  app.get('/wechat-m', function (req, res, next) {
    var query = req.query;
    var echostr = query.echostr;
    res.send(echostr);
  });
  
  app.get('/wechat-auth', function (req, res, next) {
    var url_base = 'https://open.weixin.qq.com/connect/oauth2/authorize?',
        s_appid = 'appid=wx2a396a0704b080ea',
        s_rURL = 'redirect_uri=' + encodeURIComponent('http://smokedsalmon.me'),
        s_rType = 'response_type=code',
        s_scope = 'scope=snsapi_base',
        s_state = 'state=123#wechat_redirect',
        url = url_base + s_appid + '&' + s_rURL + '&' + + s_rType + '&' + s_scope + '&' + s_state;
        console.log(url);
    res.redirect(url);
  });
};