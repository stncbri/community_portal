app.controller('cpRoot', ['$scope','sharedObject' , function ($scope ,sharedObject ) {
    $scope.user={};
    $scope.user.isAuthenticated =false;
	sharedObject.addListner('user');
	 $scope.$on('userChanged', function() {
	        $scope.user = sharedObject.get('user');
	    });
}]);