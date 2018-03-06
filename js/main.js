"use strict";
let fetchweather = require( "./weather-fetch-rb");
let locate = require( "./location-set-rb");
let getter= require("./fetch");
let mine= require("./books");

locate.testMe();
fetchweather.testMe();



console.log("hello");


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
