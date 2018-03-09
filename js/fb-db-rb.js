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
// This function checks whether or not Firebase has a user by a certain ID. If it does, it returns the object. If not? It returns an empty object.
// Either way, you'll get an object back.
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







module.exports = {addUserLocation, connectionTest, setfbUser, getFBUser};
