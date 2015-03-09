angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

//doooooooooooooooooooooooooooooooooooooooooooooo
.controller('LoginController', function ($scope, AuthenticationService) {

    'use strict';

    $scope.loginUser = function() {
      // this should be replaced with a call to your API for user verification (or you could also do it in the service)
      AuthenticationService.login({name: 'User', role: 'user'});
    };

    $scope.loginAdmin = function() {
      // this should be replaced with a call to your API for user verification (or you could also do it in the service)    
      AuthenticationService.login({name: 'Admin', role: 'admin'});
    };
})

.controller('AppController', function ($scope, SessionService) {

    'use strict';

    $scope.name = SessionService.currentUser.name;
})
//dooooooooooooooooooooooooooooooooooooooooooo

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
