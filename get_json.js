(function() {
  var app = angular.module('myApp', []);

  app.controller('UserController', function($scope, $q, $http) {
    var vm = this;
    $scope.articles = '';
    $scope.theme = '';
    var content = 'https://crossorigin.me/https://peaceful-springs-7920.herokuapp.com/content/';

    // link to profile id
    var profile = 'https://crossorigin.me/https://peaceful-springs-7920.herokuapp.com/profile/';
    var profileId = '';
    var themeId = '';

    getId(profile);

    function getArticles() {

      $http({
          method: 'GET',
          url: content
        })
        .then(function(results) {
          // console.log(results);
          $scope.articles = results.data.articles;
          $scope.theme = results.data.theme;
          console.log($scope.theme);
        })
        .catch(function(results) {
          // console.log('getArticles',results);
        });
    }

    function getId(data) {
      // console.log(data);
      var deferred = $q.defer();

      $http({
          method: 'POST',
          url: data
        })
        .then(function(results) {
          // console.log(results);
          content += results.data.profileId;
          getArticles();
          deferred.resolve();
        })
        .catch(function(results) {
          // console.log('getId', results);
        });

      return deferred;
    }

  });
})();
