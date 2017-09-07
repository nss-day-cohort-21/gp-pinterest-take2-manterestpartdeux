"use strict";

app.controller("profileCtrl", function($scope, pinsFactory, userFactory, filterFactory, $rootScope){

    $scope.pins = [];
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

    
    // $scope.deleteTask = function(id){
    // 	todoFactory.deleteTask(id)
    // 	.then(() => {
    // 		showAllTasks();
    // 	});

    // };

    showAllUserPins(user);
});
