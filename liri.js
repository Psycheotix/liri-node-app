
require("dotenv").config();

var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var request = require('request');
var moment = require('moment')

//console.log(spotify);


//console.log(Spotify)
 
var action = process.argv[2];
 
//*** ADDING EACH FUNCTION TO SWITCH ***////
switch (action) {
case "concert-this":
concertThis();
break;

case "spotify-this-song":
spotifyThisSong();
break;

case "movie-this":
movieThis();
break;

case "do-what-it-says":
do_what_it_says();
break;

}

// console.log(action)

//CONCERT-THIS FUNCTION //
function concertThis(){
    var userValue =  process.argv
    var artist = userValue.splice(3, userValue.length).join('');
    console.log("Concert information for: " + artist);


    request("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp", function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:',JSON.parse(body)); // Print the HTML for the Google homepage.
        var results = JSON.parse(body);
        console.log("Venue Name: " + results[0].venue.name );
        console.log("Venue Location: " + results[0].venue.city + ", " + results[0].venue.region)
        console.log("Concert Date: " + moment(results[0].datetime).format('MMMM Do YYYY, h:mm a'))
      });



};




/// SPOTIFY FUNCTION ///
function spotifyThisSong(){
    var userValue =  process.argv
    var song = userValue.splice(3, userValue.length).join(' ');

    spotify
    .search({ type: 'track', query: song, limit: 1 })
    .then(function(response) {
    console.log("Song Name: " + response.tracks.items[0].name);
    console.log("Artist Name: " + response.tracks.items[0].album.artists[0].name);
    console.log("Album Name: " + response.tracks.items[0].album.name);
    console.log("preview url: " + response.tracks.items[0].preview_url);
    })
    
    .catch(function(err) {
    console.log(err);
    });
    


};



//MOVIE-THIS FUNCTION//
function movieThis(){
    var userValue =  process.argv
    var movie = userValue.splice(3, userValue.length).join(' ');

    request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:',JSON.parse(body)); // Print the HTML for the Google homepage.
        var results = JSON.parse(body);
        // console.log(results)


    // * Title of the movie.
    console.log("Movie Title: " + results.Title);
    // * Year the movie came out.
    console.log("Movie Year: " + results.Year);
    // * IMDB Rating of the movie.
    console.log("Movie Rating: " + results.Rated);
    // * Rotten Tomatoes Rating of the movie.
    console.log("Rotten Tomatoes Rating: " + results.Ratings[1].Value);
    // * Country where the movie was produced.
    console.log("Country Where the movie was produced: " + results.Country);
    // * Language of the movie.
    console.log("Movie's Original Language: " + results.Language);
    // * Plot of the movie.
    console.log("Movie's Plot: " + results.Plot)
    // * Actors in the movie.
    console.log("Actors in Movie: " + results.Actors)
      });
    
};

//do_what_it_says FUNCTION//
function do_what_it_says(){
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
    
        if (error) {
            return console.log(error);
          }
        
          var dataArr = data.split(",");
          action = dataArr[0];
          song = dataArr[1];
          console.log(dataArr)
          console.log(action)
          
          var spotify = new spotifyReq(keysFile.spotify);
          spotify.search({ type: 'track', query: song}, function(error, data) {
              if (error) {
                  return console.log('Error occurred: ' + error);
              }
       //artist, song, preview link, album
              console.log("The requested song is by " + data.tracks.items[0].artists[0].name);
              console.log("The song is "+ data.tracks.items[0].name);
              console.log("You can sample this song at " + data.tracks.items[0].preview_url);
              console.log("This song is on the album " + data.tracks.items[0].album.name);     
            
        
        
     
          
        });
    });
}


    