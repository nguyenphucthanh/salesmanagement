/**
 * Created by thanhnguyen on 3/29/16.
 */
angular.module('starter').controller('LoginController', ['$scope', '$ionicPopup', function ($scope, $ionicPopup) {
  $scope.loginData = {
    username: '',
    password: ''
  };

  /**
   * Login to service
   */
  $scope.doLogin = function () {

  };

  $scope.showDeviceId = function () {
    $ionicPopup.show({
      template: '<span>' + device.uuid + '</span>',
      title: 'Device ID',
      buttons: [
        {text: 'OK'}
      ]
    });
  };
}]);
