var app = angular.module('app', ['ngRoute', 'ngMaterial']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
          templateUrl: 'dashboard/dashboard.html',
          controller:  'dashboardController',
          controllerAs: 'vm',
      })

    .otherwise({
      redirectTo: '/'
    });
});
