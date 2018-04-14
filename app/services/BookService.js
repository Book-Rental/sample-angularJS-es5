(function() {

  var BookService = function(propertiesConstant, $http, $q) {

    var get = function() {
      return $http.get(propertiesConstant.API_URL + '/book');
    };

    var findAllAvailable = function() {
      return $http.get(propertiesConstant.API_URL + '/book/available');
    };

    var getById = function(id) {
      return $http.get(propertiesConstant.API_URL + '/book/' + id);
    };

    var save = function(book) {
      return $http.post(propertiesConstant.API_URL + '/book/', book);
    };

    var deleteBook = function(book) {
      if (book && book.id) {
        return $http.delete(propertiesConstant.API_URL + '/book/' + book.id);
      }
      return $q.when(book);
    };

    return {
      get: get,
      getById: getById,
      save: save,
      deleteBook: deleteBook,
      findAllAvailable: findAllAvailable
    };
  };


  BookService.$inject = ['propertiesConstant', '$http', '$q'];

  angular.module('app').service('BookService', BookService);

}());

