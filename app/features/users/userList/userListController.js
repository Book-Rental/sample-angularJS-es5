

(function() {

  angular.module('app').config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/users', {
        templateUrl: 'features/users/userList/userList.html'
      });
  }]);

  var UserListController = function($scope, $http, $location, UserService, $routeParams) {

    var initDatatableEvents = function(dataTableElement) {
      dataTableElement.find('tbody tr').on('dblclick', function() {
        var selectedUser = dataTableElement.DataTable().row(this).data();
        $location.path('/user/' + selectedUser.id);
        $scope.$apply();
      });
    };

    var initDataTable = function(userList) {
      var bookTable = $('#userList');
      bookTable.DataTable({
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        data: userList,
        columns: [
          {data: 'firstName', defaultContent: ''},
          {data: 'lastName', defaultContent: ''},
          {data: 'email', defaultContent: ''},
        ]
      });
      initDatatableEvents(bookTable);
    };

    UserService.get().then(function(response) {
      $scope.users = response.data;
      initDataTable($scope.users);
    });

  };

  UserListController.$inject = ['$scope', '$http', '$location', 'UserService', '$routeParams'];

  angular.module('app').controller('UserListController', UserListController);

}());


