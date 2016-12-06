angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('mathemagic', {
    url: '/',
    templateUrl: 'templates/mathemagic.html',
    abstract:true
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('login', {
    url: '/page10',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
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

  .state('mathemagic.iPMProducts', {
    url: '/products',
    views: {
      'tab1': {
        templateUrl: 'templates/iPMProducts.html',
        controller: 'iPMProductsCtrl'
      }
    }
  })

  .state('mathemagic.learning', {
    url: '/learning',
    views: {
      'tab2': {
        templateUrl: 'templates/learning.html',
        controller: 'learningCtrl'
      }
    }
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
    url: '/home',
    views: {
      'tab4': {
        templateUrl: 'templates/iPMHome.html',
        controller: 'iPMHomeCtrl'
      }
    }
  })

  .state('mathemagic.solveTest', {
    url: '/test/:quizid/:currentQuestion',
    views: {
      'tab2': {
        templateUrl: 'templates/solveTest.html',
        controller: 'solveTestCtrl'
      }
    }
  })
   .state('mathemagic.testList', {
    url: '/testList/:courseid',
    views: {
      'tab2': {
        templateUrl: 'templates/testList.html',
        controller: 'testListCtrl'
      }
    }
  })

  .state('mathemagic.testSummary', {
    url: '/summary',
    views: {
      'tab2': {
        templateUrl: 'templates/testSummary.html',
        controller: 'testSummaryCtrl'
      }
    }
  })

  .state('mathemagic.productDetails', {
    url: '/prodDetaills',
    views: {
      'tab1': {
        templateUrl: 'templates/productDetails.html',
        controller: 'productDetailsCtrl'
      }
    }
  })
  
    .state('mathemagic.summary', {
    url: '/testSummary',
    views: {
      'tab1': {
        templateUrl: 'templates/testSummary.html',
        controller: 'summaryCtrl'
      }
    }
  })
  
   .state('mathemagic.results', {
    url: '/testResults',
    views: {
      'tab1': {
        templateUrl: 'templates/testResults.html',
        controller: 'resultsCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/mathemagic')

  

});