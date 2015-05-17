'use strict';

angular.module('jsonPlotterApp').controller('MainCtrl', function ($scope, $window, $timeout) {
  var showAlert = function (alert) {
    alert.enabled = true;
    $timeout(function () {
      alert.enabled = false;
    }, 5000);
  };

  $scope.projectData = {
    name: ''
  };
  $scope.projectLoadSuccessAlert = {enabled: false};

  $scope.loadFile = function () {
    jQuery('#loadJsonfile').click(); // jshint ignore:line
  };
  var loadJsonData = function (aggregate, jsonfile, replace, doAlert) {
    $timeout(function () {
      $scope.$apply(function () {
        console.log(aggregate);
        if (replace) {
          if (jsonfile !== undefined) {
            $scope.projectData.name = jsonfile.name.replace(/\.[^/.]+$/, ''); // strip extension
          }
          $scope.reset();
        }
        if (doAlert) {
          showAlert($scope.projectLoadSuccessAlert);
        }
      });
    });
  };
  $scope.readJson = function (element, replace) {
    if (!element || !element.files || !element.files[0]) {
      return;
    }
    if ($window.File && $window.FileList && $window.FileReader) {
      var jsonfile = element.files[0],
        reader = new $window.FileReader();
      reader.onload = function (e) {
        loadJsonData(angular.fromJson(e.target.result), jsonfile, replace, true);
      };
      reader.readAsText(jsonfile);
    } else {
      alert('Your browser does not support the File API!'); // jshint ignore:line
    }
  };
  $scope.reset = function () {

  };
});
