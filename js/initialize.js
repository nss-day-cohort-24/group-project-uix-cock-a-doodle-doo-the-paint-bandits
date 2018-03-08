"use strict";
let fobjs = require("./fetch-all");
let db = require("./fb-db-rb.js");
let template = require("./dom-builder.js");


// This should be replaced to sync up with the DOM -- //
let localTown = "Nashville"; 
var location;
let returnedQuery, returnedQueryWeather;
function testMe(){

    console.log("Fired module of location-set-rb.js");
}

function setCity(){


    fobjs.fetchCity(localTown).then(
        (resolve) => {
            returnedQuery = resolve.results[0];
            console.log(returnedQuery);
            return returnedQuery; 
        }).then(
        (loc)=>{
            location = loc;
            db.connectionTest();
            template.populateLocation(loc);
            //db.addUserLocation(loc);

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