"use strict";

app.factory("pinsFactory", function($q, $http, FBCreds){
  const getAllPins = function(){
    let pins = [];
    console.log('FBCreds', FBCreds);
    return $q((resolve, reject)=>{
      $http.get(`${FBCreds.databaseURL}/.json`)
      .then((megaObject)=>{
        console.log('megaObject', megaObject);
        
        let pinCollection = megaObject.data.pins;
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
    console.log('FBCreds', FBCreds);
    return $q((resolve, reject)=>{
      $http.get(`${FBCreds.databaseURL}.json?orderBy="uid"&equalTo="${user}"`)
      .then((megaObject)=>{
        console.log('megaObject', megaObject);
        
        let pinCollection = megaObject.data.pins;
        console.log('pinCollection', pinCollection);
        // Object.keys(pinCollection.flavors).forEach((key)=>{
        //   pinCollection[key] = key;
        //   pins.push(pinCollection[key]);
        // });
        resolve(pinCollection);
      })
      .catch((error)=>{
        console.log('error', error);
      });
    });
  };

  const addPin = function(obj){
    let newObj = JSON.stringify(obj);
    return $http.post(`${FBCreds.databaseURL}/pins.json`, newObj)
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

  return {getAllPins, addPin, editPin, deletePin, getSinglePin};
});