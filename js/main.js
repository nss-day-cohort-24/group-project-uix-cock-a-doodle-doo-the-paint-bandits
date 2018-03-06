"use strict";
console.log("hello");
let getter= require("./fetch");
let mine= require("./books");
let news= require("./news");

function testing(result) {
result= getter.test();
return result;
}
testing();
function testing2(result) {
    result= mine.shit();
    return result;
    }
testing2();
news.getNews();