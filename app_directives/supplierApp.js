app.directive('supplierApp', function (ngForceConfig) {
    return {
        restrict: 'E',
        templateUrl: ngForceConfig.resourceUrl + '/app_templates/supplierApp.html',
        scope: {
            supplier: "=",
            buyerId:"="
        },
        link: function ($scope, iElm, iAttrs, controller) {
        }, controller: 'questionsCtrl'
    };
});