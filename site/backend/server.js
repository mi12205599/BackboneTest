var  application_root =  __dirname,
	 express = require('express'),
	 bodyParser = require('body-parser'),
	 path =require('path'),
	 mongoose = require('mongoose');

 var  app  = express();

 app.use( express.static( path.join( application_root,'../','site') ));
 app.use(bodyParser() );

 var  port = 4711;
 
 app.listen( port,function() {
 	console.log(' Express  server listen  on port  %d in %s node',port, app.settings.env);
 });
