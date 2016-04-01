// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'ngCookies', 'ngMessages'])

  .run(function ($ionicPlatform, $localStorage, $state, ReportService, $ionicLoading, $http) {
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
          StatusBar.styleDefault();
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

      var backgroundLogin = function() {
        $ionicLoading.show();
        ReportService.login($localStorage.loginData.username, $localStorage.loginData.password, $localStorage.loginData.username)
          .then(function () {
          })
          .finally(function () {
            $ionicLoading.hide();
          });
      };

      if (!jQuery.isEmptyObject($localStorage.loginData) && $localStorage.loginData && $localStorage.loginData.autoLogin) {
        backgroundLogin();
      }

      if(!$localStorage.loginData || jQuery.isEmptyObject($localStorage.loginData)) {
        if($localStorage.profile) {
          delete $localStorage.profile;
        }
      }

      document.addEventListener('resume', function () {
        backgroundLogin();
      });
    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
    $stateProvider

      .state('default', {
        url: '/',
        templateUrl: 'templates/home.html',
        controller: 'AppCtrl'
      })

      .state('slkh', {
        url: '/slkh?cust_no&part_kind&tc_date1&tc_date2',
        templateUrl: 'templates/slkh.html',
        controller: 'ReportController'
      })

      .state('sltt', {
        url: '/sltt?sale_no&part_kind&tc_date1&tc_date2',
        templateUrl: 'templates/sltt.html',
        controller: 'ReportController'
      })

      .state('sltv', {
        url: '/sltv?chief_no&cust_type&label_flag&tc_date',
        templateUrl: 'templates/sltv.html',
        controller: 'ReportController'
      })

      .state('slgd', {
        url: '/slgd?cust_type&label_flag&p_1&p_2&product_no&tc_date&PeriodType',
        templateUrl: 'templates/sltv.html',
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
  })

  .constant('CONFIG', {
    server: {
      'local': 'http://visitme.cloudapp.net:83/Home/',
      'live': 'http://antvn.vn/Home/'
    }['local']
  });
