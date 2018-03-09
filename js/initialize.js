"use strict";
let fobjs = require("./fetch-all");
let db = require("./fb-db-rb.js");
let template = require("./dom-builder.js");


// This should be replaced to sync up with the DOM -- //
let localTown = "Nashville"; 
let returnedQuery, returnedQueryWeather;
function testMe(){
    
    console.log("Fired module of location-set-rb.js");
}

function setCity(){
    
    var lat, lon;

    fobjs.fetchCity(localTown).then(
        (resolve) => {
            returnedQuery = resolve.results[0];
            console.log(returnedQuery);
            return returnedQuery; 
        }).then(
        (loc)=>{
            lat = loc.lat;
            lon = loc.lon;
            return {lat, lon};

        });

        
}

function setWeather(){

    fobjs.fetchWeather().then(
        (resolve)=>{
            returnedQueryWeather = resolve;
            console.log("Weather: ", returnedQueryWeather);
            template.populateWeather(returnedQueryWeather);
        }
    );


}

module.exports = { testMe, setCity, setWeather };