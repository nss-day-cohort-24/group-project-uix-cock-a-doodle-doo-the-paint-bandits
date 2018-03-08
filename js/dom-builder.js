"use strict";

//Document Object Model Object References

let weatherLoc = document.getElementById('weatherLoc');

function populateLocation(loc){

weatherLoc.innerHTML = `${loc.city}`;


}






module.exports = {populateLocation};