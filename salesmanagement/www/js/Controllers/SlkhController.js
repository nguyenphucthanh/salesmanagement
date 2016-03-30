angular.module('starter')
  .controller('SlkhController', [
    '$scope',
    '$stateParams',
    'ReportService',
    '$ionicLoading',
    'PopupService',
    '$ionicScrollDelegate',
    function ($scope, $stateParams, ReportService, $ionicLoading, PopupService, $ionicScrollDelegate) {
      $ionicLoading.show();

      ReportService.getReportCustomer($stateParams).then(function (data) {
        $scope.data = data.Result;
        $scope.$broadcast('grid');
      }, function () {
        PopupService.alert('Lỗi', 'Không thể lấy Sản lượng Khách hàng');
      }).finally(function () {
        $ionicLoading.hide();
      });

      $scope.scroll = {
        top: 0,
        left: 0
      };

      $scope.scrollView = function() {
        var main = $ionicScrollDelegate.$getByHandle('main');
        var pos = main.getScrollPosition();
        $scope.$apply(function() {
          $scope.scroll = pos;
        });
      }
    }]);
