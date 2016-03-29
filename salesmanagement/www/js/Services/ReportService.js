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
        if(res.ResultCode === 'Success') {
          deferred.resolve(res.Result);
        }
        else {
          deferred.reject(res.ResultMessages);
        }
      }, function (error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    return report;
  }]);
