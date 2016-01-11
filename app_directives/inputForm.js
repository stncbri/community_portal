app.directive("inputForm", function (ngForceConfig) {
    return {
        templateUrl: ngForceConfig.resourceUrl + '/app_templates/input-field.html',
        scope: { 
            answers: '=', 
            question: '='
        }, link: function (scope, elem, attr) {
            //if (scope.question.DataType__c == 'date' && angular.isDefined(scope.model)) {
            //    scope.model = new Date(scope.model);
            //}


        }, controller: 'FieldsCtrl'
    }
})

app.directive("showEditControl", function (ngForceConfig) {
    return {
        restrict: "E",
        templateUrl: ngForceConfig.resourceUrl + "/app_templates/editControlButtons.html",
        scope: {},
        require: "^form",
        link: function (scope, element, attrs, form) {
            scope.form = form;
            scope.searchButtonText = "Update"

        },
        controller: 'FormsValidationCtrl'

    }
})

app.controller("FieldsCtrl", ['$scope', function ($scope) {

    $scope.statuses = [
        {value: true, text: 'Yes'},
        {value: false, text: 'No'},
    ];

    $scope.validate = function (data, validationClass) {
        //return true;
        if (validationClass == 'DUNS' && data.toString().length < 9) {
            return "DUNS number cannot be less than 9 digits"
        }

    }

}]);

app.controller("FormsValidationCtrl", ['$scope', function ($scope) {
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


}]);