<<<<<<< HEAD
app.controller('buyerCtrl', ['$scope', 'vfr', 'buyerService', 'identityService','sharedObject', '$timeout',
                                 function($scope, vfr,buyerService, sharedObject, $timeout) {

		buyerService.getCommunity().then(function (c) {
                $scope.communities = c;
        		$scope.tier1Count = c.length;
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            });                                    
                                    
                                    
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
       
      buyerService.getInvitaions().then(function (i) {
              $scope.invitaions = i;
       		$scope.invitaionCount = i.length;
      });
	

}]);
=======
app.controller('buyerCtrl', ['$scope', 'vfr', 'buyerService', 'identityService','sharedObject', '$timeout',
                                 function($scope, vfr, buyerService, identityService, sharedObject, $timeout) {
								 
		$scope.user = [];
        $scope.answers = {};
        $scope.user = sharedObject.get('user');
        console.log($scope.user);
		
	buyerService.getCommunity().then(function (c) {
                $scope.communities = c;
        		$scope.tier1Count = c.length;
                if (!$scope.$$phase) {
                    $scope.$digest();
                }
            });                                    
                                    
                                    
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
       
      buyerService.getInvitaions().then(function (invRes) {
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
>>>>>>> pr/9
