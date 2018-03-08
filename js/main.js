"use strict";
let fetchweather = require( "./fetch-weather-rb"),
    locate = require( "./location-set-rb"),
    getter= require("./fetch"),
    mine= require("./books"),
    news= require("./news"),
    meetup= require("./meetup");

    
// CONSOLE TESTS
locate.testMe();
fetchweather.testMe();



// RUNNING CODE
locate.setCity();
locate.setWeather();
news.getNews();
news.listNews();
