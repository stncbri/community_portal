app.directive('renderQuestionnaire', function(ngForceConfig){
    return {
        restrict: 'E',
        templateUrl: ngForceConfig.resourceUrl+'/app_templates/supplier-questionnaire.html',
        scope: true,
        link: function($scope, iElm, iAttrs, controller) {
        }
    };
}) ;