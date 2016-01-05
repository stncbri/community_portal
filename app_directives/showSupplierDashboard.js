<<<<<<< HEAD
app.directive('showSupplierDashboard', function(ngForceConfig){
    return {
        restrict: 'E',
        templateUrl: ngForceConfig.resourceUrl+'/app_templates/supplier-dashboard.html',
	scope: true,
        link: function($scope, iElm, iAttrs, controller) {
        }
    };
=======
app.directive('showSupplierDashboard', function(ngForceConfig){
    return {
        restrict: 'E',
        templateUrl: ngForceConfig.resourceUrl+'/app_templates/supplier-dashboard.html',
	        scope: {
            supplier:"="
        },
        link: function($scope, iElm, iAttrs, controller) {
        },controller:'questionsCtrl'
    };
>>>>>>> pr/9
}) ;