angular.module('app.services', [])

.factory('Config', function () {
    return {
        serverBaseUrl:'http://ipm-mathemagic.com/'
    }
})

.factory('$localstorage', ['$window', function ($window) {
    return {
        set: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        setObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key) {
            return JSON.parse($window.localStorage[key] || '{}');
        }
    }
}])

.factory('Quiz', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "learning/filter/tex/api/getQuestions/";
            console.log("in service for Quiz " + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
				params  : { quizid :  userData   } ,
				contentType:'application/json'
             
            }).success(function (data, status, headers, cfg) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        },

        get: function () {
            // Simple index lookup
            return;
        }
    }
})

.factory('Login', function ($http, $q, Config) {

    return {
        execute: function (userData) {
            var url = Config.serverBaseUrl + "learning/filter/tex/api/userlogin/";
            console.log("in service for login ") ; 
            var deferred = $q.defer();
			
            $http({
                method: 'POST',
                url: url,
                data: userData
            }).success(function (data, status, headers, cfg) {
				
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                /*
				console.log(err);
                deferred.reject(err);
				*/ 
				return 13258 ; 
				
            });
            return deferred.promise;
        },

        get: function () {
            // Simple index lookup
            return;
        }
    }
})

.factory('Tests', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "learning/filter/tex/api/getTests/";
            console.log("in service for Tests " + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
				params  : { courseid : userData } ,
				contentType:'application/json'
             
            }).success(function (data, status, headers, cfg) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        },

        get: function () {
            // Simple index lookup
            return;
        }
    }
})
.factory('Courses', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "learning/filter/tex/api/getCourses/";
            console.log("in service for Courses " + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
				params  : { username : userData } ,
				contentType:'application/json'
             
            }).success(function (data, status, headers, cfg) {
                console.log(data);
                deferred.resolve(data);
            }).error(function (err, status) {
                console.log(err);
                deferred.reject(err);
            });
            return deferred.promise;
        },

        get: function () {
            // Simple index lookup
            return;
        }
    }
})


.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

