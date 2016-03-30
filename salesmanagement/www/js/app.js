// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngStorage', 'ngCookies', 'ngMessages'])

  .run(function ($ionicPlatform, $localStorage, $state, ReportService, $ionicLoading) {
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
      if ($localStorage.loginData && $localStorage.loginData.autoLogin) {
        if ($localStorage.loginData && $localStorage.loginData.autoLogin) {
          $ionicLoading.show();
          ReportService.login($localStorage.loginData.username, $localStorage.loginData.password, $localStorage.loginData.username)
            .then(function () {
            })
            .finally(function () {
              $ionicLoading.hide();
            });
        }
        else {
          if($localStorage.profile) {
            delete $localStorage.profile;
          }
        }
      }

      document.addEventListener('resume', function () {
        if ($state.is('default')) {
          $state.reload();
        }
        else {
          $state.go('default');
        }
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
        controller: 'SlkhController'
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

    // Disable cache
    $ionicConfigProvider.views.maxCache(0);

    $httpProvider.defaults.withCredentials = true;
  })

  .constant('CONFIG', {
    server: {
      'local': 'http://137.116.131.7:83/Home/',
      'live': 'http://antvn.vn/Home/'
    }['local']
  });
