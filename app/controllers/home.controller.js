"use strict";


app.controller("homeCtrl", function($scope, pinsFactory, userFactory, filterFactory, $rootScope){

    $scope.pins = [];
    // let user = userFactory.getCurrentUser();
    // $rootScope.showSearch = true;
    // $scope.searchText = filterFactory;  

    const showAllPins = function(){
    	pinsFactory.getAllPins()
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

    showAllPins();
});
