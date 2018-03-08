"use strict";
let fetchall = require( "./fetch-all.js"),
    locate = require( "./initialize.js"),
    
    news= require("./news"),
    meetup= require("./meetup");

    
// CONSOLE TESTS
locate.testMe();




// RUNNING CODE
locate.setCity();
locate.setWeather();
news.getNews();
news.listNews();
news.printNews();
