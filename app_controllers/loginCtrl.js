app.controller('loginCtrl', ['$scope', 'vfr', '$location','loginService', function ($scope, vfr, $location,loginService) {
            $scope.beforeAuthentication = true;
            $scope.isAuthenticated = false;
            $scope.user = {userid: "walmart-buyer@dnb.com", password: "password"};
            $scope.userResponse = {}
            $scope.loader = {loading: false};
            $scope.login = function () {
                $scope.loader = {loading: true};
                loginService.findUser($scope.user.userid).then(function (v) {
                    $scope.userResponse = v;
                    if (!angular.isUndefined($scope.userResponse[0]) && $scope.userResponse[0].Password__c == $scope.user.password) {
                        $scope.status = "success";
                        $scope.loader = {loading: false};
                        $scope.beforeAuthentication = false;
                        $scope.isAuthenticated = true;
                        if (!$scope.$$phase) {
                            $scope.$digest();
                        }
                        $location.path( "/questionnaire" ); 
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