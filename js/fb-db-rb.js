"use strict";

let $ = require ("jquery"),
    firebase = require ("./fb-config.js");

let connectionTest = () => {
    console.log("We can now append an item to a database.");
};


 let addUserLocation =  (userData) => { 
    // NOTE: I am passing in an object containing multiple objects here. It's a bit messy. userData contains two objects within, and the JSON.stringify passes it as a POST, which is an "initial posting". Firebase returns a string which is in SQL terms the "primary key", so when I want to PATCH or PUT data to this, I have to use that reference to access this data again.



    console.log("url", firebase.getFBsettings().databaseURL);

        return $.ajax({
            // To add to the USER folder, for the particular user, one has to use the key, which is where the UID is contained.
            url: `${firebase.getFBsettings().databaseURL}/users/${userData.key}.json`,
            method: "PUT",
            data: JSON.stringify(userData)
        }).done((locationData) => {
            console.log("Returned locationData in promise for addUserLocation():", locationData);
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
        console.log(data);
        return data;
        
    }
    );
};







module.exports = {addUserLocation, connectionTest, setfbUser, getFBUser};
