
(function () {

  angular.module('app').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when("/user", {
        templateUrl: "features/users/userDetails/userDetails.html"
      })
      .when("/user/:userId", {
        templateUrl: "features/users/userDetails/userDetails.html"
      });
  }]);

  var UserDetailsController = function ($rootScope, $scope, $http, UserService, $routeParams, $location, $window) {

    $scope.mode = 'view';

    $scope.userId = angular.isDefined($routeParams.userId) ? $routeParams.userId : null;
    if ($scope.userId !== null) {
      $scope.mode = 'view';
      UserService.getById($scope.userId).then(function (response) {
        $scope.initialUser = response.data;
        $scope.user = angular.copy($scope.initialUser);
      });
    } else {
      $scope.mode = 'new';
      $scope.initialUser = {};
      $scope.user = angular.copy($scope.initialUser);
    }

    $scope.saveUser = function () {
      UserService.save($scope.user).then(function (response) {
        $location.path('users');
        $rootScope.showNotif('User saved with success');
      });
    };

    $scope.delete = function () {
      UserService.deleteUser($scope.user).then(function (response) {
        $location.path('users');
      });
    };

    $scope.edit = function () {
      $scope.mode = 'edit';
    };

    $scope.cancel = function () {
      $scope.mode = 'view';
    };

    $scope.reset = function () {
      $scope.user = angular.copy($scope.initialUser);
    };

    $scope.back = function () {
      $window.history.back();
    };

  };

  UserDetailsController.$inject = ['$rootScope', '$scope', '$http', 'UserService', '$routeParams',
    '$location', '$window'];

  angular.module('app').controller('UserDetailsController', UserDetailsController);

}());


