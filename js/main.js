"use strict";
console.log("hello");
let getter= require("./fetch");
let mine= require("./books");


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

