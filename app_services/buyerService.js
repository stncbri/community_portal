app.service('buyerService', [ 'vfr',  function ( vfr){

        this.getCommunity = function () {
            var communityQuery = vfr.query("SELECT Supplier__c FROM CommunityLinkage__c WHERE Buyer__c = 'a012800000FVRbPAAX'");
            return communityQuery.then(function (response) {
                return response.records;
            });
        }

        this.getCommunityUser = function () {
           var communityUsrQuery = vfr.query("SELECT CommunityUser__c FROM Community__c WHERE Id in (SELECT Supplier__c FROM CommunityLinkage__c WHERE Buyer__c = 'a012800000FVRbP')");
            return communityUsrQuery.then(function (response) {                
                //return response.records;
                
                var userResponse = response.records;
       		    var uc = "";      
         	    for( var i=0 ; i<userResponse.length ; i++ ) {
                   if(i==0){
		   			 		uc = uc + "'"+userResponse[i].CommunityUser__c+"'";              
                      }else{
                      		uc = uc + ", '"+userResponse[i].CommunityUser__c+"'";              
                      }
                   }
         
                var communityUsrLvlQuery = vfr.query("SELECT RegisteredLevel__c FROM User__c where Id IN ("+uc+")");           
            		return communityUsrLvlQuery.then(function (response) {
                        var userResponse =response.records;
                        return userResponse;                
            	});
        
            });
           
		}
		
		// To hetch the invitaion details
		this.getInvitaions = function () {
            var invitaionQuery = vfr.query("SELECT Campaign__c,Id,Name,Notes__c,Status__c,Supplier__c FROM Invitation__c");
            return invitaionQuery.then(function (response) {
                return response.records;
            });
         }
         
		 this.getSupplierInvitaion = function (supp) {
            var supInvitaionQuery = vfr.query("SELECT Campaign__c,Id,Name,Notes__c,Status__c,Supplier__c FROM Invitation__c where supplier__r.CommunityUser__r.Name='" + supp.Name + "'");			
            return supInvitaionQuery.then(function (response) {
                return response.records;
            });
         }


}]);
