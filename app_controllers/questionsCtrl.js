app.controller('questionsCtrl', ['$scope', 'vfr', 'ngForceConfig', 'questionnaireService', 'identityService',
    'sharedObject', '$timeout', '$location', '$routeParams', '$rootScope',
    function ($scope, vfr, ngForceConfig, questionnaireService, identityService,
              sharedObject, $timeout, $location, $routeParams, $rootScope) { 

        $scope.user = [];
        $scope.user = sharedObject.get('user');
        $scope.selectorID = null;
        $scope.answers = {};
        $scope.searchButtonText = "Update";
        $scope.publishButtonText = "Publish";
        $scope.showDashBoard = true;
        $scope.showEditControl = true;
        $scope.upgradeText = "Register as a Level 2 Supplier"
        $scope.industry = $scope.user.CommunityAccount__r.Community__r.Industry__c;
        $scope.size = $scope.user.CommunityAccount__r.Community__r.Size__c;
        $scope.country = 'USA' // Need to add a country field..


        $scope.$watch('buyerId', function (value) {
            if (value != null) {
                $scope.buyerId = value;
                $scope.showDashBoard = false;
                $scope.showEditControl = false;
            }
        });
         
        $scope.$watch('supplier', function (value) {
            $scope.supplier = value;
            if (angular.isDefined($scope.supplier)) { 
                if (angular.isDefined($scope.buyerId)) {
                    questionnaireService.getPublishedAnswerObj($scope.supplier, $scope.buyerId).then(function (resp) {
                        if (angular.isDefined(resp) && resp.length > 0) {
                            for (var item in resp) {
                                $scope.answers[resp[item].Question__c] = resp[item].ResponseText__c;
                            }
                        }
                    });
                } else {
                    questionnaireService.getAnswerObj($scope.supplier).then(function (resp) {
                        if (angular.isDefined(resp) && resp.length >= 0) {
                            for (var item in resp) {
                                $scope.answers[resp[item].Question__c] = resp[item].ResponseText__c;
                            }                            
                        }
                        $scope.getQuestionnaire();
                    }); 
                    questionnaireService.getInvitations($scope.supplier).then(function (resp) {
                        if (angular.isDefined(resp) && resp.length >= 0) {
                            $scope.invitations = resp;
                        }
                    });
                }
            }
        });


        identityService.fetchBuyerCommunity($scope.user).then(function (resp) {
            $scope.buyers = resp;
        });


        $scope.getQuestionnaire = function () {
            questionnaireService.getSelectorFor( $scope.supplier ).then(function (resp) {
                if (resp) {  
                	$scope.selectorID = resp.Id; 
                }

                questionnaireService.getQuestionnaire($scope.user, $scope.selectorID).then(function (d) {
                    $scope.questions = d;
                    $scope.questionnaire = $scope.makeQuestionTree();
                    $scope.validateComplete();
                    $scope.$apply();
                });
            });
        };

        $scope.getInvitations = function () {
            questionnaireService.getInvitations($scope.supplier).then(function (invResp) {
                if (angular.isDefined(invResp) && invResp.length >= 0) {
                    $scope.invitations = invResp;
                    $scope.inviteButtonDisabled=false;
                    $scope.$apply();
                }
            })
        };
        $scope.updateInvitationStatus = function (invId, status) {
        	$scope.inviteButtonDisabled=true;
            questionnaireService.updateInvitationStatus(invId, status).then(function (resp) {
                $scope.getInvitations();
            });
 
        }

        $scope.publishTo = function (buyerId, invitationId) {
            $scope.publishButtonText = "Validating...";
            $scope.inviteButtonDisabled=true;
            $scope.validateComplete();
            for (var i = 0; i < $scope.questionnaire.length; i++) {
                var l1=$scope.questionnaire[i];
                if(l1.complete && l1.complete=='false'){
                	alert('Please complete all Mandatory fields');
                	$scope.publishButtonText = "Publish";
                	$scope.inviteButtonDisabled=false;
                	return;
                }
            }
            $scope.publishButtonText = "Updating...";
            questionnaireService.publish($scope.supplier, buyerId, $scope.answers, invitationId).then(function (resp) {
                    if (angular.isDefined(resp)) {
                        $scope.updateInvitationStatus(invitationId, "Published")
                    }
                    $scope.publishButtonText = "Publish";
                }
            );
        }

//        if (angular.isDefined($scope.user)) {
//            $scope.getQuestionnaire();
//        }
 
        $scope.upgradeAccountLevel = function () {
            $scope.upgradeText = "Upgrading..."
            questionnaireService.upgradeAccountLevel($scope.user).then(function (resp) {
                // Refresh the user
                identityService.findUser($scope.user.Name, '').then(function (resp) {
                    if (angular.isDefined(resp)) {
                        sharedObject.put('user', resp[0]);
                        $scope.user = sharedObject.get('user');
                        $scope.getQuestionnaire();
                        $scope.upgradeText = "Done";
                        $scope.$apply();
                    }
                });
            });
        }
 
        $scope.$on('UpdateAnswers', function (args) {
            questionnaireService.updateQuestionnaireResponses($scope.supplier, $scope.answers).then(function (resp) {
                $rootScope.$broadcast("AnswersUpdated", []);
                $scope.validateComplete();
                $scope.$apply();
            });
        });
 
        $scope.upDateAnswer = function () {
            $scope.searchButtonText = "Updating";
            questionnaireService.updateQuestionnaireResponses($scope.supplier, $scope.answers).then(function (resp) {
                $scope.searchButtonText = "Update";
            });
        }
        
        
        $scope.validateComplete = function () {
        	
        	function findQuestions(lx,ans) {
        		var mandatoryNotFilled=0;
        		for (var i = 0; i < lx.length; i++) {
                    var li=lx[i];
                    if(li.children && li.children.length>0){
                    	var mnf=findQuestions(li.children,ans);
                    	if(mnf==1){
                    		li.complete="false";
                    		mandatoryNotFilled=1;
                    	}
                    	if(mnf==2){
                    		li.complete="true";
                    		if(mandatoryNotFilled!=1)
                    			mandatoryNotFilled=2;
                    	}
                    }else{
                    	if(li.isAnswerRequired__c){
                    		var a=ans[li.Id];
                    		if(!a)
                    			mandatoryNotFilled=1;
                    		else{
                    			if(mandatoryNotFilled!=1)
                    				mandatoryNotFilled=2;
                    		}
                    	}
                    }
               }
        		return mandatoryNotFilled;
        	};
        	
        	var qs = $scope.questionnaire;
        	var ans = $scope.answers;
        	findQuestions(qs,ans);
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

                findintree(tree, q, found);
                if (!found.child && !found.parent) {
                    tree.push(q);
                }
            }

            return tree;
        };


    }]);