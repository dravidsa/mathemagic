angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
  
   .state('tab', {
 url: "/tab",
 abstract: true,
 templateUrl: "templates/tabs.html"
 })
 
 .state('tab.home', {
    url: '/home',
		  cache: false,
	   views: {
 'tab-home': {
    templateUrl: 'templates/mathemagic.html',
   controller: 'homeCtrl'
		}
	   }
  })

  .state('profile', {
    url: '/profile',
		  cache: false,
    templateUrl: 'templates/profile.html',
   controller: 'profileCtrl'
		
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

   .state('logout', {
    url: '/logout',
    templateUrl: 'templates/logout.html',
    controller: 'LogoutCtrl'
  })
  
  .state('register', {
    url: '/register',
    templateUrl: 'templates/register.html',
    controller: 'RegisterCtrl'
  })


  .state('tab.products', {
	    url: '/products',
			  cache: false,
	   views: {
 'tab-products': {
        templateUrl: 'templates/iPMProducts.html',
        controller: 'productsCtrl'
		}
	   }
	   
  })
  .state('tab.buy', {
	  url: '/buy',
	    cache: false,
	   views: {
 'tab-buy': {
    
    templateUrl: 'templates/buy.html',
    controller: 'studentCtrl'
		}
	   }
	   
  })

 .state('payment', {
    url: '/payment',
    templateUrl: 'templates/online_payment.html',
    controller: 'paymentCtrl'
  })

  .state('tab.learning', {
	  url: '/learning',
	  cache: false,
	   views: {
 'tab-learning': {
	      templateUrl: 'templates/learning.html',
        controller: 'learningCtrl'
		} 
	   } 
	   
   
  })

  .state('tab.services', {
    url: '/services',
	cache: false,
    views: {
      'tab-services': {
        templateUrl: 'templates/studentServices.html',
        controller: 'studentServicesCtrl'
      }
    }
  })
  
   .state('tab.orders', {
    url: '/orders',
	cache: false,
    views: {
      'tab-services': {
        templateUrl: 'templates/myOrders.html',
        controller: 'ordersCtrl'
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

  .state('tab.solveTest', {
    url: '/test/:quizid/:currentQuestion/:quizName/:mode',
	  cache: false,
	 views: {
 'tab-learning': {
    
        templateUrl: 'templates/solveTest.html',
        controller: 'solveTestCtrl'
		}
	 }
  })
   .state('tab.testList', {
	       url: '/testList/:courseid',
		     cache: false,
	
	   views: {
 'tab-learning': {
        templateUrl: 'templates/testList.html',
        controller: 'testListCtrl'
			}
	   }
	   
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
	  cache: false,
        templateUrl: 'templates/testSummary.html',
        controller: 'summaryCtrl'
   
  })
  
   .state('results', {
    url: '/testResults',
	  cache: false,
   
        templateUrl: 'templates/testResults.html',
        controller: 'resultsCtrl'
      
  })

$urlRouterProvider.otherwise('/tab/home')

//$urlRouterProvider.otherwise('//')

  

});