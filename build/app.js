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
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const node_fetch_1 = require("node-fetch");
const MongoClient = require('mongodb').MongoClient;
const app = express();
app.use(bodyParser.json());
dotenv.config();
const uri = "mongodb+srv://sunjotsingh:" + process.env.MDBPASS + "@tvtracker-bykmv.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
var collection;
var players;
var general;
client.connect((err) => {
    if (err)
        console.log(err);
    collection = client.db("leafs").collection("seasons");
    players = client.db("leafs").collection("players");
    general = client.db("leafs").collection("general");
});
app.get('/api/seasons', (req, res) => {
    collection.find({}).toArray((err, docs) => {
        if (err)
            console.log(err);
        res.send(docs);
    });
});
app.get('/api/years', getYears, (req, res) => {
    res.send(res.locals.years);
});
function getYears(req, res, next) {
    general.find({}).toArray((err, docs) => {
        if (err)
            console.log(err);
        res.locals.years = docs[0].years;
        next();
    });
}
app.post('/api/players', getYears, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // When calling the route as a result of an action (like changing the year itself on the page), 
    // the year will get passed as part of the body and so that will be used instead
    let yearShort = req.body.year ? req.body.year.replace("-", "") : res.locals.years[res.locals.years.length - 1].replace("-", "");
    let URLs = [];
    req.body.cats.map((cat) => {
        let URL = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=" + req.body.type + "&isGame=false&reportName=skater" + req.body.report + "&sort=[{%22property%22:%22" + cat + "%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + yearShort + "%20and%20seasonId%3C=" + yearShort + "%20and%20teamId=10";
        URLs.push(URL);
    });
    let [goals, assists, points] = yield Promise.all([
        node_fetch_1.default(URLs[0]), node_fetch_1.default(URLs[1]), node_fetch_1.default(URLs[2])
    ]);
    let allSorted = [yield goals.json(), yield assists.json(), yield points.json()];
    res.send(allSorted);
}));
app.listen(3005, () => console.log(`Listening on 3005`));
//# sourceMappingURL=app.js.map