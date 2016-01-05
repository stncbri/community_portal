app.controller('portalCtrl', ['$scope', 'vfr', 'ngForceConfig', 'questionnaireService', 'identityService', 'sharedObject', '$timeout','$location',
                                 function($scope, vfr,ngForceConfig,questionnaireService, identityService, sharedObject, $timeout,$location) {
        $scope.user = [];
        $scope.answers = {};
        $scope.user = sharedObject.get('user');
        if ($scope.user.isAuthenticated) {
            if ($scope.user.Profile__c == "supplier") {
                identityService.fetchBuyerCommunity($scope.user).then(function (resp) {
                    $scope.buyer = resp;
                });
                identityService.fetchSupplierCommunity($scope.user).then(function (resp) {
                        $scope.supplier = resp;
                    }
                );
            }
            //if ($scope.user.Profile__c == "buyer"){
            //    // PLACEHOLDER: Do things related to the buyer or admin portal if needed..
            //}
        }
    }]);