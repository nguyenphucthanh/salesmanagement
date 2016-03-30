angular
  .module('starter')
  .controller('AppCtrl', [
    '$scope',
    '$ionicModal',
    '$localStorage',
    '$ionicPopup',
    'ReportService',
    '$timeout',
    '$ionicLoading',
    '$cookies',
    'PopupService',
    '$filter',
    '$state',
    function ($scope, $ionicModal, $localStorage, $ionicPopup, ReportService, $timeout, $ionicLoading, $cookies, PopupService, $filter, $state) {
      /**
       * init views
       */
      $scope.init = function () {
        $scope.profile = $localStorage.profile ? $localStorage.profile : {};
        $scope.$state = $state;

        $scope.loginData = {
          username: '',
          password: '',
          autoLogin: false
        };

        $ionicModal.fromTemplateUrl('templates/login.html', {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function (modal) {
          $scope.modal = modal;

          if (!$localStorage.profile) {
            $scope.modal.show();
          }
        });

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

        $scope._reportTypes = [
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
        ];

        $scope.reportTypes = [];

        angular.forEach($scope._reportTypes, function(type) {
          if(type.roles.indexOf($localStorage.profile.role) >= 0) {
            $scope.reportTypes.push(type);
          }
        });
      };

      /**
       * Load Data for Report
       */
      $scope.reportSanLuongKhachHang = function () {
        ReportService.getCustomer().then(function (data) {
          $scope.customers = data.Result;
        }, function () {
          PopupService.alert('Lỗi', 'Không thể lấy danh sách khách hàng!');
        }).finally(function () {
          $ionicLoading.hide();
        });
      };

      $scope.loadDataForReport = function () {
        if ($scope.report.type) {
          $ionicLoading.show();
          switch ($scope.report.type.value) {
            case 'slkh':
              $scope.reportSanLuongKhachHang();
              break;

            default:
              $ionicLoading.hide();
              break;
          }
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
      $scope.doLogin = function (form, username, password, imei) {
        if (form.$invalid) {
          return false;
        }

        $ionicLoading.show();
        var _username = username ? username : $scope.loginData.username;
        var _password = password ? password : $scope.loginData.password;
        var _imei = imei ? imei : $scope.loginData.username;

        ReportService.login(_username, _password, _imei)
          .then(function (data) {
            $scope.profile = $localStorage.profile;
            $scope.modal.hide();

            if (!username) {
              $localStorage.loginData = $scope.loginData;
            }

            $scope.init();
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

      $timeout(function () {
        $scope.init();
      }, 500);

      /**
       * log out of system
       */
      $scope.logOut = function () {
        delete $localStorage.profile;
        $scope.modal.show();
      };

      /**
       * go to report page
       */
      $scope.submitReport = function (form) {
        if (form.$invalid) {
          return false;
        }
        switch ($scope.report.type.value) {
          case 'slkh':
            $state.go('slkh', {
              cust_no: $scope.report.customer.cust_no,
              part_kind: $scope.report.partKind.value,
              tc_date1: $filter('date')($scope.report.from, 'yyyy-MM-dd'),
              tc_date2: $filter('date')($scope.report.to, 'yyyy-MM-dd')
            });
            break;
          case 'sltt':
            $state.go('sltt', {
              sale_no: $localStorage.profile.sale_no,
              part_kind: $scope.report.partKind.value,
              tc_date1: $filter('date')($scope.report.from, 'yyyy-MM-dd'),
              tc_date2: $filter('date')($scope.report.to, 'yyyy-MM-dd')
            });
            break;
        }
      };

      $scope.isFieldAvailable = function (type) {
        if ($scope.report && $scope.report.type) {
          return $scope.report.type.value === type || type.indexOf($scope.report.type.value) >= 0;
        }
        else {
          return false;
        }
      }
    }]);
