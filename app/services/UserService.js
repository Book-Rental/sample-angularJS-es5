(function() {

  var UserService = function(propertiesConstant, $http) {

    var get = function() {
      return $http.get(propertiesConstant.API_URL + '/user');
    };

    var getById = function(id) {
      return $http.get(propertiesConstant.API_URL + '/user/' + id);
    };

    var save = function(user) {
      return $http.post(propertiesConstant.API_URL + '/user/', user);
    };

    var deleteUser = function(user) {
      if (user && user.id) {
        return $http.delete(propertiesConstant.API_URL + '/user/' + user.id);
      }
      return $q.when(user);
    };

    return {
      get: get,
      getById: getById,
      save: save,
      deleteUser: deleteUser
    };

  };

  UserService.$inject = ['propertiesConstant', '$http'];

  angular.module('app').service('UserService', UserService);

}());

