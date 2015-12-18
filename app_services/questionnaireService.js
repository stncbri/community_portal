app.service('questionnaireService', [ 'vfr',  function ( vfr){
	
//        this.getPublishedQuestionnaire = function () {
//            var questionnaireQuery = vfr.query("Select Name, ResponseText__C,Question__r.Name,Question__r.ID,Question__r.Parent__c,Question__r.datatype__c,Question__r.QuestionType__C, Question__r.QuestionText__c, Buyer__r.Name, Supplier__r.Name FROM PublishedQuestionnaire__c ");
//            var promise = questionnaireQuery.then(function (response) {
//                return response.records;
//            });
//            return promise;
//         }
        
        
        
        this.getQuestionnaire = function () {
            var questionnaireQuery = vfr.query("SELECT Id,  QuestionType__c, QuestionText__c ,Parent__c , Name  FROM Question__c ");
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
