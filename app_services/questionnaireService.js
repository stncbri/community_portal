app.service('questionnaireService', [ 'vfr',  function ( vfr){

//        this.getPublishedQuestionnaire = function () {
//            var questionnaireQuery = vfr.query("Select Name, ResponseText__C,Question__r.Name,Question__r.ID,Question__r.Parent__c,Question__r.datatype__c,Question__r.QuestionType__C, Question__r.QuestionText__c, Buyer__r.Name, Supplier__r.Name FROM PublishedQuestionnaire__c ");
//            var promise = questionnaireQuery.then(function (response) {
//                return response.records;
//            });
//            return promise;
//         }



        this.getQuestionnaire = function () {
            var questionnaireQuery = vfr.query("Select Id,  Name, DataType__c, isAnswerRequired__c, isPrefilledbyDNB__c, QuestionText__c, Selector__c, QuestionType__c, Parent__c, DisplayLevel__c, DisplayOrder__c, RegisteredLevel__c FROM Question__c order by DisplayOrder__c");
            return questionnaireQuery.then(function (response) {
                return response.records;
            });
         }


//       this.updateResponse = function(response){
//       		var  updateObj = vfr.bulkUpdate("PublishedQuestionnaire__c",response);
//           var promise = updateObj.then(function (response) {
//                return response.records;
//            });
//                   return promise;
//
//       }

}]);
