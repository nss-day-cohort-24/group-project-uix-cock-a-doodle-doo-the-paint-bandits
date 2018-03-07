"use strict";

let key = require ("./meeting-api-key-rb.js");

function fetchCity(city){

    return new Promise((resolve, reject) => {

        let cityLoader = new XMLHttpRequest();

        cityLoader.open("GET", `https://api.meetup.com${key.keyMeet.specifier}?key=${key.keyMeet.apiKey}&sign=true&country=UnitedStates&state=Tennessee.json`, true);
        cityLoader.send();

        cityLoader.addEventListener("load", function() {

            var data = JSON.parse(this.responseText);
            resolve(data);

        });
        
    });
}














module.exports = {fetchCity};