"use strict";

//Document Object Model Object References

let weatherLoc = document.getElementById('weatherLoc');
let rowPlace = document.getElementById('row-location');
let colWeather = document.getElementById('col-weather');

function populateLocation(loc){

    // This function populates all the location data from the Meetup API
    console.log("populateLocation() is running, here's the contents of the passed variable:", loc);
    weatherLoc.innerHTML = `${loc.city}, ${loc.state}`;
    rowPlace.innerHTML = `${loc.city}, ${loc.state}`;

}

function populateWeather(weather){
    console.log("populateWeather() is running, here's the contents of the passed variable", weather.main.temp);
    colWeather.innerHTML = `${weather.main.temp}`;

}




module.exports = {populateLocation, populateWeather};