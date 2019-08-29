// For acess to api keys

var keys = require ("./keys.js")

require("dotenv").config();

/// Bands in Town

// var bandsintown = require("bandsintown")

/// Module to access spotify

var Spotify = require("node-spotify-api")

/// NPM Module for OMDB access 

var request = require("request")

// NPM to request Axios

const axios = require("axios")

/* //NPM Moment

var moment = require("moment")

//Module to read random.text

var fs = require("fs")

//Output log files 

var filename = "./log.txt"

//Print logging information to log.text
log.setLevel("all")
 */
/// Spotify Api Search

var spotify = new Spotify (keys.spotify)

if (process.argv[2] == "spotify-this-song"){
    
    spotify.search({type: 'track',query:process.argv[3]},function(err,data){
        if (err){
            return console.log("Error occured:" + err)
        }
        console.log(data.tracks.items[0].artists[0].name)

        console.log(process.arg[3])

        console.log(data.tracks.items[0].external_urls.spotify)

        console.log(data.tracks.items[0].album.name)
    })
}

//Axios request for OMDB

axios.get("http://www.omdbapi.com/?t=titanic&apikey=f7e1f407")
.then(function(reponse){
    // Log result

    console.log(response)

    //Show name of movie

    console.log(response.data.Title+"\n"+ response.data.Year+"\n"+response.data.imdbRating)
})
    .catch(function(error){
        // Show error
        console.log(error)
    })
    .finally(function(){
        //Executed 
    })
    

    
// console.log(process.argv[2])
// console.log(process.argv[3]) 

//Bands in town
function getVenue(artist){
    var artist = searchCMD
    var queryURL = "https://rest.bandsintown.com/artists/"+artist+"/events?app_id=codingbootcamp"

        //Axios call
        axios.get(queryURL)
        .then(function(responseBOTR){

            console.log("------------")

            var axBack = responseBOTR.data[0]

            var vName = axBack.venue.name

            var vLoc = axBack.venue.city

            var eventDate = time(axBack.datetime).format("MM-DD-YYYY")

           // Console log  response

           console.log("Venue:"+vName+"\r\n")

           console.log("Location:"+vLoc+"\r\n")

           console.log("Event Date:"+eventDate+"\r\n")
        })


}