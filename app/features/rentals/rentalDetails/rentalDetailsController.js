
(function () {

  angular.module('app').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when("/rental", {
        templateUrl: "features/rentals/rentalDetails/rentalDetails.html"
      })
      .when("/rental/:rentalId", {
        templateUrl: "features/rentals/rentalDetails/rentalDetails.html"
      });
  }]);

  var RentalDetailsController = function ($rootScope, $scope, $http, RentalService, $routeParams, $location, $window,
    UserService, BookService) {

    $scope.mode = 'view';

    $scope.users = [];
    UserService.get().then(function (response) {
      $scope.users = response.data;
    });


    $scope.books = [];
    BookService.findAllAvailable().then(function (response) {
      $scope.books = response.data;
    });

    $scope.rentalId = angular.isDefined($routeParams.rentalId) ? $routeParams.rentalId : null;
    if ($scope.rentalId !== null) {
      $scope.mode = 'view';
      RentalService.getById($scope.rentalId).then(function (response) {
        $scope.initialRental = response.data;
        $scope.rental = angular.copy($scope.initialRental);
      });
    } else {
      $scope.mode = 'new';
      $scope.initialRental = {};
      $scope.rental = angular.copy($scope.initialRental);
    };

    $scope.saveRental = function () {
      RentalService.save($scope.rental).then(function (response) {
        $location.path('rentals');
        $rootScope.showNotif('Rental saved with success');
      });
    };

    $scope.delete = function () {
      RentalService.deleteRental($scope.rental).then(function (response) {
        $location.path('rentals');
      });
    };

    $scope.edit = function () {
      $scope.mode = 'edit';
    };

    $scope.cancel = function () {
      $scope.mode = 'view';
    };

    $scope.reset = function () {
      $scope.rental = angular.copy($scope.initialRental);
    };

    $scope.back = function () {
      $window.history.back();
    };

  };

  RentalDetailsController.$inject = ['$rootScope', '$scope', '$http', 'RentalService', '$routeParams',
    '$location', '$window', 'UserService', 'BookService'];

  angular.module('app').controller('RentalDetailsController', RentalDetailsController);

}());


