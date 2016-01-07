// Not using this anymore..
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
        .directive(directiveSelector, ['$compile', 'ngForceConfig', function ($compile, ngForceConfig) {
            return {
                controller: 'FormFieldsCtrl',
                controllerAs: 'ctrl',
                templateUrl: ngForceConfig.resourceUrl + '/app_templates/field-templates/' + tpl + '.html',
                scope: {
                    model: '=',
                    question: '='
                }, link: function (scope, elem, attr) {
                    if (scope.question.DataType__c == 'date' && angular.isDefined(scope.model)) {
                        scope.model = new Date(scope.model);
                    }
                }
            }
        }])
});

app.directive("showHideControl", function (ngForceConfig) {
    return {
        restrict: "E",
        templateUrl: ngForceConfig.resourceUrl +"/app_templates/editControlButtons.html",
        scope: {},
        require: "^form",
        link: function (scope, element, attrs, form) {
            scope.form = form; //save parent form
            scope.searchButtonText = "Update"
        }, controller:  'FormFieldsCtrl'

    }
})

// Tying this to parent as it is needed to access the update fuctions..
app.controller("FormFieldsCtrl", ['$scope', '$attrs', function ($scope, $attrs) {
    $scope.searchButtonText = "Update";
    $scope.$watch('model', function (newValue, oldValue) {
        //console.log('scope reached child : '+$scope.model);
    });
    $scope.upDateAnswer = function () {
        $scope.searchButtonText = "Updating";
        $rootScope.$broadcast("UpdateAnswers", []);
    }
    $scope.$on('AnswersUpdated', function (args) {
        $scope.searchButtonText = "Update";
        $scope.$apply();
    });

    $scope.validate = function (data, validationClass) {
        //return true;
    }
}]);