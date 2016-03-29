angular.module('starter').service('PopupService', ['$ionicPopup', function($ionicPopup) {
  var service = {};

  service.alert = function(title, content, buttons) {
    $ionicPopup.show({
      title: title,
      template: content,
      buttons: buttons ? buttons : [
        {
          text: 'OK'
        }
      ]
    });
  };

  return service;
}]);
