"use strict";
let fetchall = require( "./fetch-all.js"),
    news= require("./news"),
    meetup= require("./meetup"),
    user = require("./users.js"),
    db =  require("./fb-db-rb"), //change later the name of this function please.
    $ = require("jquery");

// Objects with events to respond to
   
var inputBar = document.getElementById("shadow-city");



// User login button.
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

//User edit location button.
  
  
  
function runTheApp(allData, data){
      // We need to have it so that when location is found, it's inputed into the database.
      
      let dataUID = data[0].uid;
      console.log("Data from Firebase", data, allData);
      let key = Object.keys(allData);
      console.log("Num of keys in allDakey", key);
      key = key[0];
      console.log("KEY: ", key);
      // All the Event Listeners for the App should occur in this function.


      inputBar.addEventListener("keyup", function(e){
          
          if (e.keyCode === 13 && e.target.value != "")  {
              let userInput = e.target.value;
              // On enter press in inputBar, fetchCity using the input, then use the returned location to populate in the firebase database, containing UID information.
              
              
              fetchall.fetchCity(userInput).then(
                  
                (location) =>{
                    console.log("Location:", location);
                    console.log("UID:", dataUID);
                    let pass = {dataUID, location, key};

                    db.addUserLocation(pass).then((primaryKey) => {
                        
                        // In this .then, we can assign the primaryKey to a local variable which we update when we mean to update the location data set previously.


                        key = primaryKey;
                        console.log("Key to access & edit location data with:", key);

                    }); // Publish to database.

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

    // Here we are setting the google identified user to the firebase database in the User collection.
    db.getFBUser(data).then((newdata) =>{
        console.log("Data checkUser:", newdata);
        let ID = Object.values(newdata);

        /*Firebase will not tell you explicitly that the User exists already or not. You have to interpret from the details what is what. getFBUser will always return an object (primary key), but whether or not the object contains any values is what matters. So you must conduct a test. If the object holds NO items, then the User is new, and you need to set the user. If the object is more than 0, (preferably not greater than 1 though), the User has logged in before. So, based on the premise that ID should either be a 1 or a 0, I act accordingly because we are calling the index value of the key.*/
        
        console.log(`${data} === ${ID.length}`);
        
        if (ID.length > 0) {
            console.log("User history found. Using User:", ID[0].uid);
            runTheApp(newdata, ID);
            user.setUser(ID);
        }

        if (ID.length === 0){ 
            console.log("New User:" , data);
            
            let UID = user.getUser(); 
            // Let's get the user from Google. Set her credentials in this object.
            
            user.setUser(ID); 
            // Set the User For Google
            
            setUser( newdata,UID); 
            //Set the User for Firebase & the web app.
            
        }
    });
}

function setUser(keyobject, data){ 
    let userInfo = {};
    userInfo.uid = data; 
    // Set the credentials as a property of a new object. Firebase requires an object to be sent.
    console.log("userInfo", userInfo);
    db.setfbUser(userInfo).then((primarykey)=>{
        console.log("New User has been set with primary key:", primarykey);
        runTheApp(primarykey);
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