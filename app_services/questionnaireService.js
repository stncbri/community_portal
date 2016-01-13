app.service('questionnaireService', ['vfr', 'sharedObject', function (vfr, sharedObject) {
    this.getQuestionnaire = function (user, selectorID) {

        var level = user.CommunityAccount__r.Level__c;

        var selectCriteria = '';
        if (level == '1') {
            selectCriteria = " where RegisteredLevel__c= 1 ";
        } else {
            if (selectorID != null) {
                selectCriteria = " where Selector__R.Id = null or Selector__R.Id ='" + selectorID + "'"
            }else{
                selectCriteria = " where Selector__R.Id = null"
            }
        }
        var questionnaireQuery = vfr.query("Select Id,  Name, DataType__c, isAnswerRequired__c, isPrefilledbyDNB__c, QuestionText__c, Selector__c, QuestionType__c, Parent__c, DisplayLevel__c, DisplayOrder__c, RegisteredLevel__c,Validation__c FROM Question__c" + selectCriteria);
        console.log("Select Id,  Name, DataType__c, isAnswerRequired__c, isPrefilledbyDNB__c, QuestionText__c, Selector__c, QuestionType__c, Parent__c, DisplayLevel__c, DisplayOrder__c, RegisteredLevel__c,Validation__c FROM Question__c" + selectCriteria);
        return questionnaireQuery.then(function (response) {
            return response.records;
        });
    }
 
    this.getAnswerObj = function (supplier) {
        var query = vfr.query("Select Buyer__c,Question__c,ResponseID__c,ResponseText__c,Status__c,Supplier__c from Supplierresponse__c where supplier__c='" + supplier.Id + "'");
 
        return query.then(function (response) {
            return response.records;
        });
    }
 
    this.getPublishedAnswerObj = function (supplier, buyerID,inveId) {
        var query = vfr.query("Select Buyer__c,Question__c,ResponseID__c,ResponseText__c,Status__c,Supplier__c from " +
        		"PublishedQuestionnaire__c  where supplier__c='" + supplier.Id + "' " +
        				" and buyer__c='" + buyerID + "'  and  Invitation__c='"+inveId+"' ");
        //console.log("Select Buyer__c,Question__c,ResponseID__c,ResponseText__c,Status__c,Supplier__c from PublishedQuestionnaire__c  where supplier__c='" + supplier.Id + "' and buyer__c='" + buyerID + "'");
        return query.then(function (response) {
            return response.records;
        });
    }

    this.getInvitations = function (supplier) {
        var query = vfr.query("SELECT Campaign__r.Buyer__r.Id,Campaign__r.Buyer__r.Name,Notes__c,Status__c,Id FROM Invitation__c where supplier__r.Id='" + supplier.Id + "'");
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
                    "ResponseID__c": item + supplier.Id,
                    "ResponseText__c": answerModel[item],
                    "Supplier__c": supplier.Id
                }
                answerObj.push(tmpJson);
            }
        return vfr.updateResponse(angular.toJson(answerObj));
    }

    this.updateInvitationStatus = function (invitationId, status) {
        var tmpArray = [];
        var tmpJson = {
            "Id": invitationId,
            "Status__c": status
        }

        tmpArray.push(tmpJson);
        console.log(tmpArray);
        // Issue in ngforce.. update does not seem to work.. using bulk update insert as a work around..
        return vfr.bulkUpdate("Invitation__c", angular.toJson(tmpArray));
    }
    this.upgradeAccountLevel = function (user) {
        var tmpArray = [];
        var tmpJson = {
            "Id": user.CommunityAccount__r.Id,
            "Level__c": 2
        }
        tmpArray.push(tmpJson);
        console.log(tmpArray)
        return vfr.bulkUpdate("CommunityAccount__c", angular.toJson(tmpArray));
    }

    
    
//    this.getSelectors = function () {
//        var query = vfr.query("select Id, param1__c, param2__c,param3__c from selector__c");
//        return query.then(function (response) {
//            return response.records;
//        });
//    } 
    // TODO  this is way simpler just match the exact values no expresopn required. see implementation bellow
    
    
    this.getSelectorFor = function (sup) {
    	var par1=sup.Industry__c;
    	var par2=sup.Adddress__c;
    	var par3=sup.Size__c;
        var query = vfr.query("select Id, param1__c, param2__c,param3__c from selector__c where  (Param1__c='"+par1+"' or Param1__c=null) and " +
        		"(Param2__c='"+par2+"' or Param2__c=null) and (Param3__c='"+par3+"' or Param3__c=null)");
        return query.then(function (response) {
        	if(response.records.length>0)
        		return response.records[0];//TODO should only match one selector
        	else
        		return null;
        });
    }
    
    

    this.publish = function (supplier, buyerId, answerModel,invitationId) {
        var answerObj = [];
        for (var item in answerModel)
            if (answerModel.hasOwnProperty(item)) {
                var tmpJson = {
                    "Buyer__c": buyerId,
                    "Question__c": item, 
                    "ResponseID__c": item + buyerId + supplier.Id,
                    "ResponseText__c": answerModel[item],
                    "Supplier__c": supplier.Id,
                    "Status__c": "published",
                    "Invitation__c":invitationId
                }
                answerObj.push(tmpJson);
            }

        return vfr.publishResponse(angular.toJson(answerObj));
    }

}]);
