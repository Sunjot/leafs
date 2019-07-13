import mongoose = require('mongoose');
import dotenv = require('dotenv');
import fetch from 'node-fetch';

mongoose.set('useFindAndModify', false);
const Schema = mongoose.Schema;

var playerSchema = new Schema({
    name: String,
    position: String,
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

async function update(year: string) {
    let basic = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=basic&isGame=false&reportName=skatersummary&sort=[{%22property%22:%22playerName%22,%22direction%22:%22ASC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + year + "%20and%20seasonId%3C=" + year + "%20and%20teamId=10";
    let adv = "https://api.nhle.com/stats/rest/skaters?isAggregate=false&reportType=core&isGame=false&reportName=skaterscoring&sort=[{%22property%22:%22playerName%22,%22direction%22:%22ASC%22}]&factCayenneExp=gamesPlayed%3E=40&cayenneExp=leagueId=133%20and%20gameTypeId=2%20and%20seasonId%3E=" + year + "%20and%20seasonId%3C=" + year + "%20and%20teamId=10";
    let playerDoc = {};
    
    try {
        let [totals, rates] = await Promise.all([
            fetch(basic).then(res => res.json()),
            fetch(adv).then(res => res.json())
        ]);

        totals.data.map(async (player: any, x: number) => {
            
            let profileURL = "https://statsapi.web.nhl.com/api/v1/people/" + player.playerId + "?expand=person.stats&stats=yearByYear,careerRegularSeason&expand=stats.team&site=en_nhlCA";
            let profile = (await fetch(profileURL).then(res => res.json())).people[0];
            
            Object.assign(playerDoc, {
                name: profile.fullName,
                position: profile.primaryPosition.name,
                height: profile.height,
                weight: profile.weight
            });
            

            Player.findOneAndUpdate({name: profile.fullName}, playerDoc, {upsert: true, new: true}, (err, pl ) => {
                let exists = false;
                pl.get('stats').map((season: any, x:number) => {
                    if (season.year === year) exists = true;
                });

                if (exists === false) {
                    pl.updateOne({
                        $push: { stats: {
                            year: year,
                            gp: player.gamesPlayed,
                            goals: player.goals,
                            g60: rates.data[x].goalsPer60Minutes,
                            assists: player.assists,
                            a60: rates.data[x].assistsPer60Minutes,
                            points: player.points,
                            p60: rates.data[x].pointsPer60Minutes,
                            PPP: player.ppPoints
                        }}
                    }, null, () => {});
                }
                
            });
        });
        
    } catch(error) {
        console.log(error);
    }
}

update("20162017");