"use strict";

app.controller("addBoardCtrl", function($scope, pinsFactory, $location, userFactory){

    $scope.title = "Add Board";
    $scope.submitButtonText = "Add New Board";
    let user = userFactory.getCurrentUser();
    console.log('user', user);
    

    $scope.board = {
        board: "",
        uid: user
    };

    $scope.submitTask = function(){
        pinsFactory.addBoard($scope.board)
        .then((data)=>{
            $location.url("/home");
        });
    };
      
});