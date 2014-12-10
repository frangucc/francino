if (device.desktop()) {
  window.Franchino = angular.module('Franchino', ['ngSanitize', 'ui.router', 'btford.socket-io', 'tap.controllers', 'tap.directives']);
} else {
  window.Franchino = angular.module("Franchino", ["ionic", "btford.socket-io", "tap.controllers", 'tap.directives']).run(function($ionicPlatform) {
    return $ionicPlatform.ready(function() {
      if (window.StatusBar) {
        return StatusBar.styleDefault();
      }
    });
  });
}

Franchino.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    controller: 'AppCtrl',
    templateUrl: 'menu.html'
  }).state('app.home', {
    url: '/',
    views: {
      menuContent: {
        controller: 'HomeCtrl',
        templateUrl: 'home.html'
      }
    }
  }).state('app.docs', {
    url: '/docs',
    views: {
      menuContent: {
        controller: 'DocsCtrl',
        templateUrl: 'docs/index.html'
      }
    }
  }).state('app.about', {
    url: '/about',
    views: {
      menuContent: {
        controller: 'AboutCtrl',
        templateUrl: 'about.html'
      }
    }
  }).state('app.blog', {
    url: '/blog',
    views: {
      menuContent: {
        controller: 'BlogCtrl',
        templateUrl: 'blog.html'
      }
    }
  }).state('app.resume', {
    url: '/resume',
    views: {
      menuContent: {
        controller: 'ResumeCtrl',
        templateUrl: 'resume.html'
      }
    }
  }).state('app.contact', {
    url: '/contact',
    views: {
      menuContent: {
        controller: 'ContactCtrl',
        templateUrl: 'contact.html'
      }
    }
  }).state('app.doc', {
    url: '/docs/:permalink',
    views: {
      menuContent: {
        controller: 'DocCtrl',
        templateUrl: 'docs/show.html'
      }
    }
  }).state('app.step', {
    url: '/docs/:permalink/:step',
    views: {
      menuContent: {
        controller: 'DocCtrl',
        templateUrl: 'docs/show.html'
      }
    }
  }).state('app.job-tapcentive', {
    url: '/job-tapcentive',
    views: {
      menuContent: {
        controller: 'JobTapcentiveCtrl',
        templateUrl: 'job-tapcentive.html'
      }
    }
  }).state('app.job-tapcentive-two', {
    url: '/job-tapcentive-two',
    views: {
      menuContent: {
        controller: 'JobTapcentiveTwoCtrl',
        templateUrl: 'job-tapcentive-two.html'
      }
    }
  }).state('app.job-cpgio', {
    url: '/job-cpgio',
    views: {
      menuContent: {
        controller: 'JobCpgioCtrl',
        templateUrl: 'job-cpgio.html'
      }
    }
  }).state('app.job-medycation', {
    url: '/job-medycation',
    views: {
      menuContent: {
        controller: 'JobMedycationCtrl',
        templateUrl: 'job-medycation.html'
      }
    }
  }).state('app.job-cst', {
    url: '/job-cst',
    views: {
      menuContent: {
        controller: 'JobCstCtrl',
        templateUrl: 'job-cst.html'
      }
    }
  }).state('app.job-koupn', {
    url: '/job-koupn',
    views: {
      menuContent: {
        controller: 'JobKoupnCtrl',
        templateUrl: 'job-koupn.html'
      }
    }
  }).state('app.job-tround', {
    url: '/job-tround',
    views: {
      menuContent: {
        controller: 'JobTroundCtrl',
        templateUrl: 'job-tround.html'
      }
    }
  }).state('app.job-monthlys', {
    url: '/job-monthlys',
    views: {
      menuContent: {
        controller: 'JobMonthlysCtrl',
        templateUrl: 'job-monthlys.html'
      }
    }
  }).state('app.job-monthlys-two', {
    url: '/job-monthlys-two',
    views: {
      menuContent: {
        controller: 'JobMonthlysTwoCtrl',
        templateUrl: 'job-monthlys-two.html'
      }
    }
  }).state('app.job-benchprep', {
    url: '/job-benchprep',
    views: {
      menuContent: {
        controller: 'JobBenchprepCtrl',
        templateUrl: 'job-benchprep.html'
      }
    }
  });
  $urlRouterProvider.otherwise("/");
  return $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        var type;
        if (config.url.match(/\.html$/) && !config.url.match(/^shared\//)) {
          if (device.tablet()) {
            type = 'tablet';
          } else if (device.mobile()) {
            type = 'mobile';
          } else {
            type = 'desktop';
          }
          config.url = "/" + type + "/" + config.url;
        }
        return config;
      }
    };
  });
});

Franchino.run(function($state) {
  return $state.go('app.home');
});

Franchino.run(function($rootScope, copy) {
  return $rootScope.copy = copy;
});

Franchino.factory('Socket', function(socketFactory) {
  return socketFactory();
});

Franchino.factory('Docs', function(Socket) {
  var service;
  service = {
    list: [],
    find: function(permalink) {
      return _.find(service.list, function(doc) {
        return doc.permalink === permalink;
      });
    }
  };
  Socket.on('docs', function(docs) {
    return service.list = docs;
  });
  return service;
});

Franchino.controller('HomeCtrl', function($scope) {});

Franchino.controller('ContactSheetCtrl', function($scope, $ionicActionSheet) {
  $scope.showActionsheet = function() {
    return $ionicActionSheet.show({
      titleText: "Contact Franchino",
      buttons: [
        {
          text: "Github <i class=\"icon ion-share\"></i>"
        }, {
          text: "Email Me <i class=\"icon ion-email\"></i>"
        }, {
          text: "Twitter <i class=\"icon ion-social-twitter\"></i>"
        }, {
          text: "224-241-9189 <i class=\"icon ion-ios-telephone\"></i>"
        }
      ],
      cancelText: "Cancel",
      cancel: function() {
        console.log("CANCELLED");
      },
      buttonClicked: function(index) {
        if (index === 2) {
          window.location.href = "224-241-9189";
        }
        if (index === 2) {
          window.location.href = "http://twitter.com/franchino_che";
        }
        if (index === 1) {
          window.location.href = "mailto:franchino.nonce@gmail.com";
        }
        if (index === 0) {
          window.location.href = "http://github.com/frangucc";
        }
        return true;
      }
    });
  };
});

Franchino.controller("SlidesTapOneCtrl", function($scope) {
  $scope.date = 'NOVEMBER 2014';
  $scope.title = 'Tapcentive manager UX overhaul and front-end';
  return $scope.images = [
    {
      "alt": "Tapcentive.com UX overhaul and SPA front-end",
      "url": "/img/gif/report.gif",
      "text": "<p>Study the user and their goals and overhaul the experience while re-writing the front-end in Angular.</p><a href='http://tapcentive.com' target='_blank'>Visit Website</a>"
    }
  ];
});

Franchino.controller("SlidesTapTwoCtrl", function($scope) {
  $scope.date = 'OCTOBER 2014';
  $scope.title = 'Desktop and mobile web friendly marketing website';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-tapcentive-yellow.jpg",
      "text": "<p>Create a knockout brand strategy with an awesome look and feel. Make a sophisticated offering look simple and easy to use.</p><a href='http://tapcentive.com' target='_blank'>Visit Website</a>"
    }
  ];
});

Franchino.controller("SlidesCpgCtrl", function($scope) {
  $scope.date = 'JULY 2014';
  $scope.title = 'Identity, full-stack MVP, and marketing website for a new CPG eDistribution company';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/francino_cpgio.jpg",
      "text": "<p>Turn an old school CPG business into a sophisticated technology company. Design secure, automated and transformative platform, technical architecture and execute an MVP enough to aquire first customers. Mission accomplished.</p><a href='http://cpg.io' target='_blank'>Visit Website</a>"
    }
  ];
});

Franchino.controller("SlidesMedycationCtrl", function($scope) {
  $scope.date = 'APRIL 2014';
  $scope.title = 'User experience design and rapid prototyping for Medycation, a new healthcare price comparison website';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-medycation.jpg",
      "text": "<p>Waltz up in the online healthcare industry guns blazing with killer design and instincts. Get this new company off the ground with it's MVP. Swipe for more views.</p><a href='http://medycation.com' target='_blank'>Visit Website</a>"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-medycation2.jpg",
      "text": ""
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-medycation3.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-medycation4.jpg"
    }
  ];
});

Franchino.controller("SlidesCSTCtrl", function($scope) {
  $scope.date = 'APRIL 2014';
  $scope.title = 'Designed and developed a new version of the Chicago Sun Times using a hybrid Ionic/Angular stack';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-cst.jpg",
      "text": "<p>Help the struggling media giant upgrade their consumer facing technology. Create one code base in Angular capable of generating kick-ass experiences for mobile, tablet, web and TV."
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-cst2.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-cst3.jpg"
    }
  ];
});

Franchino.controller("SlidesKoupnCtrl", function($scope) {
  $scope.date = 'MARCH 2014';
  $scope.title = 'Brand refresh, marketing site and platform experience overhaul';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-koupn1.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-koupn2.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-koupn.jpg"
    }
  ];
});

Franchino.controller("SlidesTroundCtrl", function($scope) {
  $scope.date = 'AUGUST 2013';
  $scope.title = 'Social travel mobile app design, UX and rapid prototyping';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/francino_tround.jpg",
      "text": "Design an Instagram based social travel app. Why? I don't know."
    }
  ];
});

Franchino.controller("SlidesMonthlysCtrl", function($scope) {
  $scope.date = 'FEBRUARY 2013';
  $scope.title = 'Customer portal platform UX design and front-end';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-monthlys-biz2.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino_monthlys.jpg"
    }
  ];
});

Franchino.controller("SlidesMonthlysTwoCtrl", function($scope) {
  $scope.date = 'MARCH 2012';
  $scope.title = 'Entrepreneur in residence at Lightbank';
  return $scope.images = [
    {
      "alt": "Some alt text",
      "url": "/img/franchino-monthlys7.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-monthlys5.jpg"
    }, {
      "alt": "Some alt text",
      "url": "/img/franchino-monthlys2.jpg"
    }
  ];
});

Franchino.controller('AboutCtrl', function($scope) {});

Franchino.controller('AppCtrl', function($scope) {});

Franchino.controller('ResumeCtrl', function($scope) {
  return $scope.blob = '<div class="row"><div class="large-12"><div class="row"><div class="large-12 columns"><h6>NOV 2013 - PRESENT</h6><br/><h2>Hybrid Experience Designer/Developer, Independent</h2><br/><p>Worked with noteable entreprenours on several new product and business launches. Held numerous roles, including content strategist, user researcher, designer and developer. </p><p><strong>Companies</strong></p><ul class="no"><li><a href="http://tapcentive.com" target="_blank">Tapcentive</a></li><li><a href="http://cpg.io" target="_blank">CPGio</a></li><li><a href="http://kou.pn/">Kou.pn Media</a></li><li> <a href="http://medycation.com" target="_blank">Medycation</a></li><li> <a href="http://www.suntimes.com/" target="_blank">Chicago Sun Times</a></li></ul><br/><p><strong>Tapcentive Deliverables</strong></p><ul class="bullets"><li>Complete Tapcentive.com marketing website and UX overhaul of core product, the "Tapcentive Manager"</li><li>Industrial design of the Tapcentive Touchpoint</li><li>Content strategy for corporate marketing site</li><li>Mobile first marketing website using Ionic and Angular</li></ul><p><strong>CPGio Deliverables</strong></p><ul class="bullets"><li>Product and business strategy, technical architecture and specification design</li><li>One hundred page proposal template on business model and corporate capabilities</li><li>Marketing website design and content strategy</li><li>Core product design and MVP functional prototype</li></ul><p><strong>Kou.pn Deliverables</strong></p><ul class="bullets"><li>Kou.pn Media brand refresh</li><li>Marketing site redesign</li><li>Portal user experience overhaul</li></ul><p><strong>Medycation Deliverables</strong></p><ul class="bullets"><li>Conceptual design and art direction</li><li>User research</li><li>Rapid prototypes</li></ul><p><strong>Chicago Sun Times</strong></p><ul class="bullets"><li>Conceptual design and art direction</li><li>Native iOS and Android app design and junior development</li><li>Hybrid Ionic/Angular development</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>MARCH 2010 - OCTOBER 2013</h6><br/><h2>Director of User Experience, Lightbank</h2><br/><p>Launched and supported multiple new companies within the Lightbank portfolio. </p><p><strong>Companies</strong></p><ul class="no"><li> <a href="http://chicagoideas.com" target="_blank">ChicagoIdeas.com</a></li><li> <a href="http://benchprep.com" target="_blank">BenchPrep.com</a></li><li> <a href="http://snapsheetapp.com" target="_blank">SnapSheetApp.com</a></li><li>Monthlys.com (defunct)</li><li> <a href="http://dough.com" target="_blank">Dough.com</a></li><li> <a href="http://groupon.com" target="_blank">Groupon.com</a></li></ul><br/><p><strong>Chicago Ideas Deliverables</strong></p><ul class="bullets"><li>Website design refresh, art direction</li><li>Custom ticket purchasing platform UX research &amp; design</li><li>Ruby on Rails development, maintenence</li><li>Graphic design support</li><li>Annual report design</li></ul><p><strong>BenchPrep.com Deliverables</strong></p><ul class="bullets"><li>Re-branding, complete BenchPrep identity package</li><li>Supported company with all design and ux from zero to eight million in financing</li><li>Lead art and UX direction for two years</li><li>Front-end using Backbone and Bootstrap</li><li>User research, ethnographic studies, user testing</li><li>Email marketing cadence system design and execution</li><li>Scripted, storyboarded and executed both animated and live motion explainer videos</li></ul><p><strong>SnapSheetApp.com Deliverables</strong></p><ul class="bullets"><li>Large scale portal UX research and information architecture</li><li>Three rounds of rapid prototyping and user testing</li><li>Graphic design and interaction design framework</li><li>User testing</li></ul><p><strong>Monthlys.com Deliverables</strong></p><ul class="bullets"><li>Identity and art direction</li><li>Product strategy and new company launch</li><li>Online marketing strategy, including transactional email, promotion design and lead generation</li><li>Product experience design and front-end</li><li>Content strategy</li><li>Scripted, storyboarded and executed both animated and live motion explainer videos</li></ul><p><strong>Dough.com Deliverables</strong></p><ul class="bullets bullets"><li>Consumer journey mapping and ethnographic studies</li><li>Rapid prototyping, conceptual design</li><li>Messaging strategy, user testing</li></ul><p><strong>Groupon.com Deliverables</strong></p><ul class="bullets"><li>Emerging markets research</li><li>Rapid design and prototyping</li><li>Visual design on new concepts</li><li>Email segmentation research</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>NOVEMBER 2007 - APRIL 2010</h6><br/><h2>Developer &amp; Co-founder, Dillyeo.com</h2><br/><p>Co-founded, designed and developed a daily deal eCommerce website.</p><p><strong>Role</strong><br/>Designed, developed and launched companies first cart with PHP. Iterated and grew site to more than two hundred and fifty thousand subscribers in less than one year. </p><p><strong>Noteable Stats</strong></p><ul class="bullets"><li>Built a list of 250,000 subscribers in the first year</li><li>Pivoted and tweaked design, business and approach to 1000 transactions per daily</li><li>Sold business in December 2009 to Innovative Commerce Solutions</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>MARCH 2005 - OCTOBER 2007</h6><br/><h2>Solutions Architect &amp; Senior Developer, <a href="http://www.manifestdigital.com/">Manifest Digital</a></h2><br/><p>Built and managed multiple CareerBuilder.com niche sites for the largest independent agency in the midwest.</p><p><strong>Role</strong><br/>Research and explore emerging technologies, implement solutions and manage other developers. Worked with asp.net on a daily basis for almost two years. </p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Recognized for launching high quality web app for Career Builder in record time</li><li>Managed extreme SEO project with more than 500 thousand links, pages and over 8 million UGC artifacts</li><li>Shifted agencies development practices to various new client-centric AJAX methodologies</li><li>Managed multiple projects concurrently, including choosechicago.com and briefing.com</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>APRIL 2004 - JANUARY 2007</h6><br/><h2>Junior PLD Developer,  <a href="http://www.manifestdigital.com/">Avenue</a></h2><br/><p>Front-end developer and UX design intern for Avenue A Razorfishs\' legacy company, Avenue-inc.</p><p><strong>Role</strong><br/>Develop front-end for multiple client websites, including flor.com, achievement.org, canyonranch.com and turbochef.</p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Executed front-end projects on-time and under-budget</li><li>Assigned UX internship role, recognized by design team as a young talent</li><li>Wireframed custom shopping cart platform for flor.com</li><li>Developed internal SEO practice</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>JULY 2000 - JANUARY 2004</h6><br/><h2>eCommerce Developer, Atova</h2><br/><p>General web designer and developer for family owned paint distribution business. </p><p><strong>Role</strong><br/>Built several shopping carts in classic ASP and PHP. Grew business using online marketing strategies to two million in revenue. </p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Became first company to ship paints and coatings across the United States</li><li>First employee, developed company to 2+ million in revenue with Overture, Google Adwords and SEO</li><li>Created, marketed and subscribed vocational school for specialty coatings</li><li>Worked with top Italian paint manufacturers overseas to build exclusive distribution rights</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>SEPTEMBER 2000 - MAY 2002</h6><br/><h2>Education</h2><br/><p>Self educated designer/programmer with vocational training. </p><p><strong>Certifications</strong><br/>iNET+, A+ Certification </p><p><strong>Apprenticeship</strong><br/>Year long personal apprenticeship with first engineer at Amazon.com</p></div></div></div></div><br/><br/>';
});

