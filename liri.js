require("dotenv").config();

/// Bands in Town

var bandsintown = require("bandsintown")

/// Module to access spotify

var spotify = require("node-spotify-api")

/// NPM Module for OMDB access 

var request = require("request")

// NPM to request Axios

var axios = require("axios")

//NPM Moment

var moment = require("moment")

//Module to read random.text

var fs = require("fs")

//Output log files 

var filename = "./log.txt"

//Print logging information to log.text
log.setLevel("all")



//To request action

var action = process.argv[2]

