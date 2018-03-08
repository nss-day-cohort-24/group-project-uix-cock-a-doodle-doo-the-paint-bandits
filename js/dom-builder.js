"use strict";

//Document Object Model Object References

let weatherLoc = document.getElementById('weatherLoc');
let rowPlace = document.getElementById('row-location');
let colWeather = document.getElementById('col-weather');
let tempConverter = function(temp) {
    return Math.round((1.8* (temp - 273) + 32));
};

function populateLocation(loc){

    // This function populates all the location data from the Meetup API
    console.log("populateLocation() is running, here's the contents of the passed variable:", loc);
    weatherLoc.innerHTML = `${loc.city}, ${loc.state}`;
    rowPlace.innerHTML = `${loc.city}, ${loc.state}`;

}

function populateWeather(weather){
    let fahrenheit = tempConverter(weather.main.temp);
    console.log("populateWeather() is running, here's the contents of the passed variable", weather.main.temp);
    colWeather.innerHTML = `Temp : ${fahrenheit}</br>
    Sunrise at: ${weather.sys.sunrise}</br>
    Sunset at: ${weather.sys.sunset}</br>
    Clouds:${weather.clouds.all}</br>
    
    `;


}




module.exports = {populateLocation, populateWeather};