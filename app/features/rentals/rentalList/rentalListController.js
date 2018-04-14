

(function() {

  angular.module('app').config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/rentals', {
        templateUrl: 'features/rentals/rentalList/rentalList.html'
      });
  }]);

  var RentalListController = function($scope, $http, $location, RentalService, $routeParams, $filter) {

    var initDatatableEvents = function(dataTableElement) {
      dataTableElement.find('tbody tr').on('dblclick', function() {
        var selectedRental = dataTableElement.DataTable().row(this).data();
        $location.path('/rental/' + selectedRental.id);
        $scope.$apply();
      });
    };

    var initDataTable = function(rentalList) {
      var rentalTable = $('#rentalList');
      rentalTable.DataTable({
        dom: 'Bfrtip',
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ],
        data: rentalList,
        columns: [
          {data: 'user', render: function(data, type, row) {
            return data.firstName + ' ' + data.lastName;
          }, defaultContent: ''},
          {data: 'book', render: function(data, type, row) {
            return data.title;
          }, defaultContent: ''},
          {data: 'startDate', render: function(data, type, row) {
            return $filter('date')(data, 'dd/MM/yyyy');
          }, defaultContent: ''},
          {data: 'endDate', render: function(data, type, row) {
            return $filter('date')(data, 'dd/MM/yyyy');
          }, defaultContent: ''}
        ]
      });
      initDatatableEvents(rentalTable);
    };

    RentalService.get().then(function(response) {
      $scope.rentals = response.data;
      initDataTable($scope.rentals);
    });

  };

  RentalListController.$inject = ['$scope', '$http', '$location', 'RentalService', '$routeParams', '$filter'];

  angular.module('app').controller('RentalListController', RentalListController);

}());


