
(function() {
  'use strict';

  angular.module('app')

  .factory('socketFactory', socketFactory);

  socketFactory.$inject = ['$rootScope'];

  function socketFactory($rootScope) {
    
    var socket;

    return {
      emit: emit,
      init: init,
      on: on
    };

    function init() {
        socket = io.connect();
    }

    function on(eventName, callback) {
        socket.on(eventName, function() {
            var args = arguments;
            $rootScope.$apply(function() {
                callback.apply(socket, args);
            });
        });
    }


    function emit(eventName, data, callback) {
        socket.emit(eventName, data, function(callback) {
            var args = arguments;
            $rootScope.$apply(function() {
                if (callback) {
                    callback.apply(socket, args);
                }
            });
        });
    }
  }

})();

