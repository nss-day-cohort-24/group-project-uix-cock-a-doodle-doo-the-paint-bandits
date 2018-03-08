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
let bigNews = $('#newsDiv');

console.log("yo", newsDiv);

/////////////// FUNCTION PRINT TO HOME //////////////
function  listNews() {
getNews().then((data) => {
// newsDisplay = data.events;
for(let i=0; i < 1; i++) {
 let currentNews = newsArticles[i];
 if(currentNews.urlToImage){
    newsDiv.append(`<a href="${currentNews.url}"><img src="${currentNews.urlToImage}" style="width:100px;height:100px;"></a><br>`);
     }
 newsDiv.append(`<h4><a href="${currentNews.url}">${currentNews.title}</a></h4><br>`);
 if(currentNews.description){
    newsDiv.append(`<p>${currentNews.description}</p>`);
  }
}});
}


////////// FUNCTION PRINT TO MAIN NEWS SECTION //////
function  printNews() {
    getNews().then((data) => {
    // newsDisplay = data.events;
    for(let i=0; i < 5; i++) {
     let currentNews = newsArticles[i];
     if(currentNews.urlToImage){
        bigNews.append(`<a href="${currentNews.url}"><img src="${currentNews.urlToImage}" style="width:100px;height:100px;"></a><br>`);
         }
     bigNews.append(`<a href="${currentNews.url}">${currentNews.title}</a><br>`);
     if(currentNews.description){
        bigNews.append(`<p>${currentNews.description}</p>`);
        // console.log("123456789");
   }}});
    }    

      
module.exports= { getNews, listNews, printNews};
      
      
          //   var req = new Request(url);
        //   fetch(req)
        //       .then(function(response) {
        //           console.log(response.json());
        //       })

// function getnews(callback){


//////////////////// USE LATER /////////
// }
// function  listNews() {
//     getNews().then((data) => {
//     newsDisplay = data.events;
//     for(let i=0; i < 5; i++) {
//      let currentNews = newsArticles[i];
//      if(currentNews.urlToImage){
//         newsDiv.append(`<a href="${currentNews.url}"><img src="${currentNews.urlToImage}" style="width:100px;height:100px;"></a><br>`);
//          }
//      newsDiv.append(`<a href="www.googl.com">${currentNews.title}</a><br>`);
//     }});
//     }
          