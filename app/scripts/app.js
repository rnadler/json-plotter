'use strict';

/**
 * @ngdoc overview
 * @name jsonPlotterApp
 * @description
 * # jsonPlotterApp
 *
 * Main module of the application.
 */
angular
  .module('jsonPlotterApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'highcharts-ng'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
