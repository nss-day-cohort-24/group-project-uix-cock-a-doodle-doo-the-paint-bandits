"use strict";
// console.log("hello meetup");
let city = require("./fetch-city-data-rb");
// var url = `https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&page=20&key=1e4561622f48361f4d63564f224e4a27`;
var $ = require('jquery');
let meetups;

function getMeetup() {
    return $.ajax({
      url: `https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&page=20&key=1e4561622f48361f4d63564f224e4a27`
    }).done((data) => {
        // console.log("hello from meetups", data);
        // meetups = data.meetups;
      return data;
    });
   }

var eventDisplay;
let meetupDiv = document.getElementById("displayMeetups");

function showEvents() {
  // console.log("show events is working");
  getMeetup().then((cityData) => {
  eventDisplay = cityData.events;
  console.log("city data: ", eventDisplay);
  let emptyEvent = "";
  for (let i = 0; i < 5; i++) {
    // console.log("city Data[i}", eventDisplay[i].name);
    emptyEvent += `<li>${eventDisplay[i].name}</li>`;
  }
  meetupDiv.innerHTML = emptyEvent;
  });
}
showEvents();
module.exports = {getMeetup, showEvents};