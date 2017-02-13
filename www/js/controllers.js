angular.module('app.controllers', ['ngSanitize'])
        
.controller("quizCtrl",  function($scope, $rootScope , Quiz, LogTest ,ConnectivityMonitor ,  $http, $state,$stateParams ,$ionicHistory,$sce) {
	
	
	if ( $rootScope.userModel.isLogIn ==false  ) {
		console.log( "not logged in ") ; 
		$state.go("login") ; 
		return;
		
		
	}
	//$cordovaScreenOrientation.lockOrientation('landscape') ; 
	
    //$scope.mode = "normal"; 
	
    $scope.mode = "checking"; 
	
    $scope.myText = "My name is: <h1>John Doe</h1>";
	$scope.currentQuestion = 1 ; 
	$scope.noOfQuestions = 4; 
	$scope.quiz =[];
	$scope.quizid = $stateParams.quizid;
	$scope.currentQuestion = $stateParams.currentQuestion;
	$scope.mode = $stateParams.mode;
	$scope.quizName = $stateParams.quizName ; 
	
	

 
	
	console.log( "current question is " + $scope.currentQuestion + "scope length " + $scope.quiz.length) ; 
	//console.log("q is" + $scope.quiz[$scope.quiz[currentQuestion-1].text )
if ($scope.currentQuestion == 0 ) { 
	
			console.log( " got quiz id " + $stateParams.quizid) ; 
	
	var url = "http://ipm-mathemagic.com/learning/filter/tex/x.php";
	//var url = "http://localhost:9093/moodle/filter/tex/x.php";
    $scope.currentQuestion  =1 ; 
	 var quizData = {
		
            quizid : "" 
            
        }
		
		//quizData.quizid = $scope.quizid  ; 
		
		if ( ConnectivityMonitor.isOnline() ) 
		 {
			 // alert("You are online ") ; 
			 
		 }
		 else {
				alert( "you are not online . Please check your internet connection ") ; return ; 
				
		}
		
	Quiz.execute( $scope.quizid ).then(function (data) { 
	console.log( "got data " +data )  ; 
	$scope.quiz= data ; 
	 var qno = 1 ; 
	console.log("current q is " + qno  + " quiz  is "  + $scope.quiz[0].id  ) ; 
	   var question_id = $scope.quiz[qno-1].id ;
	var question_text= $scope.quiz[qno-1].text ;
	console.log( "question id " + question_id + " text "+ question_text ); 
	
	
	}) ;
}
else { 
$scope.quiz = $rootScope.quiz ; 
console.log( "current question is "+ $scope.quiz[$scope.currentQuestion]) ; 

}
	/*
	if ( $scope.quiz[$scope.currentQuestion].flagged == true ) 
	$scope.flagMessage = " This question is flagged " ; 
	else 
		$scope.flagMessage = " This question is not flagged "
	*/
	
	
	/*
            $http.get(url).success( function(response) {
				
               $scope.quiz = response;
			   console.log("quiz is " + $scope.quiz) ; 
		
		
			   
			   var qno = 1 ; 
console.log("current q is " + qno  + " quiz  is "  + $scope.quiz[0].id  ) ; 
	
    var question_id = $scope.quiz[qno-1].id ;
	var question_text= $scope.quiz[qno-1].text ;
	console.log( "question id " + question_id + " text "+ question_text ); 
	
            }); 
		*/
		
			//$rootScope.currentQuestion = 1 ; 
			/*
			console.log( "setting current q-" + $rootScope.currentQuestion  + "-") ;  
			if ( $rootScope.currentQuestion != undefined) { 
			$scope.currentQuestion = $rootScope.currentQuestion ; 
			console.log( "Came from submit ") ; 
			}
			*/
			

$scope.sanitizeMe = function(text) {
    return $sce.trustAsHtml(text)
};

 
$scope.showQuestions = function (qno){

}
$scope.getScope = function (ctrlName) {

var scope = angular.element($('[ng-controller=quizCtrl]')).scope();
    
	console.log( "returning scope for "+ scope );  
    return scope;
}

$scope.getQuestion = function (qtype ) {
    /*
    var scope = $scope.getScope('myCtrl');
	console.log("qtype is " + qtype ) ; 
	*/
	var qno = $scope.currentQuestion ; 
	
	var incr =  0 ; 
	if ( qtype == 'next')  incr = 1 ; 
	else incr = -1 ; 
	 $scope.currentQuestion = parseInt($scope.currentQuestion) + incr  ;
	 
	 if ( $scope.quiz[$scope.currentQuestion].flagged == true ) 
	$scope.flagMessage = " This question is flagged " ; 
	else 
		$scope.flagMessage = " This question is not flagged "
	 
	 
	 
	 /*
	scope.$apply(function(){
 
}) */
;

	
	
    
}    


$scope.submitQuiz = function () {

console.log("got in submit "); 

console.log( "last ques is " + $scope.quiz[1].text) ; 
$rootScope.quiz = $scope.quiz  ; 
$state.go('summary'); 

//window.location  = "templates/testSummary.html"  ; 
}

$scope.showResults = function () {

console.log("got in showResults "); 

console.log( "last ques is " + $scope.quiz[1].text) ; 
$rootScope.quiz = $scope.quiz  ; 
$state.go('mathemagic.results'); 

//window.location  = "templates/testSummary.html"  ; 
}

$scope.goBack = function() {
	console.log( " going back" + $ionicHistory.currentStateName()); 
	$ionicHistory.goBack(); 
	
	
	//console.log("back view is " .$ionicHistory.backView().stateName); 
}

$scope.flagQuestion = function(flag){
	console.log( "flag is " + flag ) ; 
	
	if ( flag == 'true' ) {
	$scope.flagMessage = "This question is flagged " ; 
	$scope.quiz[$scope.currentQuestion-1].flagged = true ;  }
	else 
	{
		$scope.flagMessage = "This question is not flagged " ; 
	$scope.quiz[$scope.currentQuestion-1].flagged = false ;  }
	
}

/*
jQuery(document).ready(function($) {
    setTimeout(getQuestion(1), 2000);
});
*/

$scope.sleep = function(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


	})
	
.controller('summaryCtrl', function($scope , $rootScope , $state ) {
	console.log( " in summary") ; 
	$scope.quiz = $rootScope.quiz ; 
	console.log( "quiz is " + $scope.quiz[0].text  + $scope.quiz[0].id  ) ; 
	
	
	
	
	$scope.showResults = function () {

console.log("got in showResults "); 

//console.log( "last ques is " + $scope.quiz[1].text) ; 
$rootScope.quiz = $scope.quiz  ; 

userData.username = $rootScope.userModel.username  ; 
userData.quizid = $scope.quiz; 
userData.marks = 0 ; 
var currentdate = new Date(); 
var datetime =  currentdate.getDate() + "-" + 
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getFullYear() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
userData.datetime = datetime ; 

	LogTest.execute( userData ).then ( data , function() {
		
		console.log( "quiz log sent ") ; 
				
	});
	
$state.go('results'); 

//window.location  = "templates/testSummary.html"  ; 
}

$scope.getScope = function (ctrlName) {
    var sel = 'div[ng-controller="' + ctrlName + '"]';
	console.log(" searching for " + sel ) ; 
    var scope =  angular.element(sel).scope();
	console.log( "got scope" + scope ) ;
	return scope ; 
	
}

/*
$scope.getScope = function (ctrlName) {

var scope = angular.element($('[ng-controller=quizCtrl]')).scope();
    
	console.log( "returning scope for "+ scope );  
    return scope;
}
*/


$scope.gotoQuestion = function(question_no) {
	
	console.log( "going to question "+question_no ) ; 
	$rootScope.currentQuestion = question_no ; 
	
	var scope = $scope.getScope("quizCtrl"); 
	
    
	console.log( "returning scope for "+ scope );
scope.currentQuestion = question_no ; 
	
	angular.element(document.getElementById('solveTestCtrl')).scope().$apply();
	conosole.log( "going to solve ") ; 
	
	$state.go("solveTest"); 
	
}



})

.controller('resultsCtrl', function($scope , $rootScope ,$state  ) {
	console.log( " in resultsCntrl") ; 
	$scope.quiz = $rootScope.quiz ; 
	console.log( "quiz is " + $scope.total_marks + "-" + $scope.correct_answers ) ; 
	
	$scope.calculateMarks = function( ){
		var quiz = $scope.quiz ;  
		console.log("quiz has " + quiz.length ) ; 
		$scope.total_marks =  0 ; 
		$scope.correct_answers = 0 ; 
		
		for ( i=0 ; i < quiz.length ; i ++ ) 
		{
			
			if ( quiz[i].userSelection == quiz[i].correct ) { console.log("got correct q") ; $scope.correct_answers = $scope.correct_answers  + 1 ; $scope.total_marks = parseFloat($scope.total_marks) + parseFloat(quiz[i].marks )}
		}
	$scope.total_questions = quiz.length ;
	console.log( "total questions " + $scope.total_questions + "total marks " + $scope.total_marks  + "correct answers " + $scope.correct_answers ) ; 
	
	$rootScope.quiz = $scope.quiz ; 
	}
	
	
	$scope.calculateMarks() ; 
	 
	$scope.gotoTests = function ()  {
		
		console.log( "going to test home ") ;
		$state.go("tab.learning"); 
	}	

})

 .controller('LoginCtrl', function ($scope, $state, $location, Login , $rootScope, $localstorage,$ionicLoading,ConnectivityMonitor) {
        console.log( "in controller ") ; 
 
		$scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };
  $scope.hide = function(){
        $ionicLoading.hide();
  };

		
        $scope.username = "";
        $scope.loginAlerts = [];
        $rootScope.userModel.isLogIn = false ;
        $scope.userModel.isLogIn = false ;
		
		
        var formdata = new FormData();
        formdata.append("username", "ritesh@gmail.com");
        formdata.append("password", "iloyal@123");
        //$scope.loginData = {
        //    username: "ritesh@gmail.com",
        //    password: "iloyal@123"
        //}
        $scope.loginData = {
            username: "",
            password: ""
        }
      
 
        $scope.doLogin = function (loginData) {
			
			
		 if ( ConnectivityMonitor.isOnline() ) 
		 {
			 // alert("You are online ") ; 
			 
		 }
		 else {
				alert( "you are not online . Please check your internet connection ") ; return ; 
				
		}
			
           
           console.log( "in login of controller "+loginData);
           console.log( "is login is " + $rootScope.userModel.isLogIn ) ; 
           console.log(loginData) ; 
		    //$scope.show($ionicLoading);

            $scope.loginAlerts = [];
            if (validate(loginData) == false) return;

            //$scope.$parent.showProcessing();
            Login.execute(loginData).then(function (data) {
                console.log("resp is " + data.id + data.username + data.email);
                //data = data[0];
                if (data.id  >  0) {
                    console.log( "here in success ") ; 
                    $rootScope.userModel.isLogIn = true;
                    $rootScope.userModel.userid = data.id ;
					$rootScope.userModel.username = data.username ; 
					$rootScope.userModel.email = data.email; 
					
                    
                    $scope.userModel.isLogIn = true ;

                    $localstorage.setObject('loginData', loginData);
                    $localstorage.setObject('userModel', $rootScope.userModel);
                  
					/*
                    Vehicle.execute( data).then(function (vehicledata) { 
                            console.log("got vehicle" + vehicledata ) ; 
                  vehicleArr = [] ; 

                    $rootScope.userModel.vehicle = vehicledata; 
                      console.log(" vehicle id is " + vehicledata ) ;  
					  for ( i = 0 ; i < vehicledata.length; i ++ ) {
						  console.log ( "got veh" + vehicledata[i].vehicle_id) ; 
						  vehicleArr.push(vehicledata[i].vehicle_id ) ; 
						  
					  }
					  $localstorage.setObject('vehicleArr', vehicleArr);
                    }); 
					*/
					
                    //window.location.href="#/app/camera";
					//$scope.hide($ionicLoading);  
					//ionicLoading.hide() ; 
                    // $location.path('learning');
                    $state.go('tab.buy'); 
                    // $route.routes[null];
                   //$
					 
                   // $scope.$parent.hide();
                }
                else {
                    var _alert = { type: "danger", message: "The id  or password you entered is incorrect. " }
					//$ionicLoading.hide();
                    $scope.loginAlerts.push(_alert);
                    $scope.$parent.hide();
                }

            }, function (error, status) {
                console.log(error);
				//$ionicLoading.hide();
                $rootScope.userModel.isLogIn = false;
                $scope.userModel.isLogIn = false ;
                $scope.$parent.hide();
            });
        }


        function validate(loginData) {
            if (loginData.username == null || loginData.username == "") {
                var _alert = { type: "danger", message: "Enter user name. " }
                $scope.loginAlerts.push(_alert);
                return false;
            }
            else if (loginData.password == null || loginData.password == "") {
                var _alert = { type: "danger", message: "Enter password. " }
                $scope.loginAlerts.push(_alert);
                return false;
            }
        }

        $scope.showRegister = function()
        {
            $state.go('register');
        }
    })


