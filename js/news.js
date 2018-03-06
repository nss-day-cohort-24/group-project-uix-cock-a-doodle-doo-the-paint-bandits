"use strict";
var $ = require('jquery');
var url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=5afaf2800c8b46329fbfd648e0c02b14';
let newsArticles;

function getNews(callbackFunction) {
   $.ajax({
       url: url
   }).done(function(data) {
       console.log("hello from news");
       newsArticles = data.newsArticles;
       callbackFunction(newsArticles);
   });
}

function listNews(newsArticles) {
console.log("hey", newsArticles);
}
      
getNews(listNews);
      
module.exports= { getNews, listNews};
      
      
          //   var req = new Request(url);
        //   fetch(req)
        //       .then(function(response) {
        //           console.log(response.json());
        //       })

// function getnews(callback){

// }