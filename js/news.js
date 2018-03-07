"use strict";

var $ = require('jquery');


let url = 'https://newsapi.org/v2/top-headlines?' +
          'country=us&' +
          'apiKey=5afaf2800c8b46329fbfd648e0c02b14';
var newsArticles;

function getNews() {
  return $.ajax({
       url: url
   }).done((data) => {
    //    console.log("hello from news");
       newsArticles = data.articles;
    //    console.log("hello ", newsArticles);
       return newsArticles;
   });
}

var newsDisplay;

let newsDiv = $('#displayNews');

console.log("yo", newsDiv);

// let listNews = (newsArticles) => {
// console.log("hey2", newsArticles);
function  listNews() {
getNews().then((data) => {
newsDisplay = data.events;
for(let i=0; i < 5; i++) {
 let currentNews = newsArticles[i];
 if(currentNews.urlToImage){
    newsDiv.append(`<a href="${currentNews.url}"><img src="${currentNews.urlToImage}" style="width:100px;height:100px;"></a><br>`);
     }
 newsDiv.append(`<a href="www.googl.com">${currentNews.title}</a><br>`);
}});
}
      

      
module.exports= { getNews, listNews};
      
      
          //   var req = new Request(url);
        //   fetch(req)
        //       .then(function(response) {
        //           console.log(response.json());
        //       })

// function getnews(callback){

// }