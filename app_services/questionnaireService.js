app.service('questionnaireService', ['vfr','sharedObject', function (vfr, sharedObject) {
    this.getQuestionnaire = function (user) {

		var level = user.RegisteredLevel__c;

        var selectCriteria = '';
        if (level == '1') {
            selectCriteria = ' where RegisteredLevel__c= 1';
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
        return query.then(function (response) {
            return response.records;
        });
    }

    this.getInvitations = function(supplier){
        var query = vfr.query("SELECT Campaign__r.Buyer__r.Id,Campaign__r.Buyer__r.Name,Notes__c,Status__c FROM Invitation__c where supplier__r.Id='" + supplier[0].Id+"'");
        return query.then(function (response) {
            return response.records;
        });
    }

    this.updateQuestionnaireResponses = function (supplier, answerModel) {
	 var answerObj = [];
        for (var item in answerModel)
            if (answerModel.hasOwnProperty(item)) {
                var tmpJson = {
                    //"Buyer__c": buyers[0].Buyer__c,
                    "Question__c": item,
                    "ResponseID__c": item + supplier[0].Id,
                    "ResponseText__c": answerModel[item],
                    "Supplier__c": supplier[0].Id
                }
                answerObj.push(tmpJson);
            }
        return vfr.updateResponse(angular.toJson(answerObj));
    }


    this.publish = function(supplier,buyerId,answerModel){
        var answerObj = [];
        for (var item in answerModel)
            if (answerModel.hasOwnProperty(item)) {
                var tmpJson = {
                    "Buyer__c": buyerId,
                    "Question__c": item,
                    "ResponseID__c": item + buyerId+supplier[0].Id,
                    "ResponseText__c": answerModel[item],
                    "Supplier__c": supplier[0].Id,
                    "Status__c": "published"
                }
                answerObj.push(tmpJson);
            }
        return vfr.publishResponse(angular.toJson(answerObj));
    }

}]);