.controller('LogoutCtrl',  function ($scope, $location,$rootScope,$localstorage,$state) {
      console.log ( "in logout controller") ; 
       
        $scope.Logout = function( ) {
        console.log('logging out now ') ; 
            
            $rootScope.userModel.isLogIn = false ; 
            $rootScope.userModel.username = ''; 
			$rootScope.userModel.userid = 0; 
			$scope.userModel.isLogIn = false ; 
			
			
			//$location.path('/login') ; 
            //$state.go("app.login") ; 
			$localstorage.setObject('userModel', $rootScope.userModel);
            $state.go('tab.home'); 
        }

          })
		  


	
.controller('signupCtrl', function($scope) {

})
   

   
.controller('studentCtrl', function($scope) {

})
   

   
.controller('productsCtrl', function($scope,$rootScope , ConnectivityMonitor , $state, Products,$http)  {
	
	
	if ( $rootScope.userModel.isLogIn ==false  ) {
		console.log( "not logged in ") ; 
		$state.go("login") ; 
		return;
		
		
	}
	
	
  //window.screen.lockOrientation('portrait') ; 
   $scope.userModel  = $rootScope.userModel ; 
   

		 if ( ConnectivityMonitor.isOnline() ) 
		 {
			 // alert("You are online ") ; 
			 
		 }
		 else {
				alert( "you are not online . Please check your internet connection ") ; return ; 
				
		}
		
   
	$scope.productsData ={} ; 
	
	$scope.productsData.status = "Confirmed" ; 
	Products.execute ( $scope.productsData.status) .then(function (data) { 
	console.log( " got products " + JSON.stringify(data) ) ; 
	$scope.products = data ; 
	
	
	}) ; 
	

})
   
