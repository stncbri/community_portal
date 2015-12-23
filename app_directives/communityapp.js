
app.directive('communityApp', function(ngForceConfig){
	return {
		restrict: 'E',
		templateUrl: ngForceConfig.resourceUrl+'/app_templates/cp_main.html',
		link: function($scope, iElm, iAttrs, controller) {
		}
	};
}) ;