/**
 * Created by thanhnguyen on 3/29/16.
 */
angular.module('starter')
  .service('ReportService', ['CONFIG', '$q', '$http', '$localStorage', '$timeout', function (CONFIG, $q, $http, $localStorage, $timeout) {
    var report = {};
    // var server = CONFIG.server;
    var server = function() { return 'http://' + $localStorage.serverIpAddress + '/Home/'; }

    /**
     * Login service
     * @param email
     * @param password
     * @param imei
     * @returns {*}
     */
    report.login = function (email, password, imei) {
      var deferred = $q.defer();

      $http.post(server() + 'Login', {
        "Email": email,
        "Password": password,
        "Imei": imei
      }, {
        timeout: deferred.promise
      }).then(function (res) {
        $localStorage.profile = res.data;
        deferred.resolve(res.data);
      }, function (error) {
        deferred.reject(error);
      });

      $timeout(function() {
        deferred.reject({ status: 'timeout' })
      }, 10000);

      return deferred.promise;
    };

    /**
     * Get Customer List
     * @returns {*}
     */
    report.getCustomer = function () {
      var deferred = $q.defer();

      $http.post(server() + 'GetCustomerList')
        .then(function (res) {
          angular.forEach(res.data.Result, function(cust) {
            cust.cust_vname = cust.cust_no + ' - ' + cust.cust_vname;
          });
          deferred.resolve(res.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    /**
     * get Chief List
     * @returns {*}
     */
    report.getChief = function () {
      var deferred = $q.defer();

      $http.post(server() + 'GetChiefList')
        .then(function (res) {
          angular.forEach(res.data.Result, function(chief) {
            chief.sale_ename = chief.sale_no + ' - ' + chief.sale_ename;
          });
          deferred.resolve(res.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    /**
     * get list sale man
     * @returns {*}
     */
    report.getSaleman = function () {
      var deferred = $q.defer();

      $http.post(server() + 'GetSalemanList')
        .then(function (res) {
          angular.forEach(res.data.Result, function(saleman) {
            saleman.sale_ename = saleman.sale_no + ' - ' + saleman.sale_ename;
          });
          deferred.resolve(res.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };


    /**
     * get all directors
     */
    report.getDirectors = function () {
      var deferred = $q.defer();

      $http.post(server() + 'GetDirList')
        .then(function (res) {
          angular.forEach(res.data.Result, function(saleman) {
            saleman.sale_ename = saleman.sale_no + ' - ' + saleman.sale_ename;
          });
          deferred.resolve(res.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    /**
     * get Customer Report
     * @param data
     * @returns {*}
     */
    report.getReportCustomer = function (data) {
      var deferred = $q.defer();

      $http.post(server() + 'GetCustomerReport', data)
        .then(function (res) {
          deferred.resolve(res.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    /**
     * get Sale Man Report
     * @param data
     * @returns {*}
     */
    report.getSaleManReport = function (data) {
      var deferred = $q.defer();

      $http.post(server() + 'GetSaleManReport', data)
        .then(function (res) {
          deferred.resolve(res.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    /**
     * get Chief Report
     * @param data
     * @returns {*}
     */
    report.getChiefReport = function (data) {
      var deferred = $q.defer();

      $http.post(server() + 'GetChiefReport', data)
        .then(function (res) {
          deferred.resolve(res.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    report.getDirectorReport = function (data) {
      var deferred = $q.defer();

      $http.post(server() + 'GetDirectorReport', data)
        .then(function (res) {
          deferred.resolve(res.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    /**
     * get label flags
     * @param data
     * @returns {*}
     */
    report.getLabelFlags = function (data) {
      var deferred = $q.defer();

      $http.post(server() + 'GetLabelFlags', data)
        .then(function (res) {
          deferred.resolve(res.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    report.getP1 = function () {
      var deferred = $q.defer();

      $http.post(server() + 'GetP1List')
        .then(function (res) {
          var p1s = [];
          angular.forEach(res.data.Result, function (value, key) {
            p1s.push({
              p1: key,
              p1_name: key + ' - ' + value
            });
          });
          deferred.resolve(p1s);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    report.getP2 = function (p1) {
      var deferred = $q.defer();

      $http.post(server() + 'GetP2List', {p1: p1})
        .then(function (res) {
          angular.forEach(res.data.Result, function(p2) {
            p2.p2_name = p2.p2 + ' - ' + p2.p2_name;
          });
          deferred.resolve(res.data.Result);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    report.getProduct = function (p2) {
      var deferred = $q.defer();

      $http.post(server() + 'GetProductList', {p2: p2})
        .then(function (res) {
          angular.forEach(res.data.Result, function(prod) {
            prod.product_vname = prod.product_no + ' - ' + prod.product_vname;
          });
          deferred.resolve(res.data.Result);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    report.changePassword = function (password, newPassword) {
      var deferred = $q.defer();

      $http.post(server() + 'ChangePassword', {OldPassword: password, NewPassword: newPassword})
        .then(function (res) {
          deferred.resolve(res.data);
        }, function (error) {
          deferred.reject(error);
        });

      return deferred.promise;
    };

    return report;
  }]);
