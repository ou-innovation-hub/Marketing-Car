"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Routes = /** @class */ (function () {
    function Routes() {
    }
    Routes.prototype.setRoutes = function (app) {
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
        app.get('/', function (req, res) {
            res.render('index', {});
        });
        app.get('/emit', function (req, res) {
            res.render('emit', { layout: false });
        });
        app.get('/visualize', function (req, res) {
            res.render('visualize', { layout: false });
        });
    };
    return Routes;
}());
exports.Routes = Routes;
//# sourceMappingURL=Routes.js.map