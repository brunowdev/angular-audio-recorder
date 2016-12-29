angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

	$routeProvider

		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/gravador', {
			templateUrl: 'views/gravador.html',
			controller: 'GravadorController'
		});

	$locationProvider.html5Mode(true);

}]);