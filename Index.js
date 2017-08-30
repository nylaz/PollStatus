var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function ($routeProvider) {
    $routeProvider
        .when("/Home", {
            templateUrl: "Home.html",
            controller: "myCtrl"
        })
        .when("/Ongoing_polls", {
            templateUrl: "Ongoing_polls.html",
            controller: "myCtrl"
        })
        .when("/Finished_polls", {
            templateUrl: "Finished_polls.html",
            controller: "myCtrl"
        })
        .when("/Poll_info", {
            templateUrl: "Poll_info.html",
            controller: "myCtrl"
        });

});

myApp.controller('myCtrl', function ($scope, $http) {
    $http.get("http://iftacvoteapi.azurewebsites.net/vote/GetQuestions", {
        headers: {"Authorization": "e52f39cf-d0aa-4fee-a24c-08646747057e"}
    })
        .then(function (response) {
            $scope.groupData = response.data;
        });
    $scope.click = function (x) {
        $http.get("http://iftacvoteapi.azurewebsites.net/vote/GetQuestionStatus?questionId=9", {
            headers: {"Authorization": "e52f39cf-d0aa-4fee-a24c-08646747057e"}
        })
            .then(function (response) {
                $scope.groupData = response.data;
            })
    }
});