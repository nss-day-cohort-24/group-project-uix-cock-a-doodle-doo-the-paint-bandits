"use strict";
let key = require ("./weather-api-key-rb.js")
function testMe(){
    console.log("Fired module of weather-fetch-rb.js");
}

function fetchWeather(city){

    return new Promise((resolve, reject ) =>{

        let weatherLoader = new XMLHttpRequest();

        weatherLoader.open("GET", `https://${key.keyWeather.AuthDomain}lat={lat}&lon={lon}${key.keyWeather.specifier}`, true);
        weatherLoader.send();

        weatherLoader.addEventListener("load", function(){
            var data = JSON.parse(this.responseText);

            resolve(data);

        });





    });

}








module.exports = {testMe};