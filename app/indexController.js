(function() {

  var IndexController = function($scope, $cookieStore, UserService, $location, $rootScope, $localStorage,
    AppSettingService, usSpinnerService, $timeout) {

    var self = this;

    AppSettingService.getAppSettingValue('app_version').then(function(response) {
      $scope.appVersion = response.data;
    });

    $scope.startSpin = function() {
      usSpinnerService.spin('spinner-1');
    };
    $scope.stopSpin = function() {
      usSpinnerService.stop('spinner-1');
    };

    self.alertModalApi = {};

    $rootScope.showNotif = function(message) {
      self.alertModalApi.message = message;
      self.alertModalApi.show();
      setTimeout(function() {
        self.alertModalApi.hide();
      }, 1500);
    };

  };

  IndexController.$inject = ['$scope', '$cookieStore', //
    'UserService', '$location', '$rootScope', '$localStorage', 'AppSettingService', 'usSpinnerService', '$timeout'];

  angular.module('app').controller('IndexController', IndexController);

}());
