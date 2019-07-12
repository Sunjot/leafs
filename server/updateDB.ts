import mongoose = require('mongoose');
import dotenv = require('dotenv');
import fetch from 'node-fetch';

mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: String,
    position: String,
    number: Number,
    height: String,
    weight: Number,
    stats: [{
        year: String,
        gp: Number,
        goals: Number,
        g60: Number,
        assists: Number,
        a60: Number,
        points: Number,
        p60: Number,
        PPP: Number
    }]
}, {collection: "players" });

var Player = mongoose.model('Player', playerSchema);

dotenv.config();

const uri: string = "mongodb+srv://sunjotsingh:" + process.env.MDBPASS + "@tvtracker-bykmv.mongodb.net/leafs?retryWrites=true&w=majority";

mongoose.connect(uri, {useNewUrlParser: true}).catch(function(err: string) {
    console.log("Error connecting to DB: " + err);
});
  
var db: any = mongoose.connection; // Connection established
db.once('open', () => {
console.log("Connection established to MongoDB Cluster");
});

async function insertPlayer(year: string) {
    let basic = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=basic&isGame=false&reportName=skatersummary&sort=[{%22property%22:%22playerName%22,%22direction%22:%22ASC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + year + "%20and%20seasonId%3C=" + year + "%20and%20teamId=10";
    let adv = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=core&isGame=false&reportName=skaterscoring&sort=[{%22property%22:%22playerName%22,%22direction%22:%22ASC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + year + "%20and%20seasonId%3C=" + year + "%20and%20teamId=10";
    let playerDoc = {};
    
    try {
        let [totals, rates] = await Promise.all([
            fetch(basic).then(res => res.json()),
            fetch(adv).then(res => res.json())
        ]);

        totals.data.map(async (player: any, x: number) => {
            
            let profileURL = "https://statsapi.web.nhl.com/api/v1/people/" + player.playerId;
            let profile = (await fetch(profileURL).then(res => res.json())).people[0];
            Object.assign(playerDoc, {
                name: profile.fullName,
                position: profile.primaryPosition.name,
                number: profile.primaryNumber,
                height: profile.height,
                weight: profile.weight,
                stats: [{
                    year: year,
                    gp: player.gamesPlayed,
                    goals: player.goals,
                    g60: rates.data[x].goalsPer60Minutes,
                    assists: player.assists,
                    a60: rates.data[x].assistsPer60Minutes,
                    points: player.points,
                    p60: rates.data[x].pointsPer60Minutes,
                    PPP: player.ppPoints
                }]
            });
            
            Player.findOneAndUpdate({name: profile.fullName}, playerDoc, {upsert: true}, (err, p ) => {});
        });
        
    } catch(error) {
        console.log(error);
    }

    /*fetch(teamURL, {
        method: 'GET'
    }).then((res) => {
        return res.json()
    }).then((res) => {
        res.data.map((player: any, x: number) => {
            Object.assign(playerDoc, {
                name: player.playerName, 
                position: player.playerPositionCode,
                weight: player.playerWeight,
                stats: [{}]
            });
            Player.findOne({playerName: player.playerName}, (error, sh) => {
                if (sh === null) {
                    
                }
            });
            
        });
    }).catch((error) => {
        console.log(error);
    });*/
}

insertPlayer("20182019");