"use strict";

console.log("Books Data On Station");

let $ = require("jquery");

let apiURL;


let bookSubmitButton = $("#form-submit");
let titleField = $("#book-title");
let authorField = $("#author-name");
let yearPubField = $("#publish-year");
let bookForm = $("book-form");


function userInputToURL(element, apiURL) {
    let titleQuery = titleField.val();
    console.log(titleQuery);

    apiURL = `http://openlibrary.org/search.json?q=${titleQuery}`;

    console.log(apiURL);
}


titleField.focusout(userInputToURL(apiURL));



authorField.focusout(userInputToURL(apiURL));

yearPubField.focusout(userInputToURL(apiURL));

bookSubmitButton.click(function (event) {
    console.log("Click me again");
});

function grabBookData(userBookInput) {

    return $.ajax({
        url: `https://openlibrary.org/search.json?q=${userBookInput}`,

    }).done(() => {

        return;
    });
}

module.exports = { bookSubmitButton, userInputToURL };