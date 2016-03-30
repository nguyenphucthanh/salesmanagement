/**
 * Created by thanhnguyen on 3/29/16.
 */
angular.module('starter')
  .service('ReportService', ['CONFIG', '$q', '$http', '$localStorage', function (CONFIG, $q, $http, $localStorage) {
    var report = {};

    /**
     * Login service
     * @param email
     * @param password
     * @param imei
       * @returns {*}
       */
    report.login = function (email, password, imei) {
      var deferred = $q.defer();

      $http.post(CONFIG.server + 'Login', {
        "Email": email,
        "Password": password,
        "Imei": imei
      }).then(function (res) {
        $localStorage.profile = res.data;
        deferred.resolve(res);
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    /**
     * Get Customer List
     * @returns {*}
       */
    report.getCustomer = function() {
      var deferred = $q.defer();

      $http.post(CONFIG.server + 'GetCustomerList')
        .then(function(res) {
          deferred.resolve(res.data);
        }, function(error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };


      /**
       * get Customer Report
       * @param data
       * @returns {*}
       */
    report.getReportCustomer = function(data) {
      var deferred = $q.defer();

      $http.post(CONFIG.server + 'GetCustomerReport', data)
        .then(function(res) {
          deferred.resolve(res.data);
        }, function(error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    return report;
  }]);
