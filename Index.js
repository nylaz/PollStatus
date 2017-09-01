var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function ($routeProvider) {
    $routeProvider
        .when("/Home", {
            templateUrl: "Home.html",
            controller: "homeController"
        })
        .when("/Poll_info/:id", {
            templateUrl: "Poll_info.html",
            controller: "pollInfoController"
        })
        .otherwise({
            templateUrl: "Home.html",
            controller: "homeController"
        });
});

myApp.controller('homeController', function ($scope, $http, $location) {
    $http.get("http://iftacvoteapi.azurewebsites.net/vote/GetQuestions", {
        headers: {"Authorization": "e52f39cf-d0aa-4fee-a24c-08646747057e"}
    })
        .then(function (response) {
            $scope.groupData = response.data;
        });
    $scope.click = function (x) {
        $location.path("/Poll_info/" + x.QuestionId);
    }
});

myApp.controller('pollInfoController', function ($scope, $http, $routeParams) {
    $http.get("http://iftacvoteapi.azurewebsites.net/vote/GetQuestion?questionId=" + $routeParams.id, {
        headers: {"Authorization": "e52f39cf-d0aa-4fee-a24c-08646747057e"}
    })
        .then(function (response) {
            $scope.data = response.data;
        });
    $scope.getPeople = function(qId) {
        $http.get("http://iftacvoteapi.azurewebsites.net/vote/GetQuestionStatus?questionId=" + qId, {
            headers: {"Authorization": "e52f39cf-d0aa-4fee-a24c-08646747057e"}
        })
            .then(function (response) {
                $scope.personData = response.data;
            });
    }
    $scope.sendReminder = function(qId) {
        $http.get("http://iftacvoteapi.azurewebsites.net/vote/SendReminder?questionId=" + qId, {
            headers: {"Authorization": "e52f39cf-d0aa-4fee-a24c-08646747057e"}
        })
    }
});