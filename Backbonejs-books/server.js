// Module dependencies.
var application_root = __dirname,		// 当前执行的js的目录路径
    express = require( 'express' ), //Web framework
    bodyParser = require('body-parser'), //Parser for reading request body
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration

//Create server
var app = express();
app.use(bodyParser());			// 这个必须放在 post api的前面，因为内部要涉及到解析body

mongoose.connect('mongodb://localhost/library_database');

var Book = new  mongoose.Schema({
	title:String,
	author:String,
	releaseDate:Date
});
var  BookModel = mongoose.model('Book',Book);

app.get('/api',function(req,res) {
	res.send('Library API is running.');
});

app.get('/api/books',function(req,res) {
	return  BookModel.find(function(err,books) {
		if(!err){
			return res.send(books);
		}else{
			return  console.log(err);
		}
	});
});

app.get('/api/books/:id',function(req,res){
	return BookModel.findById(req.params.id,function(err,book) {
		if(!err) {
			res.send(book);
		}else{
			console.log(err);
		}
	});
});	

app.put('/api/books/:id',function(req,res) {
	return BookModel.findById(req.params.id,function(err,book) {
		book.title = rew.body.title;
		book.author = rew.body.author;
		book.releaseDate= rew.body.releaseDate;

		return book.save(function(err) {
			if(!err) {
				console.log( req.title + "updated");
				return res.send(book);
			}else{
				console.log(err);
			}
		});
	});
});

app.delete('/api/books/:id',function(req,res) {
	return BookModel.findById(req.params.id,function(err,book) {
		return book.remove(function(err) {
			if(!err) {
				console.log( req.title + "updated");
				return res.send('success');
			}else{
				console.log(err);
			}
		});
	});
});

app.post('/api/books',function(req,res) {
	var book  = new BookModel({
		title:req.body.title,
		author:req.body.author,
		releaseDate:req.body.releaseDate
	});

	return book.save(function(err) {
		if(!err) {
			console.log('create');
			return res.send(book);
		}else{
			console.log(err);
		}
	});
});

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




//Start server
var port = 4711;

app.listen( port, function() {
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});