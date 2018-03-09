"use strict";
let $ = require("jquery");

// STUFF FROM BOOKS-SEARCH
let apiURL;
let bookSubmitButton = $("#form-submit");
let titleField = $("#book-title");
let authorField = $("#author-name");
let yearPubField = $("#publish-year");
let bookForm = $("book-form");

// FETCH OBJECTS FOR BOOKS
// bookSubmitButton.click(userInputToURL(event));

// FETCH OBJECTS FOR CITY
let keyCity = require ("./meeting-api-key-rb.js");

// FETCH OBJECTS FOR WEATHER
let keyWeather = require ("./weather-api-key-rb.js");
let lat = "36.16999816894531";
let lon = "-86.77999877929688";



// RANDOM TESTS TO BE DELETED
console.log("Books Data On Station");
console.log("What is the button?", bookSubmitButton);
console.log("Book Data");
function testMe(){
    console.log("Fired module of weather-fetch-rb.js");
}




function fetchCity(city){

    return new Promise((resolve, reject) => {

        let cityLoader = new XMLHttpRequest();

        cityLoader.open("GET", `https://api.meetup.com${keyCity.keyMeet.specifier}?key=${keyCity.keyMeet.apiKey}&sign=true&country=UnitedStates&state=Tennessee.json`, true);
        cityLoader.send();

        cityLoader.addEventListener("load", function() {

            var data = JSON.parse(this.responseText);
            resolve(data);

        });
        
    });
}

function fetchWeather(){ 

    return new Promise((resolve, reject ) =>{

        let weatherLoader = new XMLHttpRequest();
        //api.openweathermap.org/data/2.5/weather?lat=35&lon=139
        weatherLoader.open("GET", `https://${keyWeather.keyWeather.authDomain}${keyWeather.keyWeather.specifier}${keyWeather.keyWeather.APPID}&lat=${lat}&lon=${lon}`, true);
        weatherLoader.send();

        weatherLoader.addEventListener("load", function(){
            var data = JSON.parse(this.responseText);

            resolve(data);

        });
    });
}

// BOOKS WILL BE STARTING HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!

let searchBook = document.getElementById("searchBook"),
    outputBook = document.getElementById("outputBook");
searchBook.addEventListener("keydown", searchingBk);

function searchingBk(event) { 
    if (event.which === 13 || event.keyCode === 13) {

        // makes input into: this+is+input
        let theSplit = searchBook.value.replace(/ /g, "+");
        dataBook(theSplit).then(
            (resolve) => {
                printBkSearch(resolve);
            },
            (reject) => {
                console.log("didn't load");
            }
        );
    }
}

let dataBook = (input) => { 
    return new Promise((resolve, reject) => {
        var bookBase = `http://openlibrary.org/search.json?q=${input}&limit=10`;

        let request = new XMLHttpRequest();

        request.onload = function () {
            if (request.status === 200) {
                let data = JSON.parse(request.responseText);
                resolve(data);
            }
        };
        request.open("GET", bookBase);
        request.send();
    });
};

let printBkSearch = (resolve) => {
    outputBook.innerHTML = "";

    for (let item in resolve.docs) {
        let fullItem = resolve.docs[item];

        let itemList = {
            sub: fullItem.subtitle ? `: ${fullItem.subtitle}` : "",
            author: fullItem.author_name ? `${fullItem.author_name}` : "Unknown",
            uStatus: fullItem.author_name ? "" : "uknown",
            pubDate: fullItem.first_publish_year ? `- first published in ${fullItem.first_publish_year}` : "",
        };

        outputBook.innerHTML +=
            `<div class="book-printed">
        <h1>${fullItem.title}${itemList.sub}</h1>
        <h2 class=${itemList.uStatus}>by ${itemList.author}</h2>
        <p>${itemList.pubDate}</p>
        </div>`;
    }
};

module.exports = {printBkSearch, dataBook, searchingBk, fetchWeather, fetchCity};