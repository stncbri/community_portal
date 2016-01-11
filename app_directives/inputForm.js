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
        },
        controller: 'FormsValidationCtrl'

    }
})

app.controller("FieldsCtrl", ['$scope','$filter' ,function ($scope,$filter) {

    $scope.statuses = [
        {value: 'true', text: 'Yes'},
        {value: 'false', text: 'No'},
    ];
    
    $scope.showYesNoOptions = function() {
        var selected = $filter('filter')($scope.statuses, {value: $scope.answers[$scope.question.Id]});
        return ($scope.answers[$scope.question.Id] && selected.length) ? selected[0].text : '___';
      };

    $scope.validate = function (data, validationClass) {
        //return true;
        if (validationClass == 'DUNS' && data.toString().length < 9) {
            return "DUNS number cannot be less than 9 digits"
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