"use strict";

let $ = require ("jquery"),
    firebase = require ("./fb-config.js");

let connectionTest = () => {
    console.log("We can now append an item to a database.");
};


 let addUserLocation =  (user) => {
    console.log("url", firebase.getFBsettings().dabaseURL);
        return $.ajax({
            url: `${firebase.getFBsettings().databaseURL}/location.json?orderBy="uid"&equalTo="${user}"`
        }).done((locationData) => {
            console.log("locationData in promise", locationData);
            return locationData;
        });
    };





module.exports = {addUserLocation, connectionTest};
