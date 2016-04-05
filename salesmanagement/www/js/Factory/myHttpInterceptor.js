angular.module('starter').factory('myHttpInterceptor', ['$q', function ($q) {
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
      return $q.reject(rejection);
    }
  };
}]);
