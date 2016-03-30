// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.controller('TodoCtrl',function($scope,$ionicPopup, $ionicListDelegate) {
  $scope.tasks = [
    {title: "Gwen", objectif:10, origine:0, open:false,
      journal: []
    },
    {title: "Kristell", objectif:10, origine:94,  open:false,
      journal: [
        {date :"2016-03-18", poids:94},
      ]
    },
    {title: "Patricia", objectif:10, origine:90.9,  open:false,
      journal: [
        {date :"2015-10-23", poids:90.9},
        {date :"2015-10-28", poids:90.2},
        {date :"2015-11-04", poids:91.8},
        {date :"2015-11-11", poids:92.2},
        {date :"2016-03-16", poids:86},
      ]
    },
    {title: "Sophie", objectif:7, origine:85,  open:false,
      journal: [
        {date :"2016-02-15", poids:85},
        {date :"2016-02-18", poids:86},
        {date :"2016-03-02", poids:86.7},
      ]
    },
    {title: "Tiphaine", objectif:10, origine:84,  open:false,
      journal: [
        {date :"2016-02-15", poids:85},
        {date :"2016-02-18", poids:86},
        {date :"2016-03-02", poids:86.7},
      ]
    },
  ];


  $scope.newTask = function() {
    $ionicPopup.prompt({
      title: "New Task",
      template: "Enter task",
      inputPlaceholder: "What do you need to do?",
      okText: "Create task"
    }).then(function(res) {
      if(res) {
        $scope.tasks.push({title:res, completed:false});
      }
    })
  };

 $scope.showSublist = function(idx) {
           $scope.tasks[idx].open = !$scope.tasks[idx].open;    
  };
  


  $scope.edit = function(idx) {
    $scope.data = {dateAdd: new Date(), 
                  poids: $scope.tasks[idx].journal[$scope.tasks[idx].journal.length - 1].poids};
    $ionicPopup.prompt({
      title: "Ajout d'un poids",
      scope: $scope
      }).then(function(res){
              if(res != undefined) {
                $scope.tasks[idx].journal.push({date:$scope.data.dateAdd, poids:$scope.data.poids});
              }
              $ionicListDelegate.closeOptionButtons();
            })
  };
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

