var express = require('express');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);

console.log( 'Express starts to host static file on:' +__dirname + '\\public' + ' @ "public/assets"');
app.use('/public/assets', express.static(path.join(__dirname + '/public')));

// route to the landing pages for this experiment
app.get('/', function(req, res, next){
  res.sendFile(path.join(__dirname + '/index.html'));
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404');
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' + 
    app.get('port') + '; press Ctrl-C to terminate.' );
});