app.directive('qSection', function(ngForceConfig){
    return {
        restrict: 'E',
        templateUrl: ngForceConfig.resourceUrl+'/app_templates/qSection.html',
        scope: {
        	model:"=",
        	answers:"=",
            showEditControl:"="
        },
        link: function($scope, iElm, iAttrs, controller) {
        },
        controller:'qSectionCtrl'
    };
}) ;