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
        console.log('pinCollection', pinCollection.flavors);
        // Object.keys(pinCollection.flavors).forEach((key)=>{
        //   pinCollection[key] = key;
        //   pins.push(pinCollection[key]);
        // });
        resolve(pinCollection.flavors);
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

  };

  const editPin = function(id, obj){

  };

  const deletePin = function(id){

  };

  const getSinglePin = function(id){

  };

  return {getAllPins, addPin, editPin, deletePin, getSinglePin};
});