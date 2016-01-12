app.directive("inputForm", function (ngForceConfig) {
    return {
        templateUrl: ngForceConfig.resourceUrl + '/app_templates/input-field.html',
        scope: {
            answers: '=',
            question: '='
        }, link: function (scope, elem, attr) {

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
        },
        controller: 'FormsValidationCtrl'

    }
})

app.controller("FieldsCtrl", ['$scope', '$filter', function ($scope, $filter) {

    $scope.statuses = [
        {value: 'true', text: 'Yes'},
        {value: 'false', text: 'No'},
    ];

    $scope.showYesNoOptions = function () {
        var selected = $filter('filter')($scope.statuses, {value: $scope.answers[$scope.question.Id]});
        return ($scope.answers[$scope.question.Id] && selected.length) ? selected[0].text : '___';
    };

    $scope.validate = function (data, validationClass) {
        //return true;
        if (validationClass == 'DUNS' && (data && data.toString().length < 9)) {
            return "DUNS number cannot be less than 9 digits"
        }
        if (validationClass == 'FUTURE' && (data && angular.isDate(data)) && data < new Date()) {
            return "Date cannot be in the Past"
        }
        if (validationClass == 'NOTFUTURE' && (data && angular.isDate(data)) && data > new Date()) {
            return "Date should not be in future"
        }
        if (validationClass == 'PERCENT' && (isNaN(data) || data < 0 || data > 100)) {
            return "Not a Valid Percentage"
        }
        if (validationClass == 'YEAR') {
            var dataString = data.toString();
            var dataReg = "^(18|19|20)\d{2}$";
            if (dataString.match(dataReg)) {
                return "Not a Valid Year";
            }
        }if ((validationClass == 'SIC' || validationClass == 'NAICS') && !(angular.isNumber(data) && data.toString().length > 2 && data.toString().length < 8)) {
            return "Not a Valid SIC/NAICS Code"
        }


    }

}]);

app.controller("FormsValidationCtrl", ['$scope', function ($scope) {
    $scope.searchButtonText = "Edit";
    $scope.$watch('model', function (newValue, oldValue) {
        //console.log('scope reached child : '+$scope.model);
    });
    $scope.$on('UpdateAnswers', function (args) {
        $scope.searchButtonText = "Updating...";
    });
    $scope.$on('AnswersUpdated', function (args) {
        $scope.searchButtonText = "Edit";
        $scope.$apply();
    });


}]);