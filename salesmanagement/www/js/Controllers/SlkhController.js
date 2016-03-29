angular.module('starter')
  .controller('SlkhController', [
    '$scope',
    '$stateParams',
    'ReportService',
    '$ionicLoading',
    'PopupService',
    function ($scope, $stateParams, ReportService, $ionicLoading) {
      $ionicLoading.show();
      ReportService.getReportCustomer($stateParams).then(function (data) {
        $scope.data = data.Result;
      }, function () {
        PopupService.alert('Lỗi', 'Không thể lấy Sản lượng Khách hàng');
      }).finally(function () {
        $ionicLoading.hide();
      });
    }]);
