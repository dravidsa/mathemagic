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

.factory('Registration', function ($http, $q, Config) {
    return {
        post: function (userData) {
                    var _data ={firstname:userData.firstname, lastname:userData.lastname, mobileno:userData.mobileno,
                        password:userData.password, address1:userData.address1, address2:userData.address2, city:userData.city,
                        pin:userData.pincode, cardno:0, memberpin : userData.memberpin, merchantid :0,
                        dob: userData.birthdate, state: userData.state, country: userData.country,emailid:userData.emailid
                    };
                    console.log(_data);
                    var url = Config.serverBaseUrl + "api/addmember/";
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                            url: url,
                            data: _data
                    }).success(function (data, status, headers, cfg) {
                        console.log(data);
                        deferred.resolve(data);
                    }).error(function (error, status) {
                        console.log(error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
    }
}

})



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

.factory('Messages', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "api/getMessages/";
            console.log("in service for getMessages " + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url
			
             
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
            console.log("in service for save order" + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: url,
				data  :  userData    ,				
				headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				} 
             
            }).success(function (data, status, headers, cfg) {
                console.log("response from save is " + data);
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


.factory('Orders', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "api/ipm_my_orders/";
            console.log("in service for get order" + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
				params    : { userid : userData }       ,				
				headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				} 
             
            }).success(function (data, status, headers, cfg) {
                console.log("response from save is " + data);
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

.factory('Billing', function ($http, $q, Config) {

    return {
        execute: function (userData) {
           var url = Config.serverBaseUrl + "api/getBilling/";
            console.log("in service for get billing" + userData ) ; 
            var deferred = $q.defer();
            $http({
                method: 'GET',
                url: url,
				params    : { username: userData }       ,				
				headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				} 
             
            }).success(function (data, status, headers, cfg) {
                console.log("response from billing is " + data);
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
               console.log("data is " + data[0]);
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
                console.log("got data " + data);
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
/*
.factory('socket', function ($rootScope) {
    var socket = io.connect('http://162.144.37.189:5000/');
    return {
        on: function (eventName, callback) {
			console.log("connected to socket "); 
            socket.on(eventName, function () {  
			console.log( "get event "+ eventName )  ; 
			
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
})
*/
.factory('Registration', function ($http, $q, Config) {
    return {
        post: function (userData) {
                    var _data ={username:userData.username , name:userData.name, mobile:userData.mobile,
                        password:userData.password,  city:userData.city,email:userData.email
                    };
                    console.log(_data);
                    var url = Config.serverBaseUrl + "api/createUser/";
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                            url: url,
                            data: _data , 
							headers : {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
				} 
                    }).success(function (data, status, headers, cfg) {
                        console.log(data);
                        deferred.resolve(data);
                    }).error(function (error, status) {
                        console.log(error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
    }
}

})

.factory('Profile', function ($http, $q, Config) {
    return {
        update: function (userData) {
                    var _data ={firstname:userData.firstname, lastname:userData.lastname, mobileno:userData.mobileno,
                        password:userData.password,  city:userData.city,emailid:userData.emailid
                    };
                    console.log(_data);
                    var url = Config.serverBaseUrl + "api/addmember/";
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                            url: url,
                            data: _data
                    }).success(function (data, status, headers, cfg) {
                        console.log(data);
                        deferred.resolve(data);
                    }).error(function (error, status) {
                        console.log(error);
                        deferred.reject(error);
                    });
                    return deferred.promise;
    },
	
	get: function(userData) { 
	
	 var url = Config.serverBaseUrl + "api/getProfile/";
            console.log("in service for Profile " + userData ) ; 
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
	
	
	}
}

})



.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

