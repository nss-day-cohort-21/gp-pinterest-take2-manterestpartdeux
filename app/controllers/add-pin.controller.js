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
    });

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