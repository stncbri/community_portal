app.service('identityService', ['vfr', function (vfr) {
    this.findUser = function (uid) {
        var userlookupQuery = vfr.query("select Name, password__c,Profile__c,RegisteredLevel__c from user__c where name='" + uid + "'");
        return userlookupQuery.then(function (response) {
            return response.records;
        });

    }
    /*Fetch the Supplier Community*/
    /*[{"attributes":{"type":"Community__c","url":"/services/data/v35.0/sobjects/Community__c/a012800000FVRbxAAH"},"Name":"Walmart-Supplier-2","Id":"a012800000FVRbxAAH","Industry__c":"Furniture","DUNS__c":13608064,"CommunityUser__c":"a0C2800000201AoEAI"}]*/
    this.fetchSupplierCommunity = function (user) {
        var lookupQuery = vfr.query("select Name, Id, Size__c,Industry__c,email__c,DUNS__c,Adddress__c from Community__c where CommunityUser__r.Name='" + user.Name + "'");
        return lookupQuery.then(function (response) {
            return response.records;
        });
    }

    /*TODO: Optimize the queries.. They can ideally be made as one composite query*/
    /* [{"attributes":{"type":"CommunityLinkage__c","url":"/services/data/v35.0/sobjects/CommunityLinkage__c/a0728000002EZ7nAAG"},"Name":"Walmart","Id":"a0728000002EZ7nAAG","Buyer__c":"a012800000FVRbPAAX","Supplier__c":"a012800000FVRbxAAH","Buyer__r":{"attributes":{"type":"Community__c","url":"/services/data/v35.0/sobjects/Community__c/a012800000FVRbPAAX"},"Name":"Walmart","Id":"a012800000FVRbPAAX"}}]*/
    this.fetchBuyerCommunity = function (user) {
        var lookupQuery = vfr.query("select Name,Id, Buyer__r.Name,Buyer__r.Id from CommunityLinkage__c where supplier__r.CommunityUser__r.Name = '" + user.Name + "'");
        return lookupQuery.then(function (response) {
            return response.records;
        });
    }
    /*[{"attributes":{"type":"CommunityLinkage__c","url":"/services/data/v35.0/sobjects/CommunityLinkage__c/a0728000002EZ7iAAG"},"Name":"Walmart","Id":"a0728000002EZ7iAAG","Supplier__c":"a012800000FVRbUAAX","Buyer__c":"a012800000FVRbPAAX","Supplier__r":{"attributes":{"type":"Community__c","url":"/services/data/v35.0/sobjects/Community__c/a012800000FVRbUAAX"},"Name":"Walmart-Supplier-1","Id":"a012800000FVRbUAAX"}},{"attributes":{"type":"CommunityLinkage__c","url":"/services/data/v35.0/sobjects/CommunityLinkage__c/a0728000002EZ7nAAG"},"Name":"Walmart","Id":"a0728000002EZ7nAAG","Supplier__c":"a012800000FVRbxAAH","Buyer__c":"a012800000FVRbPAAX","Supplier__r":{"attributes":{"type":"Community__c","url":"/services/data/v35.0/sobjects/Community__c/a012800000FVRbxAAH"},"Name":"Walmart-Supplier-2","Id":"a012800000FVRbxAAH"}}]*/
    this.fetchSuppliersList = function (user) {
        var lookupQuery = vfr.query("select Name,Id,supplier__r.Name,supplier__r.Id from CommunityLinkage__c where buyer__r.CommunityUser__r.Name='" + user.Name + "'");
        return lookupQuery.then(function (response) {
            return response.records;
        });
    }

    /*Update the User JSON Object*/
    this.updateUser = function (user) {
        return vfr.update("User__c", user);
    }

}]);
