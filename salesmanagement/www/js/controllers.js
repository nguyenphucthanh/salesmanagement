angular
  .module('starter')
  .controller('AppCtrl', [
    '$scope',
    '$ionicModal',
    '$localStorage',
    '$ionicPopup',
    'ReportService',
    '$localStorage',
    '$timeout',
    '$ionicLoading',
    '$cookies',
    'PopupService',
    '$filter',
    '$state',
    function ($scope, $ionicModal, $localStorage, $ionicPopup, ReportService, $localStorage, $timeout, $ionicLoading, $cookies, PopupService, $filter, $state) {
      $scope.profile = $localStorage.profile ? $localStorage.profile : {};

      $scope.loginData = {
        username: '',
        password: '',
        autoLogin: false
      };

      $scope.report = {
        type: '',
        from: new Date(),
        to: new Date(),
        customer: '',
        partKind: ''
      };

      $scope.partKinds = [
        {
          name: 'Hỗn hợp và đậm đặc',
          value: null
        },
        {
          name: 'Hỗn hợp',
          value: 'A'
        },
        {
          name: 'Đậm đặc',
          value: 'B'
        }
      ];

      /**
       * init views
       */
      $scope.init = function () {
        $scope.reportTypes = [
          {
            name: 'Sản lượng KH',
            value: 'slkh',
            roles: [1, 2, 3, 4]
          },
          {
            name: 'Sản lượng Tiếp thị',
            value: 'sltt',
            roles: [1, 2, 3, 4]
          },
          {
            name: 'Sản lượng Trưởng vùng',
            value: 'sltv',
            roles: [1, 2]
          },
          {
            name: 'Sản lượng Giám đốc',
            value: 'slgd',
            roles: [1]
          }
        ]
      };

        /**
         * Load Data for Report
         */
      $scope.loadDataForReport = function() {
        $ionicLoading.show();
        if($scope.report.type.value === 'slkh') {
          ReportService.getCustomer().then(function(data) {
            $scope.customers = data.Result;
          }, function() {
            PopupService.alert('Lỗi', 'Không thể lấy danh sách khách hàng!');
          }).finally(function() {
            $ionicLoading.hide();
          });
        }
      };

      /**
       * Check if report for current role is available
       * @param roles
       * @returns {boolean}
         */
      $scope.checkRole = function (roles) {
        return roles.indexOf($scope.profile.role) >= 0;
      };

      /**
       * Login to service
       */
      $scope.doLogin = function (username, password, imei) {
        $ionicLoading.show();
        var _username = username ? username : $scope.loginData.username;
        var _password = password ? password : $scope.loginData.password;
        var _imei = imei ? imei : $scope.loginData.username;

        ReportService.login(_username, _password, _imei)
          .then(function (data) {
            $localStorage.profile = data.data;
            $scope.profile = $localStorage.profile;
            $scope.modal.hide();
            $scope.init();
            $localStorage.autoLogin = $scope.loginData.autoLogin;
          }, function (error) {
            PositionOptions.alert('Lỗi', 'Không thể đăng nhập!');
          })
          .finally(function () {
            $ionicLoading.hide();
          });
      };

      /**
       * show Device ID
       */
      $scope.showDeviceId = function () {
        PopupService.alert('Device ID', '<span>' + (device && device.uuid ? device.uuid : 'browser') + '</span>');
      };

      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });

      $timeout(function () {
        if (!$localStorage.profile) {
          $scope.modal.show();
        }
        else {
          $scope.init();
        }
      }, 500);

      $scope.logOut = function() {
        delete $localStorage.profile;
        $scope.profile = null;
        $scope.modal.show();
      };

      $scope.submitReport = function() {
        if($scope.report.type.value === 'slkh') {
          $state.go('slkh', {
            cust_no: $scope.report.customer.cust_no,
            part_kind: $scope.report.partKind.value,
            tc_date1: $filter('date')($scope.report.from, 'yyyy-MM-dd'),
            tc_date2: $filter('date')($scope.report.to, 'yyyy-MM-dd')
          });
        }
      }
    }]);
