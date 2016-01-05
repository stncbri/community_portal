app.directive('showBuyerSupplier', function(ngForceConfig){
    return {
        restrict: 'E',
        templateUrl: ngForceConfig.resourceUrl+'/app_templates/BuyerSupplier.html',
        link: function($scope, iElm, iAttrs, controller) {
        }
    };
}) ;