var app = angular.module('communityPortalApp', ['ngRoute' , 'ui.bootstrap',  'ngForce','ngForceConstants']);


 
  
app.config ( function($routeProvider,ngForceConfig) {
    $routeProvider 
        .when('/questionnaire', {
            templateUrl :  ngForceConfig.resourceUrl+'/app_templates/questionnaire.html' 
        }).when('/', {
            templateUrl : ngForceConfig.resourceUrl+'/app_templates/login.html'             
        }).when('/portal',{templateUrl :  ngForceConfig.resourceUrl+'/app_templates/supplier-portal.html'}).otherwise({redirectTo: '/questionnaire'}); 
});