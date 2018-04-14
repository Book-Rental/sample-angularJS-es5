(function () {

  var alertModal = function () {
    return {
      restrict: 'E',
      scope: {
        modalApi: '='
      },
      templateUrl: 'directives/alertModal/alertModal.html',
      controller: function () {
      },
      link: function (scope, element, attrs) {
        scope.modalApi = scope.modalApi ? scope.modalApi : { message: '' };
        if (!scope.modalApi.message) {
          scope.modalApi.message = '';
        }
        scope.modalApi.show = function () {
          $('.modal').modal('show');
          $('.modal-backdrop').remove();
        };
        scope.modalApi.hide = function () {
          $('.modal').modal('hide');
          //remove the backdrop
          $('.modal-backdrop').remove();
        };
      }
    };
  };

  //BookDetailsController.$inject = ['$scope', '$http', 'BookService', '$routeParams'];
  angular.module('app').directive('alertModal', alertModal);

}());

