"use strict";

let firebase = require("./fb-config"),
	 provider = new firebase.auth.GoogleAuthProvider(),
	 currentUser = null;


firebase.auth().onAuthStateChanged((user) => {
	console.log("onAuthStateChanged", user);
	if (user){
		currentUser = user.uid;
		console.log("Current User Logged in?", currentUser);
	}else {
		currentUser = null;
		console.log("Current User NOT logged in:", currentUser);
	}
});

function logInGoogle() {
	return firebase.auth().signInWithPopup(provider);
}

function logOut(){
	return firebase.auth().signOut();
}
function getUser(){
	return currentUser;
}

function setUser(val){
	currentUser = val;
}

module.exports = {logInGoogle, logOut, getUser, setUser};
