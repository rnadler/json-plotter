'use strict';

angular.module('jsonPlotterApp').controller('MainCtrl', function ($scope, $window, $timeout) {
  var showAlert = function (alert) {
    alert.enabled = true;
    $timeout(function () {
      alert.enabled = false;
    }, 5000);
  };
  $scope.projectLoadSuccessAlert = {enabled: false};
  $scope.badDataAlert = {enabled: false};

  $scope.loadFile = function () {
    jQuery('#loadJsonfile').click(); // jshint ignore:line
  };

  var loadJsonData = function (aggregate, jsonfile) {
    $timeout(function () {
      $scope.$apply(function () {
        if (aggregate[0] === undefined || aggregate[0].metricValues === undefined) {
          showAlert($scope.badDataAlert);
          return;
        }
        loadJsonValues(aggregate);
        if (jsonfile !== undefined) {
          $scope.chartConfig.title.text = jsonfile.name.replace(/\.[^/.]+$/, ''); // strip extension
        }
        showAlert($scope.projectLoadSuccessAlert);
      });
    });
  };
  $scope.readJson = function (element) {
    if (!element || !element.files || !element.files[0]) {
      return;
    }
    if ($window.File && $window.FileList && $window.FileReader) {
      var jsonfile = element.files[0],
        reader = new $window.FileReader();
      reader.onload = function (e) {
        loadJsonData(angular.fromJson(e.target.result), jsonfile);
      };
      reader.readAsText(jsonfile);
    } else {
      alert('Your browser does not support the File API!'); // jshint ignore:line
    }
  };

  // Turn the AD JSON into Highcharts data
  // API documentation: http://api.highcharts.com/highcharts

  var loadJsonValues = function(aggregate) {
    var i,
      values = [],
      base = aggregate[0],
      metricValues = base.metricValues;
    for (i = 0; i < metricValues.length; i++) {
      values.push([metricValues[i].startTimeInMillis, metricValues[i].value]);
    }
    $scope.chartConfig.series = [{
      data: values,
      color: 'black',
      name: base.metricPath
    }];
  };

  $scope.chartConfig = {
    options: {
      chart: {
        type: 'line',
        zoomType: 'x'
      }
    },
    title: {
      text: ''
    },
    xAxis: {
      type: 'datetime'
    },
    loading: false
  };
});
