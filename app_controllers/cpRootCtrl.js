app.controller('cpRoot', ['$scope','sharedObject' , function ($scope ,sharedObject ) {
	sharedObject.addListner('user');
	 $scope.$on('userChanged', function() {
	        $scope.user = sharedObject.get('user');
	    });
}]);