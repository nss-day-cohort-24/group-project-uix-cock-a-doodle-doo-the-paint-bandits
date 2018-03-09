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

db.getFBUser(data).then((data) =>{
    console.log("Data checkUser:", data);
    console.log("checkUser() keys", data.uid);
    if (data.uid) {
        console.log("If:" );
        runTheAPP(data);
    }
    else{
        console.log("Else:" , data );
        let UID = user.getUser();
        
        setUser(UID); // THE ACTUAL UID
        
    }
});

}

function setUser(data){
    let userInfo = {};
    userInfo.uid = data;
    console.log("userInfo", userInfo);
    db.setfbUser(userInfo).then((item)=>{
        console.log("We got a User.", item);
        runTheAPP(item);
    });
    
  }

