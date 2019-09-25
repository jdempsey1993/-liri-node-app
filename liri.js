require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var arg1 = process.argv[2];
var arg2 = process.argv[3];

//Spotify Function
function spotifyThisSong(arg2) {
    spotify.search({ type: 'track', query: arg2 }).then(function (response) {
        var dataOne = response.tracks.items[0];
        console.log(
            "Artist: " + dataOne.artists[0].name,
            "\nSong: " + dataOne.name,
            "\nLink to Song: " + dataOne.preview_url,
            "\nAlbum: " + dataOne.album.name
        );
    });

};
//OMDB Movie
function movieThis(arg2) {
    if (!arg2) {
        arg2 = ""
    }
    axios.get("http://www.omdbapi.com/?t=" + arg2 + "&plot=short&apikey=trilogy").then(function (response) {

            console.log(
                "Movie Title: " + response.data.Title,
                "\nYear: " + response.data.Year,
                "\nIMDB Rating: " + response.data.imdbRating,
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1],
                "\nCountry: " + response.data.Country,
                "\nLanguage: " + response.data.Language,
                "\nMovie Plot: " + response.data.Plot,
                "\nActors: " + response.data.Actors)
    })
};

//Bands In Town
function concertThis(arg2) {
    axios.get("https://rest.bandsintown.com/artists/" + arg2 + "/events?app_id=codingbootcamp").then(function (response) {
        console.log(response.data[0].venue.name)
        console.log(response.data[0].venue.city + ", " + response.data[0].venue.country)
        console.log(moment(response.data[0].datetime).format("MM-DD-YYYY"))
    }
    )
}


// logging output in random.txt 

function doWhatItSays() {

    var fs = require("fs")

    
    
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        } 
        
        var dataArray = data.split(',')
        arg1 = dataArray[0]
        arg2 = dataArray[1]
        console.log(spotifyThisSong(arg2));
    });
    
};

switch (arg1) {
    case "movie-this":
        movieThis(arg2)
        break;

    case "concert-this":
        concertThis(arg2)
        break;

    case "spotify-this-song":
        spotifyThisSong(arg2)
        break;

    case "do-what-it-says":
        doWhatItSays()
        break;
};