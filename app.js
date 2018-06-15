const express = require('express'),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    connection = require('./app/config/connection'),
    routes = require('./app/controllers/routes'),
    
    app = express();

app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
urlencodedParser = bodyParser.urlencoded({extended:true});

// app.use('/', function (req, res, next) {
// console.log('Request Url:' + req.url);
// })


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// var router = express.Router();

// // test route
// router.get('/', function(req, res) {
//     res.json({ message: 'welcome to our upload module apis' });
// });

// //route to handle user registration
// router.post('/register',login.register);
// router.post('/login',login.login)
// app.use('/api', router);






connection.init();
routes.configure(app);

const port = process.env.PORT || 8000;
const server = app.listen(port, function(){
  console.log('Server listening on port ' + server.address().port);
});
