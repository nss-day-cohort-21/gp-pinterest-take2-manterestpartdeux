"use strict";

/*

    provide the basic auth functionality for firebase

 */

app.factory("userFactory", function($q, $http, FBCreds){

    // This is just the user's UID from Firebase
    let currentUser = null;
    // This is the complete user object that comes back from Firebase
    let FBCurrentUser = null;


    const getCurrentUser = function(){
        return currentUser;

    };


    


    const logIn = function(userObj){
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
            .catch(function(error){
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
        });

    };


    const logOut = function(){
        console.log("logoutUser");
        return firebase.auth().signOut();

    };


    const register = function(userObj){
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .catch(function(error){
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
        });

    };

    const updateDisplayName = function (name){
        return firebase.auth().currentUser.updateProfile({
            displayName: name
        }).then(function (){
            console.log("name update successful");
        }).catch(function() {
            console.log("error updating name");
        });
    };

    //Checks to see if user is already in Firebase "Users" collection
    const userIsInFirebase = function (uid) {
        //get all known users to check against
        // console.log("URL in userIsInFirebase: ", `${FBCreds.databaseURL}/users.json`);
        return new Promise ((resolve, reject) => {
            let isInFirebase = null;
            $http.get(`${FBCreds.databaseURL}/users.json`)
            .then((data) => {
                // console.log("data from userIsInFirebase", data.data);
                let userObjects = data.data;
                let UIDArray = [];
                Object.keys(userObjects).forEach(function (key) {
                    UIDArray.push(userObjects[key].UID);
                });
                // console.log("UIDArray", UIDArray);
                for (let i = 0; i < UIDArray.length; i++) {
                    if (UIDArray[i] == uid) {
                        console.log("userIsInFirebase was true with value: ", uid);
                        isInFirebase = true;
                    }else {
                        console.log("userIsInFirebase was false with value: ", uid);
                        isInFirebase = false;
                    }
                }
            });
        resolve(isInFirebase);
        });
    };
    userIsInFirebase(12345678);


    // Adds a user to Firebase Users collection
    const addUserToFirebase = function(userObj){
        let newObj = JSON.stringify(userObj);
        // console.log("URL is: ", `${FBCreds.databaseURL}/users.json`);
        return $http.post(`${FBCreds.databaseURL}/users.json`, newObj)
        .then((data) => {
            // console.log("added user data returned: ", data);
            return data;

        }, (error) => {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error", errorCode, errorMessage);
        });
    };

    const getFBCurrentUser = function () {
        // console.log("userFactory: isAuthenticated");
            return new Promise ((resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                    console.log("user in getFBCurrentUser", user);
                    FBCurrentUser = {
                        displayName: user.displayName,
                        uid: user.uid
                    };
                    // console.log("FBCurrentUser in getFBCurrentUser return 1**", FBCurrentUser);
                resolve(FBCurrentUser);
                });
            });
        };





    const isAuthenticated = function (){
        // console.log("userFactory: isAuthenticated");
        return new Promise ( (resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                if (user){
                    currentUser = user.uid;
                    // console.log("user", user.uid);
                    resolve(true);
                }else {
                    resolve(false);
                }
            });
        });
    };

    //Set up google auth
    let provider = new firebase.auth.GoogleAuthProvider();

    let authWithProvider= function(){
        return firebase.auth().signInWithPopup(provider);
    };



    return {getCurrentUser, logIn, logOut, register, isAuthenticated, authWithProvider, updateDisplayName, userIsInFirebase, addUserToFirebase, getFBCurrentUser};

});