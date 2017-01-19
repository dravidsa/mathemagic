// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'btford.socket-io',  'ui.grid','ion-datetime-picker','ionic-datepicker','ngCordova'])


	

    .run(function ($rootScope, $state, $ionicPlatform, $window, $localstorage, Login) {
        var userModel = {
            isLogIn: false, userid:"", firstname: "", lastname: "", mobileno: "", emailid: "", birthdate: "",
            address1: "", address2: "", city: "", pincode: "", state: "", country: "", cardno: "", memberpin: "", points: "",
            pointsexpirydate:"",points_inprocess:"",points_redeemable:""
        }
        $rootScope.userModel = userModel;
        $rootScope.authtemplate = "templates/authTemplate.html";
        console.log  ( ' in run') ; 
        $rootScope.userModel.isLogIn = false ; 
        $rootScope.isEmptyObject= function(ob)
        {
            var obj = Object.getOwnPropertyNames(ob);
            if (obj.length == 0)
                return true;
            else
                return false;
        }

        var orderData ; 
        
        var loginData = $localstorage.getObject('loginData');
        var userModelData = $localstorage.getObject('userModel');
        if ($rootScope.isEmptyObject(loginData) == true)
        {
            $rootScope.userModel.isLogIn = false;
        }
        else
        {
            $rootScope.userModel = userModelData;
        }

    })
	
.config(function($cordovaInAppBrowserProvider) {

  var defaultOptions = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'no'
  };

  document.addEventListener("deviceready", function () {

    $cordovaInAppBrowserProvider.setDefaultOptions(options)

  }, false);
})
	.config(function (ionicDatePickerProvider) {
    var datePickerObj = {
      inputDate: new Date(),
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      from: new Date(2000, 8, 1),
      to: new Date(2018, 8, 1),
      showTodayButton: true,
      dateFormat: 'dd mm yyyy',
      closeOnSelect: false,
      disableWeekdays: [6]
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
  })
  
	
	