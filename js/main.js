"use strict";
let fetchweather = require( "./weather-fetch-rb");
let locate = require( "./location-set-rb");
let getter= require("./fetch");
let mine= require("./books");
<<<<<<< HEAD

locate.testMe();
fetchweather.testMe();
locate.setCity();


console.log("hello");

=======
let news= require("./news");
>>>>>>> 263c98ed3b632ae117459d5e644aa7f28644b533

function testing(result) {
result= getter.test();
return result;
}
testing();
function testing2(result) {
    result= mine.shit();
    return result;
    }
testing2();
<<<<<<< HEAD
=======

news.getNews();
>>>>>>> 263c98ed3b632ae117459d5e644aa7f28644b533
