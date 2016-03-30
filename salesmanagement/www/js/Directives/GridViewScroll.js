angular.module('starter')
  .directive('gridViewScroll', ['$timeout', function ($timeout) {
    return {
      restrict: 'A',
      scope: {
        header: '=',
        column: '=',
        freezeColumnSize: '='
      },
      link: function ($scope, element, attributes) {
        $scope.$on('grid', function () {
          $timeout(function () {
            var header = $($scope.header);
            var column = $($scope.column);
            var realTableHeader = $(element).find('thead');

            header.width($(element).width());

            realTableHeader.find('th, td').each(function () {
              $(this).css({
                width: $(this).outerWidth(),
                height: $(this).outerHeight()
              });
            });

            realTableHeader.clone().appendTo(header);

              /**
               * Clone to frozen column
               */
            column.html($(element).html());
            column.find('tr').each(function() {
              $(this).children(':gt(' + ($scope.freezeColumnSize - 1) + ')').remove();
            });

            header.next('.table-fixed-header-inner').html(header.html()).find('tr').each(function() {
              $(this).children(':gt(' + ($scope.freezeColumnSize - 1) + ')').remove();
            });
          });
        });
      }
    }
  }]);