.controller('learningCtrl', function($scope,$rootScope , ConnectivityMonitor , Courses,$http, $state) {
	//console.log( "showing products for " + $rootScope.userModel.username ) ; 
	
	if ( $rootScope.userModel.isLogIn == false  )
	{
		
		console.log( " not logged in ") ; 
		$state.go ( "login") ; 
return ; 
	}
	
	
		 if ( ConnectivityMonitor.isOnline() ) 
		 {
			 // alert("You are online ") ; 
			 
		 }
		 else {
				alert( "you are not online . Please check your internet connection ") ; return ; 
				
		}
		

	var username =  $rootScope.userModel.username ; 
	//var username = "sandra" ; 
		console.log( "username from root is  " + $rootScope.userModel.username ) ;  
	Courses.execute( username ).then(function (data) { 
	console.log( "got data " +data )  ; 
	$scope.courses= data ; 
	
	
	
	}) ; 
	
	

})
.controller('testListCtrl', function($scope,$rootScope , Tests, ConnectivityMonitor , $http, $state,$stateParams) {
	
	  var courseid = 4 ; 
	  
	
            // get the id
            $scope.courseid = $stateParams.courseid;
			console.log( " got course id " + $stateParams.courseid) ; 
			
			
		 if ( ConnectivityMonitor.isOnline() ) 
		 {
			 // alert("You are online ") ; 
			 
		 }
		 else {
				alert( "you are not online . Please check your internet connection ") ; return ; 
				
		}
			
	Tests.execute( $scope.courseid ).then(function (data) { 
	console.log( "got data " +data )  ; 
	$scope.tests= data ; 
	
	
	
	}) ; 
	
	

})


   
.controller('orderDetailsCtrl', function($scope,$rootScope , Schools, SaveOrder , Billing, ConnectivityMonitor , $http, $state,$stateParams,$ionicLoading , $cordovaInAppBrowser ) {
console.log( " in orderDetails") ; 
$scope.errorMessage = "All data on this form is mandatory" ; 
$scope.orderData = "" ; 
//$scope.orderData.school_name  = ""; 

$scope.states = 
[{"id": 408,"state": "Andaman & Nicobar Islands"}, {"id": 409,"state": "Andhra Pradesh"}, {"id": 410,"state": "Arunachal Pradesh"}, {"id": 411,"state": "Assam"}, {"id": 412,"state": "Bihar"}, {"id": 413,"state": "Chandigarh"}, {"id": 414,"state": "Chhatisgarh"}, 
{"id": 415,"state": "Dadra & Nagar Haveli"}, {"id": 416,"state": "Daman & Diu"}, {"id": 417,"state": "Delhi"}, {"id": 418,"state": "Goa"}, {"id": 419,"state": "Gujarat"}, 
{"id": 420,"state": "Haryana"}, {"id": 421,"state": "Himachal Pradesh"}, {"id": 422,"state": "Jammu & Kashmir"}, {"id": 423,"state": "Jharkhand"}, {"id": 424,"state": "Karnataka"},
 {"id": 425,"state": "Kerala"}, {"id": 426,"state": "Lakshadweep"}, {"id": 427,"state": "Madhya Pradesh"},  {"id": 429,"state": "Manipur"},
 {"id": 430,"state": "Meghalaya"}, {"id": 431,"state": "Mizoram"}, {"id": 432,"state": "Nagaland"}, {"id": 433,"state": "Orissa"}, {"id": 434,"state": "Pondicherry"}, 
 {"id": 435,"state": "Punjab"}, {"id": 436,"state": "Rajasthan"}, {"id": 437,"state": "Sikkim"}, {"id": 438,"state": "Tamil Nadu"}, {"id": 439,"state": "Tripura"},
 {"id": 440,"state": "Uttaranchal"}, {"id": 441,"state": "Uttar Pradesh"}, {"id": 442,"state": "West Bengal"}]

 
  $scope.orderData = {
            billingname: "",
            address: "" , 
			city : "" ,
			pincode: "" ,
			phone : "" 
        }
		
//$scope.orderData = [] ; 


$scope.username =  $rootScope.userModel.username ; 
if ( $rootScope.userModel.mail == '' )
{
	alert("your session has expired , please login again ") ;  
	$state.go('login'); 
	
	
}
$scope.email =  $rootScope.userModel.mail  ; 


console.log( "getting billing data for userid " + $rootScope.userModel.userid ); 

Billing.execute( $rootScope.userModel.username).then(function (data) { 

if ( data.length ==0 ){ 

console.log( "no billing data found "); 

}
else 
{
	
	console.log( "found prev billing data " + data[0].address ) ; 
	$scope.billingMessage ="Last billing address" ; 
	$scope.orderData.billingname = data[0].name   ; 
$scope.orderData.address = data[0].address ; 
$scope.orderData.city = data[0].city ; 
$scope.orderData.phone = parseInt(data[0].phone) ; 
$scope.orderData.pincode = parseInt(data[0].pinCode) ; 
$scope.orderData.state = data[0].state  ; 	
}



});





if (  $stateParams.prodid != "" ) { $scope.prodid =$stateParams.prodid ;  }
  $scope.prodname = $stateParams.prodname;
			
			 $scope.price = $stateParams.price;
			 
			 console.log( " got prod id " + $stateParams.prodid) ; 
			 //$scope.orderData.prodid = $scope.prodid ; 
			// $scope.orderData.prodname = $scope.prodname ; 
			 //$scope.orderData.orderAmount = $scope.price ; 
			 //$scope.orderData.username = $scope.username ; 
			 //$scope.orderData.email = $scope.email ; 
			
			
console.log( " and name is " + $stateParams.prodname ) ; 

if ( $stateParams.prodid  == "") { 
console.log( "came from school list " + $rootScope.orderData) ; 
$scope.orderData = $rootScope.orderData ; 
$scope.prodname  = $rootScope.prodname  ;
//$scope.price = $rootScope.price ; 
$scope.prodid = $rootScope.prodid; 
$scope.prodname = $rootScope.prodname ; 
$scope.price = $rootScope.price ;  

console.log( "settins chool name " + $rootScope.school_name ) ; 

$scope.orderData.school_name = $rootScope.school_name ; 

$scope.school_name = $rootScope.school_name; 

}

			if (( $scope.prodid == 1) || ( $scope.prodid == 2 )) 
			{ $scope.shipping = true ;  console.log( "shipping is needed ") ; } 
			else  { $scope.shipping = false ;   console.log( "shipping is  not needed ") ; } 
			
			if (( $scope.prodid ==2 ) || ( $scope.prodid == 3 ) || ( $scope.prodid == 5 )) 
			{
				$scope.student = true ; console.log( "student details needed ") ; 
			} else { $scope.student = false ; console.log( "student not needed ") ; 
			}
 
	
	$scope.showSchools = function (order ) {
		
		

	console.log("in show schools for " +order.school_name  + "prod is " + $scope.prodid ); 
	
	
	$rootScope.orderData = order ; 
	$rootScope.prodid = $scope.prodid ; 
	$rootScope.prodname = $scope.prodname ; 
	$rootScope.price = $scope.price  ;  
	
	
	//console.log( " put prod to rootScope" .$rootScope.prodid ) ; 
	
	//$scope.school_name = school_name;    
	//console.log( "gender " + $scope.orderData.gender  + "medium " + $scope.orderData.medium + "name" + $scope.orderData.prodname + " price" + $scope.orderData.price  +  "school" + $scope.orderData.school_name	) ; 
	
	/*
	
		$http.get('schools.json').success(function (data){
				console.log( "got data " + data ) ; 
		$scope.schools = data;
		
		//$rootScope.schools = data ; 
		
	 //console.log( "got data for records " + JSON.stringify(data)   )  ; 
	 
	 //$rootScope.orderData = $scope.orderData ; 
	 
	 console.log( "setting rootscope " ) ; 
	 $scope.hide() ; 
	 
	$state.go('schoolList'); 
	
	});
	
	*/
	
	console.log( "json order is " +  JSON.stringify(order)) ; 
	
	
	$scope.show() ; 
	
	console.log("looking for " + order.school_name ); 
	Schools.execute(order.school_name ).then(function (data) { 

	$scope.schools= data;
		
	$rootScope.schools = data ; 
	// console.log( "got data for records " + JSON.stringify(data)   )  ; 
	 
	 //$rootScope.orderData = $scope.orderData ; 
	 
	 console.log( "setting rootscope " ) ; 
	 $scope.hide() ; 
	 
	$state.go('schoolList'); 
	
	
	
	}) ; 
	

	
	};
	
	
	//form posting in inappbrowser related 
	
	 function iabLoadStart(event) {
   
    }

    function iabLoadStop(event) {
    alert(event.type + ' - ' + event.url);
    }

    function iabLoadError(event) {
    alert(event.type + ' - ' + event.message);
    }

    function iabClose(event) {
    alert(event.type);
    iabRef.removeEventListener('loadstart', iabLoadStart);
    iabRef.removeEventListener('loadstop', iabLoadStop);
    iabRef.removeEventListener('loaderror', iabLoadError);
    iabRef.removeEventListener('exit', iabClose);
    }
    // device APIs are available

    function showEBS(orderData) {
		
		console.log( "in show EBS ") ; 
    //form.submit();   
   var order_no =$rootScope.order_no ; 
   var amount  = orderData.amount  ; 
   
   var name= orderData.billingname  ; 
   
   var address = orderData.address  ; 
   var city  = orderData.city  ; 
   var postal_code  = orderData.pincode  ; 
   var phone = orderData.phone ;  
    var email  = $rootScope.userModel.email  ; 
	  var phone  =orderData.phone  ; 
   
   ref =  window.open("templates/payment.html?amount="+ amount +"&order_no=" + order_no + "&name="+name+"&address="+address+"&city=" +city+"&postal_code="+postal_code+"&email="+email +"&phone="+phone, '_blank', 'location=no');
   //ref.addEventListener('loadstart', function() {  /*alert ( 'in loadstart') */ }) ;
   ref.addEventListener('loadstop', function() { 

   ref.executeScript(
        { code: "document.body.innerHTML" },
        function( values ) {
          //  alert( values[ 0 ] );
		  var responseText = values[0] ; 
		  //alert ( "exitting with>" + responseText+"<" ) ; 
		  if ( responseText.includes("Thanks for your order . Your order is confirmed")) { 
		  //alert ( responseText ) ;
		  alert( " Thank You for your order. Your order is confirmed.") ; 
			ref.close()		  ;

		   $state.go('tab.orders') ; 
		  
		  }
		else if ( responseText.includes("Your order could not be processed") ) { 
		  
			   alert( "Eror in processing your order . Your order has failed.") ; 
			   ref.close(); 
			    $state.go('tab.home') ; 
		  }
		  
		  
        }



   )
   });
   ref.addEventListener('loadloaderror', function() {  alert ( 'Got some Error ');  $state.go('tab.buy') ;  });
   ref.addEventListener('exit', function() {   });



   
   
	

     }
	
$scope.show1 = function() {
        $ionicLoading.show({
          template: '<p>Processing order ...</p><ion-spinner icon="android"></ion-spinner>'
        });
      };

$scope.hide = function(){
        $ionicLoading.hide();
      }; 
	  

   $scope.openBrowser = function() {
	   
	 var options = {
      location: 'yes',
      clearcache: 'yes',
      toolbar: 'no'
   };
   
      $cordovaInAppBrowser.open('https://secure.ebs.in/pg/ma/payment/request', '_self', options)
		
      .then(function(event) {
         // success
      })
		
      .catch(function(event) {
         // error
      });
   }

   
	
	
	
	
	$scope.saveOrder  = function(  orderData ){
		
		
		 if ( ConnectivityMonitor.isOnline() ) 
		 {
			 // alert("You are online ") ; 
			 
		 }
		 else {
				alert( "you are not online . Please check your internet connection ") ; return ; 
				
		}
	console.log( "order data is " + $scope.prodname + "studentname " + orderData +"Scope order " ) ; 
	
	if ( orderData =="" ) { console.log( " not going to save " ); return ; }
	//orderData.IPMOrderNo = "160000123" ; 
	//orderData.orderStatus = "Pending" ; 
	orderData.prodname = $scope.prodname ; 
	orderData.amount  =  $scope.price  ; 
	orderData.userid = $rootScope.userModel.userid ; 
	orderData.email = $rootScope.userModel.email ; 
	orderData.school_code = $rootScope.school_code ; 
	var shipping = 0 ; 
	
	if ( $scope.prodid == 1 )  {
	 if  (( orderData.state = 428 ) || ( orderData.state == null ) ) 
	 {  shipping = 125 ; } 
	 else 
		 shipping = 175 ; 
	
	
	orderData.amount = parseInt($scope.price)  + parseInt(shipping)  ; 
	}
	
	
	
	console.log( "date is " + orderData.birthDate) ; 

 	if ( ( $scope.prodid != 1 )  && ( $scope.prodid != 4) ) {
	var month =orderData.birthDate.getMonth() + 1 ; 
	var year = orderData.birthDate.getYear() + 1900 ; 
	console.log( " month is " + month  + "year is " + year ) ; 
	var dt = orderData.birthDate.getDate() + "-" + month  + "-" + year ; 

		console.log( "date now is " + dt ) 
	 orderData.birthDate = dt; 
	 
	console.log("school ocde is " + orderData.school_code  ) ; 
	} 
	
	
	
	 console.log( " prod is " + orderData.prodname + " price is "  + $scope.price + "order amount is " + orderData.amount  ) ; 
	// orderData.birthDate = '' ; 
	 
	 orderData.medium = "English" ; 
	$rootScope.orderData  = $scope.orderData ;  
	 var check = false ; 
	check = $scope.validateData(orderData) ; 
	if ( !check ) {  console.log( "not going ahread" ) ; return ; }
	
	$scope.show1(); 
	
	SaveOrder.execute( orderData ).then(function (data) { 

	console.log( " save order is " + data ) ; 
	if ( data != '' )
	{
		$rootScope.order_no = data ;  
		$rootScope.amount = $scope.price  ; 
		$scope.hide() ; 
        showEBS(orderData) ; 
		console.log(" after ebs "); 
		
		
		$state.go('tab.buy'); 
		
		
		
		 //$state.go("payment") ; 
	}
	else 
	{
		$scope.errorMessage = " Error while saving order" ; 
	
	}
	}) ; 
	}
	
	$scope.validateData = function( orderData ){
	$scope.errorMessage  = ""; 
    var product = $scope.prodname ; 
	
	console.log( " in validate data  for " + product + "-" ) ; 
	orderData.medium = "English"; 
	
	
	if (( product == "IPM 2017 Exam Enrollment ") || ( product == "Supreme") || ( product == "Elearning"))
	{
		if ( ( orderData.student_name =="" ) || ( orderData.school_name == "" ) || ( orderData.birthDate == "" ) || ( orderData.gender =="" ) || ( orderData.medium == "" ) || ( orderData.student_name == null) || ( orderData.school_name == null ) || ( orderData.birthDate == null ) || ( orderData.gender == null  ) || ( orderData.medium == null )  )
		{
			$scope.errorMessage = " All Student Details are mandatory for this product " ; 
			console.log( "incomdplete student data ")  ; 
			
			return false ; 
			
		}
	}
	 console.log( "checking billing -"+  orderData.phone .toString().length+ "-") ; 
	 
	 if ( (orderData.state =="" )  || ( orderData.state == null) ) { orderData.state = 428 ; }
       if (  ( orderData.billingname == "") || ( orderData.address == "") || ( orderData.city =="" ) || ( orderData.pincode == "" ) || ( orderData.phone == "") || ( orderData.billingname == null ) || ( orderData.address == null ) || ( orderData.city == null  ) || ( orderData.pincode == null )  || ( orderData.phone == null )  ) {
		   
		  
		   $scope.errorMessage = " All Billing  Details are mandatory for all products " ; 
			console.log( "incomdplete billing  data ")  ; 
			return false ; 
	   }		
	   
	   if (( orderData.standard == "" ) || ( orderData.standard == null ) ) {
		   
		   $scope.errorMessage = " Standard is mandatory for all products " ; 
		   console.log( "incomdplete standard  ")  ; 
			return false ; 
	   }
	 
	 
	  if   ( angular.isNumber(orderData.phone) == false )    {
		  $scope.errorMessage = "Please enter Nummeric phone number " ; 
		   console.log( "non numeric phone   -" +   orderData.phone + "-" )  ; 
			return false ; 
		  
	  }
	  if   ( orderData.phone.toString().length < 10)     {
		  $scope.errorMessage = "mobile phone number needs to be at least 10 chars long " ; 
		   console.log( "small phone    -" +   orderData.phone + "-" )  ; 
			return false ; 
		  
	  }
	  
	   if   (angular.isNumber (orderData.pincode ) == false)    {
		  $scope.errorMessage = "Please enter Nummeric pincode  " ; 
		   console.log( "non numeric pincode   -"+ orderData.pincode + "-")  ; 
			return false ; 
		  
	  }
	  if   (orderData.pincode.toString().length < 6    )    {
		  $scope.errorMessage = "Pincode should be of 6  characters   " ; 
		   console.log( "small  pincode   -"+ orderData.pincode + "-")  ; 
			return false ; 
		  
	  }
      return true ; 
	  
	
		
	}
	
	$scope.showDate  = function()  { 
	console.log("in showdate");
	
	 var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' +  new Date(val));
		val = new Date(val) + ""; 
		var dateArr= val.split(" ") ; 
	  $scope.forDate = dateArr[2]+'-'+dateArr[1]+'-'+dateArr[3] ; 
	  
      }, dateFormat : 'dd-mm-yyyy' 
     } 
    
      ionicDatePicker.openDatePicker(ipObj1);
    
	
	
	}


