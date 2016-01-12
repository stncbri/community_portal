app.controller('qSubSectionCtrl', ['$scope', '$rootScope',
    function ($scope, $rootScope) {
 
        $scope.$watch('model', function (newValue, oldValue) {
            //console.log('scope reached child : '+$scope.model);
        });

        $scope.upDateAnswer = function () { 
            $rootScope.$broadcast("UpdateAnswers", []);
        } 

        $scope.validate = function (data, validationClass) {
            //return true;
        }

    }]); 
