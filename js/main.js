"use strict";
let fetchweather = require( "./fetch-weather-rb");
let locate = require( "./location-set-rb");
let mine= require("./books");
let news= require("./news");
let meetup= require("./meetup");
// CONSOLE TESTS
locate.testMe();
fetchweather.testMe();



// RUNNING CODE
locate.setCity();
locate.setWeather();
news.getNews();
news.listNews();
news.printNews();
