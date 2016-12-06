angular.module('app.controllers', ['ngSanitize'])
        
.controller("quizCtrl",  function($scope, $rootScope , Quiz,$http, $state,$stateParams) {
	
    $scope.myText = "My name is: <h1>John Doe</h1>";
	$scope.currentQuestion = 1 ; 
	$scope.noOfQuestions = 4; 
	$scope.quiz =[];
	$scope.quizid = $stateParams.quizid;
	$scope.currentQuestion = $stateParams.currentQuestion;
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

.controller('resultsCtrl', function($scope , $rootScope ) {
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
	 
	 

})

 .controller('LoginCtrl', function ($scope, $state, $location, Login , $rootScope, $localstorage,$ionicLoading) {
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
			
			
			
           
           console.log( "in login of controller "+loginData);
           console.log( "is login is " + $rootScope.userModel.isLogIn ) ; 
           console.log(loginData) ; 
		    //$scope.show($ionicLoading);

            $scope.loginAlerts = [];
            if (validate(loginData) == false) return;

            //$scope.$parent.showProcessing();
            Login.execute(loginData).then(function (data) {
                console.log("resp is " + data);
                //data = data[0];
                if (data  >  0) {
                    console.log( "here in success ") ; 
                    $rootScope.userModel.isLogIn = true;
                    $rootScope.userModel.userid = data;
                    
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
                    $state.go('learning'); 
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
            $state.go('app.register');
        }
    })

		
.controller('signupCtrl', function($scope) {

})
   

   
.controller('studentCtrl', function($scope) {

})
   

   
.controller('productsCtrl', function($scope,$rootScope , Products,$http)  {
	
	$scope.productsData ={} ; 
	
	$scope.productsData.status = "Confirmed" ; 
	Products.execute ( $scope.productsData.status) .then(function (data) { 
	console.log( " got products " + data ) ; 
	$scope.products = data ; 
	
	
	}) ; 
	

})
   
.controller('learningCtrl', function($scope,$rootScope , Courses,$http, $state) {
	
	  var username = 'sandra' ; 
	Courses.execute( username ).then(function (data) { 
	console.log( "got data " +data )  ; 
	$scope.courses= data ; 
	
	
	
	}) ; 
	
	

})
.controller('testListCtrl', function($scope,$rootScope , Tests,$http, $state,$stateParams) {
	
	  var courseid = 4 ; 
	  
	
            // get the id
            $scope.courseid = $stateParams.courseid;
			console.log( " got course id " + $stateParams.courseid) ; 
			
			
			
	Tests.execute( $scope.courseid ).then(function (data) { 
	console.log( "got data " +data )  ; 
	$scope.tests= data ; 
	
	
	
	}) ; 
	
	

})


   
.controller('orderDetailsCtrl', function($scope,$rootScope , Schools, SaveOrder , $http, $state,$stateParams ) {
console.log( " in orderDetails") ; 
$scope.errorMessage = "All data on this form is mandatory" ; 
$scope.states = [ 
	
	{
		id: "MH",
		state:"Maharashtra"
	},
	{
		id: "AP",
		state:"Andhra Pradesh"
	},
	{
		id: "AR",
		state:"Arunachal Pradesh"
	},
	{
		id: "AS",
		state:"Assam"
	},
	{
		id: "BR",
		state:"Bihar"
	},
	{
		id: "CG",
		state:"Chattisgarh"
	},
	{
		id: "DN",
		state:"Dadra Nagar and Haveli"
	},
	{
		id: "GA",
		state:"GOA"
	},
	{
		id: "GJ",
		state:"Gujrat"
	},
	{	id: "HR",
		state:"Haryana"
	},
	{   id: "HP",
		state:"Himachal Pradesh"
	},
	{   id: "JK",
		state:"Jammu and Kashmir"
	},
	{ 	id: "JH",
		state:"Jharkhand"
	},
	{   id: "KA",
		state:"Karnataka"
	},
	{
		id: "KL",
		state:"Kerala"
	},
	{	id: "MP",
		state:"Madhya Pradesh"
	},
	{   id: "MN",
		state:"Manipur"
	},
	{   id: "ML",
		state:"Meghalaya"
	},
	{   id: "MZ",
		state:"Mizoram"
	},
	{   id: "NL",
		state:"Nagaland"
	},
	{   id: "OR",
		state:"ORISSA"
	},
	{   id: "PB",
		state:"Punjab"
	},
	{
		id: "PY",
		state:"Pondecherry"
	},
	{   id: "RJ",
		state:"Rajashtan"
	},
	{   id: "SK",
		state:"Sikkim"
	},
	{   id: "TN",
		state:"Tamilnadu"
	},
	{   id: "TR",
		state:"Tripura"
	},
	{   id: "UP",
		state:"Uttar Pradesh"
	},
	{   id: "WB",
		state:"West Bengal"
	} 
	
	] ; 
 
$scope.orderData = [] ; 
$scope.orderData.studentname = "" ; 
$scope.orderData.school_name = "" ; 
$scope.orderData.birthDate = "" ; 
$scope.orderData.medium = "" ; 
$scope.orderData.gender = "" ; 


$scope.username = "sandra" ; 
$scope.email = "dravidsa@hotmail.com" ; 



$scope.test_var = -1234 ; 
 prodid = $stateParams.prodid;
  $scope.prodname = $stateParams.prodname;
			console.log( " got prod id " + $stateParams.prodid) ; 
			 $scope.price = $stateParams.price;
			 
			 $scope.orderData.prodname = $scope.prodname ; 
			 $scope.orderData.orderAmount = $scope.price ; 
			 //$scope.orderData.username = $scope.username ; 
			 //$scope.orderData.email = $scope.email ; 
			
			
console.log( " and name is " + $stateParams.prodname ) ; 

if ( prodid == "") { 
console.log( "came from school list " + $rootScope.orderData) ; 
$scope.orderData = $rootScope.orderData ; 
}
else { 
			if (( prodid == 1) || ( prodid == 3 )) 
			{ $scope.shipping = true ;  console.log( "shipping is needed ") ; } 
			else  { $scope.shipping = false ;   console.log( "shipping is  not needed ") ; } 
} 
	
	$scope.showSchools = function (order ) {
	console.log("in show schools for " + order.school_name); 
	$rootScope.orderData = order ; 
	//$scope.school_name = school_name;    
	//console.log( "gender " + $scope.orderData.gender  + "medium " + $scope.orderData.medium + "name" + $scope.orderData.prodname + " price" + $scope.orderData.price  +  "school" + $scope.orderData.school_name	) ; 
	Schools.execute( order.school_name ).then(function (data) { 

	$scope.schools= data;
		
	$rootScope.schools = data ; 
	 console.log( "got data for records " + $scope.schools.length   )  ; 
	 
	 //$rootScope.orderData = $scope.orderData ; 
	 
	 console.log( "setting rootscope " ) ; 
	$state.go('schoolList'); 
	
	
	
	}) ; 
	};
	
	$scope.saveOrder  = function(  orderData ){
	console.log( "order data is " + $scope.prodname + "studentname " + orderData +"Scope order " ) ; 
	orderData.IPMOrderNo = "160000123" ; 
	orderData.orderStatus = "Pending" ; 
	 
	$rootScope.orderData  = $scope.orderData ; 
	 var check = false ; 
	check = $scope.validateData(orderData) ; 
	if ( !check ) {  console.log( "not going ahread" ) ; return ; }
	
	
	$state.go("payment") ; 
	/*
	SaveOrder.execute( orderData ).then(function (data) { 

	console.log( " save order is " + data ) ; 
	}) ; 
	
	*/
	
	; 
		
		
	}
	
	$scope.validateData = function( orderData ){
	$scope.errorMessage  = ""; 
    var product = $scope.prodname ; 
	if (( product == "IPM 2017 Exam Enrollment ") || ( product == "Supreme") || ( product == "Elearning"))
	{
		if ( ( orderData.studentname =="" ) || ( orderData.school_name == "" ) || ( orderData.birthDate == "" ) || ( orderData.gender ="" ) || ( orderData.medium == "" ))
		{
			$scope.errorMessage = " All Student Details are mandatory for this product " ; 
			console.log( "incomdplete data ")  ; 
			
			return false ; 
			
		}
		
	}
		
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
			
})

.controller('schoolListCtrl', function($scope , $rootScope,$http , $state) {
$scope.schools = $rootScope.schools ; 
console.log( " in schoolListCtrl" + $scope.schools ); 
//console.log( " school contains "+ $scope.schools.length+"records") ; 
$scope.setSchool = function (school_name ){
	
	$rootScope.school_name  = school_name ;
	console.log("setting school name to " + school_name ) ; 
	$state.go("orderDetails"); 
	
	
	
}

})
   
.controller('paymentCtrl', function($scope , $rootScope, $http, EBSPay) {
	
	$scope.paymentData = {} ; 
	console.log( "order is " + $rootScope.orderData.IPMOrderNo + " status is " + $rootScope.orderData.orderStatus) ; 
	$scope.IPMOrderNo = $rootScope.orderData.IPMOrderNo ; 
	$scope.orderStatus = $rootScope.orderData.orderStatus ; 
	$scope.prodname = $rootScope.orderData.prodname  ; 
	$scope.orderAmount = $rootScope.orderData.orderAmount ; 
	$scope.orderAmount= $rootScope.orderData.orderAmount ;  
	$scope.username = $rootScope.orderData.username ; 
	$scope.email = $rootScope.orderData.email ; 
	
	
	
	$scope.makePayment  = function(  paymentData) {
	console.log( "payment data is " + paymentData) ; 
	EBSPay.execute( paymentData ).then(function (data) { 
console.log( " save order is " + data ) ; 
	
	});
	
		
	
	}

})   
   
.controller('homeCtrl', function($scope , $http, Courses) {

})
   
.controller('solveTestCtrl', function($scope) {

})
   
.controller('testSummaryCtrl', function($scope) {

})
   
.controller('productDetailsCtrl', function($scope) {

})
 