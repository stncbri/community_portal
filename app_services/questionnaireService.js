app.service('questionnaireService', ['vfr','sharedObject', function (vfr, sharedObject) {
    this.getQuestionnaire = function (user) {

		var level = user.RegisteredLevel__c;

        var selectCriteria = '';
        if (level == '1') {
            selectCriteria = " where RegisteredLevel__c= 1 or QuestionType__c!='Question' "; //TODO will have to fix it later
        } else {
            //get the selector obj.. for now keep it as empty..
        }
        var questionnaireQuery = vfr.query("Select Id,  Name, DataType__c, isAnswerRequired__c, isPrefilledbyDNB__c, QuestionText__c, Selector__c, QuestionType__c, Parent__c, DisplayLevel__c, DisplayOrder__c, RegisteredLevel__c FROM Question__c" + selectCriteria);
        return questionnaireQuery.then(function (response) {
            return response.records;
        });
    }


    this.getAnswerObj = function(supplier){
        var query = vfr.query("Select Buyer__c,Question__c,ResponseID__c,ResponseText__c,Status__c,Supplier__c from Supplierresponse__c where supplier__c='" + supplier[0].Id+"'");
		console.log(query);
        return query.then(function (response) {
			console.log(response);
            return response.records;
        });
    }

<<<<<<< HEAD
    this.updateQuestionnaireResponses = function (supplier, buyer, answerModel) {
        
=======
    this.updateQuestionnaireResponses = function (supplier, buyers, answerModel) {

>>>>>>> pr/9
		 var answerObj = [];
        for (var item in answerModel)
            if (answerModel.hasOwnProperty(item)) {
                var tmpJson = {
<<<<<<< HEAD
                    "Buyer__c": buyer[0].Buyer__c,
=======
                    "Buyer__c": buyers[0].Buyer__c,
>>>>>>> pr/9
                    "Question__c": item,
                    "ResponseID__c": item + supplier[0].Id,
                    "ResponseText__c": answerModel[item],
                    "Supplier__c": supplier[0].Id
                }
                answerObj.push(tmpJson);
            }
		console.log(answerObj);
        return vfr.updateResponse(angular.toJson(answerObj));
    }


    this.convertQustRsptoAnswerModel = function (questionResponse) {
        answerModel = [];
        for (var i = 0; i < questionResponse.length, i++;) {
            answerModel[questionResponse.Id] = questionResponse.ResponseText__c;
        }
        return answerModel;
    }

}]);
