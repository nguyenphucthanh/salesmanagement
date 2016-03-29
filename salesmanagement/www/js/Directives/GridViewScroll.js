angular.module('starter')
  .directive('gridViewScroll', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        columnToFreeze: '='
      },
      link: function (scope, element, attributes) {
        $timeout(function () {
          $(element).gridviewScroll({
            width: $(window).width(),
            freezesize: scope.columnToFreeze ? scope.columnToFreeze : 1,
            arrowsize: 30,
            varrowtopimg: "lib/GridViewScroll/Images/arrowvt.png",
            varrowbottomimg: "lib/GridViewScroll/Images/arrowvb.png",
            harrowleftimg: "lib/GridViewScroll/Images/arrowhl.png",
            harrowrightimg: "lib/GridViewScroll/Images/arrowhr.png",
            headerrowcount: 1
          });
        });
      }
    }
  }]);
