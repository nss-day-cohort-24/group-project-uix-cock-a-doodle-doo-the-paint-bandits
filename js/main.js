"use strict";
let fetchweather = require( "./weather-fetch-rb");
let locate = require( "./location-set-rb");
let getter= require("./fetch");
let mine= require("./books");
let news= require("./news");
let meetup= require("./meetup");
// CONSOLE TESTS
locate.testMe();
fetchweather.testMe();



// RUNNING CODE
locate.setCity();
news.getNews();
news.listNews();
