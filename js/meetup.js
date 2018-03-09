"use strict";

// REQUIRES //

let meet = require("./meeting-api-key-rb.js");
var $ = require('jquery');
let firebase = require("./fb-config");

// EMPTY VARIABLE TO HOLD DATA //
let meetups;

// FUNCTION THAT CALLS THE API //
function getMeetup() {
    return $.ajax({
      url: `https://${meet.keyMeet.authDomain}/find${meet.keyMeet.meetupSpecifier}?&sign=true&photo-host=public&page=10&key=${meet.keyMeet.apiKey}`
    }).done((data) => {
        meetups = data.meetups;
      return meetups;
    });
   }

// GLOBAL VARIABLE THAT WILL HOLD THE DATA //   
var eventDisplay;

// VARIABLE TO GET DOM ELEMENT //
let meetupHome = document.getElementById( 'displayMeetups' );
let meetupDiv = $( '#meetupSectionDiv' );

// FUNCTION THAT PRINTS TO DOM //
function showEvent() {
  getMeetup().then((cityData) => {
  eventDisplay = cityData.events;
  // console.log("event data: ", eventDisplay);
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
    </ul>
    <button id=[i]>SAVE</button>`;
  }
  meetupHome.innerHTML = emptyEvent;
  });
}

// CALL FUNCTION TO PRINT TO DOM
showEvent();

// FUNCTION THAT PRINTS TO MEETUP DIV //
function showEvents() {
  getMeetup().then((cityData) => {
  for (let i = 0; i < 10; i++) {
    eventDisplay = cityData.events[i];
    console.log("Event Display", eventDisplay);
    meetupDiv.append(
    `<ul>
      <li>
        <h2><a href="${eventDisplay.link}">${eventDisplay.name}</a><h2>
      </li>
      <li>
        <h4>Where: ${eventDisplay.group.localized_location}</h4>
      </li>
      <li>
        <h4>ON: ${eventDisplay.local_date} ${eventDisplay.local_time}</h4>
      </li>
    </ul>
    <button id="[i]">SAVE MEETUP</button>`);
    

    //   <li><h3>Where</h3>${meetupEvent.venue.name}</li>
    //   <li>${meetupEvent.venue.address_1}</li>
    //   <li>${meetupEvent.venue.city}, ${meetupEvent.venue.state} ${meetupEvent.venue.zip}</li>
    // </ul>`;
  }
  });
}

function getUserMeetup(users) {
    return $.ajax({
      url: `${firebase.getFBsettings().databaseURL}/meetups.json?orderBy="uid"&equalTo="${users}"`
    }).done((meetupData) =>{
      return meetupData;
    });
}

function addMeetup(meetupObject) {
  return $.ajax({
    url: `$(firebase.getFBsettings().databaseURL/meetups.jason`,
    type: 'POST',
    data: JSON.stringify(meetupObject),
    dataType: 'json'
  }).done((meetupID) =>{
    return meetupID;
  });
}
// CALL FUNCTION TO PRINT TO DOM //
showEvents();

// EXPORTS
module.exports = {getMeetup, showEvent, showEvents};