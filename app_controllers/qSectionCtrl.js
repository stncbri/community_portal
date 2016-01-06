app.controller('qSectionCtrl', ['$scope', 'vfr', 'ngForceConfig', 'questionnaireService', 'identityService', 'sharedObject', '$timeout','$location','$routeParams',
                                 function($scope, vfr,ngForceConfig,questionnaireService, identityService, sharedObject, $timeout,$location,$routeParams) {
 
		$scope.$watch('model', function(newContact){
			//console.log('scope reached');
			if($scope.model.children.length>0)
				$scope.selectedSubSection=$scope.model.children[0];
		});
	
		$scope.selectSubSection = function (val) {
			$scope.selectedSubSection=val;
        }
	
         
    }]);