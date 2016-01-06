app.controller('cpRoot', ['$scope','sharedObject' ,'ngForceConfig', function ($scope ,sharedObject ,ngForceConfig) {
    $scope.user={}; 
    $scope.user.isAuthenticated =false;
	sharedObject.addListner('user');
	 $scope.$on('userChanged', function() {
	        $scope.user = sharedObject.get('user');
	    });
	 
	 $scope.resolveURL= function(key) {
	        return ngForceConfig.resourceUrl+key;
	    };
}]);