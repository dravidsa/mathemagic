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

.factory('Schools', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "api/ipm_get_schools/";
            console.log("in service for getSchools " + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
				params  :  { school_name : userData  }   
             
            }).success(function (data, status, headers, cfg) {
               // console.log(data);
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
.factory('SaveOrder', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "api/ipm_save_order/";
            console.log("in service for getSchools " + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
				data  :  userData    ,				
				headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				} 
             
            }).success(function (data, status, headers, cfg) {
               // console.log(data);
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


.factory('EBSPay', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "api/ipm_ebs_pay/";
            console.log("in service for getSchools " + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
				data  :  userData    ,				
				headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				} 
             
            }).success(function (data, status, headers, cfg) {
               // console.log(data);
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

.factory('Products', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "api/ipm_get_products/";
            console.log("in service for getProducts " + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
				data  :  userData    ,				
				headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				} 
             
            }).success(function (data, status, headers, cfg) {
               // console.log(data);
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





.factory('Quiz', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "api/getQuestions/";
            console.log("in service for Quiz " + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
				params    : { quizid : userData }     ,
				headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				} 
             
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
            var url = Config.serverBaseUrl + "api/userlogin/";
            console.log("in service for login " + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
				data :userData ,				
				headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				} 
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

.factory('Pay', function ($http, $q, Config) {

    return {
        execute: function (userData) {
            var url = "https://secure.ebs.in/pg/ma/payment/request";
            console.log("in service for pay ") ; 
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
                params  : { username : userData.username , password : userData.password } 
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


.factory('Tests', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "api/getTests/";
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
           var url = Config.serverBaseUrl + "api/getCourses/";
            console.log("in service for Courses " + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url, 
				params  :  { username : userData }  ,
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

