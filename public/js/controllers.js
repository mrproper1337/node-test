'use strict';

/* Controllers */

angular.module('main.controllers', []).
controller('messageCtrl', function ($scope, $http) {
    $scope.messages  =[];
    $scope.send = {
        username:user,
        text:''
    };
    var getMessage = function(){
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
    getMessage();
    var socket = io();
    socket.on('chat message', function (msg) {
        $scope.messages.push(msg);
    });
    $scope.addMessage = function(send){
        $http({
            method:'POST',
            url:'/api/message',
            data:send
        }).
        success(function () {
            console.log('/api/message success');
            socket.emit('chat message', send);
            getMessage();
            send.text = '';
        }).
        error(function () {
            console.error('/api/message error');
        });
    }
});