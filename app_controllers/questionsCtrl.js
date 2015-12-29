app.controller('questionsCtrl', ['$scope', 'vfr', 'ngForceConfig', 'questionnaireService', 'identityService', 'sharedObject', '$timeout','$location',
                                 function($scope, vfr,ngForceConfig,questionnaireService, identityService, sharedObject, $timeout,$location) {

        $scope.user = [];
        $scope.answers = {};
        $scope.user = sharedObject.get('user');
        console.log($scope.user);
        if ($scope.user.isAuthenticated) {
            if ($scope.user.Profile__c == "supplier") {
                identityService.fetchBuyerCommunity($scope.user).then(function (resp) {
                    $scope.buyer = resp;
                    console.log($scope.buyer);
                });
                identityService.fetchSupplierCommunity($scope.user).then(function (resp) {
                    $scope.supplier = resp;
                    console.log($scope.supplier);
                    if ($scope.supplier != null) {
                        questionnaireService.getAnswerObj($scope.supplier).then(function (resp) {
                            if (angular.isDefined && resp.length >= 0) {
                                $scope.answers = questionnaireService.convertQustRsptoAnswerModel(resp);
                                console.log($scope.buyer);
                            }
                        });
                    }
                });
            }
            //$timeout(function () {
            //    $location.path("/");
            //});
        }
        if (angular.isUndefined(sharedObject.get('questionnaire'))) {
            questionnaireService.getQuestionnaire($scope.user).then(function (d) {
                $scope.questions = d;
                $scope.questionnaire = $scope.makeQuestionTree();
                sharedObject.put('questionnaire', $scope.questionnaire);
                sharedObject.addListner('questionnaire');
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            });
        } else {
            $scope.questionnaire = sharedObject.get('questionnaire');
        }


        $scope.upDateAnswer = function () {
            console.log($scope.answers);
            questionnaireService.updateQuestionnaireResponses($scope.supplier,$scope.buyer,$scope.answers).then(function(resp){
                console.log("Updated Response"+resp);
            });
        }

        $scope.makeQuestionTree = function () {		 //TODO may be better when located apex service.
            function findintree(m, v) {
                for (var i = 0; i < m.length; i++) {
                    var q = m[i];
                    if (v.Parent__c && q.Id === v.Parent__c) {
                        q.children.push(v);
                        found.parent = true;
                    }
                    if (q.Parent__c && q.Parent__c === v.Id) {
                        var json_data = JSON.stringify(q);
                        var copyq = JSON.parse(json_data);
                        v.children.push(copyq);
                        if (found.child) {
                            m.splice(i, 1);
                            i--;
                        }
                        else
                            m.splice(i, 1, v);
                        found.child = true;
                        continue;
                    }
                    if (q.children.length > 0) {
                        findintree(q.children, v);
                    }
                }
                return;
            };
            var tree = [];
            var qs = $scope.questions;
            for (var i = 0; i < qs.length; i++) {
                var q = qs[i];
                q.children = [];
                var found = {parent: false, child: false};

	    	findintree(tree,q,found);
	    	if(!found.child && !found.parent){
	    		tree.push(q);
	    	}
		}

		return tree;
	};



    }]);