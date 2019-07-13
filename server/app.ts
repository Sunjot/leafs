import express = require('express');
import dotenv = require('dotenv');
import fetch = require('node-fetch');
const MongoClient = require('mongodb').MongoClient;

const app = express();
dotenv.config();

const uri = "mongodb+srv://sunjotsingh:" + process.env.MDBPASS + "@tvtracker-bykmv.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

var collection: any;
var players: any;
client.connect((err:string) => {
    if(err) console.log(err);
    collection = client.db("leafs").collection("seasons");
    players = client.db("leafs").collection("players");
});


app.get('/api/seasons', (req, res) => {
    collection!.find({}).toArray((err: string, docs: Array<Object>) => {
        if(err) console.log(err);
        res.send(docs);
    });
});

app.get('/api/players', (req, res) => {
    players.find({}).toArray((err: string, docs: Array<Object>) => {
        if(err) console.log(err);
        res.send(docs);
    });
});

app.listen(3000, () => console.log(`Listening on 3000`));