'use strict';

// Declare app level module which depends on filters, and services

angular.module('main', [
    'ngRoute',
    'main.controllers',
    'main.filters',
    'main.services',
    'main.directives'
]).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/home', {
      templateUrl: 'home',
      controller:'messageCtrl'
    });
    $locationProvider.html5Mode(true);
}]);
