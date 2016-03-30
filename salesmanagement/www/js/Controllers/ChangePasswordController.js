angular.module('starter')
  .controller('ChangePasswordController', [
    '$scope',
    '$state',
    '$localStorage',
    'ReportService',
    'PopupService',
    '$ionicHistory',
    function ($scope, $state, $localStorage, ReportService, PopupService, $ionicHistory) {
      $scope.data = {
        password: '',
        currentPassword: $localStorage.profile.password,
        newPassword: '',
        newPasswordConfirm: ''
      };

      $scope.changePassword = function (form) {
        if (form.$invalid) {
          return;
        }

        ReportService.changePassword($scope.data.password, $scope.data.newPassword).then(function (data) {
          if(data.ResultCode === 'Success') {
            if ($localStorage.loginData) {
              $localStorage.loginData.password = $scope.data.newPassword;
            }
            $localStorage.profile.password = $scope.data.newPassword;
            PopupService.alert('Đổi Password', data.ResultMessages[0], [
              {
                text: 'OK',
                onTap: function() {
                  $ionicHistory.goBack();
                }
              }
            ]);
          }

        });
      };
    }]);
