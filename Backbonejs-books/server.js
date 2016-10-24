// Module dependencies.
var application_root = __dirname,		// 当前执行的js的目录路径
    express = require( 'express' ), //Web framework
    bodyParser = require('body-parser'), //Parser for reading request body
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();

app.get('/api',function(req,res) {
	res.send('Library API is running.');
});

mongoose.connect('mongodb://localhost:27017/library_database');

var Book = new  mongoose.Schema({
	title:String,
	author:String,
	releaseDate:Date
});

var  BookModel = mongoose.model('Book',Book);

app.configure(function() {
	app.use( express.bodyParser());
	app.use( express.methodOverride());

	app.use(app.router);

	//Where to serve static content
	var  static_path =  path.join( application_root,'site');
	console.log(" The static  fils path is %s",static_path);
	app.use( express.static(static_path) );
	app.use(express.errorHandler({
		dumpExceptions:true,
		showStack: true
	}) );
});

app.get('api/books',function(req,res) {
	return  BookModel.find(function(err,books) {
		if(!err){
			return res.send(books);
		}else{
			return  console.log(err);
		}
	});
});


//Start server
var port = 4711;

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});