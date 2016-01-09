app.directive('buyerApp', function(ngForceConfig){
    return {
        restrict: 'E',
        templateUrl: ngForceConfig.resourceUrl+'/app_templates/buyer/buyerApp.html',
        scope: {
            buyer:"="
        },
        link: function ($scope, iElm, iAttrs, controller) {
        },
        controller:'buyerCtrl'

    };
}) ;