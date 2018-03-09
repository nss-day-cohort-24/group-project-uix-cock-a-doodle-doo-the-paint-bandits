"use strict";

let $ = require ("jquery"),
    firebase = require ("./fb-config.js");

let connectionTest = () => {
    console.log("We can now append an item to a database.");
};


 let addUserLocation =  (user) => {
    console.log("url", firebase.getFBsettings().dabaseURL);
        return $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/location.json?orderBy="uid"&equalTo="${user}"`,
            post: "PUT",
        }).done((locationData) => {
            console.log("locationData in promise", locationData);
            return locationData;
        });
    };

let setfbUser = (userInfo) => {
    console.log("Running to set the user.", firebase.getFBsettings().databaseURL);
        return $.ajax({
            url:`${firebase.getFBsettings().databaseURL}/users.json`,
            method: "POST",
            data: JSON.stringify(userInfo)
        }).done((firebaseID)=> {
            console.log("firebaseID",firebaseID);
            return firebaseID;
        });



};

let getFBUser = (userInfo) => {
    console.log("Checking for firebase User,", userInfo);
    return $.ajax({
        url: `${firebase.getFBsettings().databaseURL}/users.json?orderBy="uid"&equalTo="${userInfo}"`,
        method: "GET"
    }).done((data)=>{
        return data;
    }

    );



};


// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://paint-bandits-productivity-app.firebaseio.com/users.json",
//     "method": "POST",
//     "headers": {
//       "Cache-Control": "no-cache",
//       "Postman-Token": "e9359acc-7d68-ff65-f2f5-a56114c959b9"
//     },
//     "data": "{\"uid\": \"ALUpjPcspBVFh3YP6kVVYqnyPNC3\"}"
//   }
  
//   $.ajax(settings).done(function (response) {
//     console.log(response);
//   });






module.exports = {addUserLocation, connectionTest, setfbUser, getFBUser};
