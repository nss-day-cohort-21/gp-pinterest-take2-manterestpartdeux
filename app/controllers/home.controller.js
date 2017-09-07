"use strict";

app.controller("homeCtrl", function($scope, userFactory, filterFactory, $rootScope){

    // $scope.tasks = [];
    let user = userFactory.getCurrentUser();

    // $rootScope.showSearch = true;
    // $scope.searchText = filterFactory;  

    // const showAllTasks = function(){
    // 	todoFactory.getAllTasks(user)
    // 	.then((tasks) => {
    // 		console.log("showAllTasks from promise", tasks);
    // 		$scope.tasks = tasks;
    // 		// console.log("$scope.tasks", $scope.tasks);
    // 	});
    // };

    
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


    // showAllTasks();

});