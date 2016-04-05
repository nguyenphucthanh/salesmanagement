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
          autoLogin: true
        };

        /**
         * show Device ID
         */
        $scope.showDeviceId = function () {
          PopupService.alert('Device ID', '<span>' + (device && device.uuid ? device.uuid : 'browser') + '</span>');
        };

        $scope.deviceId = (window.device && window.device.uuid ? window.device.uuid : 'browser');

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
          partKind: '',
          saleman: '',
          flag: '',
          inYear: new Date(),
          area: '',
          period: '',
          p1: '',
          p2: '',
          product: '',
          directorDate: new Date()
        };

        $scope.partKinds = [
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

        angular.forEach($scope._reportTypes, function (type) {
          if (type.roles.indexOf($scope.profile.role) >= 0) {
            $scope.reportTypes.push(type);
          }
        });

        $scope.areas = [];
        for (var i = 1; i <= 17; i++) {
          $scope.areas.push({
            name: i,
            value: i
          });
        }

        $scope.periods = [
          { name : 'Daily', value : 1 },
          { name : 'Weekly', value : 2 },
          { name : 'Monthly', value : 3 },
          { name : 'Quarterly', value : 4 },
          { name : 'Annually', value : 5 }
        ];
      };

      /**
       * Load Data for Report
       */
      $scope.getListCustomer = function () {
        $ionicLoading.show();
        ReportService.getCustomer().then(function (data) {
          $scope.customers = data.Result;
        }, function () {
          PopupService.alert('Lỗi', 'Không thể lấy danh sách khách hàng!');
        }).finally(function () {
          $ionicLoading.hide();
        });
      };

      $scope.getListSaleman = function () {
        $ionicLoading.show();
        ReportService.getSaleman().then(function (data) {
          $scope.salemans = data.Result;
        }, function () {
          PopupService.alert('Lỗi', 'Không thể lấy danh sách nhân viên!');
        }).finally(function () {
          $ionicLoading.hide();
        });
      };

      $scope.getLabelFlags = function () {
        $ionicLoading.show();
        ReportService.getLabelFlags().then(function (data) {
          $scope.flags = [];
          angular.forEach(data.Result, function (value, key) {
            $scope.flags.push({
              name: value,
              value: key
            });
          });
        }, function () {
          PopupService.alert('Lỗi', 'Không thể lấy danh sách cờ!');
        }).finally(function () {
          $ionicLoading.hide();
        });
      };

      $scope.getChiefList = function() {
        $ionicLoading.show();
        ReportService.getChief().then(function (data) {
          $scope.chiefs = data.Result;
        }, function () {
          PopupService.alert('Lỗi', 'Không thể lấy danh sách trưởng vùng!');
        }).finally(function () {
          $ionicLoading.hide();
        });
      };

      $scope.getP1 = function() {
        $ionicLoading.show();
        ReportService.getP1().then(function (data) {
          $scope.p1 = data;
        }, function () {
          PopupService.alert('Lỗi', 'Không thể lấy danh sách P1!');
        }).finally(function () {
          $ionicLoading.hide();
        });
      };

      $scope.getP2 = function() {
        $scope.products = [];
        $scope.p2 = [];
        $ionicLoading.show();
        ReportService.getP2($scope.report.p1 ? $scope.report.p1.p1 : null).then(function (data) {
          $scope.p2 = data;

          $scope.getProduct();
        }, function () {
          PopupService.alert('Lỗi', 'Không thể lấy danh sách P2!');
        }).finally(function () {
          $ionicLoading.hide();
        });
      };

      $scope.getProduct = function() {
        $scope.products = [];
        $ionicLoading.show();
        ReportService.getProduct($scope.report.p2 ? $scope.report.p2.p2 : null).then(function (data) {
          $scope.products = data;
        }, function () {
          PopupService.alert('Lỗi', 'Không thể lấy danh sách Sản phẩm!');
        }).finally(function () {
          $ionicLoading.hide();
        });
      };

      $scope.loadDataForReport = function () {
        if ($scope.report.type) {
          switch ($scope.report.type.value) {
            case 'slkh':
              $scope.getListCustomer();
              break;

            case 'sltt':
              if ($scope.checkRole([1, 2])) {
                $scope.getListSaleman();
              }
              break;

            case 'sltv':
              $scope.getLabelFlags();
              if ($scope.checkRole([1])) {
                $scope.getChiefList();
              }
              break;

            case 'slgd':
              $scope.getP1();
              break;

            default:
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
        if (!$scope.profile) {
          return false;
        }
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

            if (!username && $scope.loginData.autoLogin) {
              $localStorage.loginData = $scope.loginData;
            }

            $scope.init();
          }, function (error) {
            PopupService.alert('Lỗi', 'Không thể đăng nhập! Sale No. hoặc Password không đúng!');
          })
          .finally(function () {
            $ionicLoading.hide();
          });
      };

      $timeout(function () {
        $scope.init();
      }, 500);

      /**
       * log out of system
       */
      $scope.logOut = function () {
        delete $localStorage.profile;
        delete $localStorage.loginData;
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
              part_kind: $scope.report.partKind ? $scope.report.partKind.value : '',
              tc_date1: $filter('date')($scope.report.from, 'yyyy-MM-dd'),
              tc_date2: $filter('date')($scope.report.to, 'yyyy-MM-dd')
            });
            break;
          case 'sltt':
            $state.go('sltt', {
              sale_no: [3, 4].indexOf($scope.profile.role) >= 0 ? $scope.profile.sale_no : $scope.report.saleman.sale_no,
              part_kind: $scope.report.partKind ? $scope.report.partKind.value : '',
              tc_date1: $filter('date')($scope.report.from, 'yyyy-MM-dd'),
              tc_date2: $filter('date')($scope.report.to, 'yyyy-MM-dd')
            });
            break;
          case 'sltv':
            $state.go('sltv', {
              chief_no: $scope.checkRole([1]) ? $scope.report.chief.sale_no : $scope.profile.sale_no,
              cust_type: $scope.checkRole([1]) ? ($scope.report.area ? $scope.report.area.value : null) : $scope.profile.sale_no,
              label_flag: $scope.report.flag.value,
              tc_date: $filter('date')($scope.report.inYear, 'yyyy-MM-dd')
            });
            break;
          case 'slgd':
            $state.go('slgd', {
              cust_type: $scope.checkRole([1]) ? ($scope.report.area ? $scope.report.area.value : null) : $scope.profile.sale_no,
              label_flag: $scope.report.flag.value,
              p_1: $scope.report.p1 ? $scope.report.p1.p1 : '',
              p_2: $scope.report.p2 ? $scope.report.p2.p2 : '',
              product_no: $scope.report.product ? $scope.report.product.product_no : '',
              PeriodType: $scope.report.period.value,
              tc_date: $filter('date')($scope.report.directorDate, 'yyyy-MM-dd')
            });
            break;
          default:
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
