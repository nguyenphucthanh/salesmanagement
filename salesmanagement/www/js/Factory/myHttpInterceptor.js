angular.module('starter').factory('myHttpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
  return {
    // optional method
    'request': function (config) {
      // do something on success
      return config;
    },

    // optional method
    'requestError': function (rejection) {
      // do something on error
      console.error(rejection);
      return $q.reject(rejection);
    },


    // optional method
    'response': function (response) {
      // do something on success
      return response;
    },

    // optional method
    'responseError': function (rejection) {
      // do something on error
      if(rejection.status === 401 || rejection.status === 404) {
        $rootScope.$broadcast('goHome');
        $timeout(function () {
          $rootScope.$broadcast('logOut');
        }, 500);
      }
      return $q.reject(rejection);
    }
  };
}]);
