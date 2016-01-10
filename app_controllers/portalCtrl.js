app.controller('portalCtrl', ['$scope', 'vfr', 'ngForceConfig', 'questionnaireService', 'identityService', 'sharedObject', '$timeout','$location',
                                 function($scope, vfr,ngForceConfig,questionnaireService, identityService, sharedObject, $timeout,$location) {
        $scope.user = [];
        $scope.answers = {};
        $scope.user = sharedObject.get('user');
        if ($scope.user.isAuthenticated) {  
           $scope.member = $scope.user.CommunityAccount__r.Community__r;   
        }
    }]);