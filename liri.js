  
require("dotenv").config();

var axios = require("axios");
var keys = require("./keys.js");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var arg1 = process.argv[2];
var arg2 = process.argv[3];

/// Spotify Api Search

function spotifyThisSong(arg) {
    spotify.search({type: 'track', query: arg2}).then(function(response){
        var dataOne = response.tracks.items[0]
        console.log(
            "Artist: " + dataOne.artists[0].name,
            "\nSong: " + dataOne.name,
            "\nLink to Song: " + dataOne.preview_url,
            "\nAlbum: " + dataOne.album.name
        
        )
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
                console.log("Plot: "+movieData.Plot+"\n")
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
    })
}
