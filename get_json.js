(function() {
  var app = angular.module('myApp', []);

  app.controller('UserController', function($scope, $q, $http) {
    var vm = this;
    // holds link for JSON: articles
    $scope.articles = '';
    // holds value for css theme
    $scope.theme = '';
    // link to atricles - requires profileId
    var content = 'https://crossorigin.me/https://peaceful-springs-7920.herokuapp.com/content/';
    // link to profileId
    var profile = 'https://crossorigin.me/https://peaceful-springs-7920.herokuapp.com/profile/';
    // call function to create link for articles
    getId(profile);
    // function to get articles from var profile
    function getArticles() {

      $http({
          method: 'GET',
          url: content
        })
        .then(function(results) {
          // console.log(results);
          // fetches data from artices array
          $scope.articles = results.data.articles;
          // fetches theme for css
          $scope.theme = results.data.theme;
          console.log($scope.theme);
        })
        .catch(function(results) {
          // console.log('getArticles',results);
          // console.error("Error: "results);
        });
    }
    // function to get profileId number
    function getId(data) {
      // console.log(data);
      // wait for data to be retrieved from getArticles
      var deferred = $q.defer();

      $http({
          method: 'POST',
          url: data
        })
        .then(function(results) {
          // console.log(results);
          // concatinate profileId number to var content
          content += results.data.profileId;
          // callback for getArticles called once var content is updated
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
