var qs = require('querystring');
var http = require('http');
var path = require('path');

module.exports = function(app) {
  //WeChat verification for server ownership
  app.get('/wechat-m', function (req, res, next) {
    var query = req.query;
    var echostr = query.echostr;
    res.send(echostr);
  });
  
  // 1st step, request the 'code' ticket, related Wechat info are for testing only
  app.get('/wechat-auth', function (req, res, next) {
    var url_base = 'https://open.weixin.qq.com/connect/oauth2/authorize?',
        s_appid = 'appid=wx2a396a0704b080ea',
        s_rURL = 'redirect_uri=' + encodeURIComponent('http://smokedsalmon.me/wechat-oid'),
        s_rType = 'response_type=code',
        s_scope = 'scope=snsapi_base',
        s_state = 'state=123#wechat_redirect',
        url = url_base + s_appid + '&' + s_rURL + '&' + + s_rType + '&' + s_scope + '&' + s_state;
        console.log(url);
    res.redirect(url);
  });
  
  // 2nd step, use the code ticket t accquire openID
  app.get('/wechat-oid', function (req, res, next) {
    var query = req.query,
        code = query.code,
        url_base = 'api.weixin.qq.com',
        path = '/sns/oauth2/access_token?'
        s_appid = 'appid=wx2a396a0704b080ea',
        s_secret = 'secret=093dfcd5c0631a6269feab22c3d81569',
        s_code = '',
        s_grantType = 'grant_type=authorization_code',
        options = {}, request = {};
    
    if( !code || code === "" ) {
      res.write('error getting code, ');
      return;
    } else {
      //xhr = new XMLHttpRequest();
      s_code = 'code=' + code;
      path = path + s_appid + '&' + s_secret + '&' + s_code + '&' + s_grantType;
      console.log('Requesting openID - ' + url_base + path);
      //xhr.open('GET', url);
      //xhr.onload = function() {
      //  res.write(JSON.parse(xhr.responseText));
      //}
      options = {
        protocol: 'https:',
        hostname: url_base,
        path: path,
        method: 'GET',
      };
      
      request = http.request(options, function(response){
        console.log('STATUS: ' + response.statusCode);
        console.log('HEADERS: ' + JSON.stringify(response.headers));
        response.setEncoding('utf8');
        response.on('data', function(chunk){
          console.log('BODY: ' + chunk);
          res.write('BODY: ' + chunk);
        });
        
        response.on('end', function(){
          console.log('End of data in response');
        });
      });
      
      request.on('error', function(e) {
        console.error('problem with request: ' + e.message);
        res.write('problem with request: ' + e.message);
        return;
      });
      
      request.end();
    }
  });
  
  // a page for returning statics of my clients' projects
  app.get('/stat', function(req, res, next){
    var lang = req.query.lang,
        code = req.query.code;
    //if( code === '5a49af86d20810776a42fe8e' ) {
      if( code === '5a4bafafaeece138fd572e34' ) {
        res.sendFile(path.join(path.dirname(process.argv[1]) + '/views/stat_cn.html'));
    } else {
        res.sendFile(path.join(path.dirname(process.argv[1]) + '/views/stat404_cn.html'));
    }
  });
};