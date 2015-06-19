var express 	= require ( 'express' ),
    app 	= express(),
    fortune     = require( './lib/fortnue.js' ),
    handlebars 	= require ( 'express3-handlebars' )
		.create({ defaultLayout : 'main'});

app.engine( 'handlebars', handlebars.engine);
app.set( 'view engine', 'handlebars' );

app.set( 'port', process.env.PORT || 3000 );

// static middleware
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res){
	res.render('home');
})
app.get('/about', function (req,res){
	var randomName =
			names[Math.floor(Math.random()* names.length)];
	res.render('about', { fortune: fortune.getFortune() });
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
