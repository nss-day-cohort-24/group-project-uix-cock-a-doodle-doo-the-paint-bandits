"use strict";

var $ = require('jquery');
var user = require('./users');
var firebase = require('./fb-config');
var buttonNum = 0;
let nameButton;
let newsImgAdd;
let newsTitleAdd;
let newsUrlAdd;
let articles;


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
let bigNews = $('#newsSectionDiv');

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
    newsDisplay = data.events;
    for(let i=0; i < 5; i++) {
     let currentNews = newsArticles[i];
     if(currentNews.urlToImage){
        bigNews.append(`<a href="${currentNews.url}"><img src="${currentNews.urlToImage}" style="width:100px;height:100px;"></a><br>`);
         }
     bigNews.append(`<a href="${currentNews.url}">${currentNews.title}</a><br>`);
     if(currentNews.description){
        bigNews.append(`<p>${currentNews.description}</p>`);
       }
       bigNews.append(`<button id="button${i}">SAVE</button><br>`);
}});
    }    
    
    function buildNewNews() {
        let newsObj ={
            imageUrl: getNewsImageUrl(articles),
            title:getNewsTitle(articles),
            url: getNewsUrl(articles),
            uid: user.getUser()
        };
        return newsObj;
    }
$(document).ready(function(){
    bigNews.click(function newsButton(event){
        let buttonName = event.target.id;
        buttonNum = buttonName.slice(6, 7);
        buttonNum = parseInt(buttonNum);
        console.log(buttonNum);
        let newsObj = buildNewNews();
        addSavedNews(newsObj);
    });
});
function addSavedNews(newsObj) {
    console.log("add news", newsObj);
    return $.ajax({
        url:`${firebase.getFBsettings().databaseurl}/news.json`,
        type: 'POST',
        data: JSON.stringify(newsObj),
        dataType: 'json'
    }).done((newsID) =>{
        return newsID;
    });
}

    function editNews(newsFormObj, newsId) {
        return $.ajax({
          url: `https://music-history-d2484.firebaseio.com/songs/${newsId}.json`,
          type: 'PUT',
          data: JSON.stringify(newsFormObj)
        }).done((data) => {
          return data;
        });
     }



///////////////// DECLARE FUNCTIONS ///////////
function getNewsImageUrl(articles){
    console.log("what button num?:", buttonNum);
  let currentNewsImg = articles[buttonNum];
  let newsImgAdd = currentNewsImg.urlToImage;
  console.log(newsImgAdd);
  return newsImgAdd;
  }

function getNewsTitle(articles){
  console.log("what button num?:", buttonNum);
let currentNewsTitle = articles[buttonNum];
let newsTitleAdd = currentNewsTitle.title;
console.log(newsTitleAdd);
return newsTitleAdd;
}

function getNewsUrl(articles){
    console.log("button num:", buttonNum);
let currentNewsUrl = articles[buttonNum];
let newsUrlAdd = currentNewsUrl.url;
console.log(newsUrlAdd);
return newsUrlAdd;
}

function retrieveNews(uid){
    console.log("url", firebase.getFBsettings().databaseURL);
    return $.ajax({
        url:`${firebase.getFBsettings().databaseURL}/news.json`
    }).done((newsData) => {
        findSavedNews(newsData);
        return newsData;
    });
}

function findSavedNews(newsData){
    console.log("newsData",newsData);
    let newsArray = (Object.values(newsData));
    console.log("newsArray",newsArray);
    let newsPrintArray = [];
    for (let i=0;i<newsArray.length;i++){
        let currentUid = user.getUser();
        let currentCompare = newsArray[i].uid;
        if (currentUid == currentCompare){
            newsPrintArray.push(newsArray[i]);
            console.log("To print:",newsPrintArray);
        }
    
    }
    populateSavedNews(newsPrintArray);
    
    }
    
    function populateSavedNews(newsPrintArray){
        $('#savedNewsDiv').html(`<h2>Your Saved News</h2>`);
        for (let j=0;j<newsPrintArray.length;j++){
            let savedNews = newsPrintArray[j];
            console.log(savedNews);
            if (savedNews.imageUrl){
            $('#savedNewsDiv').append(`<br><a href="${savedNews.url}"><img src="${savedNews.imageUrl}" style="width:100px;height:100px;"></a><br>`);
            }
            $('#savedNewsDiv').append(`<a href="${savedNews.url}"><h3>${savedNews.title}<h3></a><br>`);
        }}


      
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
          