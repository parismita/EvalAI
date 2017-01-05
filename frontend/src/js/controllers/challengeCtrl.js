// Invoking IIFE for challenge page
(function() {

    'use strict';
    angular
        .module('evalai')
        .controller('ChallengeCtrl', ChallengeCtrl);

    ChallengeCtrl.$inject = ['utilities', '$state', '$stateParams', '$rootScope'];

    function ChallengeCtrl(utilities, $scope, $state, $stateParams, $rootScope) {
        var vm = this;
        $scope.challengeId = $stateParams.challengeId;

        vm.wrnMsg = {};
        vm.isValid = {};

        // function to get a challenge details
        vm.changePassword = function() {

            var parameters = {};
            parameters.url = 'auth/password/change/';
            parameters.method = 'POST';
            parameters.data = {
                "old_password": vm.user.old_password,
                "new_password1": vm.user.new_password1,
                "new_password2": vm.user.new_password2,
            }
            parameters.token = userKey;
            parameters.callback = {
                onSuccess: function(response) {
                    var status = response.status;
                    var response = response.data;
                    vm.user.error = false;
                    console.log("PASSWORD CHANGED SUCCESSFULLY");
                    console.log(response);
                    // navigate to challenge page
                    // $state.go('web.challenge-page.overview');
                },
                onError: function(response) {
                    var status = response.status;
                    var error = response.data;
                    vm.user.error = "Failed";
                    if (status == 400) {
                        console.log("ERROR Occured");
                        console.log(error);
                        angular.forEach(error, function(value, key) {
                            if (key == 'old_password') {
                                vm.isValid.old_password = true;
                                vm.wrnMsg.old_password = value[0];
                            }
                            if (key == 'new_password1') {
                                vm.isValid.new_password1 = true;
                                vm.wrnMsg.new_password1 = value[0];
                            }
                            if (key == 'new_password2' || key == 'non_field_errors') {
                                vm.isValid.new_password2 = true;
                                vm.wrnMsg.new_password2 = value[0];
                            }
                        })
                    }
                }
            };

            utilities.sendRequest(parameters);
        }
    }

})();
