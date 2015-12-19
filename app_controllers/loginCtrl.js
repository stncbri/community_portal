app.controller('loginCtrl', ['$scope', 'vfr', '$location','loginService','sharedObject' ,function ($scope, vfr, $location,loginService,sharedObject) {
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
                        $location.path( "/portal" );
                        sharedObject.put('user',$scope.user);
                        $scope.$digest();
                        $scope.$apply(function() { $location.path("/portal"); }); //Use this if outside angula digest.
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