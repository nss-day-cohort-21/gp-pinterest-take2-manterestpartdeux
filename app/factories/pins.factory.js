"use strict";

app.factory("pinsFactory", function($q, $http, FBCreds){
  const getAllPins = function(user){
    console.log('FBCreds', FBCreds);
    
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