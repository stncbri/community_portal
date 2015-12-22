app.controller('questionsCtrl', ['$scope', 'vfr', 'ngForceConfig', 'questionnaireService',
                                 function($scope, vfr,ngForceConfig,questionnaireService) {

	questionnaireService.getQuestionnaire().then(function(d) {
		$scope.questions = d;
		$scope.questionnaire=$scope.makeQuestionTree();
		console.log($scope.questionnaire);
		if(!$scope.$$phase) {
			$scope.$digest();
		}
	});

$scope.getPartial = function (path){
	return ngForceConfig.resourceUrl+path;
}

	$scope.answers ={};

	$scope.upDateQuestion = function (){
		console.log($scope.answers);
	}


	$scope.makeQuestionTree = function (){		 //TODO may be better when located apex service.
		function findintree (m,v){
			for( var i=0 ; i<m.length ; i++ ) {
			    var q=m[i];
			    if( v.Parent__c &&  q.Id ===v.Parent__c){
			    	 q.children.push(v);
			    	 found.parent=true;
			    }
			    if(   q.Parent__c &&  q.Parent__c ===v.Id){
			    	 var json_data = JSON.stringify(q);
			    	 var copyq =JSON.parse(json_data);
			    	 v.children.push(copyq);
			    	 if(found.child){
			    		 m.splice(i,1);
			    		 i--;
			    	 }
			    	 else
			    		 m.splice(i,1,v);
			    	 found.child=true;
			    	 continue;
			    }
			    if(q.children.length>0){
			    	findintree(q.children , v);
			    }
			}
			return  ;
		};

		var tree=[];
		var qs=$scope.questions;
		for( var i=0 ; i<qs.length ; i++ ) {
		    var q=qs[i];
		    q.children=[];
	    	var found={parent:false,child:false};

	    	findintree(tree,q,found);
	    	if(!found.child && !found.parent){
	    		tree.push(q);
	    	}
		}

		return tree;
	};



}]);