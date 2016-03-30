angular.module('starter')
  .controller('ReportController', [
    '$scope',
    '$stateParams',
    'ReportService',
    '$ionicLoading',
    'PopupService',
    '$ionicScrollDelegate',
    '$location',
    function ($scope, $stateParams, ReportService, $ionicLoading, PopupService, $ionicScrollDelegate, $location) {
      $ionicLoading.show();

      var functionName = '';
      switch ($location.path()) {
        case '/slkh':
              functionName = 'getReportCustomer';
              break;
        case '/sltt':
              functionName = 'getSaleManReport';
              break;
        case '/sltv':
              functionName = 'getChiefReport';
              break;
      }

      ReportService[functionName]($stateParams).then(function (data) {
        $scope.data = data.Result;
        $scope.$broadcast('grid');
      }, function () {
        PopupService.alert('Lỗi', 'Không thể lấy dữ liệu báo cáo');
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
