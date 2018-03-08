"use strict";
// REQUIRES //
// let city = require("./fetch-city-data-rb");
var $ = require('jquery');

// EMPTY VARIABLE TO HOLD DATA //
var meetups;
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

// VARIABLE TO GET DOM ELEMENTS //
let meetupMain = document.getElementById( 'displayMeetups' );
let meetupDiv = $('#meetupSectionDiv');

// FUNCTION THAT PRINTS TO MAIN DIV //
function showEvent() {
  getMeetup().then((cityData) => {
  eventDisplay = cityData.events;
  let emptyEvent = "";
  // console.log(eventDisplay);
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
  meetupMain.innerHTML = emptyEvent;
  });
}

// CALL FUNCTION TO PRINT TO DOM //
showEvent();

// FUNCTION THAT PRINTS TO MEETUP DIV //
function showEvents() {
  getMeetup().then((cityData) => {
  for (let i = 0; i < 10; i++) {
    let meetupEvent = cityData.events[i];
    console.log("meetups", meetupEvent);
      meetupDiv.append(
        `<ul>
          <li>
            <h3>What</h3>
            <p><a href="${meetupEvent.link}">${meetupEvent.name}</a></p>
          </li>       
          <li>
            <h3>When</h3>
            <p>${meetupEvent.local_date} ${meetupEvent.local_time}</p>            
          </li>
          <li>
            <h3>Where</h3>
            <p>${meetupEvent.group.localized_location}</p>    
          </li>  
        </ul>`); 

      //<li><h3>Where</h3>${meetupEvent.venue.name}</li>
      // <li>${meetupEvent.venue.address_1}</li>
      // <li>${meetupEvent.venue.city}, ${meetupEvent.venue.state} ${meetupEvent.venue.zip}</li>

  // } if(meetupEvent.name) {
  //   meetupDiv.append(`<ul>
  //     <li>
  //       <h3>What</h3>
  //       <a href="${meetupEvent.link}">${meetupEvent.name}</a>
  //     </li>
  //     <li>
  //       <h3>When</h3>${meetupEvent.local_date}
  //     </li>
  //     <li>${meetupEvent.local_time}</li>
  //     </ul>`);
  //   }
  
}});
}

// CALL FUNCTION TO PRINT TO DOM //
showEvents();

// EXPORTS
module.exports = {getMeetup, showEvent, showEvents};