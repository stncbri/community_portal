app.directive('qSubSection', function(ngForceConfig){
    return {
        restrict: 'E',
        templateUrl: ngForceConfig.resourceUrl+'/app_templates/qSubSection.html',
        scope: {
        	model:"=",
        	answers:"="
        },
        link: function($scope, iElm, iAttrs, controller) {
        },
        controller:'qSubSectionCtrl'
    };
}) ;