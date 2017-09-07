"use strict";

app.factory("pinsFactory", function($q, $http, FBCreds){

  const getAllPins = function(){
    let pins = [];
    console.log('FBCreds', FBCreds);
    return $q((resolve, reject)=>{
      $http.get(`${FBCreds.databaseURL}/pins/.json`)
      .then((megaObject)=>{
        console.log('megaObject', megaObject);
        
        let pinCollection = megaObject.data;
        console.log('pinCollection', pinCollection);
        Object.keys(pinCollection).forEach((key)=>{
          pinCollection[key].id = key;
          pins.push(pinCollection[key]);
        });
        console.log('pins', pins);
        
        resolve(pins);
      })
      .catch((error)=>{
        console.log('error', error);
      });
    });
  };
   const getAllUserPins = function(user){
     let pins = [];
    console.log('FBCreds', FBCreds);
    return $q((resolve, reject)=>{
      $http.get(`${FBCreds.databaseURL}/pins/.json?orderBy="uid"&equalTo="${user}"`)
      .then((megaObject)=>{
        console.log('megaObject', megaObject);
        
        let pinCollection = megaObject.data;
        console.log('pinCollection', pinCollection);
        Object.keys(pinCollection).forEach((key)=>{
          pinCollection[key].id = key;
          pins.push(pinCollection[key]);
        });
        resolve(pins);
      })
      .catch((error)=>{
        console.log('error', error);
      });
    });
  };

 const getAllUserBoards = function(user){
     let boards = [];
    console.log('FBCreds', FBCreds);
    return $q((resolve, reject)=>{
      $http.get(`${FBCreds.databaseURL}/boards/.json?orderBy="uid"&equalTo="${user}"`)
      .then((megaObject)=>{
        console.log('megaObject', megaObject);
        
        let boardCollection = megaObject.data;
        console.log('pinCollection', boardCollection);
        Object.keys(boardCollection).forEach((key)=>{
          boardCollection[key].id = key;
          boards.push(boardCollection[key]);
        });
          console.log('boards in pins.factory', boards);
          resolve(boards);
      })
      .catch((error)=>{
        console.log('error', error);
      });
    });
  };


  const addPin = function(obj){
    let newObj = JSON.stringify(obj);
    return $http.post(`${FBCreds.databaseURL}/pins/.json`, newObj)
      .then((data)=>{
          console.log('data should be an ID', data);
          return data;
      }, (error) =>{
          console.log('error', error);
      });
  
  };

   const addBoard = function(obj){
    let newObj = JSON.stringify(obj);
    return $http.post(`${FBCreds.databaseURL}/boards/.json`, newObj)
      .then((data)=>{
          console.log('data should be an ID', data);
          return data;
      }, (error) =>{
          console.log('error', error);
      });
  
  };
  const editPin = function(id, obj){

  };

  const deletePin = function(id){

  };

  const getSinglePin = function(id){
    return $q((resolve, reject)=>{
        $http.get(`${FBCreds.databaseURL}/pins/${id}.json`)
        .then((itemObj)=>{
            resolve(itemObj.data);
        })
        .catch((error)=>{
            reject(error);
        });
      });
  };

  const userIsInFirebase = function (uid) {
        //get all known users to check against
        // console.log("URL in userIsInFirebase: ", `${FBCreds.databaseURL}/users.json`);
        return new Promise ((resolve, reject) => {
            let isInFirebase = null;
            $http.get(`${FBCreds.databaseURL}/users.json`)
            .then((data) => {
                // console.log("data from userIsInFirebase", data.data);
                //If there are any users in the db (data.data!== null), then check to see if the passed user is in FB
                if (data.data !== null) {
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
                            break;
                        }else {
                            console.log("userIsInFirebase was false with value: ", uid);
                            isInFirebase = false;
                        }
                    }
                }else {
                    isInFirebase = false;
                }
                resolve(isInFirebase);
            });
        });
    };

  return {getAllPins, getAllUserPins, getAllUserBoards, addPin, addBoard, editPin, deletePin, getSinglePin};
});