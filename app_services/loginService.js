app.service('loginService', [ 'vfr',  function ( vfr){
	 
        
        
        this.findUser = function (uid) {
        	var userlookupQuery = vfr.query("select Name, password__c,Profile__c,RegisteredLevel__c from user__c where name='" + uid + "'");
            return userlookupQuery.then(function (response) {
                return response.records; 
            });
        }
        this.updateRegistrationLevel = function (registrationLevel){

            //vfr update

        }
    this.updateInvitationStatus = function (status){

    }
}]); 
