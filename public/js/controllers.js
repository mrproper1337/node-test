'use strict';

/* Controllers */

angular.module('main.controllers', []).
controller('messageCtrl', function ($scope, $http) {
    var socket = io();
    $scope.messages  =[];
    $scope.send = {
        username:user,
        text:''
    };
    $scope.init = function(){
        $scope.addMessage({
            username:user+' connected',
            text:'  '
        });
        $scope.getMessages();
    };
    $scope.getMessages = function(){
        $http({
            method: 'GET',
            url: '/api/messages'
        }).
        success(function (data) {
            $scope.messages = data.message;
            console.log('/api/messages success');
        }).
        error(function () {
            console.error('/api/messages error');
        });
    };
    socket.on('chat message', function () {
        $scope.getMessages();
    });
    $scope.addMessage = function(send){
        $http({
            method:'POST',
            url:'/api/message',
            data:send
        }).
        success(function () {
            console.log('/api/message success');
            socket.emit('chat message');
            send.text = '';
        }).
        error(function () {
            console.error('/api/message error');
            send.text = 'ERROR!';
        });
    }
});