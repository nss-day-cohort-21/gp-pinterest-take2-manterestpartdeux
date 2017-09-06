"use strict";

app.factory("pinsFactory", function($q, $http, FBCreds){
  const getAllPins = function(){
    let pins = [];
    console.log('FBCreds', FBCreds);
    return $q((resolve, reject)=>{
      $http.get(`${FBCreds.databaseURL}/.json`)
      .then((megaObject)=>{
        console.log('megaObject', megaObject);
        
        let pinCollection = megaObject.data;
        console.log('pinCollection', pinCollection.pins);
        // Object.keys(pinCollection.flavors).forEach((key)=>{
        //   pinCollection[key] = key;
        //   pins.push(pinCollection[key]);
        // });
        resolve(pinCollection.pins);
      })
      .catch((error)=>{
        console.log('error', error);
      });
    });
  };
   const getAllUserPins = function(user){
    console.log('FBCreds', FBCreds);
    return $q((resolve, reject)=>{
      $http.get(`${FBCreds.databaseURL}.json?orderBy="uid"&equalTo="${user}"`);
    });
  };

  const addPin = function(obj){
    let newObj = JSON.stringify(obj);
    return $http.post(`${FBCreds.databaseURL}/pins.json`, newObj)
      .then((data)=>{
          console.log('data should be an ID', data);
          return data;
      }, (error) =>{
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log('error', errorCode, errorMessage);
      });
  
  };

  const editPin = function(id, obj){

  };

  const deletePin = function(id){

  };

  const getSinglePin = function(id){

  };

  return {getAllPins, addPin, editPin, deletePin, getSinglePin};
});