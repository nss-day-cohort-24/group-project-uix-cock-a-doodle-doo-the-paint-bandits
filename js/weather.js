"use strict";

let $ = require('../lib/node_modules/jquery');
let url1 = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=cd7645aed044709a9f93b58c5b36b02f';


function getWeather() {
    return $.ajax({
        url: url1
    });
}

var zipCode = "37221";

getWeather("http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+",us&appid=59532cc55fafea3eb5fddb6e600206b8")
   .then((data)=> {

    
    console.log("heres the temp",data);
   });

   module.exports = {getWeather};