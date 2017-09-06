"use strict";

app.controller("addPinCtrl", function($scope, pinsFactory, $location, userFactory){

    $scope.title = "New Pin";
    $scope.submitButtonText = "Add New Pin";
    let user = userFactory.getCurrentUser();
    console.log('user', user);
    

    $scope.pin = {
        url: "",
        imgUrl: "",
        description: "",
        board: "",
        uid: user
    };

    $scope.submitTask = function(){
        pinsFactory.addPin($scope.pin)
        .then((data)=>{
            $location.url("/home");
        });
    };

    

});