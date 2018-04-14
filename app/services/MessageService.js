(function() {

  var messageService = function($rootScope) {

    $rootScope.errors = [];
    $rootScope.alerts = [];

    this.error = function(code, message) {
      $rootScope.errors.push({code: code, message: message});
    };

    this.info = function(code, message) {
      $rootScope.alerts.push({code: code, message: message});
    };

    this.clearError = function() {
      $rootScope.errors = [];
    };

    this.clearInfo = function() {
      $rootScope.alerts = [];
    };
  };


  messageService.$inject = ['$rootScope'];

  angular.module('app').service('messageService', messageService);

}());

