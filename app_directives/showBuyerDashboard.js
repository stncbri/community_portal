app.directive('showBuyerDashboard', function(ngForceConfig){
    return {
        restrict: 'E',
        templateUrl: ngForceConfig.resourceUrl+'/app_templates/BuyerDashboard.html',
        link: function($scope, iElm, iAttrs, controller) {
        }
    };
}) ;