$scope.show = function() {
        $ionicLoading.show({
          template: '<p>Loading Schools ...</p>' , 
		    duration: 5000
        });
      };

      $scope.hide = function(){
        $ionicLoading.hide();
      }; 
	  
			
})

.controller('PaymentCtrl', function($scope , $rootScope,$http ,  $state,$ionicLoading) {
	
	console.log( "in payment Controller") ; 
	var orderData = $rootScope.orderData; 
	console.log( "amount is " + orderData.amount ) ; 
	
	
	
	
})



.controller('schoolListCtrl', function($scope , $rootScope,$http , Schools,  $state,$ionicLoading) {
	
	
	$scope.show = function() {
        $ionicLoading.show({
          template: '<p>Loading Schools ...</p><ion-spinner icon="android"></ion-spinner>'
        });
      };

      $scope.hide = function(){
        $ionicLoading.hide();
      }; 
	  
	  
	


 $scope.schools = $rootScope.schools ; 
//console.log( " in schoolListCtrl" + $scope.schools ); 
//console.log( " school contains "+ $scope.schools.length+"records") ; 
$scope.setSchool = function (school_code , school_name ){
	
	$rootScope.school_name  = school_name ;
	$rootScope.school_code = school_code; 
	
	console.log("setting school name to " + school_name  + "school code is " + school_code ) ; 
	$state.go("orderDetails"); 
	
	
	
}



	  

})

