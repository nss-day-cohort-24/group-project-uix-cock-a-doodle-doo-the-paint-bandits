"use strict";
let fetchall = require( "./fetch-all.js"),
    locate = require( "./initialize.js"),
    news= require("./news"),
    meetup= require("./meetup"),
    user = require("./users.js"),
    db =  require("./fb-db-rb"), //change later the name of this function please.
    $ = require("jquery");
    
function loadCityToDOM(){
    console.log("Starting to load city and weather");
    let currentUser = user.getUser();
    console.log("Current User in City");
    db.addUserLocation(currentUser);
    locate.setCity();
    locate.setWeather();


}

// User login section. Should ideally be in its own module
$("#goog-login").click(function() {
    console.log("clicked auth");
    user.logInGoogle()
    .then((result) => {
      console.log("result from login", result.user.uid);
      user.setUser(result.user.uid);
      $("#goog-login").addClass("is-hidden");
      //$("#logout").removeClass("is-hidden");
      loadCityToDOM();
    });
  });


// RUNNING CODE
news.getNews();
news.listNews();
