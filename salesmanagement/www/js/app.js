// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'ngCookies', 'ngMessages', 'ngStorage'])

  .run(function ($ionicPlatform, $localStorage, $state, ReportService, $ionicLoading, $http, PopupService, $window, $rootScope, $timeout) {
    /**
     * Delete logged in data on starting app
     */
    delete $localStorage.loginData;
    delete $localStorage.profile;
    var idleTime = 15;

    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    $ionicPlatform.ready(function () {
      try {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleLightContent();
        }
      }
      catch (ex) {
        console.error(ex);
      }

      /**
       * Detect network type
       * navigator.connection.type
       */
      try {
        var network = navigator.connection.type;
        if (network === Connection.NONE) {
          PopupService.alert('Lỗi', 'Không tìm thấy kết nối internet!');
        }
      }
      catch (ex) {
        console.error(ex);
      }

      /**
       * on open app
       * - if auto login is set then login in background and reload default state (home page)
       * - else remove profile in local storage
       */

      //var backgroundLogin = function () {
      //  $ionicLoading.show();
      //  ReportService.login($localStorage.loginData.username, $localStorage.loginData.password, $localStorage.loginData.username)
      //    .then(function () {
      //      $ionicLoading.hide();
      //    }, function (error) {
      //      console.error('Error Login:', error);
      //      $ionicLoading.hide();
      //    })
      //    .finally(function () {
      //      $ionicLoading.hide();
      //    });
      //};

      //if (!jQuery.isEmptyObject($localStorage.loginData) && $localStorage.loginData && $localStorage.loginData.autoLogin) {
      //  if (network !== Connection.NONE) {
      //    backgroundLogin();
      //  }
      //}

      //if (!$localStorage.loginData || jQuery.isEmptyObject($localStorage.loginData)) {
      //  if ($localStorage.profile) {
      //    delete $localStorage.profile;
      //  }
      //}

      //document.addEventListener('resume', function () {
      //  if (!jQuery.isEmptyObject($localStorage.loginData) && $localStorage.loginData && $localStorage.loginData.autoLogin) {
      //    if (network !== Connection.NONE) {
      //      backgroundLogin();
      //    }
      //  }
      //});

      var kickAss = function() {
        if (!$state.is('default')) {
          $state.go('default');
        }
        $timeout(function () {
          $rootScope.$broadcast('logOut');
        }, 500);
      };

      $rootScope.$on('goHome', function() {
        if (!$state.is('default')) {
          $state.go('default');
        }
      });

      document.addEventListener('pause', function() {
        $localStorage.pauseTime = new Date();
      }, false);

      document.addEventListener('resume', function() {
        var now = new Date();
        var diff = now - $localStorage.pauseTime;

        var diffInMinutes = (diff / 1000) / 60;
        if(diffInMinutes >= idleTime) {
          kickAss();
        }
      }, false);


      /**
       * Auto Log Out after 15 minutes of idle
       */
      var timeoutIdle = null;

      jQuery('body').on('touchstart', function () {
        if (timeoutIdle) {
          $timeout.cancel(timeoutIdle);
          timeoutIdle = null;
        }

        timeoutIdle = $timeout(function () {
          //if ($localStorage.profile) {
            kickAss();
          //}
        }, idleTime * 60 * 1000); //15 minutes
      });
    });

    try {
      $rootScope.online = navigator.onLine;
      $window.addEventListener("offline", function () {
        $rootScope.$apply(function () {
          $rootScope.online = false;
          PopupService.alert('Lỗi', 'Không tìm thấy kết nối internet');
          try {
            $ionicLoading.hide();
          }
          catch (ex) {
            console.error(ex);
          }
        });
      }, false);

      $window.addEventListener("online", function () {
        $rootScope.$apply(function () {
          $rootScope.online = true;
        });
      }, false);
    }
    catch (ex) {
      console.error(ex);
    }
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $stateProvider

      .state('default', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'AppCtrl'
      })

      .state('slkh', {
        url: '/slkh?cust_no&cust_vname&part_kind&tc_date1&tc_date2',
        templateUrl: 'templates/slkh.html',
        controller: 'ReportController'
      })

      .state('sltt', {
        url: '/sltt?sale_no&sale_ename&part_kind&tc_date1&tc_date2',
        templateUrl: 'templates/sltt.html',
        controller: 'ReportController'
      })

      .state('sltv', {
        url: '/sltv?chief_no&chief_ename&cust_type&label_flag&tc_date',
        templateUrl: 'templates/sltv.html',
        controller: 'ReportController'
      })

      .state('slgd', {
        url: '/slgd?cust_type&label_flag&p_1&p_2&product_no&tc_date&PeriodType&sale_no',
        templateUrl: 'templates/slgd.html',
        controller: 'ReportController'
      })

      .state('changePassword', {
        url: '/changePassword',
        templateUrl: 'templates/change-password.html',
        controller: 'ChangePasswordController'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

    // Disable cache
    //$ionicConfigProvider.views.maxCache(0);

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.interceptors.push('myHttpInterceptor');
  })

  .constant('CONFIG', {
    server: {
      'local': 'http://137.116.131.7:83/Home/',
      'live': 'http://antvn.vn/Home/'
    }['live']
  });
