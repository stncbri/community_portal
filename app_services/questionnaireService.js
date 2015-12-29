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

    this.updateQuestionnaireResponses = function (supplier, buyer, answerModel) {
        var convertAnswerModeltoQuestRsp = function (supplier, buyer, answerModel) {
            var answerObj = [];
            angular.forEach(answerModel, function (k, v) {
                var tmpJson = {
                    "Buyer__c": buyer[0].Id,
                    "Question__c": k,
                    "ResponseID__c": k+supplier[0].Id,
                    "ResponseText__c": v,
                    "Supplier__c": supplier[0].Id
                }
                answerObj.push(tmpJson);
            })
            return answerObj;
        }

        var answerObj = convertAnswerModeltoQuestRsp(supplier, buyer, answerModel);
        return vfr.updateResponse(answerObj);
    }


    this.convertQustRsptoAnswerModel = function (questionResponse) {
        answerModel = [];
        for (var i = 0; i < questionResponse.length, i++;) {
            answerModel[questionResponse.Id] = questionResponse.ResponseText__c;
        }
        return answerModel;
    }

}]);