.controller('studentServicesCtrl', function($scope , $rootScope , $http , $state) {

if ( $rootScope.userModel.isLogIn ==false  ) {
		console.log( "not logged in ") ; 
		$state.go("login") ; 
		return;
		
		
	}
	
console.log( "in student ctrl" ) ; 


	


$scope.services = [
	
{"service_name" :  "My Orders" , "img_src"  : "http://ipm-mathemagic.com/new/images/app/orders.jpg " , "service_desc" : " Click here to view all orders placed from this account " , "href_url" : "orders"} , 
{"service_name" :  "My Mesages (comming soon) " , "img_src"  : "http://ipm-mathemagic.com/new/images/app/mails.jpg " , "service_desc" : " Click here to view any messages from IPM  " ,"href_url" : "messages"} , 
{"service_name" :  "My Hall ticket (comming soon) " , "img_src"  : "http://ipm-mathemagic.com/new/images/app/orders.jpg " , "service_desc" : " Click here to get your hallticket for IPM exam ", "href_url" : "hallticket" } , 
{"service_name" :  "My result (comming soon) " , "img_src"  : "http://ipm-mathemagic.com/new/images/app/results.jpg " , "service_desc" : " Click here to view your result for IPM Exam" ,  "href_url" : "exam_results" } 
] 

})


