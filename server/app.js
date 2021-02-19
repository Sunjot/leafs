"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express = require("express");
var dotenv = require("dotenv");
var bodyParser = require("body-parser");
var node_fetch_1 = require("node-fetch");
var MongoClient = require('mongodb').MongoClient;
var app = express();
app.use(bodyParser.json());
dotenv.config({ path: __dirname + '/../.env' });
dotenv.config();
var uri = "mongodb+srv://sunjotsingh:" + process.env.MDBPASS + "@tvtracker-bykmv.mongodb.net/test?retryWrites=true&w=majority";
var client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var collection;
var players;
var general;
client.connect(function (err) {
    if (err)
        console.log(err);
    collection = client.db("leafs").collection("seasons");
    players = client.db("leafs").collection("players");
    general = client.db("leafs").collection("general");
});
app.get('/api/seasons', function (req, res) {
    collection.find({}).toArray(function (err, docs) {
        if (err)
            console.log(err);
        res.send(docs);
    });
});
app.get('/api/years', getYears, function (req, res) {
    res.send(res.locals.years);
});
function getYears(req, res, next) {
    general.find({}).toArray(function (err, docs) {
        if (err)
            console.log(err);
        res.locals.years = docs[0].years;
        next();
    });
}
app.post('/api/players', getYears, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var yearShort, URLs, _a, goals, assists, points, allSorted, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                yearShort = req.body.year ? req.body.year.replace("-", "") : res.locals.years[res.locals.years.length - 1].replace("-", "");
                URLs = [];
                req.body.cats.map(function (cat) {
                    /* let URL = "https://api.nhle.com/stats/rest/en/skater/summary?isAggregate=false&isGame=false&sort=[{%22property%22:%22" + cat + "%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + yearShort + "%20and%20seasonId%3C=" + yearShort + "%20and%20teamId=10"; */
                    var URL = "https://api.nhle.com/stats/rest/en/skater/" + req.body.report + "?isAggregate=false&isGame=false&sort=[{%22property%22:%22" + cat + "%22,%22direction%22:%22DESC%22}]&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=franchiseId%3D5%20and%20gameTypeId=2%20and%20seasonId%3C=" + yearShort + "%20and%20seasonId%3E=" + yearShort;
                    URLs.push(URL);
                });
                return [4 /*yield*/, Promise.all([
                        node_fetch_1["default"](URLs[0]), node_fetch_1["default"](URLs[1]), node_fetch_1["default"](URLs[2])
                    ])];
            case 1:
                _a = _c.sent(), goals = _a[0], assists = _a[1], points = _a[2];
                return [4 /*yield*/, goals.json()];
            case 2:
                _b = [_c.sent()];
                return [4 /*yield*/, assists.json()];
            case 3:
                _b = _b.concat([_c.sent()]);
                return [4 /*yield*/, points.json()];
            case 4:
                allSorted = _b.concat([_c.sent()]);
                res.send(allSorted);
                return [2 /*return*/];
        }
    });
}); });
app.listen(3005, function () { return console.log("Listening on 3005"); });
