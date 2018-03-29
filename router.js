const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const UserInfo = require('./controllers/user');
const passport = require('passport');
const Productos = require('./controllers/products');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// we declare the middleware interceptors
const requireAuth = passport.authenticate('jwt', {session:false});
const requireSignin = passport.authenticate('local', {session:false});

module.exports = function(app){
    app.get('/', requireAuth, function(req,res){
        res.send({msg: "Authentication success!"});
    });
    app.post('/signin', requireSignin, Authentication.signin);
    app.post('/signup', Authentication.signup);
    // GET EMAIL OF THE USER IN ADMIN SECTION
    // app.get('/user', requireAuth, UserInfo.getUserInfo);
    app.get('/getAllProducts', requireAuth, Productos.getAllProducts);
    app.post('/saveProduct', requireAuth, Productos.saveProduct);
}