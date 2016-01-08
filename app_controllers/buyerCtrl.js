app.controller('buyerCtrl', ['$scope', 'vfr', 'buyerService', 'identityService','sharedObject', '$timeout',
                                 function($scope, vfr, buyerService, identityService, sharedObject, $timeout) {
								 
		$scope.user = [];
        $scope.answers = {};
        $scope.user = sharedObject.get('user');
        $scope.tierDetails={};
        $scope.suppliers=[];
	
        
		
		buyerService.getSuppliers($scope.user.CommunityAccount__r.Community__r.Id).then(function (c) {
                $scope.suppliers = c; 
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
        });                                    
        
		$scope.$watch('suppliers', function (newvalue,oldvalue) {
			$scope.tierDetails.countAll=$scope.suppliers.length;
			$scope.tierDetails.countRegisSupp=0;
	        $scope.tierDetails.countL1Supp=0;
	        $scope.tierDetails.countL2Supp=0;
			for (var i = 0; i < $scope.suppliers.length; i++) {
				var sup= $scope.suppliers[i];
				if(sup.Supplier__r.CommunityAccount__r){
					$scope.tierDetails.countRegisSupp++;
					if(sup.Supplier__r.CommunityAccount__r.Level__c==1)
					$scope.tierDetails.countL1Supp++;
					else if(sup.Supplier__r.CommunityAccount__r.Level__c==2)
						$scope.tierDetails.countL2Supp++;
				}
			}
        }); 
		
		
		

		$scope.showBuyerSupplier = true;
		$scope.showBuyerSupplierdetail = false;
		$scope.callsupdetail = function(supName,supDUNS){				// Supplier details page display condition
			$scope.showBuyerSupplier = !$scope.showBuyerSupplier;
			$scope.showBuyerSupplierdetail =  !$scope.showBuyerSupplierdetail;
			$scope.supplierName = supName;
			$scope.supplierDUNS = supDUNS;		
		};
		
		
                                    
		buyerService.getCommunityUser().then(function (cu) {            
         $scope.communities = cu;
                     var usrList =$scope.communities;
                     
                     	var lvl1 =0;
                     	var lvl2 =0;     
                     	var lvl3 =0;
                     
                         for( var i=0 ; i<usrList.length ; i++ ) {
                             var lvlVal = usrList[i].RegisteredLevel__c;                             
                           if(lvlVal==1){                                                                                                       
                               lvl1 = lvl1+1;                                        
                              }
                           if(lvlVal==2){                                                                                                       
                               lvl2 = lvl2+1;                                        
                              }
                           if(lvlVal==3){                                                                                                       
                               lvl3 = lvl3+1;                                        
                              }                             
	                     }
                     
                     $scope.level1Cnt = lvl1;
                     $scope.level2Cnt = lvl2;
                     $scope.level3Cnt = lvl3;
      }); 
       
      buyerService.getInvitations().then(function (invRes) {
              $scope.invitaions = invRes;
       		$scope.invitaionCount = invRes.length;
      });

      buyerService.getSupplierInvitaion($scope.user).then(function (supRes) {
              $scope.suppInvLst = supRes;
       		//$scope.invitaionStatus = supRes.length;
      });	  
	  
 	identityService.fetchSupplierCommunity($scope.user).then(function (resp) {
                    $scope.supplierList = resp;
	});
	
}]);