.controller('ordersCtrl', function($scope , $rootScope, Orders , $http , $state) {

console.log( "in orders ctrl" ) ; 

var userid =  $scope.userModel.userid ; 

Orders.execute (userid  ).then(function (data) { 
	console.log( "got data for orders  " +data )  ; 
	$scope.orders= data ; 
	
	
	
	}) ; 



})

.controller('RegisterCtrl', function ($scope, $stateParams, $ionicLoading, Registration, $ionicPopup, $state, $ionicModal, $timeout) {
        $scope.user = {
            name: "", username: "", mobile: "", email: "", password: "", repassword: "", city: ""        };
$scope.errorMessage = "" ; 

$scope.show = function() {
        $ionicLoading.show({
          template: '<p>Registering User ...</p><ion-spinner icon="android"></ion-spinner>'
        });
      };

$scope.hide = function(){
        $ionicLoading.hide();
      }; 


        $scope.doRegister = function(user)
        {
if ( user.password != user.repassword ) {
console.log( 'passoword not matching'  + user.password + '-'+ user.repassword ); 
 $scope.errorMessage = "Password and Confirm Password are not same " ; 
return ; 
 
}
 
if ( ( user.name == '' ) || ( user.username == '' ) || ( user.mobile == '') || ( user.email =='' ) || ( user.city =='') || ( user.password =='' ) || ( user.repassword =='')) 
{
 $scope.errorMessage = "All fields are mandatory in user registration" ; 
return; 
}  
 
$scope.errorMessage = "" ;
            $scope.show();
            Registration.post(user).then(function (data) {
                console.log("user id is " + data);
                if (data > 0 )
                {
                    $scope.errorMessage = "User created . " ; 
					$scope.user = [] ; 
					
					/*
                    $timeout(function () {
                        // $scope.loading.hide();
                        $state.go('login');
                    }, 5000); */ 
					$scope.hide(); 
					
                }
else { $scope.errorMessage = data ; }
                //$scope.$parent.hide(); 
				$scope.hide() ; 
				
            }, function (error, status) {
                $scope.$parent.hide();
            })
        }
    })

 
	
	
