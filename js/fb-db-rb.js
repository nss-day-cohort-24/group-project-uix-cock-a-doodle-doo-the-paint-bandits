"use strict";

let $ = require ("jquery"),
    firebase = require ("./fb-config.js");

let connectionTest = () => {
    console.log("We can now append an item to a database.");
};


 let addUserLocation;
 
//  (location) => {
//     console.log("addUserLocation", location);
    
//     return $.ajax({
//         url: `${firebase.getFBsettings().databaseURL}/location.json`,
//         type: 'POST',
//         data: JSON.stringify(location),
//         dataType: 'json'
//     }).done((UserLocationID) => {
//         console.log("This is the key", UserLocationID);
//         return UserLocationID;
//     });
    

// };






module.exports = {addUserLocation, connectionTest};
