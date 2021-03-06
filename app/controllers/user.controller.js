"use strict";

app.controller("userCtrl", function ($scope, $window, userFactory, $location) {

	console.log("userCtrl loaded");

	// Account login creds received for current users:
	$scope.account = {
		email: "",
		password: ""
	};

	// New account creds received for new user registering:
	$scope.newAccount = {
		email: "",
		password: ""
	};

	// displayName is stored because cannot add to profile upon registering user (per firebase)
	$scope.displayName = "";


	$scope.register = () => {
		console.log("clicked on register");
		userFactory.register({
			email: $scope.newAccount.email,
			password: $scope.newAccount.password
		})
		.then((userData) => {
			// console.log("user controller newUser", userData);
			//Immediately log them in
			userFactory.logIn($scope.newAccount)
			.then((newaccount) => {
				let name = $scope.displayName;
				// console.log("name", name, "typeof is: ", typeof name);
			//Update profile using the name they provided
			userFactory.updateDisplayName(name);
			})
			.then((whatever) => {
				addUser();
			})
			.catch((error) => {
				console.log("error updating display name", error);
			});
		
		});
	};

	// When login button is clicked, run loginInUser function to log in using existing user credentials provided
	$scope.logIn = () => {
		logInUser($scope.account);
	};

	// Utility login function that can log in existing user, or newly registered user after registering
	function logInUser(userCreds) {
		userFactory.logIn(userCreds)
		.then( () => {

			$window.location.href = "#!/home";
		});
	}


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
      console.log("firebase.auth()", firebase.auth());
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
			$location.path("/home");
			addUser();
			$scope.$apply();
			console.log("loginGoogle .then ran");
		})
		.catch((error) => {
			console.log("error with google login");
			let errorCode = error.code;
			let errorMessage = error.message;
			console.log("error", error); 
		});
	};

	// Checks if user exists in firebase, and if not, adds them.
	function addUser(){
		userFactory.getFBCurrentUser()
		.then( (user) => {
			console.log("****user in addUser****", user);
			// console.log("userFactory.userIsInFirebase(user.uid) in addUser", userFactory.userIsInFirebase(user.uid));
			userFactory.userIsInFirebase(user.uid)
			.then((isInFirebase) => {
				console.log("isInFirebase inside nested .then in addUser", isInFirebase);
				console.log("user in nested .then in addUser", user);
				console.log("user.email in nested .then in addUser", user.email);
				console.log("user.displayName", user.displayName);
				if(isInFirebase === false) {
					if($scope.displayName === ""){
						let userObj = {
							displayName: user.displayName,
	                      	uid: user.uid,
	                       	photoURL: user.photoURL
						};
						console.log("userObj in addUser", userObj);
						userFactory.addUserToFirebase(userObj);
					}else {
						let userObj = {
							displayName: $scope.displayName,
	                      	uid: user.uid,
	                       	photoURL: user.photoURL
						};
						console.log("userObj in addUser", userObj);
						userFactory.addUserToFirebase(userObj);
					}
				}else {
					console.log("user already in firebase");
				}
				//show home view
				$window.location.href = "#!/home";
			});
			
				// userFactory.addUserToFirebase(user);

			

		});

	}

 //when first loaded, make sure no one is logged in
  // // console.log("what is this?", userFactory.isAuthenticated());
  // if (userFactory.isAuthenticated()) 
  //   logout();
  
// console.log("app isAuth", isAuth());
//   if (isAuth()){
//     console.log("app isAuth", isAuth());
//   }


});