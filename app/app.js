"use strict";

const app = angular.module("ManterestApp", ["ngRoute"]);

// let isAuth = (userFactory) => new Promise ( (resolve, reject) => {
//   console.log("userFactory is", userFactory);
//   userFactory.isAuthenticated()
//   .then( (userExists) => {
//     if(userExists){
//       console.log("Authenticated, go ahead");
//       resolve();
//     }else {
//       console.log("Authentication reject, GO AWAY");
//       reject();
//     }
//   });
// });



// app.config(($routeProvider) => {
// 	$routeProvider
// 	.when('/', {
// 		templateUrl: 'partials/list.html',
// 		controller: 'listCtrl',
// 		resolve: {isAuth}
// 	})
// 	.when('/login',{
// 		templateUrl: 'partials/user.html',
// 		controller: 'userCtrl'
// 	})
// 	.when('/task-list', {
// 		templateUrl: 'partials/list.html',
// 		controller: 'listCtrl',
// 		resolve: {isAuth}
// 	})
// 	.when('/item/newItem', {
// 		templateUrl: 'partials/form.html',
// 		controller: 'addTaskCtrl',
// 		resolve: {isAuth}
// 	})
// 	.when('/task/:itemId', {
// 		templateUrl: 'partials/details.html',
// 		controller: 'detailTaskCtrl',
// 		resolve: {isAuth}
// 	})
// 	.when('/task/:itemId/edit', {
// 		templateUrl: 'partials/form.html',
// 		controller: 'editTaskCtrl',
// 		resolve: {isAuth}
// 	})
// 	.otherwise('/');
// });


// app.run(($location, FBCreds) => {
// 	let creds = FBCreds;
// 	let authConfig = {
// 		apiKey: creds.apiKey,
// 		authDomain: creds.authDomain,
// 		databaseURL: creds.databaseURL
// 	};

// 	firebase.initializeApp(authConfig);
// });

// // example of $rootScope
// app.run(function($rootScope){
// 	$rootScope.showSearch = false;
// });

