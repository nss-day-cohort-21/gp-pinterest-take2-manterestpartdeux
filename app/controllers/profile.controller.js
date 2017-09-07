"use strict";

app.controller("profileCtrl", function($scope, pinsFactory, userFactory, filterFactory, $rootScope){

    $scope.pins = [];
    $scope.viewPins = true;
    $scope.viewBoards = false;
    $scope.toggle = function(){
        $scope.viewPins = !$scope.viewPins;
        $scope.viewBoards = !$scope.viewBoards;
    };
    let user = userFactory.getCurrentUser();



    // $rootScope.showSearch = true;
    // $scope.searchText = filterFactory;  

    const showAllUserPins = function(user){
    	pinsFactory.getAllUserPins(user)
    	.then((pins) => {
    		console.log("showAllPins from promise", pins);
    		$scope.pins = pins;
    	});
    };

    const showAllUserBoards = function(user){
        pinsFactory.getAllUserBoards(user)
        .then((boards)=>{
            $scope.boards = boards;
        });
    };

    
    // $scope.deleteTask = function(id){
    // 	todoFactory.deleteTask(id)
    // 	.then(() => {
    // 		showAllTasks();
    // 	});

    // };
    // console.log("userFactory.getCurrentUser", userFactory.getCurrentUser());
    userFactory.getCurrentUserFullObj(userFactory.getCurrentUser())
    .then((currentUserFullObj) => {
        $scope.displayName = currentUserFullObj.displayName;
        $scope.photoURL = currentUserFullObj.photoURL;
    });

    showAllUserPins(user);
});
