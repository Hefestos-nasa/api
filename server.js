var express         = require('express')
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var database        = require('./config/database');
var passport 		= require('passport');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var express 		= require('express')
var flash    		= require('connect-flash')
//var expressLayouts 	= require('express-ejs-layouts')
var session      	= require('express-session')
var app             = express()
	, server 		= require('http').createServer(app).listen(4555)

mongoose.connect(database.mongolab.url)
require('./config/passport')(passport)

//app.set('view engine', 'ejs')

app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', 
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(__dirname + '/public'))
app.use(morgan('dev'))                                         
app.use(bodyParser.json())                                     
app.use(bodyParser.urlencoded({extended: true}))               
app.use(bodyParser.text())                                  
app.use(bodyParser.json({ type: 'application/vnd.api+json'}))
app.use(methodOverride())
app.use(flash())



var router = express.Router()
require('./app/routes.js')(app, passport)


app.listen(port);
console.log('App listening on port ' + port);
