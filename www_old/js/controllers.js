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
	Quiz.execute( $scope.quizid  ).then(function (data) { 
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
$state.go('mathemagic.summary'); 

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
$state.go('mathemagic.results'); 

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
	$state.go("mathemagic.solveTest"); 
	
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

		
.controller('signupCtrl', function($scope) {

})

.controller('reviewCtrl', function($scope) {
	console.log( " in review") ; 
	$scope.quiz = $rootScope.quiz ; 
	
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
})
   
.controller('loginCtrl', function($scope) {

})
   
.controller('signup2Ctrl', function($scope) {

})
   
.controller('login2Ctrl', function($scope) {

})
   
.controller('iPMProductsCtrl', function($scope) {

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


   
.controller('studentServicesCtrl', function($scope) {

})
   
.controller('iPMHomeCtrl', function($scope , http, Courses) {

})
   
.controller('solveTestCtrl', function($scope) {

})
   
.controller('testSummaryCtrl', function($scope) {

})
   
.controller('productDetailsCtrl', function($scope) {

})
 