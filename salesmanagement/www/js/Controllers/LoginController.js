/**
 * Created by thanhnguyen on 3/29/16.
 */
angular
  .module('starter')
  .controller('LoginController', ['$scope', '$ionicPopup', 'ReportService', '$localStorage', function ($scope, $ionicPopup, ReportService, $localStorage) {
    $scope.loginData = {
      username: '',
      password: ''
    };

    /**
     * Login to service
     */
    $scope.doLogin = function () {
      ReportService.login($scope.loginData.username, $scope.loginData.password, $scope.loginData.username)
        .then(function (data) {
          $localStorage.profile = data;
        }, function (error) {
          $ionicPopup.show({
            template: 'Cannot login!',
            title: 'Login failed!',
            buttons: [
              {text: 'OK'}
            ]
          });
        });
    };

    /**
     * show Device ID
     */
    $scope.showDeviceId = function () {
      $ionicPopup.show({
        template: '<span>' + (device && device.uuid ? device.uuid : 'browser') + '</span>',
        title: 'Device ID',
        buttons: [
          {text: 'OK'}
        ]
      });
    };
  }]);
