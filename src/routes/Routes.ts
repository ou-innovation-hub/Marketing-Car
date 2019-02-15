import {Request, Response} from "express";
export class Routes {

    public setRoutes(app: any): void {
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });

        app.get('/', function (req: Request, res: Response) {
            res.render('index', {})
        });

        app.get('/emit', function(req:Request, res:Response){
            res.render('emit', {layout:false})
        });
        app.get('/visualize', function(req:Request, res:Response){
            res.render('visualize', {layout:false})
        });

    }
}