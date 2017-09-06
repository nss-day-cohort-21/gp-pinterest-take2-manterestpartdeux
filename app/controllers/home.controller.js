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

    
    // $scope.toggleDoneTask = function(obj) {
    //     console.log("toggledonetask", obj);
    //     let status = obj.isCompleted ? true : false;
    //     let tempObj = { isCompleted: status };
    //     todoFactory.editTask(obj.id, tempObj)
    //         .then(() => {
    //             console.log("then is updated");
    //             //tells it to pull updated data list back down:
    //             showAllTasks();
    //         });
    // };


    showAllPins();

});