Franchino.controller('JobTapcentiveCtrl', function($scope) {});

Franchino.controller('JobTapcentiveTwoCtrl', function($scope) {});

Franchino.controller('JobCpgioCtrl', function($scope) {});

Franchino.controller('JobMedycationCtrl', function($scope) {});

Franchino.controller('JobCstCtrl', function($scope) {});

Franchino.controller('JobKoupnCtrl', function($scope) {});

Franchino.controller('JobMedycationCtrl', function($scope) {});

Franchino.controller('JobMedycationCtrl', function($scope) {});

Franchino.controller('JobTroundCtrl', function($scope) {});

Franchino.controller('JobMonthlysOneCtrl', function($scope) {});

Franchino.controller('JobMonthlysTwoCtrl', function($scope) {});

Franchino.controller('JobBenchprepCtrl', function($scope) {});

Franchino.controller('ContactCtrl', function($scope) {});

Franchino.controller('DevelopersCtrl', function($scope) {});

Franchino.controller('DeveloperCenterCtrl', function($scope) {});

Franchino.controller('DocsCtrl', function($scope, Docs) {
  return $scope.$watch((function() {
    return Docs.list;
  }), function() {
    return $scope.docs = Docs.list;
  });
});

Franchino.controller('DocCtrl', function($scope, $sce, $stateParams, $timeout, Docs) {
  $scope.index = $stateParams.step ? $stateParams.step - 1 : 0;
  $scope.$watch((function() {
    return Docs.list;
  }), function() {
    $scope.doc = Docs.find($stateParams.permalink);
    if ($scope.doc) {
      $scope.step = $scope.doc.steps[$scope.index];
      $scope.step.url = $sce.trustAsResourceUrl($scope.step.url);
      if ($scope.step.type === 'dialog') {
        $scope.messageIndex = 0;
        $scope.messages = [];
        return $timeout($scope.nextMessage, 1000);
      }
    }
  });
  return $scope.hasMoreSteps = function() {
    if ($scope.step) {
      return $scope.step.index < $scope.doc.steps.length;
    }
  };
});

Franchino.directive('mySlideshow', function() {
  return {
    restrict: 'AC',
    link: function(scope, element, attrs) {
      var config;
      config = angular.extend({
        slides: '.slide'
      }, scope.$eval(attrs.mySlideshow));
      return setTimeout((function() {
        return $(element).cycle(function() {
          return {
            fx: 'fade',
            speed: 'fast',
            next: '#next2',
            prev: '#prev2',
            caption: '#alt-caption',
            caption_template: '{{images.alt}}',
            pause_on_hover: 'true'
          };
        });
      }), 0);
    }
  };
});

angular.module("tap.controllers", []);

angular.module("tap.directives", []).directive("device", function() {
  return {
    restrict: "A",
    link: function() {
      return device.init();
    }
  };
}).service('copy', function($sce) {
  var copy, trustValues;
  copy = {
    about: {
      heading: "We're <strong>tapping</strong> into the future",
      sub_heading: "Tapcentive was created by a team that has lived the mobile commerce revolution from the earliest days of mCommerce with WAP, to leading the charge in mobile payments and services with NFC worldwide.",
      copy: "<p>For us, mobile commerce has always been about much more than payment:  marketing, promotions, product content, and loyalty, all come to life inside a mobile phone. Mobile commerce really gets interesting when it bridges the digital and physical worlds.</p><p>Our goal at Tapcentive is to create a state-of-the-art mobile engagement platform that enables marketers and developers to create entirely new customer experiences in physical locations – all with a minimum amount of technology development.</p><p>We think you’ll like what we’ve built so far. And just as mobile technology is constantly evolving, so is the Tapcentive platform. Give it a test drive today.</p>"
    },
    team: {
      heading: "",
      bios: {
        dave_role: "",
        dave_copy: ""
      }
    }
  };
  trustValues = function(values) {
    return _.each(values, function(val, key) {
      switch (typeof val) {
        case 'string':
          return $sce.trustAsHtml(val);
        case 'object':
          return trustValues(val);
      }
    });
  };
  trustValues(copy);
  return copy;
});

var $, cssId, head, link;

