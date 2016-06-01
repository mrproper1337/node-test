'use strict';

/* Filters */


angular.module('main.filters', []).
  filter('myFilter', function (arg) {
    return function (text) {
      return String(text).replace(1 , 0);       //example
    };
  });
