"use strict";
let fetchall = require( "./fetch-all.js"),
    locate = require( "./initialize.js"),
<<<<<<< HEAD
=======
<<<<<<< HEAD
    
=======
>>>>>>> 4f7ed878c204e27cd16fb8aff1f6946182a00f37
>>>>>>> 2c8dc001a16e4a5b27aa3e5a671f393f5f56d47e
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
news.printNews();
