app.service('buyerService', ['vfr', function (vfr) {
 

    this.getSuppliers = function (buyerId) {
        var communityQuery = vfr.query("SELECT Supplier__c ,Supplier__r.Name, Supplier__r.Id, Supplier__r.PrimaryContact__c, " +
            "Supplier__r.Size__c, Supplier__r.Industry__c,Supplier__r.DUNS__c, Supplier__r.Adddress__c, " +
            "Supplier__r.CommunityAccount__r.Level__c, Supplier__r.CommunityAccount__r.AccountInfo__c, " +
            "Supplier__r.CommunityAccount__r.AccountProfileType__c, Supplier__r.CommunityAccount__r.Community__c " +
            "FROM CommunityLinkage__c WHERE Buyer__c = '" + buyerId + "'");
        return communityQuery.then(function (response) {
            return response.records;
        });
    }

    this.getInvitations = function (buyerId) {
        var invitaionQuery = vfr.query("select Campaign__r.Name , Campaign__r.Status__c ," +
            "CreatedDate, Id, LastModifiedDate, Name, Notes__c, Status__c, " +
            " Supplier__c , Supplier__r.CommunityAccount__c from Invitation__c   where Status__c !='Closed' " +
            " and Campaign__r.Buyer__r.id='" + buyerId + "'");
        return invitaionQuery.then(function (response) {
            return response.records;
        });
    }


    this.createTodaysCampaign = function (buyer) {
        var records = [];
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = mm + '-' + dd + '-' + yyyy;

        var tmpJson = {
            "Name": buyer.Name + "_" + today,
            "Buyer__c": buyer.Id,
            "Status__c": 'Active'
        };
        records.push(tmpJson);

        return vfr.upsert('Campaign__c', 'Name', buyer.Name + "_" + today, tmpJson).then(function (invRes) {
            var invitaionQuery = vfr.query("select Buyer__c,   Id,  Name,  Status__c from Campaign__c" +
                " where Name='" + buyer.Name + "_" + today + "'");
            return invitaionQuery.then(function (response) {
                return response.records;
            });
        });
    }

    this.sendInvites = function (buyer, invitationList) {
        return this.createTodaysCampaign(buyer).then(function (camp) {
            for (var i = 0; i < invitationList.length; i++) {
                var invite = invitationList[i];
                invite.Campaign__c = camp[0].Id;
                invite.Name = invite.Name + "_" + camp[0].Id;
            }
            return vfr.bulkUpsert('Invitation__c', 'Name', null, invitationList);
        });
    }


    ////////////////////////////

    this.getCommunityLinkage = function (buyerId) {
        var communityUsrQuery = vfr.query("SELECT CommunityUser__c FROM Community__c WHERE Id in (SELECT Supplier__c FROM CommunityLinkage__c WHERE Buyer__c = '" + buyerId + "')");
        return communityUsrQuery.then(function (response) {
            //return response.records;

            var userResponse = response.records;
            var uc = "";
            for (var i = 0; i < userResponse.length; i++) {
                if (i == 0) {
                    uc = uc + "'" + userResponse[i].CommunityUser__c + "'";
                } else {
                    uc = uc + ", '" + userResponse[i].CommunityUser__c + "'";
                }
            }

            var communityUsrLvlQuery = vfr.query("SELECT RegisteredLevel__c FROM User__c where Id IN (" + uc + ")");
            return communityUsrLvlQuery.then(function (response) {
                var userResponse = response.records;
                return userResponse; 
            });

        });

    }

    // To hetch the invitaion details


    this.getSupplierInvitaion = function (supp) {
        var supInvitaionQuery = vfr.query("SELECT Campaign__c,Id,Name,Notes__c,Status__c,Supplier__c FROM Invitation__c where supplier__r.CommunityUser__r.Name='" + supp.Name + "'");
        return supInvitaionQuery.then(function (response) {
            return response.records;
        });
    }


}]);
