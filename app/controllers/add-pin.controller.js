"use strict";

app.controller("addPinCtrl", function($scope, pinsFactory, $location, userFactory){

    $scope.title = "New Pin";
    $scope.submitButtonText = "Add New Pin";
    let user = userFactory.getCurrentUser();
    console.log('user', user);

    pinsFactory.getAllUserBoards(user)
    .then((boards)=>{
        $scope.boards = boards;
        // console.log('$scope.boards', $scope.boards);
        createScopePin();
    });

    var createScopePin = function(){
        $scope.pin = {
            url: "",
            imgUrl: "",
            description: "",
            boardid: "",
            uid: user
        };
    };
    $scope.submitTask = function(){
        console.log('$scope.pin submitted', $scope.pin);
        // $scope.pin.boardid
        pinsFactory.addPin($scope.pin)
        .then((data)=>{
            $location.url("/home");
        });
    };
      
});