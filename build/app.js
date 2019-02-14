"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var exphbs = require("express-handlebars");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var Routes_1 = require("./routes/Routes");
var App = /** @class */ (function () {
    function App() {
        this.route = new Routes_1.Routes();
        this.mongoURI = 'mongodb://ihub:Letmeinnovate1!@ds247852.mlab.com:47852/ihub_sign-in';
        this.app = express();
        this.config();
        this.route.setRoutes(this.app);
        // this.setupSockets();
    }
    App.prototype.config = function () {
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'hbs');
        this.app.engine('hbs', exphbs({
            extname: 'hbs',
            defaultLayout: 'default',
            layoutsDir: __dirname + '/views/pages',
            partialsDir: __dirname + '/views/partials/'
        }));
        // support application/json type post data
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(function (err, req, res, next) {
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            //Render error page
            res.status(err.status || 500);
            res.render('error');
        });
    };
    return App;
}());
exports.default = new App();
//# sourceMappingURL=app.js.map