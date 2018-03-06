"use strict";

let city = require("./fetch-city-data-rb");
let localTown = "Nashville";

let tester;
function testMe(){

    console.log("Fired module of location-set-rb.js");
}

function setCity(){


    city.fetchCity(localTown).then(
        (resolve) => {
            tester = resolve.results;

            console.log(tester);
        }


    );
}






module.exports = {testMe, setCity};