if (device.desktop()) {

} else if (device.mobile()) {
  $ = document;
  cssId = 'myCss';
  if (!$.getElementById(cssId)) {
    head = $.getElementsByTagName('head')[0];
    link = $.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
    link.media = 'all';
    head.appendChild(link);
  }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJjb250cm9sbGVycy5jb2ZmZWUiLCJkaXJlY3RpdmVzLmNvZmZlZSIsImluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFIO0FBQ0UsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixPQUFPLENBQUMsTUFBUixDQUFlLFdBQWYsRUFBNEIsQ0FBQyxZQUFELEVBQWUsV0FBZixFQUE0QixrQkFBNUIsRUFBZ0QsaUJBQWhELEVBQW1FLGdCQUFuRSxDQUE1QixDQUFuQixDQURGO0NBQUEsTUFBQTtBQUlFLEVBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUIsT0FBTyxDQUFDLE1BQVIsQ0FBZSxXQUFmLEVBQTRCLENBQUUsT0FBRixFQUFXLGtCQUFYLEVBQStCLGlCQUEvQixFQUFrRCxnQkFBbEQsQ0FBNUIsQ0FDakIsQ0FBQyxHQURnQixDQUNaLFNBQUMsY0FBRCxHQUFBO1dBQ0gsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsU0FBQSxHQUFBO0FBQ25CLE1BQUEsSUFBNEIsTUFBTSxDQUFDLFNBQW5DO2VBQUEsU0FBUyxDQUFDLFlBQVYsQ0FBQSxFQUFBO09BRG1CO0lBQUEsQ0FBckIsRUFERztFQUFBLENBRFksQ0FBbkIsQ0FKRjtDQUFBOztBQUFBLFNBU1MsQ0FBQyxNQUFWLENBQWlCLFNBQUMsY0FBRCxFQUFpQixrQkFBakIsRUFBcUMsaUJBQXJDLEVBQXdELGFBQXhELEdBQUE7QUFDZixFQUFBLGNBQ0UsQ0FBQyxLQURILENBQ1MsS0FEVCxFQUVJO0FBQUEsSUFBQSxHQUFBLEVBQUssRUFBTDtBQUFBLElBQ0EsUUFBQSxFQUFVLElBRFY7QUFBQSxJQUVBLFVBQUEsRUFBWSxTQUZaO0FBQUEsSUFHQSxXQUFBLEVBQWEsV0FIYjtHQUZKLENBT0UsQ0FBQyxLQVBILENBT1MsVUFQVCxFQVFJO0FBQUEsSUFBQSxHQUFBLEVBQUssR0FBTDtBQUFBLElBQ0EsS0FBQSxFQUNFO0FBQUEsTUFBQSxXQUFBLEVBQ0U7QUFBQSxRQUFBLFVBQUEsRUFBWSxVQUFaO0FBQUEsUUFDQSxXQUFBLEVBQWEsV0FEYjtPQURGO0tBRkY7R0FSSixDQWNFLENBQUMsS0FkSCxDQWNTLFVBZFQsRUFlSTtBQUFBLElBQUEsR0FBQSxFQUFLLE9BQUw7QUFBQSxJQUNBLEtBQUEsRUFDRTtBQUFBLE1BQUEsV0FBQSxFQUNFO0FBQUEsUUFBQSxVQUFBLEVBQVksVUFBWjtBQUFBLFFBQ0EsV0FBQSxFQUFhLGlCQURiO09BREY7S0FGRjtHQWZKLENBcUJFLENBQUMsS0FyQkgsQ0FxQlMsV0FyQlQsRUFzQkk7QUFBQSxJQUFBLEdBQUEsRUFBSyxRQUFMO0FBQUEsSUFDQSxLQUFBLEVBQ0U7QUFBQSxNQUFBLFdBQUEsRUFDRTtBQUFBLFFBQUEsVUFBQSxFQUFZLFdBQVo7QUFBQSxRQUNBLFdBQUEsRUFBYSxZQURiO09BREY7S0FGRjtHQXRCSixDQTZCRSxDQUFDLEtBN0JILENBNkJTLFVBN0JULEVBOEJJO0FBQUEsSUFBQSxHQUFBLEVBQUssT0FBTDtBQUFBLElBQ0EsS0FBQSxFQUNFO0FBQUEsTUFBQSxXQUFBLEVBQ0U7QUFBQSxRQUFBLFVBQUEsRUFBWSxVQUFaO0FBQUEsUUFDQSxXQUFBLEVBQWEsV0FEYjtPQURGO0tBRkY7R0E5QkosQ0FvQ0UsQ0FBQyxLQXBDSCxDQW9DUyxZQXBDVCxFQXFDSTtBQUFBLElBQUEsR0FBQSxFQUFLLFNBQUw7QUFBQSxJQUNBLEtBQUEsRUFDRTtBQUFBLE1BQUEsV0FBQSxFQUNFO0FBQUEsUUFBQSxVQUFBLEVBQVksWUFBWjtBQUFBLFFBQ0EsV0FBQSxFQUFhLGFBRGI7T0FERjtLQUZGO0dBckNKLENBMkNFLENBQUMsS0EzQ0gsQ0EyQ1MsYUEzQ1QsRUE0Q0k7QUFBQSxJQUFBLEdBQUEsRUFBSyxVQUFMO0FBQUEsSUFDQSxLQUFBLEVBQ0U7QUFBQSxNQUFBLFdBQUEsRUFDRTtBQUFBLFFBQUEsVUFBQSxFQUFZLGFBQVo7QUFBQSxRQUNBLFdBQUEsRUFBYSxjQURiO09BREY7S0FGRjtHQTVDSixDQWtERSxDQUFDLEtBbERILENBa0RTLFNBbERULEVBbURJO0FBQUEsSUFBQSxHQUFBLEVBQUssa0JBQUw7QUFBQSxJQUNBLEtBQUEsRUFDRTtBQUFBLE1BQUEsV0FBQSxFQUNFO0FBQUEsUUFBQSxVQUFBLEVBQVksU0FBWjtBQUFBLFFBQ0EsV0FBQSxFQUFhLGdCQURiO09BREY7S0FGRjtHQW5ESixDQXlERSxDQUFDLEtBekRILENBeURTLFVBekRULEVBMERJO0FBQUEsSUFBQSxHQUFBLEVBQUssd0JBQUw7QUFBQSxJQUNBLEtBQUEsRUFDRTtBQUFBLE1BQUEsV0FBQSxFQUNFO0FBQUEsUUFBQSxVQUFBLEVBQVksU0FBWjtBQUFBLFFBQ0EsV0FBQSxFQUFhLGdCQURiO09BREY7S0FGRjtHQTFESixDQWdFRSxDQUFDLEtBaEVILENBZ0VTLG9CQWhFVCxFQWlFSTtBQUFBLElBQUEsR0FBQSxFQUFLLGlCQUFMO0FBQUEsSUFDQSxLQUFBLEVBQ0U7QUFBQSxNQUFBLFdBQUEsRUFDRTtBQUFBLFFBQUEsVUFBQSxFQUFZLG1CQUFaO0FBQUEsUUFDQSxXQUFBLEVBQWEscUJBRGI7T0FERjtLQUZGO0dBakVKLENBdUVFLENBQUMsS0F2RUgsQ0F1RVMsd0JBdkVULEVBd0VJO0FBQUEsSUFBQSxHQUFBLEVBQUsscUJBQUw7QUFBQSxJQUNBLEtBQUEsRUFDRTtBQUFBLE1BQUEsV0FBQSxFQUNFO0FBQUEsUUFBQSxVQUFBLEVBQVksc0JBQVo7QUFBQSxRQUNBLFdBQUEsRUFBYSx5QkFEYjtPQURGO0tBRkY7R0F4RUosQ0E4RUUsQ0FBQyxLQTlFSCxDQThFUyxlQTlFVCxFQStFSTtBQUFBLElBQUEsR0FBQSxFQUFLLFlBQUw7QUFBQSxJQUNBLEtBQUEsRUFDRTtBQUFBLE1BQUEsV0FBQSxFQUNFO0FBQUEsUUFBQSxVQUFBLEVBQVksY0FBWjtBQUFBLFFBQ0EsV0FBQSxFQUFhLGdCQURiO09BREY7S0FGRjtHQS9FSixDQXFGRSxDQUFDLEtBckZILENBcUZTLG9CQXJGVCxFQXNGSTtBQUFBLElBQUEsR0FBQSxFQUFLLGlCQUFMO0FBQUEsSUFDQSxLQUFBLEVBQ0U7QUFBQSxNQUFBLFdBQUEsRUFDRTtBQUFBLFFBQUEsVUFBQSxFQUFZLG1CQUFaO0FBQUEsUUFDQSxXQUFBLEVBQWEscUJBRGI7T0FERjtLQUZGO0dBdEZKLENBNEZFLENBQUMsS0E1RkgsQ0E0RlMsYUE1RlQsRUE2Rkk7QUFBQSxJQUFBLEdBQUEsRUFBSyxVQUFMO0FBQUEsSUFDQSxLQUFBLEVBQ0U7QUFBQSxNQUFBLFdBQUEsRUFDRTtBQUFBLFFBQUEsVUFBQSxFQUFZLFlBQVo7QUFBQSxRQUNBLFdBQUEsRUFBYSxjQURiO09BREY7S0FGRjtHQTdGSixDQW1HRSxDQUFDLEtBbkdILENBbUdTLGVBbkdULEVBb0dJO0FBQUEsSUFBQSxHQUFBLEVBQUssWUFBTDtBQUFBLElBQ0EsS0FBQSxFQUNFO0FBQUEsTUFBQSxXQUFBLEVBQ0U7QUFBQSxRQUFBLFVBQUEsRUFBWSxjQUFaO0FBQUEsUUFDQSxXQUFBLEVBQWEsZ0JBRGI7T0FERjtLQUZGO0dBcEdKLENBMEdFLENBQUMsS0ExR0gsQ0EwR1MsZ0JBMUdULEVBMkdJO0FBQUEsSUFBQSxHQUFBLEVBQUssYUFBTDtBQUFBLElBQ0EsS0FBQSxFQUNFO0FBQUEsTUFBQSxXQUFBLEVBQ0U7QUFBQSxRQUFBLFVBQUEsRUFBWSxlQUFaO0FBQUEsUUFDQSxXQUFBLEVBQWEsaUJBRGI7T0FERjtLQUZGO0dBM0dKLENBaUhFLENBQUMsS0FqSEgsQ0FpSFMsa0JBakhULEVBa0hJO0FBQUEsSUFBQSxHQUFBLEVBQUssZUFBTDtBQUFBLElBQ0EsS0FBQSxFQUNFO0FBQUEsTUFBQSxXQUFBLEVBQ0U7QUFBQSxRQUFBLFVBQUEsRUFBWSxpQkFBWjtBQUFBLFFBQ0EsV0FBQSxFQUFhLG1CQURiO09BREY7S0FGRjtHQWxISixDQXdIRSxDQUFDLEtBeEhILENBd0hTLHNCQXhIVCxFQXlISTtBQUFBLElBQUEsR0FBQSxFQUFLLG1CQUFMO0FBQUEsSUFDQSxLQUFBLEVBQ0U7QUFBQSxNQUFBLFdBQUEsRUFDRTtBQUFBLFFBQUEsVUFBQSxFQUFZLG9CQUFaO0FBQUEsUUFDQSxXQUFBLEVBQWEsdUJBRGI7T0FERjtLQUZGO0dBekhKLENBK0hFLENBQUMsS0EvSEgsQ0ErSFMsbUJBL0hULEVBZ0lJO0FBQUEsSUFBQSxHQUFBLEVBQUssZ0JBQUw7QUFBQSxJQUNBLEtBQUEsRUFDRTtBQUFBLE1BQUEsV0FBQSxFQUNFO0FBQUEsUUFBQSxVQUFBLEVBQVksa0JBQVo7QUFBQSxRQUNBLFdBQUEsRUFBYSxvQkFEYjtPQURGO0tBRkY7R0FoSUosQ0FBQSxDQUFBO0FBQUEsRUF3SUUsa0JBQWtCLENBQUMsU0FBbkIsQ0FBNkIsR0FBN0IsQ0F4SUYsQ0FBQTtTQTBJRSxhQUFhLENBQUMsWUFBWSxDQUFDLElBQTNCLENBQWdDLFNBQUEsR0FBQTtXQUM3QjtBQUFBLE1BQUEsT0FBQSxFQUFTLFNBQUMsTUFBRCxHQUFBO0FBQ1AsWUFBQSxJQUFBO0FBQUEsUUFBQSxJQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBWCxDQUFpQixTQUFqQixDQUFBLElBQStCLENBQUEsTUFBTyxDQUFDLEdBQUcsQ0FBQyxLQUFYLENBQWlCLFdBQWpCLENBQW5DO0FBQ0UsVUFBQSxJQUFHLE1BQU0sQ0FBQyxNQUFQLENBQUEsQ0FBSDtBQUNFLFlBQUEsSUFBQSxHQUFPLFFBQVAsQ0FERjtXQUFBLE1BRUssSUFBRyxNQUFNLENBQUMsTUFBUCxDQUFBLENBQUg7QUFDSCxZQUFBLElBQUEsR0FBTyxRQUFQLENBREc7V0FBQSxNQUFBO0FBR0gsWUFBQSxJQUFBLEdBQU8sU0FBUCxDQUhHO1dBRkw7QUFBQSxVQU9BLE1BQU0sQ0FBQyxHQUFQLEdBQWMsR0FBQSxHQUFHLElBQUgsR0FBUSxHQUFSLEdBQVcsTUFBTSxDQUFDLEdBUGhDLENBREY7U0FBQTtlQVVBLE9BWE87TUFBQSxDQUFUO01BRDZCO0VBQUEsQ0FBaEMsRUEzSWE7QUFBQSxDQUFqQixDQVRBLENBQUE7O0FBQUEsU0FrS1MsQ0FBQyxHQUFWLENBQWMsU0FBQyxNQUFELEdBQUE7U0FDWixNQUFNLENBQUMsRUFBUCxDQUFVLFVBQVYsRUFEWTtBQUFBLENBQWQsQ0FsS0EsQ0FBQTs7QUFBQSxTQXFLUyxDQUFDLEdBQVYsQ0FBYyxTQUFDLFVBQUQsRUFBYSxJQUFiLEdBQUE7U0FDWixVQUFVLENBQUMsSUFBWCxHQUFrQixLQUROO0FBQUEsQ0FBZCxDQXJLQSxDQUFBOztBQUFBLFNBd0tTLENBQUMsT0FBVixDQUFrQixRQUFsQixFQUE0QixTQUFDLGFBQUQsR0FBQTtTQUMxQixhQUFBLENBQUEsRUFEMEI7QUFBQSxDQUE1QixDQXhLQSxDQUFBOztBQUFBLFNBMktTLENBQUMsT0FBVixDQUFrQixNQUFsQixFQUEwQixTQUFDLE1BQUQsR0FBQTtBQUN4QixNQUFBLE9BQUE7QUFBQSxFQUFBLE9BQUEsR0FDRTtBQUFBLElBQUEsSUFBQSxFQUFNLEVBQU47QUFBQSxJQUNBLElBQUEsRUFBTSxTQUFDLFNBQUQsR0FBQTthQUNKLENBQUMsQ0FBQyxJQUFGLENBQU8sT0FBTyxDQUFDLElBQWYsRUFBcUIsU0FBQyxHQUFELEdBQUE7ZUFDbkIsR0FBRyxDQUFDLFNBQUosS0FBaUIsVUFERTtNQUFBLENBQXJCLEVBREk7SUFBQSxDQUROO0dBREYsQ0FBQTtBQUFBLEVBTUEsTUFBTSxDQUFDLEVBQVAsQ0FBVSxNQUFWLEVBQWtCLFNBQUMsSUFBRCxHQUFBO1dBQ2hCLE9BQU8sQ0FBQyxJQUFSLEdBQWUsS0FEQztFQUFBLENBQWxCLENBTkEsQ0FBQTtTQVNBLFFBVndCO0FBQUEsQ0FBMUIsQ0EzS0EsQ0FBQTs7QUFBQSxTQXVMUyxDQUFDLFVBQVYsQ0FBcUIsVUFBckIsRUFBaUMsU0FBQyxNQUFELEdBQUEsQ0FBakMsQ0F2TEEsQ0FBQTs7QUFBQSxTQXlMUyxDQUFDLFVBQVYsQ0FBcUIsa0JBQXJCLEVBQXlDLFNBQUMsTUFBRCxFQUFTLGlCQUFULEdBQUE7QUFDdkMsRUFBQSxNQUFNLENBQUMsZUFBUCxHQUF5QixTQUFBLEdBQUE7V0FDdkIsaUJBQWlCLENBQUMsSUFBbEIsQ0FDRTtBQUFBLE1BQUEsU0FBQSxFQUFXLG1CQUFYO0FBQUEsTUFDQSxPQUFBLEVBQVM7UUFDUDtBQUFBLFVBQ0UsSUFBQSxFQUFNLHlDQURSO1NBRE8sRUFJUDtBQUFBLFVBQ0UsSUFBQSxFQUFNLDJDQURSO1NBSk8sRUFPUDtBQUFBLFVBQ0UsSUFBQSxFQUFNLG1EQURSO1NBUE8sRUFVUDtBQUFBLFVBQ0UsSUFBQSxFQUFNLHVEQURSO1NBVk87T0FEVDtBQUFBLE1BZUEsVUFBQSxFQUFZLFFBZlo7QUFBQSxNQWdCQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ04sUUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLFdBQVosQ0FBQSxDQURNO01BQUEsQ0FoQlI7QUFBQSxNQW9CQSxhQUFBLEVBQWUsU0FBQyxLQUFELEdBQUE7QUFDYixRQUFBLElBQTBDLEtBQUEsS0FBUyxDQUFuRDtBQUFBLFVBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFoQixHQUF1QixjQUF2QixDQUFBO1NBQUE7QUFDQSxRQUFBLElBQThELEtBQUEsS0FBUyxDQUF2RTtBQUFBLFVBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFoQixHQUF1QixrQ0FBdkIsQ0FBQTtTQURBO0FBRUEsUUFBQSxJQUE4RCxLQUFBLEtBQVMsQ0FBdkU7QUFBQSxVQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBaEIsR0FBdUIsa0NBQXZCLENBQUE7U0FGQTtBQUdBLFFBQUEsSUFBd0QsS0FBQSxLQUFTLENBQWpFO0FBQUEsVUFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQWhCLEdBQXVCLDRCQUF2QixDQUFBO1NBSEE7ZUFJQSxLQUxhO01BQUEsQ0FwQmY7S0FERixFQUR1QjtFQUFBLENBQXpCLENBRHVDO0FBQUEsQ0FBekMsQ0F6TEEsQ0FBQTs7QUFBQSxTQXdOUyxDQUFDLFVBQVYsQ0FBcUIsa0JBQXJCLEVBQXlDLFNBQUMsTUFBRCxHQUFBO0FBQ3ZDLEVBQUEsTUFBTSxDQUFDLElBQVAsR0FBYyxlQUFkLENBQUE7QUFBQSxFQUNBLE1BQU0sQ0FBQyxLQUFQLEdBQWUsOENBRGYsQ0FBQTtTQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO0lBQ2Q7QUFBQSxNQUNFLEtBQUEsRUFBUSw4Q0FEVjtBQUFBLE1BRUUsS0FBQSxFQUFRLHFCQUZWO0FBQUEsTUFHRSxNQUFBLEVBQVMsK0tBSFg7S0FEYztJQUh1QjtBQUFBLENBQXpDLENBeE5BLENBQUE7O0FBQUEsU0FtT1MsQ0FBQyxVQUFWLENBQXFCLGtCQUFyQixFQUF5QyxTQUFDLE1BQUQsR0FBQTtBQUN2QyxFQUFBLE1BQU0sQ0FBQyxJQUFQLEdBQWMsY0FBZCxDQUFBO0FBQUEsRUFDQSxNQUFNLENBQUMsS0FBUCxHQUFlLG1EQURmLENBQUE7U0FFQSxNQUFNLENBQUMsTUFBUCxHQUFnQjtJQUNkO0FBQUEsTUFDRSxLQUFBLEVBQVEsZUFEVjtBQUFBLE1BRUUsS0FBQSxFQUFRLHNDQUZWO0FBQUEsTUFHRSxNQUFBLEVBQVMsb01BSFg7S0FEYztJQUh1QjtBQUFBLENBQXpDLENBbk9BLENBQUE7O0FBQUEsU0ErT1MsQ0FBQyxVQUFWLENBQXFCLGVBQXJCLEVBQXNDLFNBQUMsTUFBRCxHQUFBO0FBQ3BDLEVBQUEsTUFBTSxDQUFDLElBQVAsR0FBYyxXQUFkLENBQUE7QUFBQSxFQUNBLE1BQU0sQ0FBQyxLQUFQLEdBQWUscUZBRGYsQ0FBQTtTQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO0lBQ2Q7QUFBQSxNQUNFLEtBQUEsRUFBUSxlQURWO0FBQUEsTUFFRSxLQUFBLEVBQVEseUJBRlY7QUFBQSxNQUdFLE1BQUEsRUFBUyxrU0FIWDtLQURjO0lBSG9CO0FBQUEsQ0FBdEMsQ0EvT0EsQ0FBQTs7QUFBQSxTQTBQUyxDQUFDLFVBQVYsQ0FBcUIsc0JBQXJCLEVBQTZDLFNBQUMsTUFBRCxHQUFBO0FBQzNDLEVBQUEsTUFBTSxDQUFDLElBQVAsR0FBYyxZQUFkLENBQUE7QUFBQSxFQUNBLE1BQU0sQ0FBQyxLQUFQLEdBQWUsd0dBRGYsQ0FBQTtTQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO0lBQ2Q7QUFBQSxNQUNFLEtBQUEsRUFBUSxlQURWO0FBQUEsTUFFRSxLQUFBLEVBQVEsK0JBRlY7QUFBQSxNQUdFLE1BQUEsRUFBUyw0T0FIWDtLQURjLEVBTWQ7QUFBQSxNQUNFLEtBQUEsRUFBUSxlQURWO0FBQUEsTUFFRSxLQUFBLEVBQVEsZ0NBRlY7QUFBQSxNQUdFLE1BQUEsRUFBUyxFQUhYO0tBTmMsRUFXZDtBQUFBLE1BQ0UsS0FBQSxFQUFRLGVBRFY7QUFBQSxNQUVFLEtBQUEsRUFBUSxnQ0FGVjtLQVhjLEVBZWQ7QUFBQSxNQUNFLEtBQUEsRUFBUSxlQURWO0FBQUEsTUFFRSxLQUFBLEVBQVEsZ0NBRlY7S0FmYztJQUgyQjtBQUFBLENBQTdDLENBMVBBLENBQUE7O0FBQUEsU0FrUlMsQ0FBQyxVQUFWLENBQXFCLGVBQXJCLEVBQXNDLFNBQUMsTUFBRCxHQUFBO0FBQ3BDLEVBQUEsTUFBTSxDQUFDLElBQVAsR0FBYyxZQUFkLENBQUE7QUFBQSxFQUNBLE1BQU0sQ0FBQyxLQUFQLEdBQWUsa0dBRGYsQ0FBQTtTQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO0lBQ2Q7QUFBQSxNQUNFLEtBQUEsRUFBUSxlQURWO0FBQUEsTUFFRSxLQUFBLEVBQVEsd0JBRlY7QUFBQSxNQUdFLE1BQUEsRUFBUyx5TEFIWDtLQURjLEVBTWQ7QUFBQSxNQUNFLEtBQUEsRUFBUSxlQURWO0FBQUEsTUFFRSxLQUFBLEVBQVEseUJBRlY7S0FOYyxFQVVkO0FBQUEsTUFDRSxLQUFBLEVBQVEsZUFEVjtBQUFBLE1BRUUsS0FBQSxFQUFRLHlCQUZWO0tBVmM7SUFIb0I7QUFBQSxDQUF0QyxDQWxSQSxDQUFBOztBQUFBLFNBcVNTLENBQUMsVUFBVixDQUFxQixpQkFBckIsRUFBd0MsU0FBQyxNQUFELEdBQUE7QUFDdEMsRUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLFlBQWQsQ0FBQTtBQUFBLEVBQ0EsTUFBTSxDQUFDLEtBQVAsR0FBZSxnRUFEZixDQUFBO1NBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7SUFDZDtBQUFBLE1BQ0UsS0FBQSxFQUFRLGVBRFY7QUFBQSxNQUVFLEtBQUEsRUFBUSwyQkFGVjtLQURjLEVBS2Q7QUFBQSxNQUNFLEtBQUEsRUFBUSxlQURWO0FBQUEsTUFFRSxLQUFBLEVBQVEsMkJBRlY7S0FMYyxFQVNkO0FBQUEsTUFDRSxLQUFBLEVBQVEsZUFEVjtBQUFBLE1BRUUsS0FBQSxFQUFRLDBCQUZWO0tBVGM7SUFIc0I7QUFBQSxDQUF4QyxDQXJTQSxDQUFBOztBQUFBLFNBdVRTLENBQUMsVUFBVixDQUFxQixrQkFBckIsRUFBeUMsU0FBQyxNQUFELEdBQUE7QUFDdkMsRUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLGFBQWQsQ0FBQTtBQUFBLEVBQ0EsTUFBTSxDQUFDLEtBQVAsR0FBZSwyREFEZixDQUFBO1NBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7SUFDZDtBQUFBLE1BQ0UsS0FBQSxFQUFRLGVBRFY7QUFBQSxNQUVFLEtBQUEsRUFBUSwwQkFGVjtBQUFBLE1BR0UsTUFBQSxFQUFTLGlFQUhYO0tBRGM7SUFIdUI7QUFBQSxDQUF6QyxDQXZUQSxDQUFBOztBQUFBLFNBa1VTLENBQUMsVUFBVixDQUFxQixvQkFBckIsRUFBMkMsU0FBQyxNQUFELEdBQUE7QUFDekMsRUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLGVBQWQsQ0FBQTtBQUFBLEVBQ0EsTUFBTSxDQUFDLEtBQVAsR0FBZSxrREFEZixDQUFBO1NBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7SUFDZDtBQUFBLE1BQ0UsS0FBQSxFQUFRLGVBRFY7QUFBQSxNQUVFLEtBQUEsRUFBUSxrQ0FGVjtLQURjLEVBS2Q7QUFBQSxNQUNFLEtBQUEsRUFBUSxlQURWO0FBQUEsTUFFRSxLQUFBLEVBQVEsNkJBRlY7S0FMYztJQUh5QjtBQUFBLENBQTNDLENBbFVBLENBQUE7O0FBQUEsU0FnVlMsQ0FBQyxVQUFWLENBQXFCLHVCQUFyQixFQUE4QyxTQUFDLE1BQUQsR0FBQTtBQUM1QyxFQUFBLE1BQU0sQ0FBQyxJQUFQLEdBQWMsWUFBZCxDQUFBO0FBQUEsRUFDQSxNQUFNLENBQUMsS0FBUCxHQUFlLHdDQURmLENBQUE7U0FFQSxNQUFNLENBQUMsTUFBUCxHQUFnQjtJQUNkO0FBQUEsTUFDRSxLQUFBLEVBQVEsZUFEVjtBQUFBLE1BRUUsS0FBQSxFQUFRLDhCQUZWO0tBRGMsRUFLZDtBQUFBLE1BQ0UsS0FBQSxFQUFRLGVBRFY7QUFBQSxNQUVFLEtBQUEsRUFBUSw4QkFGVjtLQUxjLEVBU2Q7QUFBQSxNQUNFLEtBQUEsRUFBUSxlQURWO0FBQUEsTUFFRSxLQUFBLEVBQVEsOEJBRlY7S0FUYztJQUg0QjtBQUFBLENBQTlDLENBaFZBLENBQUE7O0FBQUEsU0FxV1MsQ0FBQyxVQUFWLENBQXFCLFdBQXJCLEVBQWtDLFNBQUMsTUFBRCxHQUFBLENBQWxDLENBcldBLENBQUE7O0FBQUEsU0F1V1MsQ0FBQyxVQUFWLENBQXFCLFNBQXJCLEVBQWdDLFNBQUMsTUFBRCxHQUFBLENBQWhDLENBdldBLENBQUE7O0FBQUEsU0F5V1MsQ0FBQyxVQUFWLENBQXFCLFlBQXJCLEVBQW1DLFNBQUMsTUFBRCxHQUFBO1NBQ2pDLE1BQU0sQ0FBQyxJQUFQLEdBQWMsb3JRQURtQjtBQUFBLENBQW5DLENBeldBLENBQUE7O0FBQUEsU0E0V1MsQ0FBQyxVQUFWLENBQXFCLG1CQUFyQixFQUEwQyxTQUFDLE1BQUQsR0FBQSxDQUExQyxDQTVXQSxDQUFBOztBQUFBLFNBOFdTLENBQUMsVUFBVixDQUFxQixzQkFBckIsRUFBNkMsU0FBQyxNQUFELEdBQUEsQ0FBN0MsQ0E5V0EsQ0FBQTs7QUFBQSxTQWdYUyxDQUFDLFVBQVYsQ0FBcUIsY0FBckIsRUFBcUMsU0FBQyxNQUFELEdBQUEsQ0FBckMsQ0FoWEEsQ0FBQTs7QUFBQSxTQWtYUyxDQUFDLFVBQVYsQ0FBcUIsbUJBQXJCLEVBQTBDLFNBQUMsTUFBRCxHQUFBLENBQTFDLENBbFhBLENBQUE7O0FBQUEsU0FvWFMsQ0FBQyxVQUFWLENBQXFCLFlBQXJCLEVBQW1DLFNBQUMsTUFBRCxHQUFBLENBQW5DLENBcFhBLENBQUE7O0FBQUEsU0FzWFMsQ0FBQyxVQUFWLENBQXFCLGNBQXJCLEVBQXFDLFNBQUMsTUFBRCxHQUFBLENBQXJDLENBdFhBLENBQUE7O0FBQUEsU0F3WFMsQ0FBQyxVQUFWLENBQXFCLG1CQUFyQixFQUEwQyxTQUFDLE1BQUQsR0FBQSxDQUExQyxDQXhYQSxDQUFBOztBQUFBLFNBMFhTLENBQUMsVUFBVixDQUFxQixtQkFBckIsRUFBMEMsU0FBQyxNQUFELEdBQUEsQ0FBMUMsQ0ExWEEsQ0FBQTs7QUFBQSxTQTRYUyxDQUFDLFVBQVYsQ0FBcUIsZUFBckIsRUFBc0MsU0FBQyxNQUFELEdBQUEsQ0FBdEMsQ0E1WEEsQ0FBQTs7QUFBQSxTQThYUyxDQUFDLFVBQVYsQ0FBcUIsb0JBQXJCLEVBQTJDLFNBQUMsTUFBRCxHQUFBLENBQTNDLENBOVhBLENBQUE7O0FBQUEsU0FnWVMsQ0FBQyxVQUFWLENBQXFCLG9CQUFyQixFQUEyQyxTQUFDLE1BQUQsR0FBQSxDQUEzQyxDQWhZQSxDQUFBOztBQUFBLFNBa1lTLENBQUMsVUFBVixDQUFxQixrQkFBckIsRUFBeUMsU0FBQyxNQUFELEdBQUEsQ0FBekMsQ0FsWUEsQ0FBQTs7QUFBQSxTQW9ZUyxDQUFDLFVBQVYsQ0FBcUIsYUFBckIsRUFBb0MsU0FBQyxNQUFELEdBQUEsQ0FBcEMsQ0FwWUEsQ0FBQTs7QUFBQSxTQXNZUyxDQUFDLFVBQVYsQ0FBcUIsZ0JBQXJCLEVBQXVDLFNBQUMsTUFBRCxHQUFBLENBQXZDLENBdFlBLENBQUE7O0FBQUEsU0F3WVMsQ0FBQyxVQUFWLENBQXFCLHFCQUFyQixFQUE0QyxTQUFDLE1BQUQsR0FBQSxDQUE1QyxDQXhZQSxDQUFBOztBQUFBLFNBMFlTLENBQUMsVUFBVixDQUFxQixVQUFyQixFQUFpQyxTQUFDLE1BQUQsRUFBUyxJQUFULEdBQUE7U0FDL0IsTUFBTSxDQUFDLE1BQVAsQ0FBYyxDQUFDLFNBQUEsR0FBQTtXQUFHLElBQUksQ0FBQyxLQUFSO0VBQUEsQ0FBRCxDQUFkLEVBQThCLFNBQUEsR0FBQTtXQUM1QixNQUFNLENBQUMsSUFBUCxHQUFjLElBQUksQ0FBQyxLQURTO0VBQUEsQ0FBOUIsRUFEK0I7QUFBQSxDQUFqQyxDQTFZQSxDQUFBOztBQUFBLFNBOFlTLENBQUMsVUFBVixDQUFxQixTQUFyQixFQUFnQyxTQUFDLE1BQUQsRUFBUyxJQUFULEVBQWUsWUFBZixFQUE2QixRQUE3QixFQUF1QyxJQUF2QyxHQUFBO0FBQzlCLEVBQUEsTUFBTSxDQUFDLEtBQVAsR0FBa0IsWUFBWSxDQUFDLElBQWhCLEdBQTBCLFlBQVksQ0FBQyxJQUFiLEdBQWtCLENBQTVDLEdBQW1ELENBQWxFLENBQUE7QUFBQSxFQUVBLE1BQU0sQ0FBQyxNQUFQLENBQWMsQ0FBQyxTQUFBLEdBQUE7V0FBRyxJQUFJLENBQUMsS0FBUjtFQUFBLENBQUQsQ0FBZCxFQUE4QixTQUFBLEdBQUE7QUFDNUIsSUFBQSxNQUFNLENBQUMsR0FBUCxHQUFhLElBQUksQ0FBQyxJQUFMLENBQVUsWUFBWSxDQUFDLFNBQXZCLENBQWIsQ0FBQTtBQUNBLElBQUEsSUFBRyxNQUFNLENBQUMsR0FBVjtBQUNFLE1BQUEsTUFBTSxDQUFDLElBQVAsR0FBYyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQU0sQ0FBQSxNQUFNLENBQUMsS0FBUCxDQUEvQixDQUFBO0FBQUEsTUFDQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQVosR0FBa0IsSUFBSSxDQUFDLGtCQUFMLENBQXdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBcEMsQ0FEbEIsQ0FBQTtBQUdBLE1BQUEsSUFBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQVosS0FBb0IsUUFBdkI7QUFDRSxRQUFBLE1BQU0sQ0FBQyxZQUFQLEdBQXNCLENBQXRCLENBQUE7QUFBQSxRQUNBLE1BQU0sQ0FBQyxRQUFQLEdBQWtCLEVBRGxCLENBQUE7ZUFFQSxRQUFBLENBQVMsTUFBTSxDQUFDLFdBQWhCLEVBQTZCLElBQTdCLEVBSEY7T0FKRjtLQUY0QjtFQUFBLENBQTlCLENBRkEsQ0FBQTtTQWFBLE1BQU0sQ0FBQyxZQUFQLEdBQXNCLFNBQUEsR0FBQTtBQUNwQixJQUFBLElBQUcsTUFBTSxDQUFDLElBQVY7YUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQVosR0FBb0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FEdkM7S0FEb0I7RUFBQSxFQWRRO0FBQUEsQ0FBaEMsQ0E5WUEsQ0FBQTs7QUFBQSxTQWdhUyxDQUFDLFNBQVYsQ0FBb0IsYUFBcEIsRUFBbUMsU0FBQSxHQUFBO1NBQ2pDO0FBQUEsSUFBQSxRQUFBLEVBQVUsSUFBVjtBQUFBLElBQ0EsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFRLE9BQVIsRUFBaUIsS0FBakIsR0FBQTtBQUNKLFVBQUEsTUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQ1A7QUFBQSxRQUFBLE1BQUEsRUFBUSxRQUFSO09BRE8sRUFFVCxLQUFLLENBQUMsS0FBTixDQUFZLEtBQUssQ0FBQyxXQUFsQixDQUZTLENBQVQsQ0FBQTthQUdBLFVBQUEsQ0FBVyxDQUFDLFNBQUEsR0FBQTtlQUNWLENBQUEsQ0FBRSxPQUFGLENBQVUsQ0FBQyxLQUFYLENBQWlCLFNBQUEsR0FBQTtpQkFDZjtBQUFBLFlBQUEsRUFBQSxFQUFRLE1BQVI7QUFBQSxZQUNBLEtBQUEsRUFBUSxNQURSO0FBQUEsWUFFQSxJQUFBLEVBQVEsUUFGUjtBQUFBLFlBR0EsSUFBQSxFQUFRLFFBSFI7QUFBQSxZQUlBLE9BQUEsRUFBUyxjQUpUO0FBQUEsWUFLQSxnQkFBQSxFQUFrQixnQkFMbEI7QUFBQSxZQU1BLGNBQUEsRUFBZ0IsTUFOaEI7WUFEZTtRQUFBLENBQWpCLEVBRFU7TUFBQSxDQUFELENBQVgsRUFVRyxDQVZILEVBSkk7SUFBQSxDQUROO0lBRGlDO0FBQUEsQ0FBbkMsQ0FoYUEsQ0FBQTs7QUNFQSxPQUFPLENBQUMsTUFBUixDQUFlLGlCQUFmLEVBQWtDLEVBQWxDLENBQUEsQ0FBQTs7QUNGQSxPQUFPLENBQUMsTUFBUixDQUFlLGdCQUFmLEVBQWlDLEVBQWpDLENBQ0UsQ0FBQyxTQURILENBQ2EsUUFEYixFQUN1QixTQUFBLEdBQUE7U0FDbkI7QUFBQSxJQUFBLFFBQUEsRUFBVSxHQUFWO0FBQUEsSUFDQSxJQUFBLEVBQU0sU0FBQSxHQUFBO2FBQ0osTUFBTSxDQUFDLElBQVAsQ0FBQSxFQURJO0lBQUEsQ0FETjtJQURtQjtBQUFBLENBRHZCLENBTUUsQ0FBQyxPQU5ILENBTVcsTUFOWCxFQU1tQixTQUFDLElBQUQsR0FBQTtBQUNmLE1BQUEsaUJBQUE7QUFBQSxFQUFBLElBQUEsR0FDRTtBQUFBLElBQUEsS0FBQSxFQUNFO0FBQUEsTUFBQSxPQUFBLEVBQVMsZ0RBQVQ7QUFBQSxNQUNBLFdBQUEsRUFBYSx3TUFEYjtBQUFBLE1BRUEsSUFBQSxFQUFNLGlxQkFGTjtLQURGO0FBQUEsSUFJQSxJQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBUyxFQUFUO0FBQUEsTUFDQSxJQUFBLEVBQ0U7QUFBQSxRQUFBLFNBQUEsRUFBVyxFQUFYO0FBQUEsUUFDQSxTQUFBLEVBQVcsRUFEWDtPQUZGO0tBTEY7R0FERixDQUFBO0FBQUEsRUFhQSxXQUFBLEdBQWMsU0FBQyxNQUFELEdBQUE7V0FDWixDQUFDLENBQUMsSUFBRixDQUFPLE1BQVAsRUFBZSxTQUFDLEdBQUQsRUFBTSxHQUFOLEdBQUE7QUFDYixjQUFPLE1BQUEsQ0FBQSxHQUFQO0FBQUEsYUFDTyxRQURQO2lCQUVJLElBQUksQ0FBQyxXQUFMLENBQWlCLEdBQWpCLEVBRko7QUFBQSxhQUdPLFFBSFA7aUJBSUksV0FBQSxDQUFZLEdBQVosRUFKSjtBQUFBLE9BRGE7SUFBQSxDQUFmLEVBRFk7RUFBQSxDQWJkLENBQUE7QUFBQSxFQXFCQSxXQUFBLENBQVksSUFBWixDQXJCQSxDQUFBO1NBdUJBLEtBeEJlO0FBQUEsQ0FObkIsQ0FBQSxDQUFBOztBQ0FBLElBQUEsb0JBQUE7O0FBQUEsSUFBRyxNQUFNLENBQUMsT0FBUCxDQUFBLENBQUg7QUFBQTtDQUFBLE1BRUssSUFBRyxNQUFNLENBQUMsTUFBUCxDQUFBLENBQUg7QUFFSixFQUFBLENBQUEsR0FBSSxRQUFKLENBQUE7QUFBQSxFQUNBLEtBQUEsR0FBUSxPQURSLENBQUE7QUFFQSxFQUFBLElBQUcsQ0FBQSxDQUFFLENBQUMsY0FBRixDQUFpQixLQUFqQixDQUFKO0FBQ0ksSUFBQSxJQUFBLEdBQVEsQ0FBQyxDQUFDLG9CQUFGLENBQXVCLE1BQXZCLENBQStCLENBQUEsQ0FBQSxDQUF2QyxDQUFBO0FBQUEsSUFDQSxJQUFBLEdBQVEsQ0FBQyxDQUFDLGFBQUYsQ0FBZ0IsTUFBaEIsQ0FEUixDQUFBO0FBQUEsSUFFQSxJQUFJLENBQUMsRUFBTCxHQUFZLEtBRlosQ0FBQTtBQUFBLElBR0EsSUFBSSxDQUFDLEdBQUwsR0FBWSxZQUhaLENBQUE7QUFBQSxJQUlBLElBQUksQ0FBQyxJQUFMLEdBQVksVUFKWixDQUFBO0FBQUEsSUFLQSxJQUFJLENBQUMsSUFBTCxHQUFZLGlFQUxaLENBQUE7QUFBQSxJQU1BLElBQUksQ0FBQyxLQUFMLEdBQWEsS0FOYixDQUFBO0FBQUEsSUFPQSxJQUFJLENBQUMsV0FBTCxDQUFpQixJQUFqQixDQVBBLENBREo7R0FKSTtDQUZMIiwiZmlsZSI6ImFwcGxpY2F0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaWYgZGV2aWNlLmRlc2t0b3AoKVxuICB3aW5kb3cuRnJhbmNoaW5vID0gYW5ndWxhci5tb2R1bGUoJ0ZyYW5jaGlubycsIFsnbmdTYW5pdGl6ZScsICd1aS5yb3V0ZXInLCAnYnRmb3JkLnNvY2tldC1pbycsICd0YXAuY29udHJvbGxlcnMnLCAndGFwLmRpcmVjdGl2ZXMnXSlcblxuZWxzZVxuICB3aW5kb3cuRnJhbmNoaW5vID0gYW5ndWxhci5tb2R1bGUoXCJGcmFuY2hpbm9cIiwgWyBcImlvbmljXCIsIFwiYnRmb3JkLnNvY2tldC1pb1wiLCBcInRhcC5jb250cm9sbGVyc1wiLCAndGFwLmRpcmVjdGl2ZXMnXSlcbiAgICAucnVuICgkaW9uaWNQbGF0Zm9ybSkgLT5cbiAgICAgICRpb25pY1BsYXRmb3JtLnJlYWR5IC0+XG4gICAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKSBpZiB3aW5kb3cuU3RhdHVzQmFyXG5cbkZyYW5jaGluby5jb25maWcgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSAtPlxuICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSAnYXBwJyxcbiAgICAgIHVybDogJydcbiAgICAgIGFic3RyYWN0OiB0cnVlXG4gICAgICBjb250cm9sbGVyOiAnQXBwQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnbWVudS5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuaG9tZScsXG4gICAgICB1cmw6ICcvJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdIb21lQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmRvY3MnLFxuICAgICAgdXJsOiAnL2RvY3MnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0RvY3NDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9pbmRleC5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuYWJvdXQnLFxuICAgICAgdXJsOiAnL2Fib3V0J1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdBYm91dEN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdhYm91dC5odG1sJ1xuXG5cbiAgICAuc3RhdGUgJ2FwcC5ibG9nJyxcbiAgICAgIHVybDogJy9ibG9nJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdCbG9nQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Jsb2cuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLnJlc3VtZScsXG4gICAgICB1cmw6ICcvcmVzdW1lJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdSZXN1bWVDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAncmVzdW1lLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5jb250YWN0JyxcbiAgICAgIHVybDogJy9jb250YWN0J1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbnRhY3QuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmRvYycsXG4gICAgICB1cmw6ICcvZG9jcy86cGVybWFsaW5rJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdEb2NDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9zaG93Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5zdGVwJyxcbiAgICAgIHVybDogJy9kb2NzLzpwZXJtYWxpbmsvOnN0ZXAnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0RvY0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdkb2NzL3Nob3cuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi10YXBjZW50aXZlJyxcbiAgICAgIHVybDogJy9qb2ItdGFwY2VudGl2ZSdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iVGFwY2VudGl2ZUN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItdGFwY2VudGl2ZS5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLXRhcGNlbnRpdmUtdHdvJyxcbiAgICAgIHVybDogJy9qb2ItdGFwY2VudGl2ZS10d28nXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0pvYlRhcGNlbnRpdmVUd29DdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLXRhcGNlbnRpdmUtdHdvLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItY3BnaW8nLFxuICAgICAgdXJsOiAnL2pvYi1jcGdpbydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iQ3BnaW9DdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLWNwZ2lvLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItbWVkeWNhdGlvbicsXG4gICAgICB1cmw6ICcvam9iLW1lZHljYXRpb24nXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0pvYk1lZHljYXRpb25DdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLW1lZHljYXRpb24uaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi1jc3QnLFxuICAgICAgdXJsOiAnL2pvYi1jc3QnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0pvYkNzdEN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItY3N0Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2Ita291cG4nLFxuICAgICAgdXJsOiAnL2pvYi1rb3VwbidcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iS291cG5DdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLWtvdXBuLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItdHJvdW5kJyxcbiAgICAgIHVybDogJy9qb2ItdHJvdW5kJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JUcm91bmRDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLXRyb3VuZC5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLW1vbnRobHlzJyxcbiAgICAgIHVybDogJy9qb2ItbW9udGhseXMnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0pvYk1vbnRobHlzQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi1tb250aGx5cy5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLW1vbnRobHlzLXR3bycsXG4gICAgICB1cmw6ICcvam9iLW1vbnRobHlzLXR3bydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iTW9udGhseXNUd29DdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLW1vbnRobHlzLXR3by5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLWJlbmNocHJlcCcsXG4gICAgICB1cmw6ICcvam9iLWJlbmNocHJlcCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iQmVuY2hwcmVwQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi1iZW5jaHByZXAuaHRtbCdcblxuXG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlIFwiL1wiXG5cbiAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoIC0+XG4gICAgICAgcmVxdWVzdDogKGNvbmZpZykgLT5cbiAgICAgICAgIGlmIGNvbmZpZy51cmwubWF0Y2goL1xcLmh0bWwkLykgJiYgIWNvbmZpZy51cmwubWF0Y2goL15zaGFyZWRcXC8vKVxuICAgICAgICAgICBpZiBkZXZpY2UudGFibGV0KClcbiAgICAgICAgICAgICB0eXBlID0gJ3RhYmxldCdcbiAgICAgICAgICAgZWxzZSBpZiBkZXZpY2UubW9iaWxlKClcbiAgICAgICAgICAgICB0eXBlID0gJ21vYmlsZSdcbiAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgIHR5cGUgPSAnZGVza3RvcCdcblxuICAgICAgICAgICBjb25maWcudXJsID0gXCIvI3t0eXBlfS8je2NvbmZpZy51cmx9XCJcblxuICAgICAgICAgY29uZmlnXG5cbkZyYW5jaGluby5ydW4gKCRzdGF0ZSkgLT5cbiAgJHN0YXRlLmdvKCdhcHAuaG9tZScpXG5cbkZyYW5jaGluby5ydW4gKCRyb290U2NvcGUsIGNvcHkpIC0+XG4gICRyb290U2NvcGUuY29weSA9IGNvcHlcblxuRnJhbmNoaW5vLmZhY3RvcnkgJ1NvY2tldCcsIChzb2NrZXRGYWN0b3J5KSAtPlxuICBzb2NrZXRGYWN0b3J5KClcblxuRnJhbmNoaW5vLmZhY3RvcnkgJ0RvY3MnLCAoU29ja2V0KSAtPlxuICBzZXJ2aWNlID1cbiAgICBsaXN0OiBbXVxuICAgIGZpbmQ6IChwZXJtYWxpbmspIC0+XG4gICAgICBfLmZpbmQgc2VydmljZS5saXN0LCAoZG9jKSAtPlxuICAgICAgICBkb2MucGVybWFsaW5rID09IHBlcm1hbGlua1xuXG4gIFNvY2tldC5vbiAnZG9jcycsIChkb2NzKSAtPlxuICAgIHNlcnZpY2UubGlzdCA9IGRvY3NcblxuICBzZXJ2aWNlXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdIb21lQ3RybCcsICgkc2NvcGUpIC0+XG4gIFxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0NvbnRhY3RTaGVldEN0cmwnLCAoJHNjb3BlLCAkaW9uaWNBY3Rpb25TaGVldCkgLT5cbiAgJHNjb3BlLnNob3dBY3Rpb25zaGVldCA9IC0+XG4gICAgJGlvbmljQWN0aW9uU2hlZXQuc2hvd1xuICAgICAgdGl0bGVUZXh0OiBcIkNvbnRhY3QgRnJhbmNoaW5vXCJcbiAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiR2l0aHViIDxpIGNsYXNzPVxcXCJpY29uIGlvbi1zaGFyZVxcXCI+PC9pPlwiXG4gICAgICAgIH1cbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiRW1haWwgTWUgPGkgY2xhc3M9XFxcImljb24gaW9uLWVtYWlsXFxcIj48L2k+XCJcbiAgICAgICAgfVxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJUd2l0dGVyIDxpIGNsYXNzPVxcXCJpY29uIGlvbi1zb2NpYWwtdHdpdHRlclxcXCI+PC9pPlwiXG4gICAgICAgIH1cbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiMjI0LTI0MS05MTg5IDxpIGNsYXNzPVxcXCJpY29uIGlvbi1pb3MtdGVsZXBob25lXFxcIj48L2k+XCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgICAgY2FuY2VsVGV4dDogXCJDYW5jZWxcIlxuICAgICAgY2FuY2VsOiAtPlxuICAgICAgICBjb25zb2xlLmxvZyBcIkNBTkNFTExFRFwiXG4gICAgICAgIHJldHVyblxuXG4gICAgICBidXR0b25DbGlja2VkOiAoaW5kZXgpIC0+XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIyMjQtMjQxLTkxODlcIiAgaWYgaW5kZXggaXMgMlxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaHR0cDovL3R3aXR0ZXIuY29tL2ZyYW5jaGlub19jaGVcIiAgaWYgaW5kZXggaXMgMlxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwibWFpbHRvOmZyYW5jaGluby5ub25jZUBnbWFpbC5jb21cIiAgaWYgaW5kZXggaXMgMVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaHR0cDovL2dpdGh1Yi5jb20vZnJhbmd1Y2NcIiAgaWYgaW5kZXggaXMgMFxuICAgICAgICB0cnVlXG5cbiAgcmV0dXJuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc1RhcE9uZUN0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnTk9WRU1CRVIgMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ1RhcGNlbnRpdmUgbWFuYWdlciBVWCBvdmVyaGF1bCBhbmQgZnJvbnQtZW5kJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlRhcGNlbnRpdmUuY29tIFVYIG92ZXJoYXVsIGFuZCBTUEEgZnJvbnQtZW5kXCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2dpZi9yZXBvcnQuZ2lmXCIsXG4gICAgICBcInRleHRcIiA6IFwiPHA+U3R1ZHkgdGhlIHVzZXIgYW5kIHRoZWlyIGdvYWxzIGFuZCBvdmVyaGF1bCB0aGUgZXhwZXJpZW5jZSB3aGlsZSByZS13cml0aW5nIHRoZSBmcm9udC1lbmQgaW4gQW5ndWxhci48L3A+PGEgaHJlZj0naHR0cDovL3RhcGNlbnRpdmUuY29tJyB0YXJnZXQ9J19ibGFuayc+VmlzaXQgV2Vic2l0ZTwvYT5cIlxuICAgIH1cbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc1RhcFR3b0N0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnT0NUT0JFUiAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnRGVza3RvcCBhbmQgbW9iaWxlIHdlYiBmcmllbmRseSBtYXJrZXRpbmcgd2Vic2l0ZScgXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tdGFwY2VudGl2ZS15ZWxsb3cuanBnXCIsXG4gICAgICBcInRleHRcIiA6IFwiPHA+Q3JlYXRlIGEga25vY2tvdXQgYnJhbmQgc3RyYXRlZ3kgd2l0aCBhbiBhd2Vzb21lIGxvb2sgYW5kIGZlZWwuIE1ha2UgYSBzb3BoaXN0aWNhdGVkIG9mZmVyaW5nIGxvb2sgc2ltcGxlIGFuZCBlYXN5IHRvIHVzZS48L3A+PGEgaHJlZj0naHR0cDovL3RhcGNlbnRpdmUuY29tJyB0YXJnZXQ9J19ibGFuayc+VmlzaXQgV2Vic2l0ZTwvYT5cIlxuICAgIH1cblxuICBdXG5cbkZyYW5jaGluby5jb250cm9sbGVyIFwiU2xpZGVzQ3BnQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdKVUxZIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdJZGVudGl0eSwgZnVsbC1zdGFjayBNVlAsIGFuZCBtYXJrZXRpbmcgd2Vic2l0ZSBmb3IgYSBuZXcgQ1BHIGVEaXN0cmlidXRpb24gY29tcGFueScgXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2lub19jcGdpby5qcGdcIixcbiAgICAgIFwidGV4dFwiIDogXCI8cD5UdXJuIGFuIG9sZCBzY2hvb2wgQ1BHIGJ1c2luZXNzIGludG8gYSBzb3BoaXN0aWNhdGVkIHRlY2hub2xvZ3kgY29tcGFueS4gRGVzaWduIHNlY3VyZSwgYXV0b21hdGVkIGFuZCB0cmFuc2Zvcm1hdGl2ZSBwbGF0Zm9ybSwgdGVjaG5pY2FsIGFyY2hpdGVjdHVyZSBhbmQgZXhlY3V0ZSBhbiBNVlAgZW5vdWdoIHRvIGFxdWlyZSBmaXJzdCBjdXN0b21lcnMuIE1pc3Npb24gYWNjb21wbGlzaGVkLjwvcD48YSBocmVmPSdodHRwOi8vY3BnLmlvJyB0YXJnZXQ9J19ibGFuayc+VmlzaXQgV2Vic2l0ZTwvYT5cIlxuICAgIH1cbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc01lZHljYXRpb25DdHJsXCIsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0FQUklMIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdVc2VyIGV4cGVyaWVuY2UgZGVzaWduIGFuZCByYXBpZCBwcm90b3R5cGluZyBmb3IgTWVkeWNhdGlvbiwgYSBuZXcgaGVhbHRoY2FyZSBwcmljZSBjb21wYXJpc29uIHdlYnNpdGUnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tbWVkeWNhdGlvbi5qcGdcIixcbiAgICAgIFwidGV4dFwiIDogXCI8cD5XYWx0eiB1cCBpbiB0aGUgb25saW5lIGhlYWx0aGNhcmUgaW5kdXN0cnkgZ3VucyBibGF6aW5nIHdpdGgga2lsbGVyIGRlc2lnbiBhbmQgaW5zdGluY3RzLiBHZXQgdGhpcyBuZXcgY29tcGFueSBvZmYgdGhlIGdyb3VuZCB3aXRoIGl0J3MgTVZQLiBTd2lwZSBmb3IgbW9yZSB2aWV3cy48L3A+PGEgaHJlZj0naHR0cDovL21lZHljYXRpb24uY29tJyB0YXJnZXQ9J19ibGFuayc+VmlzaXQgV2Vic2l0ZTwvYT5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tbWVkeWNhdGlvbjIuanBnXCIsXG4gICAgICBcInRleHRcIiA6IFwiXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLW1lZHljYXRpb24zLmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1tZWR5Y2F0aW9uNC5qcGdcIlxuICAgIH0sXG4gIF1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJTbGlkZXNDU1RDdHJsXCIsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0FQUklMIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdEZXNpZ25lZCBhbmQgZGV2ZWxvcGVkIGEgbmV3IHZlcnNpb24gb2YgdGhlIENoaWNhZ28gU3VuIFRpbWVzIHVzaW5nIGEgaHlicmlkIElvbmljL0FuZ3VsYXIgc3RhY2snXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tY3N0LmpwZ1wiLFxuICAgICAgXCJ0ZXh0XCIgOiBcIjxwPkhlbHAgdGhlIHN0cnVnZ2xpbmcgbWVkaWEgZ2lhbnQgdXBncmFkZSB0aGVpciBjb25zdW1lciBmYWNpbmcgdGVjaG5vbG9neS4gQ3JlYXRlIG9uZSBjb2RlIGJhc2UgaW4gQW5ndWxhciBjYXBhYmxlIG9mIGdlbmVyYXRpbmcga2ljay1hc3MgZXhwZXJpZW5jZXMgZm9yIG1vYmlsZSwgdGFibGV0LCB3ZWIgYW5kIFRWLlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1jc3QyLmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1jc3QzLmpwZ1wiXG4gICAgfSxcbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc0tvdXBuQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdNQVJDSCAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnQnJhbmQgcmVmcmVzaCwgbWFya2V0aW5nIHNpdGUgYW5kIHBsYXRmb3JtIGV4cGVyaWVuY2Ugb3ZlcmhhdWwnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8ta291cG4xLmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1rb3VwbjIuanBnXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLWtvdXBuLmpwZ1wiXG4gICAgfSxcbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc1Ryb3VuZEN0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnQVVHVVNUIDIwMTMnXG4gICRzY29wZS50aXRsZSA9ICdTb2NpYWwgdHJhdmVsIG1vYmlsZSBhcHAgZGVzaWduLCBVWCBhbmQgcmFwaWQgcHJvdG90eXBpbmcnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2lub190cm91bmQuanBnXCIsXG4gICAgICBcInRleHRcIiA6IFwiRGVzaWduIGFuIEluc3RhZ3JhbSBiYXNlZCBzb2NpYWwgdHJhdmVsIGFwcC4gV2h5PyBJIGRvbid0IGtub3cuXCJcbiAgICB9XG4gIF1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJTbGlkZXNNb250aGx5c0N0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnRkVCUlVBUlkgMjAxMydcbiAgJHNjb3BlLnRpdGxlID0gJ0N1c3RvbWVyIHBvcnRhbCBwbGF0Zm9ybSBVWCBkZXNpZ24gYW5kIGZyb250LWVuZCdcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1tb250aGx5cy1iaXoyLmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGlub19tb250aGx5cy5qcGdcIlxuICAgIH1cbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc01vbnRobHlzVHdvQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdNQVJDSCAyMDEyJ1xuICAkc2NvcGUudGl0bGUgPSAnRW50cmVwcmVuZXVyIGluIHJlc2lkZW5jZSBhdCBMaWdodGJhbmsnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tbW9udGhseXM3LmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1tb250aGx5czUuanBnXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLW1vbnRobHlzMi5qcGdcIlxuICAgIH1cbiAgXVxuXG5cblxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQWJvdXRDdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0FwcEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnUmVzdW1lQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5ibG9iID0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTJcIj48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+Tk9WIDIwMTMgLSBQUkVTRU5UPC9oNj48YnIvPjxoMj5IeWJyaWQgRXhwZXJpZW5jZSBEZXNpZ25lci9EZXZlbG9wZXIsIEluZGVwZW5kZW50PC9oMj48YnIvPjxwPldvcmtlZCB3aXRoIG5vdGVhYmxlIGVudHJlcHJlbm91cnMgb24gc2V2ZXJhbCBuZXcgcHJvZHVjdCBhbmQgYnVzaW5lc3MgbGF1bmNoZXMuIEhlbGQgbnVtZXJvdXMgcm9sZXMsIGluY2x1ZGluZyBjb250ZW50IHN0cmF0ZWdpc3QsIHVzZXIgcmVzZWFyY2hlciwgZGVzaWduZXIgYW5kIGRldmVsb3Blci4gPC9wPjxwPjxzdHJvbmc+Q29tcGFuaWVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cIm5vXCI+PGxpPjxhIGhyZWY9XCJodHRwOi8vdGFwY2VudGl2ZS5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5UYXBjZW50aXZlPC9hPjwvbGk+PGxpPjxhIGhyZWY9XCJodHRwOi8vY3BnLmlvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q1BHaW88L2E+PC9saT48bGk+PGEgaHJlZj1cImh0dHA6Ly9rb3UucG4vXCI+S291LnBuIE1lZGlhPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL21lZHljYXRpb24uY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+TWVkeWNhdGlvbjwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly93d3cuc3VudGltZXMuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPkNoaWNhZ28gU3VuIFRpbWVzPC9hPjwvbGk+PC91bD48YnIvPjxwPjxzdHJvbmc+VGFwY2VudGl2ZSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Db21wbGV0ZSBUYXBjZW50aXZlLmNvbSBtYXJrZXRpbmcgd2Vic2l0ZSBhbmQgVVggb3ZlcmhhdWwgb2YgY29yZSBwcm9kdWN0LCB0aGUgXCJUYXBjZW50aXZlIE1hbmFnZXJcIjwvbGk+PGxpPkluZHVzdHJpYWwgZGVzaWduIG9mIHRoZSBUYXBjZW50aXZlIFRvdWNocG9pbnQ8L2xpPjxsaT5Db250ZW50IHN0cmF0ZWd5IGZvciBjb3Jwb3JhdGUgbWFya2V0aW5nIHNpdGU8L2xpPjxsaT5Nb2JpbGUgZmlyc3QgbWFya2V0aW5nIHdlYnNpdGUgdXNpbmcgSW9uaWMgYW5kIEFuZ3VsYXI8L2xpPjwvdWw+PHA+PHN0cm9uZz5DUEdpbyBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Qcm9kdWN0IGFuZCBidXNpbmVzcyBzdHJhdGVneSwgdGVjaG5pY2FsIGFyY2hpdGVjdHVyZSBhbmQgc3BlY2lmaWNhdGlvbiBkZXNpZ248L2xpPjxsaT5PbmUgaHVuZHJlZCBwYWdlIHByb3Bvc2FsIHRlbXBsYXRlIG9uIGJ1c2luZXNzIG1vZGVsIGFuZCBjb3Jwb3JhdGUgY2FwYWJpbGl0aWVzPC9saT48bGk+TWFya2V0aW5nIHdlYnNpdGUgZGVzaWduIGFuZCBjb250ZW50IHN0cmF0ZWd5PC9saT48bGk+Q29yZSBwcm9kdWN0IGRlc2lnbiBhbmQgTVZQIGZ1bmN0aW9uYWwgcHJvdG90eXBlPC9saT48L3VsPjxwPjxzdHJvbmc+S291LnBuIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPktvdS5wbiBNZWRpYSBicmFuZCByZWZyZXNoPC9saT48bGk+TWFya2V0aW5nIHNpdGUgcmVkZXNpZ248L2xpPjxsaT5Qb3J0YWwgdXNlciBleHBlcmllbmNlIG92ZXJoYXVsPC9saT48L3VsPjxwPjxzdHJvbmc+TWVkeWNhdGlvbiBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Db25jZXB0dWFsIGRlc2lnbiBhbmQgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPlVzZXIgcmVzZWFyY2g8L2xpPjxsaT5SYXBpZCBwcm90b3R5cGVzPC9saT48L3VsPjxwPjxzdHJvbmc+Q2hpY2FnbyBTdW4gVGltZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Db25jZXB0dWFsIGRlc2lnbiBhbmQgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPk5hdGl2ZSBpT1MgYW5kIEFuZHJvaWQgYXBwIGRlc2lnbiBhbmQganVuaW9yIGRldmVsb3BtZW50PC9saT48bGk+SHlicmlkIElvbmljL0FuZ3VsYXIgZGV2ZWxvcG1lbnQ8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+TUFSQ0ggMjAxMCAtIE9DVE9CRVIgMjAxMzwvaDY+PGJyLz48aDI+RGlyZWN0b3Igb2YgVXNlciBFeHBlcmllbmNlLCBMaWdodGJhbms8L2gyPjxici8+PHA+TGF1bmNoZWQgYW5kIHN1cHBvcnRlZCBtdWx0aXBsZSBuZXcgY29tcGFuaWVzIHdpdGhpbiB0aGUgTGlnaHRiYW5rIHBvcnRmb2xpby4gPC9wPjxwPjxzdHJvbmc+Q29tcGFuaWVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cIm5vXCI+PGxpPiA8YSBocmVmPVwiaHR0cDovL2NoaWNhZ29pZGVhcy5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5DaGljYWdvSWRlYXMuY29tPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL2JlbmNocHJlcC5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5CZW5jaFByZXAuY29tPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL3NuYXBzaGVldGFwcC5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5TbmFwU2hlZXRBcHAuY29tPC9hPjwvbGk+PGxpPk1vbnRobHlzLmNvbSAoZGVmdW5jdCk8L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9kb3VnaC5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5Eb3VnaC5jb208L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vZ3JvdXBvbi5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5Hcm91cG9uLmNvbTwvYT48L2xpPjwvdWw+PGJyLz48cD48c3Ryb25nPkNoaWNhZ28gSWRlYXMgRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+V2Vic2l0ZSBkZXNpZ24gcmVmcmVzaCwgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPkN1c3RvbSB0aWNrZXQgcHVyY2hhc2luZyBwbGF0Zm9ybSBVWCByZXNlYXJjaCAmYW1wOyBkZXNpZ248L2xpPjxsaT5SdWJ5IG9uIFJhaWxzIGRldmVsb3BtZW50LCBtYWludGVuZW5jZTwvbGk+PGxpPkdyYXBoaWMgZGVzaWduIHN1cHBvcnQ8L2xpPjxsaT5Bbm51YWwgcmVwb3J0IGRlc2lnbjwvbGk+PC91bD48cD48c3Ryb25nPkJlbmNoUHJlcC5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+UmUtYnJhbmRpbmcsIGNvbXBsZXRlIEJlbmNoUHJlcCBpZGVudGl0eSBwYWNrYWdlPC9saT48bGk+U3VwcG9ydGVkIGNvbXBhbnkgd2l0aCBhbGwgZGVzaWduIGFuZCB1eCBmcm9tIHplcm8gdG8gZWlnaHQgbWlsbGlvbiBpbiBmaW5hbmNpbmc8L2xpPjxsaT5MZWFkIGFydCBhbmQgVVggZGlyZWN0aW9uIGZvciB0d28geWVhcnM8L2xpPjxsaT5Gcm9udC1lbmQgdXNpbmcgQmFja2JvbmUgYW5kIEJvb3RzdHJhcDwvbGk+PGxpPlVzZXIgcmVzZWFyY2gsIGV0aG5vZ3JhcGhpYyBzdHVkaWVzLCB1c2VyIHRlc3Rpbmc8L2xpPjxsaT5FbWFpbCBtYXJrZXRpbmcgY2FkZW5jZSBzeXN0ZW0gZGVzaWduIGFuZCBleGVjdXRpb248L2xpPjxsaT5TY3JpcHRlZCwgc3Rvcnlib2FyZGVkIGFuZCBleGVjdXRlZCBib3RoIGFuaW1hdGVkIGFuZCBsaXZlIG1vdGlvbiBleHBsYWluZXIgdmlkZW9zPC9saT48L3VsPjxwPjxzdHJvbmc+U25hcFNoZWV0QXBwLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5MYXJnZSBzY2FsZSBwb3J0YWwgVVggcmVzZWFyY2ggYW5kIGluZm9ybWF0aW9uIGFyY2hpdGVjdHVyZTwvbGk+PGxpPlRocmVlIHJvdW5kcyBvZiByYXBpZCBwcm90b3R5cGluZyBhbmQgdXNlciB0ZXN0aW5nPC9saT48bGk+R3JhcGhpYyBkZXNpZ24gYW5kIGludGVyYWN0aW9uIGRlc2lnbiBmcmFtZXdvcms8L2xpPjxsaT5Vc2VyIHRlc3Rpbmc8L2xpPjwvdWw+PHA+PHN0cm9uZz5Nb250aGx5cy5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+SWRlbnRpdHkgYW5kIGFydCBkaXJlY3Rpb248L2xpPjxsaT5Qcm9kdWN0IHN0cmF0ZWd5IGFuZCBuZXcgY29tcGFueSBsYXVuY2g8L2xpPjxsaT5PbmxpbmUgbWFya2V0aW5nIHN0cmF0ZWd5LCBpbmNsdWRpbmcgdHJhbnNhY3Rpb25hbCBlbWFpbCwgcHJvbW90aW9uIGRlc2lnbiBhbmQgbGVhZCBnZW5lcmF0aW9uPC9saT48bGk+UHJvZHVjdCBleHBlcmllbmNlIGRlc2lnbiBhbmQgZnJvbnQtZW5kPC9saT48bGk+Q29udGVudCBzdHJhdGVneTwvbGk+PGxpPlNjcmlwdGVkLCBzdG9yeWJvYXJkZWQgYW5kIGV4ZWN1dGVkIGJvdGggYW5pbWF0ZWQgYW5kIGxpdmUgbW90aW9uIGV4cGxhaW5lciB2aWRlb3M8L2xpPjwvdWw+PHA+PHN0cm9uZz5Eb3VnaC5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHMgYnVsbGV0c1wiPjxsaT5Db25zdW1lciBqb3VybmV5IG1hcHBpbmcgYW5kIGV0aG5vZ3JhcGhpYyBzdHVkaWVzPC9saT48bGk+UmFwaWQgcHJvdG90eXBpbmcsIGNvbmNlcHR1YWwgZGVzaWduPC9saT48bGk+TWVzc2FnaW5nIHN0cmF0ZWd5LCB1c2VyIHRlc3Rpbmc8L2xpPjwvdWw+PHA+PHN0cm9uZz5Hcm91cG9uLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5FbWVyZ2luZyBtYXJrZXRzIHJlc2VhcmNoPC9saT48bGk+UmFwaWQgZGVzaWduIGFuZCBwcm90b3R5cGluZzwvbGk+PGxpPlZpc3VhbCBkZXNpZ24gb24gbmV3IGNvbmNlcHRzPC9saT48bGk+RW1haWwgc2VnbWVudGF0aW9uIHJlc2VhcmNoPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2Pk5PVkVNQkVSIDIwMDcgLSBBUFJJTCAyMDEwPC9oNj48YnIvPjxoMj5EZXZlbG9wZXIgJmFtcDsgQ28tZm91bmRlciwgRGlsbHllby5jb208L2gyPjxici8+PHA+Q28tZm91bmRlZCwgZGVzaWduZWQgYW5kIGRldmVsb3BlZCBhIGRhaWx5IGRlYWwgZUNvbW1lcmNlIHdlYnNpdGUuPC9wPjxwPjxzdHJvbmc+Um9sZTwvc3Ryb25nPjxici8+RGVzaWduZWQsIGRldmVsb3BlZCBhbmQgbGF1bmNoZWQgY29tcGFuaWVzIGZpcnN0IGNhcnQgd2l0aCBQSFAuIEl0ZXJhdGVkIGFuZCBncmV3IHNpdGUgdG8gbW9yZSB0aGFuIHR3byBodW5kcmVkIGFuZCBmaWZ0eSB0aG91c2FuZCBzdWJzY3JpYmVycyBpbiBsZXNzIHRoYW4gb25lIHllYXIuIDwvcD48cD48c3Ryb25nPk5vdGVhYmxlIFN0YXRzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+QnVpbHQgYSBsaXN0IG9mIDI1MCwwMDAgc3Vic2NyaWJlcnMgaW4gdGhlIGZpcnN0IHllYXI8L2xpPjxsaT5QaXZvdGVkIGFuZCB0d2Vha2VkIGRlc2lnbiwgYnVzaW5lc3MgYW5kIGFwcHJvYWNoIHRvIDEwMDAgdHJhbnNhY3Rpb25zIHBlciBkYWlseTwvbGk+PGxpPlNvbGQgYnVzaW5lc3MgaW4gRGVjZW1iZXIgMjAwOSB0byBJbm5vdmF0aXZlIENvbW1lcmNlIFNvbHV0aW9uczwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5NQVJDSCAyMDA1IC0gT0NUT0JFUiAyMDA3PC9oNj48YnIvPjxoMj5Tb2x1dGlvbnMgQXJjaGl0ZWN0ICZhbXA7IFNlbmlvciBEZXZlbG9wZXIsIDxhIGhyZWY9XCJodHRwOi8vd3d3Lm1hbmlmZXN0ZGlnaXRhbC5jb20vXCI+TWFuaWZlc3QgRGlnaXRhbDwvYT48L2gyPjxici8+PHA+QnVpbHQgYW5kIG1hbmFnZWQgbXVsdGlwbGUgQ2FyZWVyQnVpbGRlci5jb20gbmljaGUgc2l0ZXMgZm9yIHRoZSBsYXJnZXN0IGluZGVwZW5kZW50IGFnZW5jeSBpbiB0aGUgbWlkd2VzdC48L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5SZXNlYXJjaCBhbmQgZXhwbG9yZSBlbWVyZ2luZyB0ZWNobm9sb2dpZXMsIGltcGxlbWVudCBzb2x1dGlvbnMgYW5kIG1hbmFnZSBvdGhlciBkZXZlbG9wZXJzLiBXb3JrZWQgd2l0aCBhc3AubmV0IG9uIGEgZGFpbHkgYmFzaXMgZm9yIGFsbW9zdCB0d28geWVhcnMuIDwvcD48cD48c3Ryb25nPk5vdGVhYmxlIEFjY29tcGxpc2htZW50czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPlJlY29nbml6ZWQgZm9yIGxhdW5jaGluZyBoaWdoIHF1YWxpdHkgd2ViIGFwcCBmb3IgQ2FyZWVyIEJ1aWxkZXIgaW4gcmVjb3JkIHRpbWU8L2xpPjxsaT5NYW5hZ2VkIGV4dHJlbWUgU0VPIHByb2plY3Qgd2l0aCBtb3JlIHRoYW4gNTAwIHRob3VzYW5kIGxpbmtzLCBwYWdlcyBhbmQgb3ZlciA4IG1pbGxpb24gVUdDIGFydGlmYWN0czwvbGk+PGxpPlNoaWZ0ZWQgYWdlbmNpZXMgZGV2ZWxvcG1lbnQgcHJhY3RpY2VzIHRvIHZhcmlvdXMgbmV3IGNsaWVudC1jZW50cmljIEFKQVggbWV0aG9kb2xvZ2llczwvbGk+PGxpPk1hbmFnZWQgbXVsdGlwbGUgcHJvamVjdHMgY29uY3VycmVudGx5LCBpbmNsdWRpbmcgY2hvb3NlY2hpY2Fnby5jb20gYW5kIGJyaWVmaW5nLmNvbTwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5BUFJJTCAyMDA0IC0gSkFOVUFSWSAyMDA3PC9oNj48YnIvPjxoMj5KdW5pb3IgUExEIERldmVsb3BlciwgIDxhIGhyZWY9XCJodHRwOi8vd3d3Lm1hbmlmZXN0ZGlnaXRhbC5jb20vXCI+QXZlbnVlPC9hPjwvaDI+PGJyLz48cD5Gcm9udC1lbmQgZGV2ZWxvcGVyIGFuZCBVWCBkZXNpZ24gaW50ZXJuIGZvciBBdmVudWUgQSBSYXpvcmZpc2hzXFwnIGxlZ2FjeSBjb21wYW55LCBBdmVudWUtaW5jLjwvcD48cD48c3Ryb25nPlJvbGU8L3N0cm9uZz48YnIvPkRldmVsb3AgZnJvbnQtZW5kIGZvciBtdWx0aXBsZSBjbGllbnQgd2Vic2l0ZXMsIGluY2x1ZGluZyBmbG9yLmNvbSwgYWNoaWV2ZW1lbnQub3JnLCBjYW55b25yYW5jaC5jb20gYW5kIHR1cmJvY2hlZi48L3A+PHA+PHN0cm9uZz5Ob3RlYWJsZSBBY2NvbXBsaXNobWVudHM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5FeGVjdXRlZCBmcm9udC1lbmQgcHJvamVjdHMgb24tdGltZSBhbmQgdW5kZXItYnVkZ2V0PC9saT48bGk+QXNzaWduZWQgVVggaW50ZXJuc2hpcCByb2xlLCByZWNvZ25pemVkIGJ5IGRlc2lnbiB0ZWFtIGFzIGEgeW91bmcgdGFsZW50PC9saT48bGk+V2lyZWZyYW1lZCBjdXN0b20gc2hvcHBpbmcgY2FydCBwbGF0Zm9ybSBmb3IgZmxvci5jb208L2xpPjxsaT5EZXZlbG9wZWQgaW50ZXJuYWwgU0VPIHByYWN0aWNlPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2PkpVTFkgMjAwMCAtIEpBTlVBUlkgMjAwNDwvaDY+PGJyLz48aDI+ZUNvbW1lcmNlIERldmVsb3BlciwgQXRvdmE8L2gyPjxici8+PHA+R2VuZXJhbCB3ZWIgZGVzaWduZXIgYW5kIGRldmVsb3BlciBmb3IgZmFtaWx5IG93bmVkIHBhaW50IGRpc3RyaWJ1dGlvbiBidXNpbmVzcy4gPC9wPjxwPjxzdHJvbmc+Um9sZTwvc3Ryb25nPjxici8+QnVpbHQgc2V2ZXJhbCBzaG9wcGluZyBjYXJ0cyBpbiBjbGFzc2ljIEFTUCBhbmQgUEhQLiBHcmV3IGJ1c2luZXNzIHVzaW5nIG9ubGluZSBtYXJrZXRpbmcgc3RyYXRlZ2llcyB0byB0d28gbWlsbGlvbiBpbiByZXZlbnVlLiA8L3A+PHA+PHN0cm9uZz5Ob3RlYWJsZSBBY2NvbXBsaXNobWVudHM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5CZWNhbWUgZmlyc3QgY29tcGFueSB0byBzaGlwIHBhaW50cyBhbmQgY29hdGluZ3MgYWNyb3NzIHRoZSBVbml0ZWQgU3RhdGVzPC9saT48bGk+Rmlyc3QgZW1wbG95ZWUsIGRldmVsb3BlZCBjb21wYW55IHRvIDIrIG1pbGxpb24gaW4gcmV2ZW51ZSB3aXRoIE92ZXJ0dXJlLCBHb29nbGUgQWR3b3JkcyBhbmQgU0VPPC9saT48bGk+Q3JlYXRlZCwgbWFya2V0ZWQgYW5kIHN1YnNjcmliZWQgdm9jYXRpb25hbCBzY2hvb2wgZm9yIHNwZWNpYWx0eSBjb2F0aW5nczwvbGk+PGxpPldvcmtlZCB3aXRoIHRvcCBJdGFsaWFuIHBhaW50IG1hbnVmYWN0dXJlcnMgb3ZlcnNlYXMgdG8gYnVpbGQgZXhjbHVzaXZlIGRpc3RyaWJ1dGlvbiByaWdodHM8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+U0VQVEVNQkVSIDIwMDAgLSBNQVkgMjAwMjwvaDY+PGJyLz48aDI+RWR1Y2F0aW9uPC9oMj48YnIvPjxwPlNlbGYgZWR1Y2F0ZWQgZGVzaWduZXIvcHJvZ3JhbW1lciB3aXRoIHZvY2F0aW9uYWwgdHJhaW5pbmcuIDwvcD48cD48c3Ryb25nPkNlcnRpZmljYXRpb25zPC9zdHJvbmc+PGJyLz5pTkVUKywgQSsgQ2VydGlmaWNhdGlvbiA8L3A+PHA+PHN0cm9uZz5BcHByZW50aWNlc2hpcDwvc3Ryb25nPjxici8+WWVhciBsb25nIHBlcnNvbmFsIGFwcHJlbnRpY2VzaGlwIHdpdGggZmlyc3QgZW5naW5lZXIgYXQgQW1hem9uLmNvbTwvcD48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48YnIvPjxici8+J1xuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iVGFwY2VudGl2ZUN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iVGFwY2VudGl2ZVR3b0N0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iQ3BnaW9DdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYk1lZHljYXRpb25DdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYkNzdEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iS291cG5DdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYk1lZHljYXRpb25DdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYk1lZHljYXRpb25DdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYlRyb3VuZEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTW9udGhseXNPbmVDdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYk1vbnRobHlzVHdvQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JCZW5jaHByZXBDdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0NvbnRhY3RDdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0RldmVsb3BlcnNDdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0RldmVsb3BlckNlbnRlckN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnRG9jc0N0cmwnLCAoJHNjb3BlLCBEb2NzKSAtPlxuICAkc2NvcGUuJHdhdGNoICgtPiBEb2NzLmxpc3QpLCAtPlxuICAgICRzY29wZS5kb2NzID0gRG9jcy5saXN0XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdEb2NDdHJsJywgKCRzY29wZSwgJHNjZSwgJHN0YXRlUGFyYW1zLCAkdGltZW91dCwgRG9jcykgLT5cbiAgJHNjb3BlLmluZGV4ID0gaWYgJHN0YXRlUGFyYW1zLnN0ZXAgdGhlbiAkc3RhdGVQYXJhbXMuc3RlcC0xIGVsc2UgMFxuXG4gICRzY29wZS4kd2F0Y2ggKC0+IERvY3MubGlzdCksIC0+XG4gICAgJHNjb3BlLmRvYyA9IERvY3MuZmluZCgkc3RhdGVQYXJhbXMucGVybWFsaW5rKVxuICAgIGlmICRzY29wZS5kb2NcbiAgICAgICRzY29wZS5zdGVwID0gJHNjb3BlLmRvYy5zdGVwc1skc2NvcGUuaW5kZXhdXG4gICAgICAkc2NvcGUuc3RlcC51cmwgPSAkc2NlLnRydXN0QXNSZXNvdXJjZVVybCgkc2NvcGUuc3RlcC51cmwpXG5cbiAgICAgIGlmICRzY29wZS5zdGVwLnR5cGUgPT0gJ2RpYWxvZydcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2VJbmRleCA9IDBcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gW11cbiAgICAgICAgJHRpbWVvdXQoJHNjb3BlLm5leHRNZXNzYWdlLCAxMDAwKVxuXG4gICRzY29wZS5oYXNNb3JlU3RlcHMgPSAtPlxuICAgIGlmICRzY29wZS5zdGVwXG4gICAgICAkc2NvcGUuc3RlcC5pbmRleCA8ICRzY29wZS5kb2Muc3RlcHMubGVuZ3RoXG5cbkZyYW5jaGluby5kaXJlY3RpdmUgJ215U2xpZGVzaG93JywgLT5cbiAgcmVzdHJpY3Q6ICdBQydcbiAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycykgLT5cbiAgICBjb25maWcgPSBhbmd1bGFyLmV4dGVuZChcbiAgICAgIHNsaWRlczogJy5zbGlkZScsICBcbiAgICBzY29wZS4kZXZhbChhdHRycy5teVNsaWRlc2hvdykpXG4gICAgc2V0VGltZW91dCAoLT5cbiAgICAgICQoZWxlbWVudCkuY3ljbGUgLT5cbiAgICAgICAgZng6ICAgICAnZmFkZScsIFxuICAgICAgICBzcGVlZDogICdmYXN0JyxcbiAgICAgICAgbmV4dDogICAnI25leHQyJywgXG4gICAgICAgIHByZXY6ICAgJyNwcmV2MicsXG4gICAgICAgIGNhcHRpb246ICcjYWx0LWNhcHRpb24nLFxuICAgICAgICBjYXB0aW9uX3RlbXBsYXRlOiAne3tpbWFnZXMuYWx0fX0nLFxuICAgICAgICBwYXVzZV9vbl9ob3ZlcjogJ3RydWUnXG4gICAgICAgICAgXG4gICAgKSwgMFxuIiwiXG4jIG5vdCBzdXJlIGlmIHRoZXNlIGFyZSBhY3R1YWxseSBpbmplY3RpbmcgaW50byB0aGUgYXBwIG1vZHVsZSBwcm9wZXJseVxuYW5ndWxhci5tb2R1bGUoXCJ0YXAuY29udHJvbGxlcnNcIiwgW10pXG5cbiMgbW92ZSBjb250cm9sbGVycyBoZXJlXG5cblxuXG5cbiIsImFuZ3VsYXIubW9kdWxlKFwidGFwLmRpcmVjdGl2ZXNcIiwgW10pXG4gIC5kaXJlY3RpdmUgXCJkZXZpY2VcIiwgLT5cbiAgICByZXN0cmljdDogXCJBXCJcbiAgICBsaW5rOiAtPlxuICAgICAgZGV2aWNlLmluaXQoKVxuXG4gIC5zZXJ2aWNlICdjb3B5JywgKCRzY2UpIC0+XG4gICAgY29weSA9XG4gICAgICBhYm91dDpcbiAgICAgICAgaGVhZGluZzogXCJXZSdyZSA8c3Ryb25nPnRhcHBpbmc8L3N0cm9uZz4gaW50byB0aGUgZnV0dXJlXCJcbiAgICAgICAgc3ViX2hlYWRpbmc6IFwiVGFwY2VudGl2ZSB3YXMgY3JlYXRlZCBieSBhIHRlYW0gdGhhdCBoYXMgbGl2ZWQgdGhlIG1vYmlsZSBjb21tZXJjZSByZXZvbHV0aW9uIGZyb20gdGhlIGVhcmxpZXN0IGRheXMgb2YgbUNvbW1lcmNlIHdpdGggV0FQLCB0byBsZWFkaW5nIHRoZSBjaGFyZ2UgaW4gbW9iaWxlIHBheW1lbnRzIGFuZCBzZXJ2aWNlcyB3aXRoIE5GQyB3b3JsZHdpZGUuXCJcbiAgICAgICAgY29weTogXCI8cD5Gb3IgdXMsIG1vYmlsZSBjb21tZXJjZSBoYXMgYWx3YXlzIGJlZW4gYWJvdXQgbXVjaCBtb3JlIHRoYW4gcGF5bWVudDogIG1hcmtldGluZywgcHJvbW90aW9ucywgcHJvZHVjdCBjb250ZW50LCBhbmQgbG95YWx0eSwgYWxsIGNvbWUgdG8gbGlmZSBpbnNpZGUgYSBtb2JpbGUgcGhvbmUuIE1vYmlsZSBjb21tZXJjZSByZWFsbHkgZ2V0cyBpbnRlcmVzdGluZyB3aGVuIGl0IGJyaWRnZXMgdGhlIGRpZ2l0YWwgYW5kIHBoeXNpY2FsIHdvcmxkcy48L3A+PHA+T3VyIGdvYWwgYXQgVGFwY2VudGl2ZSBpcyB0byBjcmVhdGUgYSBzdGF0ZS1vZi10aGUtYXJ0IG1vYmlsZSBlbmdhZ2VtZW50IHBsYXRmb3JtIHRoYXQgZW5hYmxlcyBtYXJrZXRlcnMgYW5kIGRldmVsb3BlcnMgdG8gY3JlYXRlIGVudGlyZWx5IG5ldyBjdXN0b21lciBleHBlcmllbmNlcyBpbiBwaHlzaWNhbCBsb2NhdGlvbnMg4oCTIGFsbCB3aXRoIGEgbWluaW11bSBhbW91bnQgb2YgdGVjaG5vbG9neSBkZXZlbG9wbWVudC48L3A+PHA+V2UgdGhpbmsgeW914oCZbGwgbGlrZSB3aGF0IHdl4oCZdmUgYnVpbHQgc28gZmFyLiBBbmQganVzdCBhcyBtb2JpbGUgdGVjaG5vbG9neSBpcyBjb25zdGFudGx5IGV2b2x2aW5nLCBzbyBpcyB0aGUgVGFwY2VudGl2ZSBwbGF0Zm9ybS4gR2l2ZSBpdCBhIHRlc3QgZHJpdmUgdG9kYXkuPC9wPlwiXG4gICAgICB0ZWFtOlxuICAgICAgICBoZWFkaW5nOiBcIlwiXG4gICAgICAgIGJpb3M6XG4gICAgICAgICAgZGF2ZV9yb2xlOiBcIlwiXG4gICAgICAgICAgZGF2ZV9jb3B5OiBcIlwiXG4gICAgXG5cblxuICAgIHRydXN0VmFsdWVzID0gKHZhbHVlcykgLT5cbiAgICAgIF8uZWFjaCB2YWx1ZXMsICh2YWwsIGtleSkgLT5cbiAgICAgICAgc3dpdGNoIHR5cGVvZih2YWwpXG4gICAgICAgICAgd2hlbiAnc3RyaW5nJ1xuICAgICAgICAgICAgJHNjZS50cnVzdEFzSHRtbCh2YWwpXG4gICAgICAgICAgd2hlbiAnb2JqZWN0J1xuICAgICAgICAgICAgdHJ1c3RWYWx1ZXModmFsKVxuXG4gICAgdHJ1c3RWYWx1ZXMoY29weSlcblxuICAgIGNvcHlcbiIsImlmIGRldmljZS5kZXNrdG9wKClcblxuZWxzZSBpZiBkZXZpY2UubW9iaWxlKClcblxuXHQkID0gZG9jdW1lbnQgIyBzaG9ydGN1dFxuXHRjc3NJZCA9ICdteUNzcycgIyB5b3UgY291bGQgZW5jb2RlIHRoZSBjc3MgcGF0aCBpdHNlbGYgdG8gZ2VuZXJhdGUgaWQuLlxuXHRpZiAhJC5nZXRFbGVtZW50QnlJZChjc3NJZClcblx0ICAgIGhlYWQgID0gJC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG5cdCAgICBsaW5rICA9ICQuY3JlYXRlRWxlbWVudCgnbGluaycpXG5cdCAgICBsaW5rLmlkICAgPSBjc3NJZFxuXHQgICAgbGluay5yZWwgID0gJ3N0eWxlc2hlZXQnXG5cdCAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnXG5cdCAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly9jb2RlLmlvbmljZnJhbWV3b3JrLmNvbS8xLjAuMC1iZXRhLjEzL2Nzcy9pb25pYy5taW4uY3NzJ1xuXHQgICAgbGluay5tZWRpYSA9ICdhbGwnXG5cdCAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=