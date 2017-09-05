"use strict";

app.controller("userCtrl", function ($scope, $window, userFactory, $location) {

	console.log("userCtrl loaded");

	$scope.account = {
		email: "",
		password: ""
	};

	$scope.register = () => {
		console.log("clicked on register");
		userFactory.register({
			email: $scope.account.email,
			password: $scope.account.password
		})
		.then((userData) => {
			console.log("user controller newUser", userData);
			$scope.logIn();
		}, (error) => {
			console.log("error creating new user", error);
		
		});
	};

	$scope.logIn = () => {
		userFactory.logIn($scope.account)
		.then( () => {
			$window.location.href = "#!/task-list";
		});
	};

	$scope.logout = () => {
        userFactory.logOut()
        .then(function(){
        	console.log("logged out done");

        }, function(error){
        	console.log("error occured on logout");
        });
      };

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.isLoggedIn = true;
      console.log("currentUser logged in?", user);
      console.log("logged in t-f", $scope.isLoggedIn );
      $scope.$apply();
    } else {
      $scope.isLoggedIn = false;
      console.log("user logged in?", $scope.isLoggedIn);
      $window.location.href = "#!/login";
    }
  });

	$scope.loginGoogle = () => {
		console.log("you clicked on google login");
		userFactory.authWithProvider()
		.then((result) => {
			let user = result.user.uid;
			$location.path("/task-list");
			$scope.apply();
		})
		.catch((error) => {
			console.log("error with google login");
			let errorCode = error.code;
			let errorMessage = error.message;
			console.log("error", error); 
		});
	};

 //when first loaded, make sure no one is logged in
  // // console.log("what is this?", userFactory.isAuthenticated());
  // if (userFactory.isAuthenticated()) 
  //   logout();
  
// console.log("app isAuth", isAuth());
//   if (isAuth()){
//     console.log("app isAuth", isAuth());
//   }


});