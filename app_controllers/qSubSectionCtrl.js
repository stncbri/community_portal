app.controller('qSubSectionCtrl', ['$scope', '$rootScope',
                                function($scope, $rootScope) {

	$scope.searchButtonText="Update";
	$scope.$watch('model', function(newValue, oldValue){
		//console.log('scope reached child : '+$scope.model); 
	});
	
	$scope.upDateAnswer = function () {
		$scope.searchButtonText = "Updating...";
		$rootScope.$broadcast("UpdateAnswers",[]);
    }
	$scope.$on('AnswersUpdated', function(args) {
		$scope.searchButtonText = "Update";
		$scope.$apply();
	});
	

   }]);