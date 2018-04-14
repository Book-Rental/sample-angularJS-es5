(function () {

  var AppSettingService = function ($http, propertiesConstant) {
    var getAppSettingValue = function (name) {
      return $http.get(propertiesConstant.API_URL + '/appsetting/' + name);
    };

    return {
      getAppSettingValue: getAppSettingValue
    };
  };


  AppSettingService.$inject = ['$http', 'propertiesConstant'];

  angular.module('app').service('AppSettingService', AppSettingService);

}());

