import express = require('express');
import dotenv = require('dotenv');
import bodyParser = require('body-parser')
import fetch from 'node-fetch';
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(bodyParser.json());

dotenv.config();

const uri = "mongodb+srv://sunjotsingh:" + process.env.MDBPASS + "@tvtracker-bykmv.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

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

    let yearShort = res.locals.years[res.locals.years.length - 1].replace("-", "");
    let URLs: Array<string> = [];
    req.body.cats.map((cat: string) => {
        let URL = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=" + req.body.type + "&isGame=false&reportName=skatersummary&sort=[{%22property%22:%22" + cat + "%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + yearShort + "%20and%20seasonId%3C=" + yearShort + "%20and%20teamId=10";
        URLs.push(URL);
    });

    let [goals, assists, points] = await Promise.all([
        fetch(URLs[0]), fetch(URLs[1]), fetch(URLs[2])
    ]);

    let allSorted = [await goals.json(), await assists.json(), await points.json()];
    res.send(allSorted);
});

/*app.post('/api/basics', getYears, async (req, res) => {

    let yearShort = res.locals.years[res.locals.years.length - 1].replace("-", "");
    
    let sortGoals = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=basic&isGame=false&reportName=skatersummary&sort=[{%22property%22:%22goals%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + yearShort + "%20and%20seasonId%3C=" + yearShort + "%20and%20teamId=10";
    let sortAssists = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=basic&isGame=false&reportName=skatersummary&sort=[{%22property%22:%22assists%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + yearShort + "%20and%20seasonId%3C=" + yearShort + "%20and%20teamId=10";
    let sortPoints = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=basic&isGame=false&reportName=skatersummary&sort=[{%22property%22:%22points%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + yearShort + "%20and%20seasonId%3C=" + yearShort + "%20and%20teamId=10";
    let sortGoalsPer = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=core&isGame=false&reportName=skaterscoring&sort=[{%22property%22:%22goalsPer60Minutes%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + yearShort + "%20and%20seasonId%3C=" + yearShort + "%20and%20teamId=10";
    let sortAssistsPer = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=core&isGame=false&reportName=skaterscoring&sort=[{%22property%22:%22assistsPer60Minutes%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + yearShort + "%20and%20seasonId%3C=" + yearShort + "%20and%20teamId=10";
    let sortPointsPer = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=core&isGame=false&reportName=skaterscoring&sort=[{%22property%22:%22pointsPer60Minutes%22,%22direction%22:%22DESC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + yearShort + "%20and%20seasonId%3C=" + yearShort + "%20and%20teamId=10";
    
    let [goals, assists, points, goalsPer, assistsPer, pointsPer] = await Promise.all([
        fetch(sortGoals), fetch(sortAssists), fetch(sortPoints),
        fetch(sortGoalsPer), fetch(sortAssistsPer), fetch(sortPointsPer)
    ]);

    let allSorted = [await goals.json(), await assists.json(), await points.json(), 
        await goalsPer.json(), await assistsPer.json(), await pointsPer.json()];

    res.send(allSorted);
});*/

app.listen(3000, () => console.log(`Listening on 3000`));