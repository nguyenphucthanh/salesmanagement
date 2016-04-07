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
        case '/slgd':
              functionName = 'getDirectorReport';
              break;
      }

      $scope.params = $stateParams;
      ReportService[functionName]($stateParams).then(function (data) {
        $scope.data = data.Result;
        $scope.$broadcast('grid');
      }, function () {
        try {
          if (navigator.connection.type === Connection.NONE) {
            PopupService.alert('Lỗi', 'Không thể đăng nhập! Kiểm tra kết nối internet của bạn!');
          }
          else {
            PopupService.alert('Lỗi', 'Không thể lấy dữ liệu báo cáo');
          }
        }
        catch(ex) {
          console.error(ex);
        }
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
