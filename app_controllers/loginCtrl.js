app.controller('loginCtrl', ['$scope', 'vfr', '$location','identityService','sharedObject' ,'$timeout',function ($scope, vfr, $location,identityService,sharedObject,$timeout) {
            $scope.beforeAuthentication = true;
            $scope.isAuthenticated = false;
            $scope.user = {userid: "AcmeUser", password: "password"};
            $scope.userResponse = {}
            $scope.loader = {loading: false};
            $scope.login = function () {
                $scope.loader = {loading: true};
                identityService.findUser($scope.user.userid,$scope.user.password).then(function (v) { 
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
                        $("#error-message").removeClass('hidden');
                        $scope.status = "Unable to login";
                    }
                    if (!$scope.$$phase) {
                        $scope.$digest();
                    }
                }, function(reason) {
               	 $("#error-message").removeClass('hidden');
            	 if(reason.length>0)
            		 $scope.status = reason[0].message;
            	 else
            		 $scope.status = "Unable to login";
                 if (!$scope.$$phase) {
                     $scope.$digest();
                 }
            });

            };
        }])