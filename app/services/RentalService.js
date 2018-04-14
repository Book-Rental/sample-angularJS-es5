(function() {

  var RentalService = function(propertiesConstant, $http, $q) {

    var get = function() {
      return $http.get(propertiesConstant.API_URL + '/rental');
    };

    var getById = function(id) {
      return $http.get(propertiesConstant.API_URL + '/rental/' + id);
    };

    var save = function(book) {
      return $http.post(propertiesConstant.API_URL + '/rental/', book);
    };

    var deleteRental = function(book) {
      if (book && book.id) {
        return $http.delete(propertiesConstant.API_URL + '/rental/' + book.id);
      }
      return $q.when(book);
    };

    return {
      get: get,
      getById: getById,
      save: save,
      deleteRental: deleteRental
    };
  };


  RentalService.$inject = ['propertiesConstant', '$http', '$q'];

  angular.module('app').service('RentalService', RentalService);

}());


