"use strict";
let fetchall = require( "./fetch-all.js"),
locate = require( "./initialize.js"),

news= require("./news"),
meetup= require("./meetup"),
user = require("./users.js"),
db =  require("./fb-db-rb"), //change later the name of this function please.
$ = require("jquery");

var inputBar = document.getElementById("shadow-city");


function loadCityToDOM(){
    console.log("Starting to load city and weather");
    let currentUser = user.getUser();
    console.log("Current User in City");
    let userProfile = buildUserProfile();

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
      
    });
  });

  
  
  
  function runTheAPP(data){
      // We need to have it so that when location is found, it's inputed into the database.
      
      let dataUID = data[0].uid;
      
      inputBar.addEventListener("keyup", function(e){
          
          if (e.keyCode === 13 && e.target.value != "")  {
              let userInput = e.target.value.toLowerCase();
              // On enter press in inputBar, fetchCity using the input, then use the returned location to populate in the firebase database, containing UID information.
              
              
              fetchall.fetchCity(userInput).then(
                  
                (location) =>{
                    console.log("Location:", location);
                    console.log("UID:", dataUID);
                    let pass = {dataUID, location};

                    db.addUserLocation(pass); // Publish to database.

              });
            
            
        }
      
      });
      
    //   locate.setWeather();
    //   news.getNews();
    //   news.listNews();
    //   news.printNews();


    console.log("Let's get the party started", data);
}



function checkUser(data){

    console.log("In checkUser(), do you mean to check " + data + "? Because that's what's being passed in the Firebase to be checked.");
    db.getFBUser(data).then((newdata) =>{
        console.log("Data checkUser:", newdata);
        let ID = Object.values(newdata);
        /*Here, ID should either be a 1 or a 0 
        because we are calling the index value of the key.*/
        
        console.log(`${data} === ${ID.length}`);
        
        if (ID.length > 0) {
            console.log("User history found. Using User:", ID[0].uid);
            runTheAPP(ID);
            user.setUser(ID);
        }

        if (ID.length === 0){ 
            console.log("New User:" , data);
            let UID = user.getUser(); // Let's get the user from Google. Set her credentials in this object.
            user.setUser(ID);
            setUser(UID);
            
        }
    });
}

function setUser(data){ 
    let userInfo = {};
    userInfo.uid = data; // Set the credentials as a property of a new object. Firebase requires an object to be sent.
    console.log("userInfo", userInfo);
    db.setfbUser(userInfo).then((item)=>{
        console.log("New User has been set with primary key:", item);
        runTheAPP(item);
    });
    
  }
  
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