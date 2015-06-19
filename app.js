var express 	= require ( 'express' ),
	app 		= express();

var handlebars 	= require ( 'express3-handlebars' )
		.create({ defaultLayout : 'main'});
var fortunes = [
		"Conquer your fears or they will conquer you.", "Rivers need springs.",
		"Do not fear what you don't know.",
		"You will have a pleasant surprise.", "Whenever possible, keep it simple.",
	],
	names = [
		"Elan",
		"Ellie",
		"Elias"
	];

app.engine( 'handlebars', handlebars.engine);
app.set( 'view engine', 'handlebars' );

app.set( 'port', process.env.PORT || 3000 );

// static middleware
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
	res.render('home');
})
app.get('/about', function (req,res){
	var randomFortune = 
			fortunes[Math.floor(Math.random() * fortunes.length)];
	var randomName =
			names[Math.floor(Math.random()* names.length)];
	res.render('about', { fortune: randomFortune, name: randomName });
})

// custom 404 page; catch-all handler (middleware)
app.use( function ( req, res ){
	res.status( 404 );
	res.render('404');
});

//custom 500 page; catch-all error handler (middleware)
app.use( function ( req, res ){
	console.error(err.stack);
	res.status( 500 );
	res.type( '500' );
})

app.listen( app.get('port'), function() {
	console.log('Express Started:' + app.get('port') +'; press Ctrl - C to terminate');
})