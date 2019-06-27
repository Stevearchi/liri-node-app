require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
var spotify = new Spotify(keys.spotify);

// node liri.js concert-this <artist/band name here>
function bandsTown(bandName) {
    axios.get("https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp").then(function (response) {


        // loop through each concert brought back from api
        response.data.forEach(function (concert) {
            momentDate = moment(concert.datetime, 'YYYY/MM/DD').format('MM/DD/YYYY');
            console.log(`Venue: ${concert.venue.name}`); //      * Venue location
            console.log(`Location: ${concert.venue.city}, ${concert.venue.region} ${concert.venue.country}`); // Date of the Event (use moment to format this as "MM/DD/YYYY")
            console.log(`Date: ${momentDate}\n`); //      * Name of the venue
        });
    });
}

function spotifyThisSong(song) {
    if (!song) song = "ace of base The Sign"; // sets default to 'The sign'
    spotify.search({ //searches spotify API
        type: 'track',
        query: song
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        response = data.tracks.items[0];
        var songInfo = `Artist(s): ${response.artists[0].name}\nSong: ${response.name}\nPreview link: ${response.preview_url}\nAlbum: ${response.album.name}`
        console.log(songInfo);
    });
}

function moveThis(movie) {
    if (!movie) movie = "Mr. Nobody"; //  sets default movie to "Mr. Nobody"
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy").then(function (response) {
        var movie = response.data;
        var movieInfo = `Title: ${movie.Title}\nYear release: ${movie.Year}\nIMDB rating: ${movie.Ratings[0].Value}\nRotten Tomatoes rating: ${movie.Ratings[1].Value}\nCountry: ${movie.Country}\nLanguage(s): ${movie.Language}\nPlot: ${movie.Plot}\nActresses & Actors: ${movie.Actors}`
        console.log(movieInfo);
    })
}

function doWhat() {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) return console.log(error);
        search = data.split(',')[0]; // assigns the command to be run
        term = data.split(',')[1];
        userInput();
    })
}

function userInput() {

    switch (search) {
        case `concert-this`:
            // node liri.js concert-this <artist name here>
            var bandName = "";
            for (var i = 3; i < process.argv.length; i++) bandName += process.argv[i];
            bandsTown(bandName);
            break;
        case `spotify-this-song`:
            // node liri.js spotify-this-song <song name here>
            var songName = ""
            for (var i = 3; i < process.argv.length; i++) songName += (process.argv[i] + ' ');
            spotifyThisSong(songName);
            break;
        case `movie-this`:
            // node liri.js movie-this <movie name here>
            moveThis(term);
            break;
        case `do-what-it-says`:
            // node liri.js do-what-it-says
            doWhat();
    }

}

var search = process.argv[2];
var term = "";
for (var i = 3; i < process.argv.length; i++) {
    term += process.argv[i];
    term += "+"
}


userInput(); // starts off the switch statement
