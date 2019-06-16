var shelljs = require('shelljs');
var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/hw4.html');
});

app.get ('/api', function (req, res) {

	//console.log ('url:' + req.url);

	var r = req.query.r; // ("argv");
	var cx = req.query.cx;
	var cy = req.query.cy;
	var Rmaxx = req.query.Rmaxx;
	var Rmaxy = req.query.Rmaxy;
	var Rminx = req.query.Rminx;
	var Rminy = req.query.Rminy;
	
	console.log("r ",r);
	console.log("circle x",cx," circle y",cy);
	console.log("x max",Rmaxx," y max",Rmaxy);
	console.log("min x",Rminx," min y",Rminy);
	shelljs.exec('checkcolision.exe '  + cx + ' ' + cy + ' ' + r + ' ' + Rmaxx + ' ' + Rmaxy + ' ' + Rminx + ' ' + Rminy, function(status, output) {
	     //console.log('Exit status:', status);
		 // console.log('Output:', output);
		 
          var output = {
          	status: status,
          	output: output
          };

          /*
            The response header for supporting CORS:
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
          */

		  res.writeHead(200, {
		  	"Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type"
		  });
	
		  res.write(JSON.stringify(output));
		  res.end();

	});
   });


// or simply
// app.listen (1337); 
// will do

var server = app.listen (1337, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log ('server started on http://' + host + ':' + port);
});