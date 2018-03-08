"use strict";

let $ = require('../lib/node_modules/jquery');
let url1 = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=cd7645aed044709a9f93b58c5b36b02f';
var currentWeather;

function getWeather() {
    return $.ajax({
        url: url1
    }).done((data) => {
        currentWeather= data.weather;
        console.log("hello from weather123");
        return currentWeather;
    });
}

var zipCode = "nashville";
let weatherDiv = $('#displayWeather');

getWeather("http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&appid=59532cc55fafea3eb5fddb6e600206b8")
   .then((data)=> {
<<<<<<< HEAD

    
=======
    let tempConverter = function(temp) {
        return Math.round((1.8* (temp - 273) + 32));
    };
    for(let i=0; i < 1; i++) {
        let newWeather = currentWeather[i];

>>>>>>> 68ccde4e4fe9f3b4d19827150a6fd868daeb2d2a
    console.log("heres the temp",data);
    let weatherDiv = $('#displayWeather');
    weatherDiv.append(`<h4>${newWeather.discription}</h4>`);
   }});

   module.exports = {getWeather};