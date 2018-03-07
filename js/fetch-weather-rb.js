"use strict";
let key = require ("./weather-api-key-rb.js");

let lat = "36.16999816894531";
let lon = "-86.77999877929688";

function testMe(){
    console.log("Fired module of weather-fetch-rb.js");
}

function fetchWeather(){

    return new Promise((resolve, reject ) =>{

        let weatherLoader = new XMLHttpRequest();
        //api.openweathermap.org/data/2.5/weather?lat=35&lon=139
        weatherLoader.open("GET", `https://${key.keyWeather.authDomain}${key.keyWeather.specifier}${key.keyWeather.APPID}&lat=${lat}&lon=${lon}`, true);
        weatherLoader.send();

        weatherLoader.addEventListener("load", function(){
            var data = JSON.parse(this.responseText);

            resolve(data);

        });





    });

}








module.exports = {testMe, fetchWeather};