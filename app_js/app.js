var app = angular.module('communityPortalApp', ['ngAnimate','ngRoute' ,'ngProgress', 'ui.bootstrap',  'ngForce','ngForceConstants']);




app.config(function ($routeProvider,ngForceConfig) {
    $routeProvider
        .when('/question/:Id', {
            templateUrl: ngForceConfig.resourceUrl+'/app_templates/supplier-questionnaire.html'
        }).when('/portal', {templateUrl: ngForceConfig.resourceUrl+'/app_templates/portal.html'})
        .when('/supplier/:Id', {templateUrl: ngForceConfig.resourceUrl+'/app_templates/supplier-dashboard.html',controller:'questionsCtrl'})
        .when('/', {
            templateUrl: ngForceConfig.resourceUrl+'/app_templates/login.html'
        }).otherwise({redirectTo: '/'});
});

app.run(function ($rootScope, ngProgress,ngProgressFactory) {
    $rootScope.progressBar = ngProgressFactory.createInstance();
    $rootScope.progressBar.setColor("green");
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.progressBar.start();
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.progressBar.complete();
    });

});