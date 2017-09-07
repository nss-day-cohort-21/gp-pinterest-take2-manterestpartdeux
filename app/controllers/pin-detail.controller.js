"use strict";
/* handle data for detail view */

app.controller("pinDetailCtrl", function($scope, $routeParams, pinsFactory){

    console.log('itemId', $routeParams.itemId);
    
    const showTask = function(){
        pinsFactory.getSinglePin($routeParams.itemId)
        .then((data)=>{
            $scope.pin = data;
            // $scope.pin.id = $routeParams.itemId;
        });
    };

    showTask();
});