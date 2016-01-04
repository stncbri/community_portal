app.controller('loginCtrl', ['$scope', 'vfr', '$location','identityService','sharedObject' ,'$timeout',function ($scope, vfr, $location,identityService,sharedObject,$timeout) {
			
            $scope.beforeAuthentication = true;
            $scope.isAuthenticated = false;
            $scope.user = {userid: "walmart-buyer@dnb.com", password: "password"};
            $scope.userResponse = {}
            $scope.loader = {loading: false};
            $scope.login = function () {
            	sharedObject.remove('questionnaire');
                $scope.loader = {loading: true};
                identityService.findUser($scope.user.userid).then(function (v) {
                    $scope.userResponse = v;
                    if (!angular.isUndefined($scope.userResponse[0]) && $scope.userResponse[0].Password__c == $scope.user.password) {
                        $scope.status = "success";
                        $scope.loader = {loading: false};
                        $scope.beforeAuthentication = false;
                        $scope.isAuthenticated = true;
                        
                       
                        $scope.userResponse[0].isAuthenticated=true;
	                sharedObject.put('user', $scope.userResponse[0]);
        	        $timeout(function () {
                	    $location.path("/portal");
                	});
                    } else {
                        //handle error message
                        $("#error-message").removeClass('hidden');
                        $scope.status = "Unable to login";
                    }
                    if (!$scope.$$phase) {
                        $scope.$digest();
                    }
                });

            };
        }])