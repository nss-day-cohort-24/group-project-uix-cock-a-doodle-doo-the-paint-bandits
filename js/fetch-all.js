"use strict";
let $ = require("jquery");

// STUFF FROM BOOKS-SEARCH
let apiURL;
let bookSubmitButton = document.getElementById("form-submit");
let titleField = $("#book-title");
let authorField = $("#author-name");
let yearPubField = $("#publish-year");
let bookForm = $("book-form");

// FETCH OBJECTS FOR BOOKS
bookSubmitButton.click(userInputToURL(event));

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

function userInputToURL (string) {
	
	let bookTitleSearch = $("#book-title").val();
	console.log("book title", bookTitleSearch);

	let authorSearch = $("#author-name").val();
	console.log("authorSearch", authorSearch);

	let yearPublishedSearch = $("#publish-year").val();
	console.log("yearPublishedSearch", yearPublishedSearch);
}

function grabBookData(userBookInput) {
   
	return $.ajax({
		url: `https://openlibrary.org/search.json?q=${userBookInput}`,

	}).done(() => {

		return ;
   });
}


function userInputToURL(element, apiURL) {
    let titleQuery = titleField.val();
    console.log(titleQuery);

    apiURL = `http://openlibrary.org/search.json?q=${titleQuery}`;
    
    console.log(apiURL);
}
            


titleField.focusout(userInputToURL(apiURL));
authorField.focusout(userInputToURL(apiURL));
yearPubField.focusout(userInputToURL(apiURL));
bookSubmitButton.addEventListener = (click) => {
            console.log("The submit button has been clicked.");
    };















module.exports = {testMe, fetchWeather, fetchCity, grabBookData, userInputToURL, bookSubmitButton};