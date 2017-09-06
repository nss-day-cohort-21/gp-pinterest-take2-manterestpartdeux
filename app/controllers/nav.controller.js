"use strict";
// having $window injected forces reload of page
app.controller("navCtrl", function ($scope, $window, userFactory, filterFactory) {
	$scope.searchText = filterFactory;
	$scope.isLoggedIn = false;


	$scope.logout = () => {
        userFactory.logOut();
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




});