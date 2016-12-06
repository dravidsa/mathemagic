angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('home', {
    url: '/home',
    templateUrl: 'templates/mathemagic.html',
   controller: 'homeCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup2', {
    url: '/page11',
    templateUrl: 'templates/signup2.html',
    controller: 'signup2Ctrl'
  })

  .state('login2', {
    url: '/login',
    templateUrl: 'templates/login2.html',
    controller: 'login2Ctrl'
  })

  .state('products', {
    url: '/products',
    
        templateUrl: 'templates/iPMProducts.html',
        controller: 'productsCtrl'
     
  })
  .state('buy', {
    url: '/buy',
    templateUrl: 'templates/buy.html',
    controller: 'studentCtrl'
  })

 .state('payment', {
    url: '/payment',
    templateUrl: 'templates/online_payment.html',
    controller: 'paymentCtrl'
  })

  .state('learning', {
    url: '/learning',
      templateUrl: 'templates/learning.html',
        controller: 'learningCtrl'
     
   
  })

  .state('mathemagic.studentServices', {
    url: '/services',
    views: {
      'tab3': {
        templateUrl: 'templates/studentServices.html',
        controller: 'studentServicesCtrl'
      }
    }
  })

  .state('mathemagic.iPMHome', {
    url: '/',
    views: {
      'tab4': {
        templateUrl: 'templates/iPMHome.html',
        controller: 'iPMHomeCtrl'
      }
    }
  })

  .state('solveTest', {
    url: '/test/:quizid/:currentQuestion',
    
        templateUrl: 'templates/solveTest.html',
        controller: 'solveTestCtrl'
     
  })
   .state('testList', {
    url: '/testList/:courseid',
        templateUrl: 'templates/testList.html',
        controller: 'testListCtrl'
    
  })



  .state('orderDetails', {
    url: '/orderDetails/:prodid/:prodname/:price',
	cache: false,
           templateUrl: 'templates/orderDetails.html',
        controller: 'orderDetailsCtrl'

  })
  .state('schoolList', {
    url: '/schoolList',
	cache: false,
           templateUrl: 'templates/schoolList.html',
        controller: 'schoolListCtrl'

  })
  
    .state('summary', {
    url: '/testSummary',
        templateUrl: 'templates/testSummary.html',
        controller: 'summaryCtrl'
   
  })
  
   .state('results', {
    url: '/testResults',
   
        templateUrl: 'templates/testResults.html',
        controller: 'resultsCtrl'
      
  })

$urlRouterProvider.otherwise('home')

//$urlRouterProvider.otherwise('//')

  

});