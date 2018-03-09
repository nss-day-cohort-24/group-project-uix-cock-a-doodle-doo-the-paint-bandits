"use strict";

var $ = require('jquery');

function makeMeetupList(meetupList){
    let $meetupDisplay = 
    $(`<div class="savedMeetupDiv">
        <ul class ="meetupList"></ul>
    </div>`);
    $(".savedMeetupDiv").html($meetupDisplay);
    for (let meetup in meetupList) {

    }
}
