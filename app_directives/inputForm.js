angular.forEach({
    'input-text': 'appInputTextComponent',
    'input-url': 'appInputUrlComponent',
    'input-email': 'appInputEmailComponent',
    'input-date': 'appInputDateComponent',
    'select': 'appSelectComponent',
    'textarea': 'appTextareaComponent',
    'input-number': 'appInputNumberComponent',
    'input-checkbox': 'appInputCheckboxComponent'
}, function (directiveSelector, tpl) {
    app
        .directive(directiveSelector, ['$compile','ngForceConfig',function ($compile,ngForceConfig) {
            return {
                controller: 'FormFieldsCtrl',
                controllerAs: 'ctrl',
                templateUrl: ngForceConfig.resourceUrl+'/app_templates/field-templates/' + tpl + '.html',
                scope: {
                    model: '=',
                    question: '='
                }, link: function (scope, elem, attr) {
                    if(scope.question.DataType__c == 'date' && angular.isDefined(scope.model)) {
						
                        scope.model = new Date(scope.model);
                    }
                }
            }
        }])
});

// Tying this to parent as it is needed to access the update fuctions..
app.controller("FormFieldsCtrl", ['$scope', '$attrs', function ($scope, $attrs) {
    //var directiveScope = $scope.$parent;
}]);