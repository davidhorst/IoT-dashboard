(function() {
  'use strict';

  angular.module('app')

  .controller('dashboardController', dashboardController);

  dashboardController.$inject = ['socketFactory'];

  function dashboardController(socketFactory) {

    var vm = this;
    vm.toggleSwitch = toggleSwitch;
    vm.switches = {};

    activate()

    function toggleSwitch(switchID){
      console.log(switchID, "triggered emit");
      var cmd = {switch: switchID, status: vm.switches[switchID].status}
      console.log("sent cmd", cmd);
      socketFactory.emit("toggleSwitch", cmd, function(data){
      })
    }

    // Socket Listeners
    socketFactory.on("switchStatus", function(data){
      vm.switches = data;
      console.log("updating switches")
    });

    // // Private Methods
    function activate(){
      socketFactory.init();
    }
  }

})();