.controller('paymentCtrl', function($scope , $rootScope, $http, EBSPay) {
	
	$scope.paymentData = {} ; 
	console.log( "order is " + $rootScope.orderData.IPMOrderNo + " status is " + $rootScope.orderData.orderStatus) ; 
	$scope.order_no = $rootScope.order_no; 
	$scope.orderStatus = "Pending" ; 
	$scope.prodname = $rootScope.orderData.prodname  ; 
	$scope.orderAmount= $rootScope.amount ;  
	$scope.username = $rootScope.userModel.useraname ; 
	$scope.email = $rootScope.userModel.email ; 
	
	
	
	$scope.makePayment  = function(  paymentData) {
	console.log( "payment data is " + paymentData) ; 
	EBSPay.execute( paymentData ).then(function (data) { 
console.log( " save order is " + data ) ; 
	
	});
	
		
	
	}

})   
   
.controller('homeCtrl', function($scope , $http, $rootScope,  Messages) {
	console.log( "in home ") ;
	
	$scope.userModel = $rootScope.userModel ; 
	
	
		Messages.execute( '' ).then(function (data) { 

	$scope.ipm_messages= data;
		
	 
	 console.log( "got data for records " + $scope.ipm_messages[0].message_text)  ; 
	 
	 //$rootScope.orderData = $scope.orderData ; 
	
	 //$scope.hide() ; 
	 
	 
	
	
	
	}) ;
	
	
	

})

.controller('profileCtrl',  function($scope , $rootScope, Profile) {
console.log( "in profile ") ; 
var username =  $rootScope.userModel.username ; 

Profile.get(username ).then ( function (data ) {
	console.log  ( "got data ") ; 
	$scope.user = [] ; 
	
	$scope.user.username  = data[0].username ; 
	$scope.user.name  = data[0].name ; 
	$scope.user.mobile  = data[0].mobile ; 
	$scope.user.email  = data[0].email ; 
	$scope.user.city  = data[0].city ; 
	
});
$scope.updateProfile = function ( userData ) { 
Profile.update ( userData).then ( function( data ) { 
console.log( "in update ") ; 
}); 
}
}) 


   
.controller('solveTestCtrl', function($scope) {

})


.controller('testSummaryCtrl', function($scope) {

})
   
.controller('productDetailsCtrl', function($scope) {

})
 