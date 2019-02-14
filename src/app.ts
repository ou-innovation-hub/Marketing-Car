import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";
import * as exphbs from 'express-handlebars';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import {Routes} from "./routes/Routes"

class App{
    public app: express.Application;
    public route:Routes = new Routes();
    public mongoURI = 'mongodb://ihub:Letmeinnovate1!@ds247852.mlab.com:47852/ihub_sign-in';

    constructor() {
        this.app = express();
        this.config();
        this.route.setRoutes(this.app);
        // this.setupSockets();
    }
    private config():void{
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'hbs');
        this.app.engine('hbs', exphbs({
            extname:'hbs',
            defaultLayout: 'default',
            layoutsDir: __dirname +'/views/pages',
            partialsDir: __dirname +'/views/partials/'
        }));
        // support application/json type post data
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cookieParser());
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(function(err:any, req:any, res:any, next:any){
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};
            //Render error page
            res.status(err.status || 500);
            res.render('error');
        })
    }

}
export default new App()