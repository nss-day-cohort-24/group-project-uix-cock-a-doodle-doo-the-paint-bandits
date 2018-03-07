"use strict";

let city = require("./fetch-city-data-rb");
let db = require("./fb-db-rb.js");
let localTown = "Nashville";

let returnedQuery;
function testMe(){

    console.log("Fired module of location-set-rb.js");
}

function setCity(){


    city.fetchCity(localTown).then(
        (resolve) => {
            returnedQuery = resolve.results[0];
            console.log(returnedQuery);
            return returnedQuery;
            
        }


    ).then(
        (location)=>{

            db.connectionTest();
            
            db.addUserLocation(location);
        }

    );
}






module.exports = {testMe, setCity};