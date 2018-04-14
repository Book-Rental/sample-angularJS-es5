
(function () {

  angular.module('app').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when("/book", {
        templateUrl: "features/books/bookDetails/bookDetails.html"
      })
      .when("/book/:bookId", {
        templateUrl: "features/books/bookDetails/bookDetails.html"
      });
  }]);

  var BookDetailsController = function ($rootScope, $scope, $http, BookService, $routeParams, $location, $window) {

    $scope.mode = 'view';

    $scope.bookId = angular.isDefined($routeParams.bookId) ? $routeParams.bookId : null;
    if ($scope.bookId !== null) {
      $scope.mode = 'view';
      BookService.getById($scope.bookId).then(function (response) {
        $scope.initialBook = response.data;
        $scope.book = angular.copy($scope.initialBook);
      });
    } else {
      $scope.mode = 'new';
      $scope.initialBook = {};
      $scope.book = angular.copy($scope.initialBook);
    }

    $scope.saveBook = function () {
      BookService.save($scope.book).then(function (response) {
        $location.path('books');
        $rootScope.showNotif('Book saved with success');
      });
    };

    $scope.delete = function () {
      BookService.deleteBook($scope.book).then(function (response) {
        $location.path('books');
      });
    };

    $scope.edit = function () {
      $scope.mode = 'edit';
    };

    $scope.cancel = function () {
      $scope.mode = 'view';
    };

    $scope.reset = function () {
      $scope.book = angular.copy($scope.initialBook);
    };

    $scope.back = function () {
      $window.history.back();
    };

  };

  BookDetailsController.$inject = ['$rootScope', '$scope', '$http', 'BookService', '$routeParams',
    '$location', '$window'];

  angular.module('app').controller('BookDetailsController', BookDetailsController);

}());


