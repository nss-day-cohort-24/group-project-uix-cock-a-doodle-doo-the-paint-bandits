"use strict";
// REQUIRES //
// let city = require("./fetch-city-data-rb");
var $ = require('jquery');

// EMPTY VARIABLE TO HOLD DATA //
let meetups;

// FUNCTION THAT CALLS THE API //
function getMeetup() {
    return $.ajax({
      url: `https://api.meetup.com/find/upcoming_events?&sign=true&photo-host=public&page=20&key=1e4561622f48361f4d63564f224e4a27`
    }).done((data) => {
        meetups = data.meetups;
      return meetups;
    });
   }

// GLOBAL VARIABLE THAT WILL HOLD THE DATA //   
var eventDisplay;

// VARIABLE TO GET DOM ELEMENT //
let meetupDiv = document.getElementById( 'displayMeetups' );

// FUNCTION THAT PRINTS TO MAIN PAGE //
function showEvents() {
  getMeetup().then((cityData) => {
  eventDisplay = cityData.events;
  console.log("event data: ", eventDisplay);
  let emptyEvent = "";
  for (let i = 0; i < 1; i++) {
    emptyEvent += 
    `<ul>
      <li>
        <h3>What</h3>
        <a href="${eventDisplay[i].link}">${eventDisplay[i].name}</a>
      </li>
      <li>
        <h3>When</h3>${eventDisplay[i].local_date}
      </li>
      <li>${eventDisplay[i].local_time}</li>
      <li><h3>Where</h3>${eventDisplay[i].venue.name}</li>
      <li>${eventDisplay[i].venue.address_1}</li>
      <li>${eventDisplay[i].venue.city}, ${eventDisplay[i].venue.state} ${eventDisplay[i].venue.zip}</li>
    </ul>`;
  }
  meetupDiv.innerHTML = emptyEvent;
  });
}

// CALL FUNCTION TO PRINT TO DOM
showEvents();

// EXPORTS
module.exports = {getMeetup, showEvents};