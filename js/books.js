"use strict";

console.log("Book Data");

let $ = require("jquery");

let bookSubmitButton = $("#form-submit");
console.log("What is the button?", bookSubmitButton);

bookSubmitButton.click(userInputToURL(event));


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

module.exports = { grabBookData, userInputToURL, bookSubmitButton };