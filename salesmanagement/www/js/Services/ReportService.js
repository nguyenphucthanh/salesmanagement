/**
 * Created by thanhnguyen on 3/29/16.
 */
angular.module('starter')
  .service('ReportService', ['CONFIG', '$q', '$http', function (CONFIG, $q, $http) {
    var report = {};

    report.login = function (email, password, imei) {
      var deferred = $q.defer();

      $http.post(CONFIG.server + 'Login', {
        "Email": email,
        "Password": password,
        "Imei": imei
      }).then(function (res) {

      }, function (error) {

      });

      return deferred.promise;
    };

    return report;
  }]);
