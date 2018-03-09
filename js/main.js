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
    let userProfile = buildUserProfile();
    //db.addUserLocation(userProfile);
    //locate.setCity();
    //locate.setWeather();


}


function buildUserProfile(){
    fetchall.fetchCity().then((tempObj)=>{
        
        let userSetting = {
            uid: user.getUser(),
            lat: tempObj.lat,
            lon: tempObj.lon
        };
            return userSetting;
    });
    
}
// User login section. Should ideally be in its own module
$("#goog-login").click(function() {
    console.log("clicked auth");
    user.logInGoogle()
    .then((result) => {
      console.log("result from login", result.user.uid);
      //user.setUser(result.user.uid);
      //setUser(result.user.uid);
      checkUser(result.user.uid);
      $("#goog-login").addClass("is-hidden");
      //$("#logout").removeClass("is-hidden");
      loadCityToDOM();
    });
  });

function runTheAPP(data){

    console.log("Let's get the party started");
}


function checkUser(data){
console.log("In checkUser(), do you mean to check " + data + "? Because that's what's being passed in the Firebase to be checked.");
db.getFBUser(data).then((newdata) =>{
    console.log("Data checkUser:", newdata);
    let ID = Object.values(newdata);
    if (ID.length !== 0 && ID.length === 1) {
        console.log("You have no user by that name. Call setUser(). Let's add this guy:" , ID);
        let UID = user.getUser(); // Let's get the user from Google. Set her credentials in this object.
        setUser(UID); // HARD PASS.
    }
    else{
        
        console.log("Yes, a user is here already. Lets use him.", ID);
        runTheAPP(ID);
        
    }
});



}

function setUser(data){ 
    let userInfo = {};
    userInfo.uid = data; // Set the credentials as a property of a new object. Firebase requires an object to be sent.
    console.log("userInfo", userInfo);
    db.setfbUser(userInfo).then((item)=>{
        console.log("We got a user set under this collection:", item);
        runTheAPP(item); 
    });
    
  }

  news.getNews();
  news.listNews();
  news.printNews();
  
  //SMOOTH SCROLL//
  // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')&&location.hostname == this.hostname) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 1000, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          });
        }
      }
    });