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

 //NPM Moment

// var moment = require("moment")

//Module to read random.text

var fs = require("fs")

//Output log files 

var filename = "./log.txt"

//Print logging information to log.text
log.setLevel("all")


// Defining commandline arugments

var liriCommand = process.argv[2]
var searchCommand = process.argv[3]



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

// console.log(process.argv[2])
// console.log(process.argv[3]) 

//Axios request for OMDB
function getMovie(searchCMD){
    
    var omdbURL = "http://www.ombdapi.com/?t="+searchCMD+"&y=&plot=short&apikey=f7e1f407"
        
    console.log(omdbURL)

    //Call axios

    axios.get(omdbURL).then(
        function(omdbAxBk){
            console.log("-----------------")
                var movieData = omdbAxBk.data
                /// Movie title
                console.log("Movie title: "+movieData.Title+"\n")
                /// Year of film
                console.log("Year filmed: "+movieData.Year+"\n")
                /// Rating of film from IMDB
                console.log("IMDB film rating: "+movieData.imbdRating+"\n")
                //Country of film
                console.log("Country: "+movieData.Country+"\n")
                //Film Language
                console.log("Language: "+movieData.Language+"\n")
                //Plot of film
                console.log("Plot: "+movieData.Plot+"\n"
                //Cast of film
                console.log("Film cast: "+movieData.Actors+"\n")
        }
    )
}

    


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

// Function to log text

function logging (){
    fs.readFile("random.txt",utf8,function(error,data){
        if (error) {
            console.log(error)
        } else { 
            var dataArr = data.split(",")
            if (dataArr[0] === "spotify"){
                spotify(dataArr[1])
            }
            if (dataArr[0] === "omdb"){
                getMovie(dataArr[1])
            }
            if (dataArr[0] === "bandsintown"){
                getVenue(dataArr[1])
            }
                
            

        }
        }
    }
}