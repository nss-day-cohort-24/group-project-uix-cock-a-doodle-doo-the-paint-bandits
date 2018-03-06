"use strict";
var url = `https://api.meetup.com/find/groups?zip=11211&radius=1&category=25&order=members`;
var $ = require('jquery');
let meetups;

function getMeetup() {
    return $.ajax({
      url: url
    }).done((data) => {
        console.log("hello from meetups");
        meetups = data.meetups;
      return  ;
    });
   }