'use strict';

/**
 * @ngdoc directive
 * @name stockDogApp.directive:stkWatchlistPanel
 * @description
 * # stkWatchlistPanel
 */
angular.module('stockDogApp')
  // Register directive and inject dependencies
  .directive('stkWatchlistPanel', function ($location, $modal, WatchlistService, $routeParams) {
    return {
      templateUrl: 'views/templates/watchlist-panel.html',
      restrict: 'E',
      scope: {},
      link: function ($scope) {
        // Initialize variables
        $scope.watchlist = {};

        var addListModal = $modal({
          scope: $scope,
          template: 'views/templates/addlist-modal.html',
          show: false
        });

        // Bind the model from the service to the scope
        $scope.watchlists = WatchlistService.query();

        $scope.currentList = $routeParams.listId;

        $scope.gotoList = function(listId){
          $location.path('watchlist/' + listId);
        };

        // Display addList modal
        $scope.showModal = function(){
          addListModal.$promise.then(addListModal.show);
        };

        // Create a new list from fields in modal
        $scope.createList = function(){
          WatchlistService.save($scope.watchlist);
          addListModal.hide();
          $scope.watchlist = {};
        };

        // Delete desired list and redirect to home
        $scope.deleteList = function(list){
          WatchlistService.remove(list);
          $location.path('/');
        };

      }
    };
  });
