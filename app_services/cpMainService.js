app.factory('sharedObject',['$rootScope', function($rootScope) {
    var sharedObject = {};
    var secret="_a";
    
    var broadcastOn=[];

    sharedObject.addListner = function(key) {
    	broadcastOn.push(key+secret); 
    };
    
    sharedObject.put = function(key,value) {
    		this[key+secret]= value;
    		for (var i = 0; i < broadcastOn.length; i++) {
				if(key+secret===broadcastOn[i]){
					this.broadcastItem(key);
				}
			}
    };

    sharedObject.broadcastItem = function(key) {
        $rootScope.$broadcast(key+'Changed');
    };
    
    sharedObject.get = function(key) {
        return this[key+secret];
    };

    return sharedObject;
}]);