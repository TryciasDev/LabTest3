// Ionic Starter App
'use strict';
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires' 
angular.module('starter', ['ionic',"chart.js"])
  .config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
      colours: ['#FF0000', '#00FF00', '#0000FF','#000F0F0'],
      responsive: false
    });
    // Configure all line charts
    ChartJsProvider.setOptions('Line', {
      datasetFill: false
    });
    ChartJsProvider.setOptions('Bar', {
      datasetFill: true
    });
  }])
.controller('TodoCtrl',function($scope,$ionicPopup, $ionicListDelegate,$ionicModal) {
  $scope.tasks = [
    {title: "Gwen", objectif:10, origine:0, open:false, couleur:"#FF0000",
      journal: []
    },
    {title: "Kristell", objectif:10, origine:94,  open:false,couleur:"#FF0000",
      journal: [
        {date :"2016-03-18", poids:94},
      ]
    },
    {title: "Patricia", objectif:10, origine:90.9,  open:false,couleur:"#FF0000",
      journal: [
        {date :"2015-10-23", poids:90.9},
        {date :"2015-10-28", poids:90.2},
        {date :"2015-11-04", poids:91.8},
        {date :"2015-11-11", poids:92.2},
        {date :"2016-03-16", poids:86},
      ]
    },
    {title: "Sophie", objectif:7, origine:85,  open:false,couleur:"#FF0000",
      journal: [
        {date :"2016-02-15", poids:85},
        {date :"2016-02-18", poids:86},
        {date :"2016-03-02", poids:86.7},
      ]
    },
    {title: "Tiphaine", objectif:10, origine:84,  open:false,couleur:"#FF0000",
      journal: [
        {date :"2016-02-15", poids:85},
        {date :"2016-02-18", poids:86},
        {date :"2016-03-02", poids:81},
      ]
    },
  ]; 

/*Data pour le graph en forme de bar*/
  $scope.bar = {};
  $scope.bar.points = [" ",];
  $scope.bar.noms = ["Objectif"];
  Chart.defaults.global.colours = ["#FFFFFF"];
  angular.forEach($scope.tasks,function(valeur,cle){
    if(valeur.journal.length>1){
    this.push(valeur.title);
    Chart.defaults.global.colours.push(valeur.couleur);
    }
  }, $scope.bar.noms);

  $scope.bar.poids = [[10]];
  angular.forEach($scope.tasks,function(valeur,cle){
    
    var dernierPoids = 0;
    if(valeur.journal.length>1){
      dernierPoids = valeur.journal[valeur.journal.length-1].poids;
      var diff = valeur.origine - dernierPoids;
      this.push([diff]);
    }
  }, $scope.bar.poids);


/*Data pour le graph en forme de ligne*/
  $scope.graph = {};
  $scope.graph.points = [];
  angular.forEach($scope.tasks,function(valeur,cle){
    if(valeur.journal.length>1){
      angular.forEach(valeur.journal, function(val,key){
        if(this.indexOf(val.date) == -1) {
          this.push(val.date);
        }
      }, this);
    }
  }, $scope.graph.points);  
  $scope.graph.noms = [];
  angular.forEach($scope.tasks,function(valeur,cle){
    if(valeur.journal.length>0){
      this.push(valeur.title);
    }
  }, $scope.graph.noms);


  $scope.graph.poids = [];
  angular.forEach($scope.tasks,function(valeur,cle){
    if(valeur.journal.length>1){
    var tousLesPoids = [];
    angular.forEach($scope.graph.points,function(pVal, vCle){
      var i=0, len=valeur.journal.length;
      var dPoids = "";
      var isFound = false;
      for (; i<len; i++) {
        dPoids = valeur.journal[i].poids;
        if (valeur.journal[i].date == pVal) {
         this.push(valeur.journal[i].poids);
         isFound=true;
         break;
        }
      }
      if(!isFound){
        this.push(dPoids);
      }
    },tousLesPoids);
    this.push(tousLesPoids);
    }
  }, $scope.graph.poids);

/*affichage du details de ld'une personne */
  $scope.togglePoids = function(task) {
    if ($scope.isPoidsShown(task)) {
      $scope.shownPoids = null;
    } else {
      $scope.shownPoids = task;
    }
  };

 $scope.isPoidsShown = function(task) {
    return $scope.shownPoids === task;
  };

  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
/*affichage fenêtre modal pour entrer un nouveau poids et sa date*/
$ionicModal.fromTemplateUrl('templates/modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.ajoutePoids = function(u) {        
    //$scope.graph.point.push(u.poids);
   // $scope.graph.poids[0].push({u.poids });
    $scope.modal.hide();
    $ionicListDelegate.closeOptionButtons();
  };
 
/*pour ajouter un individu*/
  $scope.newTask = function() {
    $ionicPopup.prompt({
      title: "New Task",
      template: "Enter task",
      inputPlaceholder: "What do you need to do?",
      okText: "Create task"
    }).then(function(res) {
      if(res) {
        $scope.tasks.push({title: res, objectif:10, origine:0, open:false,journal: []});
      }
    })
  };

/*pour changer un nom*/
  $scope.edit = function(idx) {
    var nom = $scope.tasks[idx].title;
    $scope.data = {response: nom};
    $ionicPopup.prompt({
      title: "modification du nom",
      inputType:"text",
      inputPlaceholder: nom,
      scope: $scope
      }).then(function(res){
        console.log('le poids est ', res);
                $scope.tasks[idx].title = $scope.data.response;
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

