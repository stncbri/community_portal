app.directive('oppDetails', function(ngForceConfig){
	return {
		restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		templateUrl: ngForceConfig.resourceUrl+'/app_templates/oppDetails.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
});