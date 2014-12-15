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

Franchino.controller("BlogCtrl", function($scope) {
  return $scope.articles = [
    {
      "date": "Posted by Franchino on December 12, 2014",
      "heading": "My path to learning Swift",
      "authorimg": "/img/frank.png",
      "img": "/img/dec/newsletter-swiftris-header.gif",
      "blob": "I've been an MVC developer in every language except for iOS. This past October, I took my first real deep dive into iOS programming and started with Swift. There are two great tutorials out there. The first is from bloc.io and is free. It's a game, Swiftris, so get ready for some action. The second will help you build something more appish, it's by Appcoda. Got their book and will be done with it this week. So far, books ok, but it moves really slow.",
      "resource1": "https://www.bloc.io/swiftris-build-your-first-ios-game-with-swift",
      "resource2": "http://www.appcoda.com/swift/"
    }, {
      "date": "Posted by Franchino on December 11, 2014",
      "heading": "Why I get goose bumps when you talk about automated email marketing and segmentation and customer.io and things like that.",
      "authorimg": "/img/frank.png",
      "img": "/img/dec/prepemails.png",
      "blob": "I get teary eyed when I talk about my work at BenchPrep.com. In short, I was the first employee and helped the company get to their series B near the end of year two. I got a lot done there, and one of the things I really enjoyed was building out technology to segment leads, bring different users down different communication paths and how I mapped out the entire system using complex diagrams and workflows. Some of the tools were built and based on ques like Redis or Resque, others we built into ExactTarget and Customer.io. In the end, I became somewhat of an expert at monetizing emails. Within our email marketing channel, we explored tagging users based on their actions, such as opens or non opens, or what they clicked on, we targed email users who had been touched seven times with special irrisitable sales, because we know after 6 touches, we could convert. These tricks we learned led to 25-30k days, and eventually, days where we sold 100k worth of subscriptions. So, my point? Don't be surprised if I geek out and faint when I hear you talk about transactional emailing and cadences and consumer journies and stuff like that."
    }, {
      "date": "Posted by Franchino on December 10, 2014",
      "heading": "If I could have one wish; I get to use this method when designing your consumer journey funnel.",
      "authorimg": "/img/frank.png",
      "img": "/img/dec/ux_board.jpg",
      "blob": "So after a bunch of ethnographic studies from persona matches I gather in-person, I get to fill a wall up with key things people said, felt, heard - motivators, barriers, questions, attitudes and such. I then group these post-it thoughts in various ways, looking for patterns, sentiment, new ideas. I then take this rich data and develop a what could be branding, a landing page or an email - with what I call, an inverted pyramid approach to content, where addressing the most important things found in the user research get addressed in a heriarchical order. I create 5-6 iterations of the landing page and re-run them through a second group of participants, stakeholders and friends. I then take even more notes on peoples speak-aloud reactions to the landing pages. After this, I'm ready to design the final copy and pages for your funnel."
    }, {
      "date": "Posted by Franchino on December 9, 2014",
      "heading": "Did I even belong here?",
      "authorimg": "/img/frank.png",
      "img": "/img/dec/ucla.jpg",
      "blob": "This coming weekend there's probably a hackathon going on in your city. Some of them are getting really big. I wasn't registered for LA Hacks this summer. I don't even know how I ended up there on a Friday night, but when I saw what was going on, I grabbed a chair and started hacking away. Worried I had just snuck in the back door and started competing, my ride left and there I was, for the next two days. That's right. I snuck in the back of LA Hacks last summer at UCLA and hacked with kids 10 years younger than me. I couldn't miss it. I was floored when I saw how many people were in it. Me, being the mischevious hacker I am, I thought if I used the energy of the environment to my advantage, I could build something cool. Long story short, let me just say, that if you have been having a hard time launching, sign up for a hackathon. It's a guaranteed way to over-compensate for your constant failure to launch. More on what happened when I took the stage by surprise and got booted later..."
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJjb250cm9sbGVycy5jb2ZmZWUiLCJkaXJlY3RpdmVzLmNvZmZlZSIsImluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFIO0FBQ0UsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixPQUFPLENBQUMsTUFBUixDQUFlLFdBQWYsRUFBNEIsQ0FBQyxZQUFELEVBQWUsV0FBZixFQUE0QixrQkFBNUIsRUFBZ0QsaUJBQWhELEVBQW1FLGdCQUFuRSxDQUE1QixDQUFuQixDQURGO0NBQUEsTUFBQTtBQUlFLEVBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUIsT0FBTyxDQUFDLE1BQVIsQ0FBZSxXQUFmLEVBQTRCLENBQUUsT0FBRixFQUFXLGtCQUFYLEVBQStCLGlCQUEvQixFQUFrRCxnQkFBbEQsQ0FBNUIsQ0FDakIsQ0FBQyxHQURnQixDQUNaLFNBQUMsY0FBRCxHQUFBO1dBQ0gsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsU0FBQSxHQUFBO0FBQ25CLE1BQUEsSUFBNEIsTUFBTSxDQUFDLFNBQW5DO2VBQUEsU0FBUyxDQUFDLFlBQVYsQ0FBQSxFQUFBO09BRG1CO0lBQUEsQ0FBckIsRUFERztFQUFBLENBRFksQ0FBbkIsQ0FKRjtDQUFBOztBQUFBLFNBU1MsQ0FBQyxNQUFWLENBQWlCLFNBQUMsY0FBRCxFQUFpQixrQkFBakIsRUFBcUMsaUJBQXJDLEVBQXdELGFBQXhELEdBQUE7QUFDZixFQUFBLGNBQ0UsQ0FBQyxLQURILENBQ1MsS0FEVCxFQUVJO0FBQUEsSUFBQSxHQUFBLEVBQUssRUFBTDtBQUFBLElBQ0EsUUFBQSxFQUFVLElBRFY7QUFBQSxJQUVBLFVBQUEsRUFBWSxTQUZaO0FBQUEsSUFHQSxXQUFBLEVBQWEsV0FIYjtHQUZKLENBT0UsQ0FBQyxLQVBILENBT1MsVUFQVCxFQVFJO0FBQUEsSUFBQSxHQUFBLEVBQUssR0FBTDtBQUFBLElBQ0EsS0FBQSxFQUNFO0FB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QTtBQUFBLElBRUEsSUFBSSxDQUFDLEVBQUwsR0FBWSxLQUZaLENBQUE7QUFBQSxJQUdBLElBQUksQ0FBQyxHQUFMLEdBQVksWUFIWixDQUFBO0FBQUEsSUFJQSxJQUFJLENBQUMsSUFBTCxHQUFZLFVBSlosQ0FBQTtBQUFBLElBS0EsSUFBSSxDQUFDLElBQUwsR0FBWSxpRUFMWixDQUFBO0FBQUEsSUFNQSxJQUFJLENBQUMsS0FBTCxHQUFhLEtBTmIsQ0FBQTtBQUFBLElBT0EsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsSUFBakIsQ0FQQSxDQURKO0dBSkk7Q0FGTCIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmIGRldmljZS5kZXNrdG9wKClcbiAgd2luZG93LkZyYW5jaGlubyA9IGFuZ3VsYXIubW9kdWxlKCdGcmFuY2hpbm8nLCBbJ25nU2FuaXRpemUnLCAndWkucm91dGVyJywgJ2J0Zm9yZC5zb2NrZXQtaW8nLCAndGFwLmNvbnRyb2xsZXJzJywgJ3RhcC5kaXJlY3RpdmVzJ10pXG5cbmVsc2VcbiAgd2luZG93LkZyYW5jaGlubyA9IGFuZ3VsYXIubW9kdWxlKFwiRnJhbmNoaW5vXCIsIFsgXCJpb25pY1wiLCBcImJ0Zm9yZC5zb2NrZXQtaW9cIiwgXCJ0YXAuY29udHJvbGxlcnNcIiwgJ3RhcC5kaXJlY3RpdmVzJ10pXG4gICAgLnJ1biAoJGlvbmljUGxhdGZvcm0pIC0+XG4gICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeSAtPlxuICAgICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCkgaWYgd2luZG93LlN0YXR1c0JhclxuXG5GcmFuY2hpbm8uY29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJGh0dHBQcm92aWRlcikgLT5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUgJ2FwcCcsXG4gICAgICB1cmw6ICcnXG4gICAgICBhYnN0cmFjdDogdHJ1ZVxuICAgICAgY29udHJvbGxlcjogJ0FwcEN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ21lbnUuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmhvbWUnLFxuICAgICAgdXJsOiAnLydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdob21lLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5kb2NzJyxcbiAgICAgIHVybDogJy9kb2NzJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdEb2NzQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2RvY3MvaW5kZXguaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmFib3V0JyxcbiAgICAgIHVybDogJy9hYm91dCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnQWJvdXRDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYWJvdXQuaHRtbCdcblxuXG4gICAgLnN0YXRlICdhcHAuYmxvZycsXG4gICAgICB1cmw6ICcvYmxvZydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnQmxvZ0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdibG9nLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5yZXN1bWUnLFxuICAgICAgdXJsOiAnL3Jlc3VtZSdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnUmVzdW1lQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3Jlc3VtZS5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuY29udGFjdCcsXG4gICAgICB1cmw6ICcvY29udGFjdCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdjb250YWN0Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5kb2MnLFxuICAgICAgdXJsOiAnL2RvY3MvOnBlcm1hbGluaydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnRG9jQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2RvY3Mvc2hvdy5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuc3RlcCcsXG4gICAgICB1cmw6ICcvZG9jcy86cGVybWFsaW5rLzpzdGVwJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdEb2NDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9zaG93Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItdGFwY2VudGl2ZScsXG4gICAgICB1cmw6ICcvam9iLXRhcGNlbnRpdmUnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0pvYlRhcGNlbnRpdmVDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLXRhcGNlbnRpdmUuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi10YXBjZW50aXZlLXR3bycsXG4gICAgICB1cmw6ICcvam9iLXRhcGNlbnRpdmUtdHdvJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JUYXBjZW50aXZlVHdvQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi10YXBjZW50aXZlLXR3by5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLWNwZ2lvJyxcbiAgICAgIHVybDogJy9qb2ItY3BnaW8nXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0pvYkNwZ2lvQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi1jcGdpby5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLW1lZHljYXRpb24nLFxuICAgICAgdXJsOiAnL2pvYi1tZWR5Y2F0aW9uJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JNZWR5Y2F0aW9uQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi1tZWR5Y2F0aW9uLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItY3N0JyxcbiAgICAgIHVybDogJy9qb2ItY3N0J1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JDc3RDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLWNzdC5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLWtvdXBuJyxcbiAgICAgIHVybDogJy9qb2Ita291cG4nXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0pvYktvdXBuQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi1rb3Vwbi5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLXRyb3VuZCcsXG4gICAgICB1cmw6ICcvam9iLXRyb3VuZCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iVHJvdW5kQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi10cm91bmQuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi1tb250aGx5cycsXG4gICAgICB1cmw6ICcvam9iLW1vbnRobHlzJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JNb250aGx5c0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItbW9udGhseXMuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi1tb250aGx5cy10d28nLFxuICAgICAgdXJsOiAnL2pvYi1tb250aGx5cy10d28nXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0pvYk1vbnRobHlzVHdvQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi1tb250aGx5cy10d28uaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi1iZW5jaHByZXAnLFxuICAgICAgdXJsOiAnL2pvYi1iZW5jaHByZXAnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0pvYkJlbmNocHJlcEN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItYmVuY2hwcmVwLmh0bWwnXG5cblxuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSBcIi9cIlxuXG4gICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCAtPlxuICAgICAgIHJlcXVlc3Q6IChjb25maWcpIC0+XG4gICAgICAgICBpZiBjb25maWcudXJsLm1hdGNoKC9cXC5odG1sJC8pICYmICFjb25maWcudXJsLm1hdGNoKC9ec2hhcmVkXFwvLylcbiAgICAgICAgICAgaWYgZGV2aWNlLnRhYmxldCgpXG4gICAgICAgICAgICAgdHlwZSA9ICd0YWJsZXQnXG4gICAgICAgICAgIGVsc2UgaWYgZGV2aWNlLm1vYmlsZSgpXG4gICAgICAgICAgICAgdHlwZSA9ICdtb2JpbGUnXG4gICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICB0eXBlID0gJ2Rlc2t0b3AnXG5cbiAgICAgICAgICAgY29uZmlnLnVybCA9IFwiLyN7dHlwZX0vI3tjb25maWcudXJsfVwiXG5cbiAgICAgICAgIGNvbmZpZ1xuXG5GcmFuY2hpbm8ucnVuICgkc3RhdGUpIC0+XG4gICRzdGF0ZS5nbygnYXBwLmhvbWUnKVxuXG5GcmFuY2hpbm8ucnVuICgkcm9vdFNjb3BlLCBjb3B5KSAtPlxuICAkcm9vdFNjb3BlLmNvcHkgPSBjb3B5XG5cbkZyYW5jaGluby5mYWN0b3J5ICdTb2NrZXQnLCAoc29ja2V0RmFjdG9yeSkgLT5cbiAgc29ja2V0RmFjdG9yeSgpXG5cbkZyYW5jaGluby5mYWN0b3J5ICdEb2NzJywgKFNvY2tldCkgLT5cbiAgc2VydmljZSA9XG4gICAgbGlzdDogW11cbiAgICBmaW5kOiAocGVybWFsaW5rKSAtPlxuICAgICAgXy5maW5kIHNlcnZpY2UubGlzdCwgKGRvYykgLT5cbiAgICAgICAgZG9jLnBlcm1hbGluayA9PSBwZXJtYWxpbmtcblxuICBTb2NrZXQub24gJ2RvY3MnLCAoZG9jcykgLT5cbiAgICBzZXJ2aWNlLmxpc3QgPSBkb2NzXG5cbiAgc2VydmljZVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSG9tZUN0cmwnLCAoJHNjb3BlKSAtPlxuICBcbkZyYW5jaGluby5jb250cm9sbGVyICdDb250YWN0U2hlZXRDdHJsJywgKCRzY29wZSwgJGlvbmljQWN0aW9uU2hlZXQpIC0+XG4gICRzY29wZS5zaG93QWN0aW9uc2hlZXQgPSAtPlxuICAgICRpb25pY0FjdGlvblNoZWV0LnNob3dcbiAgICAgIHRpdGxlVGV4dDogXCJDb250YWN0IEZyYW5jaGlub1wiXG4gICAgICBidXR0b25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIkdpdGh1YiA8aSBjbGFzcz1cXFwiaWNvbiBpb24tc2hhcmVcXFwiPjwvaT5cIlxuICAgICAgICB9XG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIkVtYWlsIE1lIDxpIGNsYXNzPVxcXCJpY29uIGlvbi1lbWFpbFxcXCI+PC9pPlwiXG4gICAgICAgIH1cbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiVHdpdHRlciA8aSBjbGFzcz1cXFwiaWNvbiBpb24tc29jaWFsLXR3aXR0ZXJcXFwiPjwvaT5cIlxuICAgICAgICB9XG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIjIyNC0yNDEtOTE4OSA8aSBjbGFzcz1cXFwiaWNvbiBpb24taW9zLXRlbGVwaG9uZVxcXCI+PC9pPlwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICAgIGNhbmNlbFRleHQ6IFwiQ2FuY2VsXCJcbiAgICAgIGNhbmNlbDogLT5cbiAgICAgICAgY29uc29sZS5sb2cgXCJDQU5DRUxMRURcIlxuICAgICAgICByZXR1cm5cblxuICAgICAgYnV0dG9uQ2xpY2tlZDogKGluZGV4KSAtPlxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiMjI0LTI0MS05MTg5XCIgIGlmIGluZGV4IGlzIDJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImh0dHA6Ly90d2l0dGVyLmNvbS9mcmFuY2hpbm9fY2hlXCIgIGlmIGluZGV4IGlzIDJcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcIm1haWx0bzpmcmFuY2hpbm8ubm9uY2VAZ21haWwuY29tXCIgIGlmIGluZGV4IGlzIDFcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBcImh0dHA6Ly9naXRodWIuY29tL2ZyYW5ndWNjXCIgIGlmIGluZGV4IGlzIDBcbiAgICAgICAgdHJ1ZVxuXG4gIHJldHVyblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJTbGlkZXNUYXBPbmVDdHJsXCIsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ05PVkVNQkVSIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdUYXBjZW50aXZlIG1hbmFnZXIgVVggb3ZlcmhhdWwgYW5kIGZyb250LWVuZCdcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJUYXBjZW50aXZlLmNvbSBVWCBvdmVyaGF1bCBhbmQgU1BBIGZyb250LWVuZFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9naWYvcmVwb3J0LmdpZlwiLFxuICAgICAgXCJ0ZXh0XCIgOiBcIjxwPlN0dWR5IHRoZSB1c2VyIGFuZCB0aGVpciBnb2FscyBhbmQgb3ZlcmhhdWwgdGhlIGV4cGVyaWVuY2Ugd2hpbGUgcmUtd3JpdGluZyB0aGUgZnJvbnQtZW5kIGluIEFuZ3VsYXIuPC9wPjxhIGhyZWY9J2h0dHA6Ly90YXBjZW50aXZlLmNvbScgdGFyZ2V0PSdfYmxhbmsnPlZpc2l0IFdlYnNpdGU8L2E+XCJcbiAgICB9XG4gIF1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJTbGlkZXNUYXBUd29DdHJsXCIsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ09DVE9CRVIgMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ0Rlc2t0b3AgYW5kIG1vYmlsZSB3ZWIgZnJpZW5kbHkgbWFya2V0aW5nIHdlYnNpdGUnIFxuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLXRhcGNlbnRpdmUteWVsbG93LmpwZ1wiLFxuICAgICAgXCJ0ZXh0XCIgOiBcIjxwPkNyZWF0ZSBhIGtub2Nrb3V0IGJyYW5kIHN0cmF0ZWd5IHdpdGggYW4gYXdlc29tZSBsb29rIGFuZCBmZWVsLiBNYWtlIGEgc29waGlzdGljYXRlZCBvZmZlcmluZyBsb29rIHNpbXBsZSBhbmQgZWFzeSB0byB1c2UuPC9wPjxhIGhyZWY9J2h0dHA6Ly90YXBjZW50aXZlLmNvbScgdGFyZ2V0PSdfYmxhbmsnPlZpc2l0IFdlYnNpdGU8L2E+XCJcbiAgICB9XG5cbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc0NwZ0N0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnSlVMWSAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnSWRlbnRpdHksIGZ1bGwtc3RhY2sgTVZQLCBhbmQgbWFya2V0aW5nIHdlYnNpdGUgZm9yIGEgbmV3IENQRyBlRGlzdHJpYnV0aW9uIGNvbXBhbnknIFxuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNpbm9fY3BnaW8uanBnXCIsXG4gICAgICBcInRleHRcIiA6IFwiPHA+VHVybiBhbiBvbGQgc2Nob29sIENQRyBidXNpbmVzcyBpbnRvIGEgc29waGlzdGljYXRlZCB0ZWNobm9sb2d5IGNvbXBhbnkuIERlc2lnbiBzZWN1cmUsIGF1dG9tYXRlZCBhbmQgdHJhbnNmb3JtYXRpdmUgcGxhdGZvcm0sIHRlY2huaWNhbCBhcmNoaXRlY3R1cmUgYW5kIGV4ZWN1dGUgYW4gTVZQIGVub3VnaCB0byBhcXVpcmUgZmlyc3QgY3VzdG9tZXJzLiBNaXNzaW9uIGFjY29tcGxpc2hlZC48L3A+PGEgaHJlZj0naHR0cDovL2NwZy5pbycgdGFyZ2V0PSdfYmxhbmsnPlZpc2l0IFdlYnNpdGU8L2E+XCJcbiAgICB9XG4gIF1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJTbGlkZXNNZWR5Y2F0aW9uQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdBUFJJTCAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnVXNlciBleHBlcmllbmNlIGRlc2lnbiBhbmQgcmFwaWQgcHJvdG90eXBpbmcgZm9yIE1lZHljYXRpb24sIGEgbmV3IGhlYWx0aGNhcmUgcHJpY2UgY29tcGFyaXNvbiB3ZWJzaXRlJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLW1lZHljYXRpb24uanBnXCIsXG4gICAgICBcInRleHRcIiA6IFwiPHA+V2FsdHogdXAgaW4gdGhlIG9ubGluZSBoZWFsdGhjYXJlIGluZHVzdHJ5IGd1bnMgYmxhemluZyB3aXRoIGtpbGxlciBkZXNpZ24gYW5kIGluc3RpbmN0cy4gR2V0IHRoaXMgbmV3IGNvbXBhbnkgb2ZmIHRoZSBncm91bmQgd2l0aCBpdCdzIE1WUC4gU3dpcGUgZm9yIG1vcmUgdmlld3MuPC9wPjxhIGhyZWY9J2h0dHA6Ly9tZWR5Y2F0aW9uLmNvbScgdGFyZ2V0PSdfYmxhbmsnPlZpc2l0IFdlYnNpdGU8L2E+XCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLW1lZHljYXRpb24yLmpwZ1wiLFxuICAgICAgXCJ0ZXh0XCIgOiBcIlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1tZWR5Y2F0aW9uMy5qcGdcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tbWVkeWNhdGlvbjQuanBnXCJcbiAgICB9LFxuICBdXG5cbkZyYW5jaGluby5jb250cm9sbGVyIFwiU2xpZGVzQ1NUQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdBUFJJTCAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnRGVzaWduZWQgYW5kIGRldmVsb3BlZCBhIG5ldyB2ZXJzaW9uIG9mIHRoZSBDaGljYWdvIFN1biBUaW1lcyB1c2luZyBhIGh5YnJpZCBJb25pYy9Bbmd1bGFyIHN0YWNrJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLWNzdC5qcGdcIixcbiAgICAgIFwidGV4dFwiIDogXCI8cD5IZWxwIHRoZSBzdHJ1Z2dsaW5nIG1lZGlhIGdpYW50IHVwZ3JhZGUgdGhlaXIgY29uc3VtZXIgZmFjaW5nIHRlY2hub2xvZ3kuIENyZWF0ZSBvbmUgY29kZSBiYXNlIGluIEFuZ3VsYXIgY2FwYWJsZSBvZiBnZW5lcmF0aW5nIGtpY2stYXNzIGV4cGVyaWVuY2VzIGZvciBtb2JpbGUsIHRhYmxldCwgd2ViIGFuZCBUVi5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tY3N0Mi5qcGdcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tY3N0My5qcGdcIlxuICAgIH0sXG4gIF1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJTbGlkZXNLb3VwbkN0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnTUFSQ0ggMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ0JyYW5kIHJlZnJlc2gsIG1hcmtldGluZyBzaXRlIGFuZCBwbGF0Zm9ybSBleHBlcmllbmNlIG92ZXJoYXVsJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLWtvdXBuMS5qcGdcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8ta291cG4yLmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1rb3Vwbi5qcGdcIlxuICAgIH0sXG4gIF1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJTbGlkZXNUcm91bmRDdHJsXCIsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0FVR1VTVCAyMDEzJ1xuICAkc2NvcGUudGl0bGUgPSAnU29jaWFsIHRyYXZlbCBtb2JpbGUgYXBwIGRlc2lnbiwgVVggYW5kIHJhcGlkIHByb3RvdHlwaW5nJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNpbm9fdHJvdW5kLmpwZ1wiLFxuICAgICAgXCJ0ZXh0XCIgOiBcIkRlc2lnbiBhbiBJbnN0YWdyYW0gYmFzZWQgc29jaWFsIHRyYXZlbCBhcHAuIFdoeT8gSSBkb24ndCBrbm93LlwiXG4gICAgfVxuICBdXG5cbkZyYW5jaGluby5jb250cm9sbGVyIFwiU2xpZGVzTW9udGhseXNDdHJsXCIsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0ZFQlJVQVJZIDIwMTMnXG4gICRzY29wZS50aXRsZSA9ICdDdXN0b21lciBwb3J0YWwgcGxhdGZvcm0gVVggZGVzaWduIGFuZCBmcm9udC1lbmQnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tbW9udGhseXMtYml6Mi5qcGdcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm9fbW9udGhseXMuanBnXCJcbiAgICB9XG4gIF1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJTbGlkZXNNb250aGx5c1R3b0N0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnTUFSQ0ggMjAxMidcbiAgJHNjb3BlLnRpdGxlID0gJ0VudHJlcHJlbmV1ciBpbiByZXNpZGVuY2UgYXQgTGlnaHRiYW5rJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLW1vbnRobHlzNy5qcGdcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tbW9udGhseXM1LmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1tb250aGx5czIuanBnXCJcbiAgICB9XG4gIF1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJCbG9nQ3RybFwiLCAoJHNjb3BlKSAtPlxuXG4gICRzY29wZS5hcnRpY2xlcyA9IFtcbiAgICB7XG4gICAgICBcImRhdGVcIiA6IFwiUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciAxMiwgMjAxNFwiLFxuICAgICAgXCJoZWFkaW5nXCIgOiBcIk15IHBhdGggdG8gbGVhcm5pbmcgU3dpZnRcIixcbiAgICAgIFwiYXV0aG9yaW1nXCIgOiBcIi9pbWcvZnJhbmsucG5nXCIsXG4gICAgICBcImltZ1wiIDogXCIvaW1nL2RlYy9uZXdzbGV0dGVyLXN3aWZ0cmlzLWhlYWRlci5naWZcIixcbiAgICAgIFwiYmxvYlwiIDogXCJJJ3ZlIGJlZW4gYW4gTVZDIGRldmVsb3BlciBpbiBldmVyeSBsYW5ndWFnZSBleGNlcHQgZm9yIGlPUy4gVGhpcyBwYXN0IE9jdG9iZXIsIEkgdG9vayBteSBmaXJzdCByZWFsIGRlZXAgZGl2ZSBpbnRvIGlPUyBwcm9ncmFtbWluZyBhbmQgc3RhcnRlZCB3aXRoIFN3aWZ0LiBUaGVyZSBhcmUgdHdvIGdyZWF0IHR1dG9yaWFscyBvdXQgdGhlcmUuIFRoZSBmaXJzdCBpcyBmcm9tIGJsb2MuaW8gYW5kIGlzIGZyZWUuIEl0J3MgYSBnYW1lLCBTd2lmdHJpcywgc28gZ2V0IHJlYWR5IGZvciBzb21lIGFjdGlvbi4gVGhlIHNlY29uZCB3aWxsIGhlbHAgeW91IGJ1aWxkIHNvbWV0aGluZyBtb3JlIGFwcGlzaCwgaXQncyBieSBBcHBjb2RhLiBHb3QgdGhlaXIgYm9vayBhbmQgd2lsbCBiZSBkb25lIHdpdGggaXQgdGhpcyB3ZWVrLiBTbyBmYXIsIGJvb2tzIG9rLCBidXQgaXQgbW92ZXMgcmVhbGx5IHNsb3cuXCIsXG4gICAgICBcInJlc291cmNlMVwiIDogXCJodHRwczovL3d3dy5ibG9jLmlvL3N3aWZ0cmlzLWJ1aWxkLXlvdXItZmlyc3QtaW9zLWdhbWUtd2l0aC1zd2lmdFwiLFxuICAgICAgXCJyZXNvdXJjZTJcIiA6IFwiaHR0cDovL3d3dy5hcHBjb2RhLmNvbS9zd2lmdC9cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJkYXRlXCIgOiBcIlBvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgMTEsIDIwMTRcIixcbiAgICAgIFwiaGVhZGluZ1wiIDogXCJXaHkgSSBnZXQgZ29vc2UgYnVtcHMgd2hlbiB5b3UgdGFsayBhYm91dCBhdXRvbWF0ZWQgZW1haWwgbWFya2V0aW5nIGFuZCBzZWdtZW50YXRpb24gYW5kIGN1c3RvbWVyLmlvIGFuZCB0aGluZ3MgbGlrZSB0aGF0LlwiLFxuICAgICAgXCJhdXRob3JpbWdcIiA6IFwiL2ltZy9mcmFuay5wbmdcIixcbiAgICAgIFwiaW1nXCIgOiBcIi9pbWcvZGVjL3ByZXBlbWFpbHMucG5nXCIsXG4gICAgICBcImJsb2JcIiA6IFwiSSBnZXQgdGVhcnkgZXllZCB3aGVuIEkgdGFsayBhYm91dCBteSB3b3JrIGF0IEJlbmNoUHJlcC5jb20uIEluIHNob3J0LCBJIHdhcyB0aGUgZmlyc3QgZW1wbG95ZWUgYW5kIGhlbHBlZCB0aGUgY29tcGFueSBnZXQgdG8gdGhlaXIgc2VyaWVzIEIgbmVhciB0aGUgZW5kIG9mIHllYXIgdHdvLiBJIGdvdCBhIGxvdCBkb25lIHRoZXJlLCBhbmQgb25lIG9mIHRoZSB0aGluZ3MgSSByZWFsbHkgZW5qb3llZCB3YXMgYnVpbGRpbmcgb3V0IHRlY2hub2xvZ3kgdG8gc2VnbWVudCBsZWFkcywgYnJpbmcgZGlmZmVyZW50IHVzZXJzIGRvd24gZGlmZmVyZW50IGNvbW11bmljYXRpb24gcGF0aHMgYW5kIGhvdyBJIG1hcHBlZCBvdXQgdGhlIGVudGlyZSBzeXN0ZW0gdXNpbmcgY29tcGxleCBkaWFncmFtcyBhbmQgd29ya2Zsb3dzLiBTb21lIG9mIHRoZSB0b29scyB3ZXJlIGJ1aWx0IGFuZCBiYXNlZCBvbiBxdWVzIGxpa2UgUmVkaXMgb3IgUmVzcXVlLCBvdGhlcnMgd2UgYnVpbHQgaW50byBFeGFjdFRhcmdldCBhbmQgQ3VzdG9tZXIuaW8uIEluIHRoZSBlbmQsIEkgYmVjYW1lIHNvbWV3aGF0IG9mIGFuIGV4cGVydCBhdCBtb25ldGl6aW5nIGVtYWlscy4gV2l0aGluIG91ciBlbWFpbCBtYXJrZXRpbmcgY2hhbm5lbCwgd2UgZXhwbG9yZWQgdGFnZ2luZyB1c2VycyBiYXNlZCBvbiB0aGVpciBhY3Rpb25zLCBzdWNoIGFzIG9wZW5zIG9yIG5vbiBvcGVucywgb3Igd2hhdCB0aGV5IGNsaWNrZWQgb24sIHdlIHRhcmdlZCBlbWFpbCB1c2VycyB3aG8gaGFkIGJlZW4gdG91Y2hlZCBzZXZlbiB0aW1lcyB3aXRoIHNwZWNpYWwgaXJyaXNpdGFibGUgc2FsZXMsIGJlY2F1c2Ugd2Uga25vdyBhZnRlciA2IHRvdWNoZXMsIHdlIGNvdWxkIGNvbnZlcnQuIFRoZXNlIHRyaWNrcyB3ZSBsZWFybmVkIGxlZCB0byAyNS0zMGsgZGF5cywgYW5kIGV2ZW50dWFsbHksIGRheXMgd2hlcmUgd2Ugc29sZCAxMDBrIHdvcnRoIG9mIHN1YnNjcmlwdGlvbnMuIFNvLCBteSBwb2ludD8gRG9uJ3QgYmUgc3VycHJpc2VkIGlmIEkgZ2VlayBvdXQgYW5kIGZhaW50IHdoZW4gSSBoZWFyIHlvdSB0YWxrIGFib3V0IHRyYW5zYWN0aW9uYWwgZW1haWxpbmcgYW5kIGNhZGVuY2VzIGFuZCBjb25zdW1lciBqb3VybmllcyBhbmQgc3R1ZmYgbGlrZSB0aGF0LlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImRhdGVcIiA6IFwiUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciAxMCwgMjAxNFwiLFxuICAgICAgXCJoZWFkaW5nXCIgOiBcIklmIEkgY291bGQgaGF2ZSBvbmUgd2lzaDsgSSBnZXQgdG8gdXNlIHRoaXMgbWV0aG9kIHdoZW4gZGVzaWduaW5nIHlvdXIgY29uc3VtZXIgam91cm5leSBmdW5uZWwuXCIsXG4gICAgICBcImF1dGhvcmltZ1wiIDogXCIvaW1nL2ZyYW5rLnBuZ1wiLFxuICAgICAgXCJpbWdcIiA6IFwiL2ltZy9kZWMvdXhfYm9hcmQuanBnXCIsXG4gICAgICBcImJsb2JcIiA6IFwiU28gYWZ0ZXIgYSBidW5jaCBvZiBldGhub2dyYXBoaWMgc3R1ZGllcyBmcm9tIHBlcnNvbmEgbWF0Y2hlcyBJIGdhdGhlciBpbi1wZXJzb24sIEkgZ2V0IHRvIGZpbGwgYSB3YWxsIHVwIHdpdGgga2V5IHRoaW5ncyBwZW9wbGUgc2FpZCwgZmVsdCwgaGVhcmQgLSBtb3RpdmF0b3JzLCBiYXJyaWVycywgcXVlc3Rpb25zLCBhdHRpdHVkZXMgYW5kIHN1Y2guIEkgdGhlbiBncm91cCB0aGVzZSBwb3N0LWl0IHRob3VnaHRzIGluIHZhcmlvdXMgd2F5cywgbG9va2luZyBmb3IgcGF0dGVybnMsIHNlbnRpbWVudCwgbmV3IGlkZWFzLiBJIHRoZW4gdGFrZSB0aGlzIHJpY2ggZGF0YSBhbmQgZGV2ZWxvcCBhIHdoYXQgY291bGQgYmUgYnJhbmRpbmcsIGEgbGFuZGluZyBwYWdlIG9yIGFuIGVtYWlsIC0gd2l0aCB3aGF0IEkgY2FsbCwgYW4gaW52ZXJ0ZWQgcHlyYW1pZCBhcHByb2FjaCB0byBjb250ZW50LCB3aGVyZSBhZGRyZXNzaW5nIHRoZSBtb3N0IGltcG9ydGFudCB0aGluZ3MgZm91bmQgaW4gdGhlIHVzZXIgcmVzZWFyY2ggZ2V0IGFkZHJlc3NlZCBpbiBhIGhlcmlhcmNoaWNhbCBvcmRlci4gSSBjcmVhdGUgNS02IGl0ZXJhdGlvbnMgb2YgdGhlIGxhbmRpbmcgcGFnZSBhbmQgcmUtcnVuIHRoZW0gdGhyb3VnaCBhIHNlY29uZCBncm91cCBvZiBwYXJ0aWNpcGFudHMsIHN0YWtlaG9sZGVycyBhbmQgZnJpZW5kcy4gSSB0aGVuIHRha2UgZXZlbiBtb3JlIG5vdGVzIG9uIHBlb3BsZXMgc3BlYWstYWxvdWQgcmVhY3Rpb25zIHRvIHRoZSBsYW5kaW5nIHBhZ2VzLiBBZnRlciB0aGlzLCBJJ20gcmVhZHkgdG8gZGVzaWduIHRoZSBmaW5hbCBjb3B5IGFuZCBwYWdlcyBmb3IgeW91ciBmdW5uZWwuXCIgXG4gICAgfSxcbiAgICB7XG4gICAgICBcImRhdGVcIiA6IFwiUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciA5LCAyMDE0XCIsXG4gICAgICBcImhlYWRpbmdcIiA6IFwiRGlkIEkgZXZlbiBiZWxvbmcgaGVyZT9cIixcbiAgICAgIFwiYXV0aG9yaW1nXCIgOiBcIi9pbWcvZnJhbmsucG5nXCIsXG4gICAgICBcImltZ1wiIDogXCIvaW1nL2RlYy91Y2xhLmpwZ1wiLFxuICAgICAgXCJibG9iXCIgOiBcIlRoaXMgY29taW5nIHdlZWtlbmQgdGhlcmUncyBwcm9iYWJseSBhIGhhY2thdGhvbiBnb2luZyBvbiBpbiB5b3VyIGNpdHkuIFNvbWUgb2YgdGhlbSBhcmUgZ2V0dGluZyByZWFsbHkgYmlnLiBJIHdhc24ndCByZWdpc3RlcmVkIGZvciBMQSBIYWNrcyB0aGlzIHN1bW1lci4gSSBkb24ndCBldmVuIGtub3cgaG93IEkgZW5kZWQgdXAgdGhlcmUgb24gYSBGcmlkYXkgbmlnaHQsIGJ1dCB3aGVuIEkgc2F3IHdoYXQgd2FzIGdvaW5nIG9uLCBJIGdyYWJiZWQgYSBjaGFpciBhbmQgc3RhcnRlZCBoYWNraW5nIGF3YXkuIFdvcnJpZWQgSSBoYWQganVzdCBzbnVjayBpbiB0aGUgYmFjayBkb29yIGFuZCBzdGFydGVkIGNvbXBldGluZywgbXkgcmlkZSBsZWZ0IGFuZCB0aGVyZSBJIHdhcywgZm9yIHRoZSBuZXh0IHR3byBkYXlzLiBUaGF0J3MgcmlnaHQuIEkgc251Y2sgaW4gdGhlIGJhY2sgb2YgTEEgSGFja3MgbGFzdCBzdW1tZXIgYXQgVUNMQSBhbmQgaGFja2VkIHdpdGgga2lkcyAxMCB5ZWFycyB5b3VuZ2VyIHRoYW4gbWUuIEkgY291bGRuJ3QgbWlzcyBpdC4gSSB3YXMgZmxvb3JlZCB3aGVuIEkgc2F3IGhvdyBtYW55IHBlb3BsZSB3ZXJlIGluIGl0LiBNZSwgYmVpbmcgdGhlIG1pc2NoZXZpb3VzIGhhY2tlciBJIGFtLCBJIHRob3VnaHQgaWYgSSB1c2VkIHRoZSBlbmVyZ3kgb2YgdGhlIGVudmlyb25tZW50IHRvIG15IGFkdmFudGFnZSwgSSBjb3VsZCBidWlsZCBzb21ldGhpbmcgY29vbC4gTG9uZyBzdG9yeSBzaG9ydCwgbGV0IG1lIGp1c3Qgc2F5LCB0aGF0IGlmIHlvdSBoYXZlIGJlZW4gaGF2aW5nIGEgaGFyZCB0aW1lIGxhdW5jaGluZywgc2lnbiB1cCBmb3IgYSBoYWNrYXRob24uIEl0J3MgYSBndWFyYW50ZWVkIHdheSB0byBvdmVyLWNvbXBlbnNhdGUgZm9yIHlvdXIgY29uc3RhbnQgZmFpbHVyZSB0byBsYXVuY2guIE1vcmUgb24gd2hhdCBoYXBwZW5lZCB3aGVuIEkgdG9vayB0aGUgc3RhZ2UgYnkgc3VycHJpc2UgYW5kIGdvdCBib290ZWQgbGF0ZXIuLi5cIiBcbiAgICB9XG4gIF1cblxuXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdBYm91dEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQXBwQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdSZXN1bWVDdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmJsb2IgPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMlwiPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5OT1YgMjAxMyAtIFBSRVNFTlQ8L2g2Pjxici8+PGgyPkh5YnJpZCBFeHBlcmllbmNlIERlc2lnbmVyL0RldmVsb3BlciwgSW5kZXBlbmRlbnQ8L2gyPjxici8+PHA+V29ya2VkIHdpdGggbm90ZWFibGUgZW50cmVwcmVub3VycyBvbiBzZXZlcmFsIG5ldyBwcm9kdWN0IGFuZCBidXNpbmVzcyBsYXVuY2hlcy4gSGVsZCBudW1lcm91cyByb2xlcywgaW5jbHVkaW5nIGNvbnRlbnQgc3RyYXRlZ2lzdCwgdXNlciByZXNlYXJjaGVyLCBkZXNpZ25lciBhbmQgZGV2ZWxvcGVyLiA8L3A+PHA+PHN0cm9uZz5Db21wYW5pZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwibm9cIj48bGk+PGEgaHJlZj1cImh0dHA6Ly90YXBjZW50aXZlLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPlRhcGNlbnRpdmU8L2E+PC9saT48bGk+PGEgaHJlZj1cImh0dHA6Ly9jcGcuaW9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5DUEdpbzwvYT48L2xpPjxsaT48YSBocmVmPVwiaHR0cDovL2tvdS5wbi9cIj5Lb3UucG4gTWVkaWE8L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vbWVkeWNhdGlvbi5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5NZWR5Y2F0aW9uPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL3d3dy5zdW50aW1lcy5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q2hpY2FnbyBTdW4gVGltZXM8L2E+PC9saT48L3VsPjxici8+PHA+PHN0cm9uZz5UYXBjZW50aXZlIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkNvbXBsZXRlIFRhcGNlbnRpdmUuY29tIG1hcmtldGluZyB3ZWJzaXRlIGFuZCBVWCBvdmVyaGF1bCBvZiBjb3JlIHByb2R1Y3QsIHRoZSBcIlRhcGNlbnRpdmUgTWFuYWdlclwiPC9saT48bGk+SW5kdXN0cmlhbCBkZXNpZ24gb2YgdGhlIFRhcGNlbnRpdmUgVG91Y2hwb2ludDwvbGk+PGxpPkNvbnRlbnQgc3RyYXRlZ3kgZm9yIGNvcnBvcmF0ZSBtYXJrZXRpbmcgc2l0ZTwvbGk+PGxpPk1vYmlsZSBmaXJzdCBtYXJrZXRpbmcgd2Vic2l0ZSB1c2luZyBJb25pYyBhbmQgQW5ndWxhcjwvbGk+PC91bD48cD48c3Ryb25nPkNQR2lvIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPlByb2R1Y3QgYW5kIGJ1c2luZXNzIHN0cmF0ZWd5LCB0ZWNobmljYWwgYXJjaGl0ZWN0dXJlIGFuZCBzcGVjaWZpY2F0aW9uIGRlc2lnbjwvbGk+PGxpPk9uZSBodW5kcmVkIHBhZ2UgcHJvcG9zYWwgdGVtcGxhdGUgb24gYnVzaW5lc3MgbW9kZWwgYW5kIGNvcnBvcmF0ZSBjYXBhYmlsaXRpZXM8L2xpPjxsaT5NYXJrZXRpbmcgd2Vic2l0ZSBkZXNpZ24gYW5kIGNvbnRlbnQgc3RyYXRlZ3k8L2xpPjxsaT5Db3JlIHByb2R1Y3QgZGVzaWduIGFuZCBNVlAgZnVuY3Rpb25hbCBwcm90b3R5cGU8L2xpPjwvdWw+PHA+PHN0cm9uZz5Lb3UucG4gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+S291LnBuIE1lZGlhIGJyYW5kIHJlZnJlc2g8L2xpPjxsaT5NYXJrZXRpbmcgc2l0ZSByZWRlc2lnbjwvbGk+PGxpPlBvcnRhbCB1c2VyIGV4cGVyaWVuY2Ugb3ZlcmhhdWw8L2xpPjwvdWw+PHA+PHN0cm9uZz5NZWR5Y2F0aW9uIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkNvbmNlcHR1YWwgZGVzaWduIGFuZCBhcnQgZGlyZWN0aW9uPC9saT48bGk+VXNlciByZXNlYXJjaDwvbGk+PGxpPlJhcGlkIHByb3RvdHlwZXM8L2xpPjwvdWw+PHA+PHN0cm9uZz5DaGljYWdvIFN1biBUaW1lczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkNvbmNlcHR1YWwgZGVzaWduIGFuZCBhcnQgZGlyZWN0aW9uPC9saT48bGk+TmF0aXZlIGlPUyBhbmQgQW5kcm9pZCBhcHAgZGVzaWduIGFuZCBqdW5pb3IgZGV2ZWxvcG1lbnQ8L2xpPjxsaT5IeWJyaWQgSW9uaWMvQW5ndWxhciBkZXZlbG9wbWVudDwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5NQVJDSCAyMDEwIC0gT0NUT0JFUiAyMDEzPC9oNj48YnIvPjxoMj5EaXJlY3RvciBvZiBVc2VyIEV4cGVyaWVuY2UsIExpZ2h0YmFuazwvaDI+PGJyLz48cD5MYXVuY2hlZCBhbmQgc3VwcG9ydGVkIG11bHRpcGxlIG5ldyBjb21wYW5pZXMgd2l0aGluIHRoZSBMaWdodGJhbmsgcG9ydGZvbGlvLiA8L3A+PHA+PHN0cm9uZz5Db21wYW5pZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwibm9cIj48bGk+IDxhIGhyZWY9XCJodHRwOi8vY2hpY2Fnb2lkZWFzLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkNoaWNhZ29JZGVhcy5jb208L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vYmVuY2hwcmVwLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkJlbmNoUHJlcC5jb208L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vc25hcHNoZWV0YXBwLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPlNuYXBTaGVldEFwcC5jb208L2E+PC9saT48bGk+TW9udGhseXMuY29tIChkZWZ1bmN0KTwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL2RvdWdoLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkRvdWdoLmNvbTwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9ncm91cG9uLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkdyb3Vwb24uY29tPC9hPjwvbGk+PC91bD48YnIvPjxwPjxzdHJvbmc+Q2hpY2FnbyBJZGVhcyBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5XZWJzaXRlIGRlc2lnbiByZWZyZXNoLCBhcnQgZGlyZWN0aW9uPC9saT48bGk+Q3VzdG9tIHRpY2tldCBwdXJjaGFzaW5nIHBsYXRmb3JtIFVYIHJlc2VhcmNoICZhbXA7IGRlc2lnbjwvbGk+PGxpPlJ1Ynkgb24gUmFpbHMgZGV2ZWxvcG1lbnQsIG1haW50ZW5lbmNlPC9saT48bGk+R3JhcGhpYyBkZXNpZ24gc3VwcG9ydDwvbGk+PGxpPkFubnVhbCByZXBvcnQgZGVzaWduPC9saT48L3VsPjxwPjxzdHJvbmc+QmVuY2hQcmVwLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5SZS1icmFuZGluZywgY29tcGxldGUgQmVuY2hQcmVwIGlkZW50aXR5IHBhY2thZ2U8L2xpPjxsaT5TdXBwb3J0ZWQgY29tcGFueSB3aXRoIGFsbCBkZXNpZ24gYW5kIHV4IGZyb20gemVybyB0byBlaWdodCBtaWxsaW9uIGluIGZpbmFuY2luZzwvbGk+PGxpPkxlYWQgYXJ0IGFuZCBVWCBkaXJlY3Rpb24gZm9yIHR3byB5ZWFyczwvbGk+PGxpPkZyb250LWVuZCB1c2luZyBCYWNrYm9uZSBhbmQgQm9vdHN0cmFwPC9saT48bGk+VXNlciByZXNlYXJjaCwgZXRobm9ncmFwaGljIHN0dWRpZXMsIHVzZXIgdGVzdGluZzwvbGk+PGxpPkVtYWlsIG1hcmtldGluZyBjYWRlbmNlIHN5c3RlbSBkZXNpZ24gYW5kIGV4ZWN1dGlvbjwvbGk+PGxpPlNjcmlwdGVkLCBzdG9yeWJvYXJkZWQgYW5kIGV4ZWN1dGVkIGJvdGggYW5pbWF0ZWQgYW5kIGxpdmUgbW90aW9uIGV4cGxhaW5lciB2aWRlb3M8L2xpPjwvdWw+PHA+PHN0cm9uZz5TbmFwU2hlZXRBcHAuY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkxhcmdlIHNjYWxlIHBvcnRhbCBVWCByZXNlYXJjaCBhbmQgaW5mb3JtYXRpb24gYXJjaGl0ZWN0dXJlPC9saT48bGk+VGhyZWUgcm91bmRzIG9mIHJhcGlkIHByb3RvdHlwaW5nIGFuZCB1c2VyIHRlc3Rpbmc8L2xpPjxsaT5HcmFwaGljIGRlc2lnbiBhbmQgaW50ZXJhY3Rpb24gZGVzaWduIGZyYW1ld29yazwvbGk+PGxpPlVzZXIgdGVzdGluZzwvbGk+PC91bD48cD48c3Ryb25nPk1vbnRobHlzLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5JZGVudGl0eSBhbmQgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPlByb2R1Y3Qgc3RyYXRlZ3kgYW5kIG5ldyBjb21wYW55IGxhdW5jaDwvbGk+PGxpPk9ubGluZSBtYXJrZXRpbmcgc3RyYXRlZ3ksIGluY2x1ZGluZyB0cmFuc2FjdGlvbmFsIGVtYWlsLCBwcm9tb3Rpb24gZGVzaWduIGFuZCBsZWFkIGdlbmVyYXRpb248L2xpPjxsaT5Qcm9kdWN0IGV4cGVyaWVuY2UgZGVzaWduIGFuZCBmcm9udC1lbmQ8L2xpPjxsaT5Db250ZW50IHN0cmF0ZWd5PC9saT48bGk+U2NyaXB0ZWQsIHN0b3J5Ym9hcmRlZCBhbmQgZXhlY3V0ZWQgYm90aCBhbmltYXRlZCBhbmQgbGl2ZSBtb3Rpb24gZXhwbGFpbmVyIHZpZGVvczwvbGk+PC91bD48cD48c3Ryb25nPkRvdWdoLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0cyBidWxsZXRzXCI+PGxpPkNvbnN1bWVyIGpvdXJuZXkgbWFwcGluZyBhbmQgZXRobm9ncmFwaGljIHN0dWRpZXM8L2xpPjxsaT5SYXBpZCBwcm90b3R5cGluZywgY29uY2VwdHVhbCBkZXNpZ248L2xpPjxsaT5NZXNzYWdpbmcgc3RyYXRlZ3ksIHVzZXIgdGVzdGluZzwvbGk+PC91bD48cD48c3Ryb25nPkdyb3Vwb24uY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkVtZXJnaW5nIG1hcmtldHMgcmVzZWFyY2g8L2xpPjxsaT5SYXBpZCBkZXNpZ24gYW5kIHByb3RvdHlwaW5nPC9saT48bGk+VmlzdWFsIGRlc2lnbiBvbiBuZXcgY29uY2VwdHM8L2xpPjxsaT5FbWFpbCBzZWdtZW50YXRpb24gcmVzZWFyY2g8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+Tk9WRU1CRVIgMjAwNyAtIEFQUklMIDIwMTA8L2g2Pjxici8+PGgyPkRldmVsb3BlciAmYW1wOyBDby1mb3VuZGVyLCBEaWxseWVvLmNvbTwvaDI+PGJyLz48cD5Dby1mb3VuZGVkLCBkZXNpZ25lZCBhbmQgZGV2ZWxvcGVkIGEgZGFpbHkgZGVhbCBlQ29tbWVyY2Ugd2Vic2l0ZS48L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5EZXNpZ25lZCwgZGV2ZWxvcGVkIGFuZCBsYXVuY2hlZCBjb21wYW5pZXMgZmlyc3QgY2FydCB3aXRoIFBIUC4gSXRlcmF0ZWQgYW5kIGdyZXcgc2l0ZSB0byBtb3JlIHRoYW4gdHdvIGh1bmRyZWQgYW5kIGZpZnR5IHRob3VzYW5kIHN1YnNjcmliZXJzIGluIGxlc3MgdGhhbiBvbmUgeWVhci4gPC9wPjxwPjxzdHJvbmc+Tm90ZWFibGUgU3RhdHM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5CdWlsdCBhIGxpc3Qgb2YgMjUwLDAwMCBzdWJzY3JpYmVycyBpbiB0aGUgZmlyc3QgeWVhcjwvbGk+PGxpPlBpdm90ZWQgYW5kIHR3ZWFrZWQgZGVzaWduLCBidXNpbmVzcyBhbmQgYXBwcm9hY2ggdG8gMTAwMCB0cmFuc2FjdGlvbnMgcGVyIGRhaWx5PC9saT48bGk+U29sZCBidXNpbmVzcyBpbiBEZWNlbWJlciAyMDA5IHRvIElubm92YXRpdmUgQ29tbWVyY2UgU29sdXRpb25zPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2Pk1BUkNIIDIwMDUgLSBPQ1RPQkVSIDIwMDc8L2g2Pjxici8+PGgyPlNvbHV0aW9ucyBBcmNoaXRlY3QgJmFtcDsgU2VuaW9yIERldmVsb3BlciwgPGEgaHJlZj1cImh0dHA6Ly93d3cubWFuaWZlc3RkaWdpdGFsLmNvbS9cIj5NYW5pZmVzdCBEaWdpdGFsPC9hPjwvaDI+PGJyLz48cD5CdWlsdCBhbmQgbWFuYWdlZCBtdWx0aXBsZSBDYXJlZXJCdWlsZGVyLmNvbSBuaWNoZSBzaXRlcyBmb3IgdGhlIGxhcmdlc3QgaW5kZXBlbmRlbnQgYWdlbmN5IGluIHRoZSBtaWR3ZXN0LjwvcD48cD48c3Ryb25nPlJvbGU8L3N0cm9uZz48YnIvPlJlc2VhcmNoIGFuZCBleHBsb3JlIGVtZXJnaW5nIHRlY2hub2xvZ2llcywgaW1wbGVtZW50IHNvbHV0aW9ucyBhbmQgbWFuYWdlIG90aGVyIGRldmVsb3BlcnMuIFdvcmtlZCB3aXRoIGFzcC5uZXQgb24gYSBkYWlseSBiYXNpcyBmb3IgYWxtb3N0IHR3byB5ZWFycy4gPC9wPjxwPjxzdHJvbmc+Tm90ZWFibGUgQWNjb21wbGlzaG1lbnRzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+UmVjb2duaXplZCBmb3IgbGF1bmNoaW5nIGhpZ2ggcXVhbGl0eSB3ZWIgYXBwIGZvciBDYXJlZXIgQnVpbGRlciBpbiByZWNvcmQgdGltZTwvbGk+PGxpPk1hbmFnZWQgZXh0cmVtZSBTRU8gcHJvamVjdCB3aXRoIG1vcmUgdGhhbiA1MDAgdGhvdXNhbmQgbGlua3MsIHBhZ2VzIGFuZCBvdmVyIDggbWlsbGlvbiBVR0MgYXJ0aWZhY3RzPC9saT48bGk+U2hpZnRlZCBhZ2VuY2llcyBkZXZlbG9wbWVudCBwcmFjdGljZXMgdG8gdmFyaW91cyBuZXcgY2xpZW50LWNlbnRyaWMgQUpBWCBtZXRob2RvbG9naWVzPC9saT48bGk+TWFuYWdlZCBtdWx0aXBsZSBwcm9qZWN0cyBjb25jdXJyZW50bHksIGluY2x1ZGluZyBjaG9vc2VjaGljYWdvLmNvbSBhbmQgYnJpZWZpbmcuY29tPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2PkFQUklMIDIwMDQgLSBKQU5VQVJZIDIwMDc8L2g2Pjxici8+PGgyPkp1bmlvciBQTEQgRGV2ZWxvcGVyLCAgPGEgaHJlZj1cImh0dHA6Ly93d3cubWFuaWZlc3RkaWdpdGFsLmNvbS9cIj5BdmVudWU8L2E+PC9oMj48YnIvPjxwPkZyb250LWVuZCBkZXZlbG9wZXIgYW5kIFVYIGRlc2lnbiBpbnRlcm4gZm9yIEF2ZW51ZSBBIFJhem9yZmlzaHNcXCcgbGVnYWN5IGNvbXBhbnksIEF2ZW51ZS1pbmMuPC9wPjxwPjxzdHJvbmc+Um9sZTwvc3Ryb25nPjxici8+RGV2ZWxvcCBmcm9udC1lbmQgZm9yIG11bHRpcGxlIGNsaWVudCB3ZWJzaXRlcywgaW5jbHVkaW5nIGZsb3IuY29tLCBhY2hpZXZlbWVudC5vcmcsIGNhbnlvbnJhbmNoLmNvbSBhbmQgdHVyYm9jaGVmLjwvcD48cD48c3Ryb25nPk5vdGVhYmxlIEFjY29tcGxpc2htZW50czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkV4ZWN1dGVkIGZyb250LWVuZCBwcm9qZWN0cyBvbi10aW1lIGFuZCB1bmRlci1idWRnZXQ8L2xpPjxsaT5Bc3NpZ25lZCBVWCBpbnRlcm5zaGlwIHJvbGUsIHJlY29nbml6ZWQgYnkgZGVzaWduIHRlYW0gYXMgYSB5b3VuZyB0YWxlbnQ8L2xpPjxsaT5XaXJlZnJhbWVkIGN1c3RvbSBzaG9wcGluZyBjYXJ0IHBsYXRmb3JtIGZvciBmbG9yLmNvbTwvbGk+PGxpPkRldmVsb3BlZCBpbnRlcm5hbCBTRU8gcHJhY3RpY2U8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+SlVMWSAyMDAwIC0gSkFOVUFSWSAyMDA0PC9oNj48YnIvPjxoMj5lQ29tbWVyY2UgRGV2ZWxvcGVyLCBBdG92YTwvaDI+PGJyLz48cD5HZW5lcmFsIHdlYiBkZXNpZ25lciBhbmQgZGV2ZWxvcGVyIGZvciBmYW1pbHkgb3duZWQgcGFpbnQgZGlzdHJpYnV0aW9uIGJ1c2luZXNzLiA8L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5CdWlsdCBzZXZlcmFsIHNob3BwaW5nIGNhcnRzIGluIGNsYXNzaWMgQVNQIGFuZCBQSFAuIEdyZXcgYnVzaW5lc3MgdXNpbmcgb25saW5lIG1hcmtldGluZyBzdHJhdGVnaWVzIHRvIHR3byBtaWxsaW9uIGluIHJldmVudWUuIDwvcD48cD48c3Ryb25nPk5vdGVhYmxlIEFjY29tcGxpc2htZW50czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkJlY2FtZSBmaXJzdCBjb21wYW55IHRvIHNoaXAgcGFpbnRzIGFuZCBjb2F0aW5ncyBhY3Jvc3MgdGhlIFVuaXRlZCBTdGF0ZXM8L2xpPjxsaT5GaXJzdCBlbXBsb3llZSwgZGV2ZWxvcGVkIGNvbXBhbnkgdG8gMisgbWlsbGlvbiBpbiByZXZlbnVlIHdpdGggT3ZlcnR1cmUsIEdvb2dsZSBBZHdvcmRzIGFuZCBTRU88L2xpPjxsaT5DcmVhdGVkLCBtYXJrZXRlZCBhbmQgc3Vic2NyaWJlZCB2b2NhdGlvbmFsIHNjaG9vbCBmb3Igc3BlY2lhbHR5IGNvYXRpbmdzPC9saT48bGk+V29ya2VkIHdpdGggdG9wIEl0YWxpYW4gcGFpbnQgbWFudWZhY3R1cmVycyBvdmVyc2VhcyB0byBidWlsZCBleGNsdXNpdmUgZGlzdHJpYnV0aW9uIHJpZ2h0czwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5TRVBURU1CRVIgMjAwMCAtIE1BWSAyMDAyPC9oNj48YnIvPjxoMj5FZHVjYXRpb248L2gyPjxici8+PHA+U2VsZiBlZHVjYXRlZCBkZXNpZ25lci9wcm9ncmFtbWVyIHdpdGggdm9jYXRpb25hbCB0cmFpbmluZy4gPC9wPjxwPjxzdHJvbmc+Q2VydGlmaWNhdGlvbnM8L3N0cm9uZz48YnIvPmlORVQrLCBBKyBDZXJ0aWZpY2F0aW9uIDwvcD48cD48c3Ryb25nPkFwcHJlbnRpY2VzaGlwPC9zdHJvbmc+PGJyLz5ZZWFyIGxvbmcgcGVyc29uYWwgYXBwcmVudGljZXNoaXAgd2l0aCBmaXJzdCBlbmdpbmVlciBhdCBBbWF6b24uY29tPC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2Pjxici8+PGJyLz4nXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JUYXBjZW50aXZlQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JUYXBjZW50aXZlVHdvQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JDcGdpb0N0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iQ3N0Q3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JLb3VwbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iVHJvdW5kQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JNb250aGx5c09uZUN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTW9udGhseXNUd29DdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYkJlbmNocHJlcEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQ29udGFjdEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnRGV2ZWxvcGVyc0N0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnRGV2ZWxvcGVyQ2VudGVyQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdEb2NzQ3RybCcsICgkc2NvcGUsIERvY3MpIC0+XG4gICRzY29wZS4kd2F0Y2ggKC0+IERvY3MubGlzdCksIC0+XG4gICAgJHNjb3BlLmRvY3MgPSBEb2NzLmxpc3RcblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0RvY0N0cmwnLCAoJHNjb3BlLCAkc2NlLCAkc3RhdGVQYXJhbXMsICR0aW1lb3V0LCBEb2NzKSAtPlxuICAkc2NvcGUuaW5kZXggPSBpZiAkc3RhdGVQYXJhbXMuc3RlcCB0aGVuICRzdGF0ZVBhcmFtcy5zdGVwLTEgZWxzZSAwXG5cbiAgJHNjb3BlLiR3YXRjaCAoLT4gRG9jcy5saXN0KSwgLT5cbiAgICAkc2NvcGUuZG9jID0gRG9jcy5maW5kKCRzdGF0ZVBhcmFtcy5wZXJtYWxpbmspXG4gICAgaWYgJHNjb3BlLmRvY1xuICAgICAgJHNjb3BlLnN0ZXAgPSAkc2NvcGUuZG9jLnN0ZXBzWyRzY29wZS5pbmRleF1cbiAgICAgICRzY29wZS5zdGVwLnVybCA9ICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKCRzY29wZS5zdGVwLnVybClcblxuICAgICAgaWYgJHNjb3BlLnN0ZXAudHlwZSA9PSAnZGlhbG9nJ1xuICAgICAgICAkc2NvcGUubWVzc2FnZUluZGV4ID0gMFxuICAgICAgICAkc2NvcGUubWVzc2FnZXMgPSBbXVxuICAgICAgICAkdGltZW91dCgkc2NvcGUubmV4dE1lc3NhZ2UsIDEwMDApXG5cbiAgJHNjb3BlLmhhc01vcmVTdGVwcyA9IC0+XG4gICAgaWYgJHNjb3BlLnN0ZXBcbiAgICAgICRzY29wZS5zdGVwLmluZGV4IDwgJHNjb3BlLmRvYy5zdGVwcy5sZW5ndGhcblxuRnJhbmNoaW5vLmRpcmVjdGl2ZSAnbXlTbGlkZXNob3cnLCAtPlxuICByZXN0cmljdDogJ0FDJ1xuICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSAtPlxuICAgIGNvbmZpZyA9IGFuZ3VsYXIuZXh0ZW5kKFxuICAgICAgc2xpZGVzOiAnLnNsaWRlJywgIFxuICAgIHNjb3BlLiRldmFsKGF0dHJzLm15U2xpZGVzaG93KSlcbiAgICBzZXRUaW1lb3V0ICgtPlxuICAgICAgJChlbGVtZW50KS5jeWNsZSAtPlxuICAgICAgICBmeDogICAgICdmYWRlJywgXG4gICAgICAgIHNwZWVkOiAgJ2Zhc3QnLFxuICAgICAgICBuZXh0OiAgICcjbmV4dDInLCBcbiAgICAgICAgcHJldjogICAnI3ByZXYyJyxcbiAgICAgICAgY2FwdGlvbjogJyNhbHQtY2FwdGlvbicsXG4gICAgICAgIGNhcHRpb25fdGVtcGxhdGU6ICd7e2ltYWdlcy5hbHR9fScsXG4gICAgICAgIHBhdXNlX29uX2hvdmVyOiAndHJ1ZSdcbiAgICAgICAgICBcbiAgICApLCAwXG4iLCJcbiMgbm90IHN1cmUgaWYgdGhlc2UgYXJlIGFjdHVhbGx5IGluamVjdGluZyBpbnRvIHRoZSBhcHAgbW9kdWxlIHByb3Blcmx5XG5hbmd1bGFyLm1vZHVsZShcInRhcC5jb250cm9sbGVyc1wiLCBbXSlcblxuIyBtb3ZlIGNvbnRyb2xsZXJzIGhlcmVcblxuXG5cblxuIiwiYW5ndWxhci5tb2R1bGUoXCJ0YXAuZGlyZWN0aXZlc1wiLCBbXSlcbiAgLmRpcmVjdGl2ZSBcImRldmljZVwiLCAtPlxuICAgIHJlc3RyaWN0OiBcIkFcIlxuICAgIGxpbms6IC0+XG4gICAgICBkZXZpY2UuaW5pdCgpXG5cbiAgLnNlcnZpY2UgJ2NvcHknLCAoJHNjZSkgLT5cbiAgICBjb3B5ID1cbiAgICAgIGFib3V0OlxuICAgICAgICBoZWFkaW5nOiBcIldlJ3JlIDxzdHJvbmc+dGFwcGluZzwvc3Ryb25nPiBpbnRvIHRoZSBmdXR1cmVcIlxuICAgICAgICBzdWJfaGVhZGluZzogXCJUYXBjZW50aXZlIHdhcyBjcmVhdGVkIGJ5IGEgdGVhbSB0aGF0IGhhcyBsaXZlZCB0aGUgbW9iaWxlIGNvbW1lcmNlIHJldm9sdXRpb24gZnJvbSB0aGUgZWFybGllc3QgZGF5cyBvZiBtQ29tbWVyY2Ugd2l0aCBXQVAsIHRvIGxlYWRpbmcgdGhlIGNoYXJnZSBpbiBtb2JpbGUgcGF5bWVudHMgYW5kIHNlcnZpY2VzIHdpdGggTkZDIHdvcmxkd2lkZS5cIlxuICAgICAgICBjb3B5OiBcIjxwPkZvciB1cywgbW9iaWxlIGNvbW1lcmNlIGhhcyBhbHdheXMgYmVlbiBhYm91dCBtdWNoIG1vcmUgdGhhbiBwYXltZW50OiAgbWFya2V0aW5nLCBwcm9tb3Rpb25zLCBwcm9kdWN0IGNvbnRlbnQsIGFuZCBsb3lhbHR5LCBhbGwgY29tZSB0byBsaWZlIGluc2lkZSBhIG1vYmlsZSBwaG9uZS4gTW9iaWxlIGNvbW1lcmNlIHJlYWxseSBnZXRzIGludGVyZXN0aW5nIHdoZW4gaXQgYnJpZGdlcyB0aGUgZGlnaXRhbCBhbmQgcGh5c2ljYWwgd29ybGRzLjwvcD48cD5PdXIgZ29hbCBhdCBUYXBjZW50aXZlIGlzIHRvIGNyZWF0ZSBhIHN0YXRlLW9mLXRoZS1hcnQgbW9iaWxlIGVuZ2FnZW1lbnQgcGxhdGZvcm0gdGhhdCBlbmFibGVzIG1hcmtldGVycyBhbmQgZGV2ZWxvcGVycyB0byBjcmVhdGUgZW50aXJlbHkgbmV3IGN1c3RvbWVyIGV4cGVyaWVuY2VzIGluIHBoeXNpY2FsIGxvY2F0aW9ucyDigJMgYWxsIHdpdGggYSBtaW5pbXVtIGFtb3VudCBvZiB0ZWNobm9sb2d5IGRldmVsb3BtZW50LjwvcD48cD5XZSB0aGluayB5b3XigJlsbCBsaWtlIHdoYXQgd2XigJl2ZSBidWlsdCBzbyBmYXIuIEFuZCBqdXN0IGFzIG1vYmlsZSB0ZWNobm9sb2d5IGlzIGNvbnN0YW50bHkgZXZvbHZpbmcsIHNvIGlzIHRoZSBUYXBjZW50aXZlIHBsYXRmb3JtLiBHaXZlIGl0IGEgdGVzdCBkcml2ZSB0b2RheS48L3A+XCJcbiAgICAgIHRlYW06XG4gICAgICAgIGhlYWRpbmc6IFwiXCJcbiAgICAgICAgYmlvczpcbiAgICAgICAgICBkYXZlX3JvbGU6IFwiXCJcbiAgICAgICAgICBkYXZlX2NvcHk6IFwiXCJcbiAgICBcblxuXG4gICAgdHJ1c3RWYWx1ZXMgPSAodmFsdWVzKSAtPlxuICAgICAgXy5lYWNoIHZhbHVlcywgKHZhbCwga2V5KSAtPlxuICAgICAgICBzd2l0Y2ggdHlwZW9mKHZhbClcbiAgICAgICAgICB3aGVuICdzdHJpbmcnXG4gICAgICAgICAgICAkc2NlLnRydXN0QXNIdG1sKHZhbClcbiAgICAgICAgICB3aGVuICdvYmplY3QnXG4gICAgICAgICAgICB0cnVzdFZhbHVlcyh2YWwpXG5cbiAgICB0cnVzdFZhbHVlcyhjb3B5KVxuXG4gICAgY29weVxuIiwiaWYgZGV2aWNlLmRlc2t0b3AoKVxuXG5lbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuXG5cdCQgPSBkb2N1bWVudCAjIHNob3J0Y3V0XG5cdGNzc0lkID0gJ215Q3NzJyAjIHlvdSBjb3VsZCBlbmNvZGUgdGhlIGNzcyBwYXRoIGl0c2VsZiB0byBnZW5lcmF0ZSBpZC4uXG5cdGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuXHQgICAgaGVhZCAgPSAkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cblx0ICAgIGxpbmsgID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcblx0ICAgIGxpbmsuaWQgICA9IGNzc0lkXG5cdCAgICBsaW5rLnJlbCAgPSAnc3R5bGVzaGVldCdcblx0ICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcydcblx0ICAgIGxpbmsuaHJlZiA9ICdodHRwczovL2NvZGUuaW9uaWNmcmFtZXdvcmsuY29tLzEuMC4wLWJldGEuMTMvY3NzL2lvbmljLm1pbi5jc3MnXG5cdCAgICBsaW5rLm1lZGlhID0gJ2FsbCdcblx0ICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluaylcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==