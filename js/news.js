"use strict";
<<<<<<< HEAD
var $ = require('jquery');
var url = 'https://newsapi.org/v2/top-headlines?' +
=======
var $ = require('../lib/node_modules/jquery');

let url = 'https://newsapi.org/v2/top-headlines?' +
>>>>>>> 71a5f0b5e500c16e811b2621689829250e9f661f
          'country=us&' +
          'apiKey=5afaf2800c8b46329fbfd648e0c02b14';
let newsArticles;

function getNews(callbackFunction) {
   $.ajax({
       url: url
   }).done(function(data) {
       console.log("hello from news");
       newsArticles = data.articles;
       callbackFunction(newsArticles);
   });
}

let listNews = (newsArticles) => {
console.log("hey", newsArticles);
};
      
getNews(listNews);
      
module.exports= { getNews, listNews};
      
      
          //   var req = new Request(url);
        //   fetch(req)
        //       .then(function(response) {
        //           console.log(response.json());
        //       })

// function getnews(callback){

// }