import express = require('express');
import dotenv = require('dotenv');
import bodyParser = require('body-parser')
import fetch from 'node-fetch';
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.json());

dotenv.config({path:__dirname+'/../.env'});
dotenv.config();

const uri = "mongodb+srv://sunjotsingh:" + process.env.MDBPASS + "@tvtracker-bykmv.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

var collection: any;
var players: any;
var general: any;

client.connect((err:string) => {
    if(err) console.log(err);
    collection = client.db("leafs").collection("seasons");
    players = client.db("leafs").collection("players");
    general = client.db("leafs").collection("general");
});


app.get('/api/seasons', (req, res) => {
    collection!.find({}).toArray((err: string, docs: Array<Object>) => {
        if(err) console.log(err);
        res.send(docs);
    });
});

app.get('/api/years', getYears, (req, res) => {
    res.send(res.locals.years);
});

function getYears(req: any, res: any, next: any) {
    general.find({}).toArray((err: string, docs: Array<any>) => {
        if (err) console.log(err);
        res.locals.years = docs[0].years;
        next();
    });
}

app.post('/api/players', getYears, async (req, res) => {
    // When calling the route as a result of an action (like changing the year itself on the page), 
    // the year will get passed as part of the body and so that will be used instead
    let yearShort = req.body.year? req.body.year.replace("-", "") : res.locals.years[res.locals.years.length - 1].replace("-", "");
    let URLs: Array<string> = [];
    
    req.body.cats.map((cat: string) => {
        /* let URL = "https://api.nhle.com/stats/rest/en/skater/summary?isAggregate=false&isGame=false&sort=[{%22property%22:%22" + cat + "%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + yearShort + "%20and%20seasonId%3C=" + yearShort + "%20and%20teamId=10"; */
        let URL = "https://api.nhle.com/stats/rest/en/skater/" + req.body.report + "?isAggregate=false&isGame=false&sort=[{%22property%22:%22" + cat + "%22,%22direction%22:%22DESC%22}]&start=0&limit=50&factCayenneExp=gamesPlayed%3E=1&cayenneExp=franchiseId%3D5%20and%20gameTypeId=2%20and%20seasonId%3C=" + yearShort + "%20and%20seasonId%3E=" + yearShort;
        URLs.push(URL);
    });

    let [goals, assists, points] = await Promise.all([
        fetch(URLs[0]), fetch(URLs[1]), fetch(URLs[2])
    ]);

    let allSorted = [await goals.json(), await assists.json(), await points.json()];
    res.send(allSorted);
});

app.listen(3005, () => console.log(`Listening on 3005`));