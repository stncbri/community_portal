app.factory('sharedObject',['$rootScope', function($rootScope) {  /// Use this object in controllers as shared storage. 
    var sharedObject = {};									      /// add listeners to any key using addListner()  	
    var secret="_a";											  /// Only use put() and get() methods access data.   	
    
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
    
    sharedObject.remove = function(key) {
    	delete this[key+secret];
    };

    return sharedObject;
}]);