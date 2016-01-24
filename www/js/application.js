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
  }).state('blog', {
    url: '/blogroll',
    controller: 'BlogRollCtrl',
    templateUrl: ''
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
      "date": "Posted by Franchino on December 31, 2014",
      "heading": "Gitflow?",
      "authorimg": "/img/frank.png",
      "img": "/img/dec/git-flow.jpg",
      "blob": "Gosh darn-it, teams getting more synced with the help of new git methodologies for teams. <a href='https://www.atlassian.com/git/tutorials/comparing-workflows/centralized-workflow'>I can't keep up</a> "
    }, {
      "date": "Posted by Franchino on December 22, 2014",
      "heading": "Oh shit, Angular 2.0",
      "authorimg": "/img/frank.png",
      "img": "/img/graph_spa.jpg",
      "blob": "Pardon my scattered brain right now. So after watching the <a href='https://www.youtube.com/watch?v=gNmWybAyBHI' target='_blank'>Euro ng-conf video</a> where the creators of Angular 2.0 basically said, everything in changing, I did what most developers would do and completely freaked. I must say, I'm still, thoroughly confused, even after speaking to a dozen or so key figures in the industry. My first reaction? Tweet out in anger. F-U Angular team I pronounced. F-U. Then, more panic as I continued to read some of the posts by others feeling the same way. I asked the Angular team, how they were helping the industry by telling us in a year anything we have developed in Angular would be garbage. I did what others seemed to be doing and immediately started looking for another framework to study and invest in. That's when I found <a href='http://www.indeed.com/jobtrends?q=ember.js%2C+angular.js%2C+react.js%2C+backbone.js&l=' target='_blank'>this graph</a> telling me the only other SPA framework that has as much activity as Angular is good old Backbone. <br /><br />Backbone, my first SPA love - we've met before. Even recently. But I've been lost. I've been inlove with Egghead.io and things like Ionic, Sprangular and all sorts of things that give me stuff for free. But then I noticed something. The backbone community has been quietly doing it's thing for a minute now. Backbonerails.com? Are you kidding, what a resource. Marionette? Lovely. The list goes on. I now have dozens of reasons to give Backbone another look. And then, it happened. I emailed Max Lynch over at Ionic and said, I think you need to address the fright of Angular 2.0 some of us are experiencing. And then he shed some light. After a really awesome response, he said something at the end to the tune of. Angular 2 is all about making it easier and faster to use, and more appropriate for future browser standards like Web Components. Hmm... <br /><br />Web Components. You mean, this stuff I've been hearing about, things like Polymer, and these new specs the browser already has begun to support, like Shadow Dom, custom elements and imports. So. Where the hell am I right now? For now, I think I'll take a break from stressing about SPA frameworks and look at <a href='https://www.polymer-project.org/' target='_blank'>Polymer</a>, <a href='http://webcomponents.org/' target='_blank'>Web Components</a>, E6 and study up on <a href='https://material.angularjs.org/#/' target='_blank'>Material Design</a> for a minute."
    }, {
      "date": "Posted by Franchino on December 12, 2014",
      "heading": "My path to learning Swift",
      "authorimg": "/img/frank.png",
      "img": "/img/dec/newsletter-swiftris-header.gif",
      "blob": "I've been an MVC developer in every language except for iOS. This past October, I took my first real deep dive into iOS programming and started with Swift. There are two great tutorials out there. The first is from bloc.io and is free. It's a game, Swiftris, so get ready for some action. <br /><br /> The second will help you build something more appish, it's by Appcoda. Got their book and will be done with it this week. So far, books ok, but it moves really slow. I'll post a blog in a few days with links to the app was able to build.",
      "resource1": "https://www.bloc.io/swiftris-build-your-first-ios-game-with-swift",
      "resource2": "http://www.appcoda.com/swift/"
    }, {
      "date": "Posted by Franchino on December 11, 2014",
      "heading": "Why I get goose bumps when you talk about automated email marketing and segmentation and customer.io and things like that.",
      "authorimg": "/img/frank.png",
      "img": "/img/dec/prepemails.png",
      "blob": "I get teary eyed when I talk about my work at BenchPrep.com. In short, I was the first employee and helped the company get to their series B near the end of year two. I got a lot done there, and one of the things I really enjoyed was building out technology to segment leads, bring different users down different communication paths and how I mapped out the entire system using complex diagrams and workflows. <br /><br />Some of the tools were built and based on ques like Redis or Resque, others we built into ExactTarget and Customer.io. In the end, I became somewhat of an expert at monetizing emails. Within our email marketing channel, we explored tagging users based on their actions, such as opens or non opens, or what they clicked on, we targed email users who had been touched seven times with special irrisitable sales, because we know after 6 touches, we could convert. These tricks we learned led to 25-30k days, and eventually, days where we sold 100k worth of subscriptions. <br /><br />So, my point? Don't be surprised if I geek out and faint when I hear you talk about transactional emailing and cadences and consumer journies and stuff like that."
    }, {
      "date": "Posted by Franchino on December 10, 2014",
      "heading": "If I could have one wish; I get to use this method when designing your consumer journey funnel.",
      "authorimg": "/img/frank.png",
      "img": "/img/dec/ux_board.jpg",
      "blob": "So after a bunch of ethnographic studies from persona matches I gather in-person, I get to fill a wall up with key things people said, felt, heard - motivators, barriers, questions, attitudes and such. I then group these post-it thoughts in various ways, looking for patterns, sentiment, new ideas. <br /><br />I then take this rich data and develop a what could be branding, a landing page or an email - with what I call, an inverted pyramid approach to content, where addressing the most important things found in the user research get addressed in a heriarchical order. I create 5-6 iterations of the landing page and re-run them through a second group of participants, stakeholders and friends. I then take even more notes on peoples speak-aloud reactions to the landing pages. After this, I'm ready to design the final copy and pages for your funnel."
    }, {
      "date": "Posted by Franchino on December 9, 2014",
      "heading": "Who says I don't belong here?",
      "authorimg": "/img/frank.png",
      "img": "/img/dec/ucla.jpg",
      "blob": "This coming weekend there's probably a hackathon going on in your city. Some of them are getting really big. I wasn't registered for LA Hacks this summer. I don't even know how I ended up there on a Friday night, but when I saw what was going on, I grabbed a chair and started hacking away. Worried I had just snuck in the back door and started competing, my ride left and there I was, for the next two days. <br /><br />That's right. I snuck in the back of LA Hacks last summer at UCLA and hacked with kids 10 years younger than me. I couldn't miss it. I was floored when I saw how many people were in it. Me, being the mischevious hacker I am, I thought if I used the energy of the environment to my advantage, I could build something cool. Long story short, let me just say, that if you have been having a hard time launching, sign up for a hackathon. It's a guaranteed way to over-compensate for your constant failure to launch. More on what happened when I took the stage by surprise and got booted later..."
    }, {
      "date": "Posted by Franchino on December 8, 2014",
      "heading": "Started in Ember.js, finished in Angular.js. Why and how did this happen?",
      "authorimg": "/img/frank.png",
      "img": "/img/dec/ux1.jpg",
      "blob": "I got love for all SPA frameworks. Collectively, they all push the envelope. My first client-side MVC project was a backbone project - and we started when they were in Beta. That project was BenchPrep. At the time, as a front-end developer, I was confused by the sweeping changes to how things needed to be done. Full fledged MVC frameworks in JavaScript lended a whole new syntax, and to top it off, our engineers on the team were using CoffeeScript, HAML, SASS and Jasmine, etc. My first SPA project did not go well and it wasn't until we completely re-wrote the software that I started understanding everything clearly. Two years later, a new team I was working with decided to build <a href='http://agentrun.com' target='_blank'>Agentrun.com</a> in Ember.js. We dove in. Four months later, we ported to Angular and since, I've never looked back. I'm on my fifth or sixth angular project now and I don't plan on changing frameworks for a while - at least personally. <br /><br />The angular movement reminds me the most of the RoR movement. I don't get stuck trying to do things like I do in Backbone or Ember. I could get into discussion and technical examples, but there are better places to compare the two. I can't wait for the completely revamped Angular 2.0 and am looking forward to a 5-7 year future with Angular before something new comes out, something that perhaps just builds apps for you by reading your mind. <br /><br />Oh, and if your wondering who designed this lovely website, that was yours truly. I led the UX research, UX prototyping, user research and graphic design of this product."
    }, {
      "date": "Posted by Franchino on December 7, 2014",
      "heading": "Please don't ask me about my art and mixed media background. I might totally avoid the question.",
      "authorimg": "/img/frank.png",
      "img": "/img/dec/mixed.jpg",
      "blob": "I have a huge complex about my hybrid background. I can't tell you how many times I've been on an interview where I've tried to explain the fact that I'm an artist and a programmer. The minute I do this, I'm almost instantly written off as a jack-of-all trades or weak on one side. <br /><br />So, I'm about to officially explain to everyone something I'm pretty sensative about. I'm a very talented creative director with a very sophisticated technical background. I make explainer videos, I film, I do user research, I design and I program. Yes, I program - I will front-end with the best and have a knack for front-end MVC frameworks. <br /><br />Yes, there are some things I'm not good at. I'm not your genius programmer that will lead your other programmers to the promise land, but not weak like your thinking - I just know a lot of hackers who don't concern themselves with things that I get lost in, like design or content strategy, or user research. So when I say weak, I mean weak like, I'm talking, possibly, faul-tolerant functional progamming in low level languages or Erlang or Elixer with superviser OTP architectures and message passing. I'm taling middleware development. I'm talking TDD dev all day every day on a hardcore scrum team. That's not me. I'm not your lead here, however I will Jr. on understanding how every line of code works in your app. I'm your prototyper, MVP guy or follow your lead guy when it comes to programming. I can make just about anything I want, but don't feel comfortable leading say, an iOS or Java team. I just don't have enough low-level programming experience in those particulare frameworks. When it comes to JavaScript, I'm a 7. There isn't anything you can't ask me to do with JavaScript, from Famo.us to MVC stuff - however, I'm not your guy who's going to introduce the next big open-source tool in JS. I'm a macro JS developer - meaning I can take established patterns and components and concepts and run with them. I don't give talks on big-o notations and I might not be down for a 40 hour a week job of hardcore TDD programming - but this doesn't mean you should write me off as a generalist.<br /><br />The fact is that I've never been the type for a role with an early stage startup where I didn't wear a bunch of hats or transition periodically from a design minded thinker to a technical scrum, requirement writing, produc managing anal-ist."
    }
  ];
});

Franchino.controller('BlogRollCtrl', function($scope) {});

Franchino.controller('AboutCtrl', function($scope) {});

Franchino.controller('AppCtrl', function($scope) {});

Franchino.controller('ResumeCtrl', function($scope) {
  return $scope.blob = '<div class="row"><div class="large-12"><div class="row"><div class="large-12 columns"><h6>NOV 2013 - PRESENT</h6><br/><h2>Hybrid Experience Designer/Developer, Independent</h2><br/><p>Worked with noteable entreprenours on several new product and business launches. Held numerous roles, including content strategist, user researcher, designer and developer. </p><p><strong>Companies</strong></p><ul class="no"><li><a href="http://tapcentive.com" target="_blank">Tapcentive</a></li><li><a href="http://cpg.io" target="_blank">CPGio</a></li><li><a href="http://kou.pn/" target="_blank">Kou.pn Media</a></li><li> <a href="http://medycation.com" target="_blank">Medycation</a></li><li> <a href="http://www.suntimes.com/" target="_blank">Chicago Sun Times</a></li></ul><br/><p><strong>Tapcentive Deliverables</strong></p><ul class="bullets"><li>Complete Tapcentive.com marketing website and UX overhaul of core product, the "Tapcentive Manager"</li><li>Industrial design of the Tapcentive Touchpoint</li><li>Content strategy for corporate marketing site</li><li>Mobile first marketing website using Ionic and Angular</li></ul><p><strong>CPGio Deliverables</strong></p><ul class="bullets"><li>Product and business strategy, technical architecture and specification design</li><li>One hundred page proposal template on business model and corporate capabilities</li><li>Marketing website design and content strategy</li><li>Core product design and MVP functional prototype</li></ul><p><strong>Kou.pn Deliverables</strong></p><ul class="bullets"><li>Kou.pn Media brand refresh</li><li>Marketing site redesign</li><li>Portal user experience overhaul</li></ul><p><strong>Medycation Deliverables</strong></p><ul class="bullets"><li>Conceptual design and art direction</li><li>User research</li><li>Rapid prototypes</li></ul><p><strong>Chicago Sun Times</strong></p><ul class="bullets"><li>Conceptual design and art direction</li><li>Native iOS and Android app design and junior development</li><li>Hybrid Ionic/Angular development</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>MARCH 2010 - OCTOBER 2013</h6><br/><h2>Director of User Experience, Lightbank</h2><br/><p>Launched and supported multiple new companies within the Lightbank portfolio. </p><p><strong>Companies</strong></p><ul class="no"><li> <a href="http://chicagoideas.com" target="_blank">ChicagoIdeas.com</a></li><li> <a href="http://benchprep.com" target="_blank">BenchPrep.com</a></li><li> <a href="http://snapsheetapp.com" target="_blank">SnapSheetApp.com</a></li><li>Monthlys.com (defunct)</li><li> <a href="http://dough.com" target="_blank">Dough.com</a></li><li> <a href="http://groupon.com" target="_blank">Groupon.com</a></li></ul><br/><p><strong>Chicago Ideas Deliverables</strong></p><ul class="bullets"><li>Website design refresh, art direction</li><li>Custom ticket purchasing platform UX research &amp; design</li><li>Ruby on Rails development, maintenence</li><li>Graphic design support</li><li>Annual report design</li></ul><p><strong>BenchPrep.com Deliverables</strong></p><ul class="bullets"><li>Re-branding, complete BenchPrep identity package</li><li>Supported company with all design and ux from zero to eight million in financing</li><li>Lead art and UX direction for two years</li><li>Front-end using Backbone and Bootstrap</li><li>User research, ethnographic studies, user testing</li><li>Email marketing cadence system design and execution</li><li>Scripted, storyboarded and executed both animated and live motion explainer videos</li></ul><p><strong>SnapSheetApp.com Deliverables</strong></p><ul class="bullets"><li>Large scale portal UX research and information architecture</li><li>Three rounds of rapid prototyping and user testing</li><li>Graphic design and interaction design framework</li><li>User testing</li></ul><p><strong>Monthlys.com Deliverables</strong></p><ul class="bullets"><li>Identity and art direction</li><li>Product strategy and new company launch</li><li>Online marketing strategy, including transactional email, promotion design and lead generation</li><li>Product experience design and front-end</li><li>Content strategy</li><li>Scripted, storyboarded and executed both animated and live motion explainer videos</li></ul><p><strong>Dough.com Deliverables</strong></p><ul class="bullets bullets"><li>Consumer journey mapping and ethnographic studies</li><li>Rapid prototyping, conceptual design</li><li>Messaging strategy, user testing</li></ul><p><strong>Groupon.com Deliverables</strong></p><ul class="bullets"><li>Emerging markets research</li><li>Rapid design and prototyping</li><li>Visual design on new concepts</li><li>Email segmentation research</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>NOVEMBER 2007 - APRIL 2010</h6><br/><h2>Developer &amp; Co-founder, Dillyeo.com</h2><br/><p>Co-founded, designed and developed a daily deal eCommerce website.</p><p><strong>Role</strong><br/>Designed, developed and launched companies first cart with PHP. Iterated and grew site to more than two hundred and fifty thousand subscribers in less than one year. </p><p><strong>Noteable Stats</strong></p><ul class="bullets"><li>Built a list of 250,000 subscribers in the first year</li><li>Pivoted and tweaked design, business and approach to 1000 transactions per daily</li><li>Sold business in December 2009 to Innovative Commerce Solutions</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>MARCH 2005 - OCTOBER 2007</h6><br/><h2>Solutions Architect &amp; Senior Developer, <a href="http://www.manifestdigital.com/">Manifest Digital</a></h2><br/><p>Built and managed multiple CareerBuilder.com niche sites for the largest independent agency in the midwest.</p><p><strong>Role</strong><br/>Research and explore emerging technologies, implement solutions and manage other developers. Worked with asp.net on a daily basis for almost two years. </p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Recognized for launching high quality web app for Career Builder in record time</li><li>Managed extreme SEO project with more than 500 thousand links, pages and over 8 million UGC artifacts</li><li>Shifted agencies development practices to various new client-centric AJAX methodologies</li><li>Managed multiple projects concurrently, including choosechicago.com and briefing.com</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>APRIL 2004 - JANUARY 2007</h6><br/><h2>Junior PLD Developer,  <a href="http://www.avenue-inc.com/">Avenue</a></h2><br/><p>Front-end developer and UX design intern for Avenue A Razorfishs\' legacy company, Avenue-inc.</p><p><strong>Role</strong><br/>Develop front-end for multiple client websites, including flor.com, achievement.org, canyonranch.com and turbochef.</p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Executed front-end projects on-time and under-budget</li><li>Assigned UX internship role, recognized by design team as a young talent</li><li>Wireframed custom shopping cart platform for flor.com</li><li>Developed internal SEO practice</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>JULY 2000 - JANUARY 2004</h6><br/><h2>eCommerce Developer, Atova</h2><br/><p>General web designer and developer for family owned paint distribution business. </p><p><strong>Role</strong><br/>Built several shopping carts in classic ASP and PHP. Grew business using online marketing strategies to two million in revenue. </p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Became first company to ship paints and coatings across the United States</li><li>First employee, developed company to 2+ million in revenue with Overture, Google Adwords and SEO</li><li>Created, marketed and subscribed vocational school for specialty coatings</li><li>Worked with top Italian paint manufacturers overseas to build exclusive distribution rights</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>SEPTEMBER 2000 - MAY 2002</h6><br/><h2>Education</h2><br/><p>Self educated designer/programmer with vocational training. </p><p><strong>Certifications</strong><br/>iNET+, A+ Certification </p><p><strong>Apprenticeship</strong><br/>Year long personal apprenticeship with first engineer at Amazon.com</p></div></div></div></div><br/><br/>';
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJjb250cm9sbGVycy5jb2ZmZWUiLCJkaXJlY3RpdmVzLmNvZmZlZSIsImluaXQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFIO0FBQ0UsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixPQUFPLENBQUMsTUFBUixDQUFlLFdBQWYsRUFBNEIsQ0FBQyxZQUFELEVBQWUsV0FBZixFQUE0QixrQkFBNUIsRUFBZ0QsaUJBQWhELEVBQW1FLGdCQUFuRSxDQUE1QixDQUFuQixDQURGO0NBQUEsTUFBQTtBQUlFLEVBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUIsT0FBTyxDQUFDLE1BQVIsQ0FBZSxXQUFmLEVBQTRCLENBQUUsT0FBRixFQUFXLGtCQUFYLEVBQStCLGlCQUEvQixFQUFrRCxnQkFBbEQsQ0FBNUIsQ0FDakIsQ0FBQyxHQURnQixDQUNaLFNBQUMsY0FBRCxHQUFBO1dBQ0gsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsU0FBQSxHQUFBO0FBQ25CLE1BQUEsSUFBNEIsTUFBTSxDQUFDLFNBQW5DO2VBQUEsU0FBUyxDQUFDLFlBQVYsQ0FBQSxFQUFBO09BRG1CO0lBQUEsQ0FBckIsRUFERztFQUFBLENBRFksQ0FBbkIsQ0FKRjtDQUFBOztBQUFBLFNBU1MsQ0FBQyxNQUFWLENBQWlCLFNBQUMsY0FBRCxFQUFpQixrQkFBakIsRUFBcUMsaUJBQXJDLEVBQXdELGFBQXhELEdBQUE7QUFDZixFQUFBLGNBQ0UsQ0FBQyxLQURILENBQ1MsS0FEVCxFQUVJO0FBQUEsSUFBQSxHQUFBLEVBQUssRUFBTDtBQUFBLElBQ0EsUUFBQSxFQUFVLElBRFY7QUFBQSxJQUVBLFVBQUEsRUFBWSxTQUZaO0FBQUEsSUFHQSxXQUFBLEVBQWEsV0FIYjtHQUZKLENBT0UsQ0FBQyxLQVBILENBT1MsVUFQVCxFQVFJO0FBQUEsSUFBQSxHQUFBLEVBQUssR0FBTDtBQUFBLElBQ0EsS0FBQSxFQUNFO0FB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S0EsSUFBSSxDQUFDLElBQUwsR0FBWSxpRUFMWixDQUFBO0FBQUEsSUFNQSxJQUFJLENBQUMsS0FBTCxHQUFhLEtBTmIsQ0FBQTtBQUFBLElBT0EsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsSUFBakIsQ0FQQSxDQURKO0dBSkk7Q0FGTCIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmIGRldmljZS5kZXNrdG9wKClcbiAgd2luZG93LkZyYW5jaGlubyA9IGFuZ3VsYXIubW9kdWxlKCdGcmFuY2hpbm8nLCBbJ25nU2FuaXRpemUnLCAndWkucm91dGVyJywgJ2J0Zm9yZC5zb2NrZXQtaW8nLCAndGFwLmNvbnRyb2xsZXJzJywgJ3RhcC5kaXJlY3RpdmVzJ10pXG5cbmVsc2VcbiAgd2luZG93LkZyYW5jaGlubyA9IGFuZ3VsYXIubW9kdWxlKFwiRnJhbmNoaW5vXCIsIFsgXCJpb25pY1wiLCBcImJ0Zm9yZC5zb2NrZXQtaW9cIiwgXCJ0YXAuY29udHJvbGxlcnNcIiwgJ3RhcC5kaXJlY3RpdmVzJ10pXG4gICAgLnJ1biAoJGlvbmljUGxhdGZvcm0pIC0+XG4gICAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeSAtPlxuICAgICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCkgaWYgd2luZG93LlN0YXR1c0JhclxuXG5GcmFuY2hpbm8uY29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJGh0dHBQcm92aWRlcikgLT5cbiAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUgJ2FwcCcsXG4gICAgICB1cmw6ICcnXG4gICAgICBhYnN0cmFjdDogdHJ1ZVxuICAgICAgY29udHJvbGxlcjogJ0FwcEN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ21lbnUuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmhvbWUnLFxuICAgICAgdXJsOiAnLydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdob21lLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2Jsb2cnLFxuICAgICAgdXJsOiAnL2Jsb2dyb2xsJ1xuICAgICAgY29udHJvbGxlcjogJ0Jsb2dSb2xsQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnJ1xuXG4gICAgLnN0YXRlICdhcHAuZG9jcycsXG4gICAgICB1cmw6ICcvZG9jcydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnRG9jc0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdkb2NzL2luZGV4Lmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5hYm91dCcsXG4gICAgICB1cmw6ICcvYWJvdXQnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0Fib3V0Q3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnXG5cblxuICAgIC5zdGF0ZSAnYXBwLmJsb2cnLFxuICAgICAgdXJsOiAnL2Jsb2cnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0Jsb2dDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnYmxvZy5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAucmVzdW1lJyxcbiAgICAgIHVybDogJy9yZXN1bWUnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ1Jlc3VtZUN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdyZXN1bWUuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmNvbnRhY3QnLFxuICAgICAgdXJsOiAnL2NvbnRhY3QnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29udGFjdC5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuZG9jJyxcbiAgICAgIHVybDogJy9kb2NzLzpwZXJtYWxpbmsnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0RvY0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdkb2NzL3Nob3cuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLnN0ZXAnLFxuICAgICAgdXJsOiAnL2RvY3MvOnBlcm1hbGluay86c3RlcCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnRG9jQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2RvY3Mvc2hvdy5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLXRhcGNlbnRpdmUnLFxuICAgICAgdXJsOiAnL2pvYi10YXBjZW50aXZlJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JUYXBjZW50aXZlQ3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi10YXBjZW50aXZlLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItdGFwY2VudGl2ZS10d28nLFxuICAgICAgdXJsOiAnL2pvYi10YXBjZW50aXZlLXR3bydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iVGFwY2VudGl2ZVR3b0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItdGFwY2VudGl2ZS10d28uaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi1jcGdpbycsXG4gICAgICB1cmw6ICcvam9iLWNwZ2lvJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JDcGdpb0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItY3BnaW8uaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi1tZWR5Y2F0aW9uJyxcbiAgICAgIHVybDogJy9qb2ItbWVkeWNhdGlvbidcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iTWVkeWNhdGlvbkN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItbWVkeWNhdGlvbi5odG1sJ1xuXG4gICAgLnN0YXRlICdhcHAuam9iLWNzdCcsXG4gICAgICB1cmw6ICcvam9iLWNzdCdcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iQ3N0Q3RybCdcbiAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pvYi1jc3QuaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi1rb3VwbicsXG4gICAgICB1cmw6ICcvam9iLWtvdXBuJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JLb3VwbkN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2Ita291cG4uaHRtbCdcblxuICAgIC5zdGF0ZSAnYXBwLmpvYi10cm91bmQnLFxuICAgICAgdXJsOiAnL2pvYi10cm91bmQnXG4gICAgICB2aWV3czpcbiAgICAgICAgbWVudUNvbnRlbnQ6XG4gICAgICAgICAgY29udHJvbGxlcjogJ0pvYlRyb3VuZEN0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItdHJvdW5kLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItbW9udGhseXMnLFxuICAgICAgdXJsOiAnL2pvYi1tb250aGx5cydcbiAgICAgIHZpZXdzOlxuICAgICAgICBtZW51Q29udGVudDpcbiAgICAgICAgICBjb250cm9sbGVyOiAnSm9iTW9udGhseXNDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLW1vbnRobHlzLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItbW9udGhseXMtdHdvJyxcbiAgICAgIHVybDogJy9qb2ItbW9udGhseXMtdHdvJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JNb250aGx5c1R3b0N0cmwnXG4gICAgICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItbW9udGhseXMtdHdvLmh0bWwnXG5cbiAgICAuc3RhdGUgJ2FwcC5qb2ItYmVuY2hwcmVwJyxcbiAgICAgIHVybDogJy9qb2ItYmVuY2hwcmVwJ1xuICAgICAgdmlld3M6XG4gICAgICAgIG1lbnVDb250ZW50OlxuICAgICAgICAgIGNvbnRyb2xsZXI6ICdKb2JCZW5jaHByZXBDdHJsJ1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiAnam9iLWJlbmNocHJlcC5odG1sJ1xuXG5cblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UgXCIvXCJcblxuICAgICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2ggLT5cbiAgICAgICByZXF1ZXN0OiAoY29uZmlnKSAtPlxuICAgICAgICAgaWYgY29uZmlnLnVybC5tYXRjaCgvXFwuaHRtbCQvKSAmJiAhY29uZmlnLnVybC5tYXRjaCgvXnNoYXJlZFxcLy8pXG4gICAgICAgICAgIGlmIGRldmljZS50YWJsZXQoKVxuICAgICAgICAgICAgIHR5cGUgPSAndGFibGV0J1xuICAgICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgICAgIHR5cGUgPSAnbW9iaWxlJ1xuICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgdHlwZSA9ICdkZXNrdG9wJ1xuXG4gICAgICAgICAgIGNvbmZpZy51cmwgPSBcIi8je3R5cGV9LyN7Y29uZmlnLnVybH1cIlxuXG4gICAgICAgICBjb25maWdcbiBcbkZyYW5jaGluby5ydW4gKCRzdGF0ZSkgLT5cbiAgJHN0YXRlLmdvKCdhcHAuaG9tZScpXG5cbkZyYW5jaGluby5ydW4gKCRyb290U2NvcGUsIGNvcHkpIC0+XG4gICRyb290U2NvcGUuY29weSA9IGNvcHlcblxuRnJhbmNoaW5vLmZhY3RvcnkgJ1NvY2tldCcsIChzb2NrZXRGYWN0b3J5KSAtPlxuICBzb2NrZXRGYWN0b3J5KClcblxuRnJhbmNoaW5vLmZhY3RvcnkgJ0RvY3MnLCAoU29ja2V0KSAtPlxuICBzZXJ2aWNlID1cbiAgICBsaXN0OiBbXVxuICAgIGZpbmQ6IChwZXJtYWxpbmspIC0+XG4gICAgICBfLmZpbmQgc2VydmljZS5saXN0LCAoZG9jKSAtPlxuICAgICAgICBkb2MucGVybWFsaW5rID09IHBlcm1hbGlua1xuXG4gIFNvY2tldC5vbiAnZG9jcycsIChkb2NzKSAtPlxuICAgIHNlcnZpY2UubGlzdCA9IGRvY3NcblxuICBzZXJ2aWNlXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdIb21lQ3RybCcsICgkc2NvcGUpIC0+XG4gIFxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0NvbnRhY3RTaGVldEN0cmwnLCAoJHNjb3BlLCAkaW9uaWNBY3Rpb25TaGVldCkgLT5cbiAgJHNjb3BlLnNob3dBY3Rpb25zaGVldCA9IC0+XG4gICAgJGlvbmljQWN0aW9uU2hlZXQuc2hvd1xuICAgICAgdGl0bGVUZXh0OiBcIkNvbnRhY3QgRnJhbmNoaW5vXCJcbiAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiR2l0aHViIDxpIGNsYXNzPVxcXCJpY29uIGlvbi1zaGFyZVxcXCI+PC9pPlwiXG4gICAgICAgIH1cbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiRW1haWwgTWUgPGkgY2xhc3M9XFxcImljb24gaW9uLWVtYWlsXFxcIj48L2k+XCJcbiAgICAgICAgfVxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogXCJUd2l0dGVyIDxpIGNsYXNzPVxcXCJpY29uIGlvbi1zb2NpYWwtdHdpdHRlclxcXCI+PC9pPlwiXG4gICAgICAgIH1cbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6IFwiMjI0LTI0MS05MTg5IDxpIGNsYXNzPVxcXCJpY29uIGlvbi1pb3MtdGVsZXBob25lXFxcIj48L2k+XCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgICAgY2FuY2VsVGV4dDogXCJDYW5jZWxcIlxuICAgICAgY2FuY2VsOiAtPlxuICAgICAgICBjb25zb2xlLmxvZyBcIkNBTkNFTExFRFwiXG4gICAgICAgIHJldHVyblxuXG4gICAgICBidXR0b25DbGlja2VkOiAoaW5kZXgpIC0+XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCIyMjQtMjQxLTkxODlcIiAgaWYgaW5kZXggaXMgMlxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaHR0cDovL3R3aXR0ZXIuY29tL2ZyYW5jaGlub19jaGVcIiAgaWYgaW5kZXggaXMgMlxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwibWFpbHRvOmZyYW5jaGluby5ub25jZUBnbWFpbC5jb21cIiAgaWYgaW5kZXggaXMgMVxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IFwiaHR0cDovL2dpdGh1Yi5jb20vZnJhbmd1Y2NcIiAgaWYgaW5kZXggaXMgMFxuICAgICAgICB0cnVlXG5cbiAgcmV0dXJuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc1RhcE9uZUN0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnTk9WRU1CRVIgMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ1RhcGNlbnRpdmUgbWFuYWdlciBVWCBvdmVyaGF1bCBhbmQgZnJvbnQtZW5kJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlRhcGNlbnRpdmUuY29tIFVYIG92ZXJoYXVsIGFuZCBTUEEgZnJvbnQtZW5kXCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2dpZi9yZXBvcnQuZ2lmXCIsXG4gICAgICBcInRleHRcIiA6IFwiPHA+U3R1ZHkgdGhlIHVzZXIgYW5kIHRoZWlyIGdvYWxzIGFuZCBvdmVyaGF1bCB0aGUgZXhwZXJpZW5jZSB3aGlsZSByZS13cml0aW5nIHRoZSBmcm9udC1lbmQgaW4gQW5ndWxhci48L3A+PGEgaHJlZj0naHR0cDovL3RhcGNlbnRpdmUuY29tJyB0YXJnZXQ9J19ibGFuayc+VmlzaXQgV2Vic2l0ZTwvYT5cIlxuICAgIH1cbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc1RhcFR3b0N0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnT0NUT0JFUiAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnRGVza3RvcCBhbmQgbW9iaWxlIHdlYiBmcmllbmRseSBtYXJrZXRpbmcgd2Vic2l0ZScgXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tdGFwY2VudGl2ZS15ZWxsb3cuanBnXCIsXG4gICAgICBcInRleHRcIiA6IFwiPHA+Q3JlYXRlIGEga25vY2tvdXQgYnJhbmQgc3RyYXRlZ3kgd2l0aCBhbiBhd2Vzb21lIGxvb2sgYW5kIGZlZWwuIE1ha2UgYSBzb3BoaXN0aWNhdGVkIG9mZmVyaW5nIGxvb2sgc2ltcGxlIGFuZCBlYXN5IHRvIHVzZS48L3A+PGEgaHJlZj0naHR0cDovL3RhcGNlbnRpdmUuY29tJyB0YXJnZXQ9J19ibGFuayc+VmlzaXQgV2Vic2l0ZTwvYT5cIlxuICAgIH1cblxuICBdXG5cbkZyYW5jaGluby5jb250cm9sbGVyIFwiU2xpZGVzQ3BnQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdKVUxZIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdJZGVudGl0eSwgZnVsbC1zdGFjayBNVlAsIGFuZCBtYXJrZXRpbmcgd2Vic2l0ZSBmb3IgYSBuZXcgQ1BHIGVEaXN0cmlidXRpb24gY29tcGFueScgXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2lub19jcGdpby5qcGdcIixcbiAgICAgIFwidGV4dFwiIDogXCI8cD5UdXJuIGFuIG9sZCBzY2hvb2wgQ1BHIGJ1c2luZXNzIGludG8gYSBzb3BoaXN0aWNhdGVkIHRlY2hub2xvZ3kgY29tcGFueS4gRGVzaWduIHNlY3VyZSwgYXV0b21hdGVkIGFuZCB0cmFuc2Zvcm1hdGl2ZSBwbGF0Zm9ybSwgdGVjaG5pY2FsIGFyY2hpdGVjdHVyZSBhbmQgZXhlY3V0ZSBhbiBNVlAgZW5vdWdoIHRvIGFxdWlyZSBmaXJzdCBjdXN0b21lcnMuIE1pc3Npb24gYWNjb21wbGlzaGVkLjwvcD48YSBocmVmPSdodHRwOi8vY3BnLmlvJyB0YXJnZXQ9J19ibGFuayc+VmlzaXQgV2Vic2l0ZTwvYT5cIlxuICAgIH1cbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc01lZHljYXRpb25DdHJsXCIsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0FQUklMIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdVc2VyIGV4cGVyaWVuY2UgZGVzaWduIGFuZCByYXBpZCBwcm90b3R5cGluZyBmb3IgTWVkeWNhdGlvbiwgYSBuZXcgaGVhbHRoY2FyZSBwcmljZSBjb21wYXJpc29uIHdlYnNpdGUnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tbWVkeWNhdGlvbi5qcGdcIixcbiAgICAgIFwidGV4dFwiIDogXCI8cD5XYWx0eiB1cCBpbiB0aGUgb25saW5lIGhlYWx0aGNhcmUgaW5kdXN0cnkgZ3VucyBibGF6aW5nIHdpdGgga2lsbGVyIGRlc2lnbiBhbmQgaW5zdGluY3RzLiBHZXQgdGhpcyBuZXcgY29tcGFueSBvZmYgdGhlIGdyb3VuZCB3aXRoIGl0J3MgTVZQLiBTd2lwZSBmb3IgbW9yZSB2aWV3cy48L3A+PGEgaHJlZj0naHR0cDovL21lZHljYXRpb24uY29tJyB0YXJnZXQ9J19ibGFuayc+VmlzaXQgV2Vic2l0ZTwvYT5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tbWVkeWNhdGlvbjIuanBnXCIsXG4gICAgICBcInRleHRcIiA6IFwiXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLW1lZHljYXRpb24zLmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1tZWR5Y2F0aW9uNC5qcGdcIlxuICAgIH0sXG4gIF1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJTbGlkZXNDU1RDdHJsXCIsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0FQUklMIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdEZXNpZ25lZCBhbmQgZGV2ZWxvcGVkIGEgbmV3IHZlcnNpb24gb2YgdGhlIENoaWNhZ28gU3VuIFRpbWVzIHVzaW5nIGEgaHlicmlkIElvbmljL0FuZ3VsYXIgc3RhY2snXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tY3N0LmpwZ1wiLFxuICAgICAgXCJ0ZXh0XCIgOiBcIjxwPkhlbHAgdGhlIHN0cnVnZ2xpbmcgbWVkaWEgZ2lhbnQgdXBncmFkZSB0aGVpciBjb25zdW1lciBmYWNpbmcgdGVjaG5vbG9neS4gQ3JlYXRlIG9uZSBjb2RlIGJhc2UgaW4gQW5ndWxhciBjYXBhYmxlIG9mIGdlbmVyYXRpbmcga2ljay1hc3MgZXhwZXJpZW5jZXMgZm9yIG1vYmlsZSwgdGFibGV0LCB3ZWIgYW5kIFRWLlwiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1jc3QyLmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1jc3QzLmpwZ1wiXG4gICAgfSxcbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc0tvdXBuQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdNQVJDSCAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnQnJhbmQgcmVmcmVzaCwgbWFya2V0aW5nIHNpdGUgYW5kIHBsYXRmb3JtIGV4cGVyaWVuY2Ugb3ZlcmhhdWwnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8ta291cG4xLmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1rb3VwbjIuanBnXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLWtvdXBuLmpwZ1wiXG4gICAgfSxcbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc1Ryb3VuZEN0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnQVVHVVNUIDIwMTMnXG4gICRzY29wZS50aXRsZSA9ICdTb2NpYWwgdHJhdmVsIG1vYmlsZSBhcHAgZGVzaWduLCBVWCBhbmQgcmFwaWQgcHJvdG90eXBpbmcnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2lub190cm91bmQuanBnXCIsXG4gICAgICBcInRleHRcIiA6IFwiRGVzaWduIGFuIEluc3RhZ3JhbSBiYXNlZCBzb2NpYWwgdHJhdmVsIGFwcC4gV2h5PyBJIGRvbid0IGtub3cuXCJcbiAgICB9XG4gIF1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgXCJTbGlkZXNNb250aGx5c0N0cmxcIiwgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnRkVCUlVBUlkgMjAxMydcbiAgJHNjb3BlLnRpdGxlID0gJ0N1c3RvbWVyIHBvcnRhbCBwbGF0Zm9ybSBVWCBkZXNpZ24gYW5kIGZyb250LWVuZCdcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1tb250aGx5cy1iaXoyLmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGlub19tb250aGx5cy5qcGdcIlxuICAgIH1cbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIlNsaWRlc01vbnRobHlzVHdvQ3RybFwiLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdNQVJDSCAyMDEyJ1xuICAkc2NvcGUudGl0bGUgPSAnRW50cmVwcmVuZXVyIGluIHJlc2lkZW5jZSBhdCBMaWdodGJhbmsnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgXCJhbHRcIiA6IFwiU29tZSBhbHQgdGV4dFwiLFxuICAgICAgXCJ1cmxcIiA6IFwiL2ltZy9mcmFuY2hpbm8tbW9udGhseXM3LmpwZ1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImFsdFwiIDogXCJTb21lIGFsdCB0ZXh0XCIsXG4gICAgICBcInVybFwiIDogXCIvaW1nL2ZyYW5jaGluby1tb250aGx5czUuanBnXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiYWx0XCIgOiBcIlNvbWUgYWx0IHRleHRcIixcbiAgICAgIFwidXJsXCIgOiBcIi9pbWcvZnJhbmNoaW5vLW1vbnRobHlzMi5qcGdcIlxuICAgIH1cbiAgXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciBcIkJsb2dDdHJsXCIsICgkc2NvcGUpIC0+XG5cbiAgJHNjb3BlLmFydGljbGVzID0gW1xuICAgIFxuICAgIHtcbiAgICAgIFwiZGF0ZVwiIDogXCJQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDMxLCAyMDE0XCIsXG4gICAgICBcImhlYWRpbmdcIiA6IFwiR2l0Zmxvdz9cIixcbiAgICAgIFwiYXV0aG9yaW1nXCIgOiBcIi9pbWcvZnJhbmsucG5nXCIsXG4gICAgICBcImltZ1wiIDogXCIvaW1nL2RlYy9naXQtZmxvdy5qcGdcIixcbiAgICAgIFwiYmxvYlwiIDogXCJHb3NoIGRhcm4taXQsIHRlYW1zIGdldHRpbmcgbW9yZSBzeW5jZWQgd2l0aCB0aGUgaGVscCBvZiBuZXcgZ2l0IG1ldGhvZG9sb2dpZXMgZm9yIHRlYW1zLiA8YSBocmVmPSdodHRwczovL3d3dy5hdGxhc3NpYW4uY29tL2dpdC90dXRvcmlhbHMvY29tcGFyaW5nLXdvcmtmbG93cy9jZW50cmFsaXplZC13b3JrZmxvdyc+SSBjYW4ndCBrZWVwIHVwPC9hPiBcIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJkYXRlXCIgOiBcIlBvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgMjIsIDIwMTRcIixcbiAgICAgIFwiaGVhZGluZ1wiIDogXCJPaCBzaGl0LCBBbmd1bGFyIDIuMFwiLFxuICAgICAgXCJhdXRob3JpbWdcIiA6IFwiL2ltZy9mcmFuay5wbmdcIixcbiAgICAgIFwiaW1nXCIgOiBcIi9pbWcvZ3JhcGhfc3BhLmpwZ1wiLFxuICAgICAgXCJibG9iXCIgOiBcIlBhcmRvbiBteSBzY2F0dGVyZWQgYnJhaW4gcmlnaHQgbm93LiBTbyBhZnRlciB3YXRjaGluZyB0aGUgPGEgaHJlZj0naHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1nTm1XeWJBeUJISScgdGFyZ2V0PSdfYmxhbmsnPkV1cm8gbmctY29uZiB2aWRlbzwvYT4gd2hlcmUgdGhlIGNyZWF0b3JzIG9mIEFuZ3VsYXIgMi4wIGJhc2ljYWxseSBzYWlkLCBldmVyeXRoaW5nIGluIGNoYW5naW5nLCBJIGRpZCB3aGF0IG1vc3QgZGV2ZWxvcGVycyB3b3VsZCBkbyBhbmQgY29tcGxldGVseSBmcmVha2VkLiBJIG11c3Qgc2F5LCBJJ20gc3RpbGwsIHRob3JvdWdobHkgY29uZnVzZWQsIGV2ZW4gYWZ0ZXIgc3BlYWtpbmcgdG8gYSBkb3plbiBvciBzbyBrZXkgZmlndXJlcyBpbiB0aGUgaW5kdXN0cnkuIE15IGZpcnN0IHJlYWN0aW9uPyBUd2VldCBvdXQgaW4gYW5nZXIuIEYtVSBBbmd1bGFyIHRlYW0gSSBwcm9ub3VuY2VkLiBGLVUuIFRoZW4sIG1vcmUgcGFuaWMgYXMgSSBjb250aW51ZWQgdG8gcmVhZCBzb21lIG9mIHRoZSBwb3N0cyBieSBvdGhlcnMgZmVlbGluZyB0aGUgc2FtZSB3YXkuIEkgYXNrZWQgdGhlIEFuZ3VsYXIgdGVhbSwgaG93IHRoZXkgd2VyZSBoZWxwaW5nIHRoZSBpbmR1c3RyeSBieSB0ZWxsaW5nIHVzIGluIGEgeWVhciBhbnl0aGluZyB3ZSBoYXZlIGRldmVsb3BlZCBpbiBBbmd1bGFyIHdvdWxkIGJlIGdhcmJhZ2UuIEkgZGlkIHdoYXQgb3RoZXJzIHNlZW1lZCB0byBiZSBkb2luZyBhbmQgaW1tZWRpYXRlbHkgc3RhcnRlZCBsb29raW5nIGZvciBhbm90aGVyIGZyYW1ld29yayB0byBzdHVkeSBhbmQgaW52ZXN0IGluLiBUaGF0J3Mgd2hlbiBJIGZvdW5kIDxhIGhyZWY9J2h0dHA6Ly93d3cuaW5kZWVkLmNvbS9qb2J0cmVuZHM/cT1lbWJlci5qcyUyQythbmd1bGFyLmpzJTJDK3JlYWN0LmpzJTJDK2JhY2tib25lLmpzJmw9JyB0YXJnZXQ9J19ibGFuayc+dGhpcyBncmFwaDwvYT4gdGVsbGluZyBtZSB0aGUgb25seSBvdGhlciBTUEEgZnJhbWV3b3JrIHRoYXQgaGFzIGFzIG11Y2ggYWN0aXZpdHkgYXMgQW5ndWxhciBpcyBnb29kIG9sZCBCYWNrYm9uZS4gPGJyIC8+PGJyIC8+QmFja2JvbmUsIG15IGZpcnN0IFNQQSBsb3ZlIC0gd2UndmUgbWV0IGJlZm9yZS4gRXZlbiByZWNlbnRseS4gQnV0IEkndmUgYmVlbiBsb3N0LiBJJ3ZlIGJlZW4gaW5sb3ZlIHdpdGggRWdnaGVhZC5pbyBhbmQgdGhpbmdzIGxpa2UgSW9uaWMsIFNwcmFuZ3VsYXIgYW5kIGFsbCBzb3J0cyBvZiB0aGluZ3MgdGhhdCBnaXZlIG1lIHN0dWZmIGZvciBmcmVlLiBCdXQgdGhlbiBJIG5vdGljZWQgc29tZXRoaW5nLiBUaGUgYmFja2JvbmUgY29tbXVuaXR5IGhhcyBiZWVuIHF1aWV0bHkgZG9pbmcgaXQncyB0aGluZyBmb3IgYSBtaW51dGUgbm93LiBCYWNrYm9uZXJhaWxzLmNvbT8gQXJlIHlvdSBraWRkaW5nLCB3aGF0IGEgcmVzb3VyY2UuIE1hcmlvbmV0dGU/IExvdmVseS4gVGhlIGxpc3QgZ29lcyBvbi4gSSBub3cgaGF2ZSBkb3plbnMgb2YgcmVhc29ucyB0byBnaXZlIEJhY2tib25lIGFub3RoZXIgbG9vay4gQW5kIHRoZW4sIGl0IGhhcHBlbmVkLiBJIGVtYWlsZWQgTWF4IEx5bmNoIG92ZXIgYXQgSW9uaWMgYW5kIHNhaWQsIEkgdGhpbmsgeW91IG5lZWQgdG8gYWRkcmVzcyB0aGUgZnJpZ2h0IG9mIEFuZ3VsYXIgMi4wIHNvbWUgb2YgdXMgYXJlIGV4cGVyaWVuY2luZy4gQW5kIHRoZW4gaGUgc2hlZCBzb21lIGxpZ2h0LiBBZnRlciBhIHJlYWxseSBhd2Vzb21lIHJlc3BvbnNlLCBoZSBzYWlkIHNvbWV0aGluZyBhdCB0aGUgZW5kIHRvIHRoZSB0dW5lIG9mLiBBbmd1bGFyIDIgaXMgYWxsIGFib3V0IG1ha2luZyBpdCBlYXNpZXIgYW5kIGZhc3RlciB0byB1c2UsIGFuZCBtb3JlIGFwcHJvcHJpYXRlIGZvciBmdXR1cmUgYnJvd3NlciBzdGFuZGFyZHMgbGlrZSBXZWIgQ29tcG9uZW50cy4gSG1tLi4uIDxiciAvPjxiciAvPldlYiBDb21wb25lbnRzLiBZb3UgbWVhbiwgdGhpcyBzdHVmZiBJJ3ZlIGJlZW4gaGVhcmluZyBhYm91dCwgdGhpbmdzIGxpa2UgUG9seW1lciwgYW5kIHRoZXNlIG5ldyBzcGVjcyB0aGUgYnJvd3NlciBhbHJlYWR5IGhhcyBiZWd1biB0byBzdXBwb3J0LCBsaWtlIFNoYWRvdyBEb20sIGN1c3RvbSBlbGVtZW50cyBhbmQgaW1wb3J0cy4gU28uIFdoZXJlIHRoZSBoZWxsIGFtIEkgcmlnaHQgbm93PyBGb3Igbm93LCBJIHRoaW5rIEknbGwgdGFrZSBhIGJyZWFrIGZyb20gc3RyZXNzaW5nIGFib3V0IFNQQSBmcmFtZXdvcmtzIGFuZCBsb29rIGF0IDxhIGhyZWY9J2h0dHBzOi8vd3d3LnBvbHltZXItcHJvamVjdC5vcmcvJyB0YXJnZXQ9J19ibGFuayc+UG9seW1lcjwvYT4sIDxhIGhyZWY9J2h0dHA6Ly93ZWJjb21wb25lbnRzLm9yZy8nIHRhcmdldD0nX2JsYW5rJz5XZWIgQ29tcG9uZW50czwvYT4sIEU2IGFuZCBzdHVkeSB1cCBvbiA8YSBocmVmPSdodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvIy8nIHRhcmdldD0nX2JsYW5rJz5NYXRlcmlhbCBEZXNpZ248L2E+IGZvciBhIG1pbnV0ZS5cIlxuICAgIH0sXG4gICAge1xuICAgICAgXCJkYXRlXCIgOiBcIlBvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgMTIsIDIwMTRcIixcbiAgICAgIFwiaGVhZGluZ1wiIDogXCJNeSBwYXRoIHRvIGxlYXJuaW5nIFN3aWZ0XCIsXG4gICAgICBcImF1dGhvcmltZ1wiIDogXCIvaW1nL2ZyYW5rLnBuZ1wiLFxuICAgICAgXCJpbWdcIiA6IFwiL2ltZy9kZWMvbmV3c2xldHRlci1zd2lmdHJpcy1oZWFkZXIuZ2lmXCIsXG4gICAgICBcImJsb2JcIiA6IFwiSSd2ZSBiZWVuIGFuIE1WQyBkZXZlbG9wZXIgaW4gZXZlcnkgbGFuZ3VhZ2UgZXhjZXB0IGZvciBpT1MuIFRoaXMgcGFzdCBPY3RvYmVyLCBJIHRvb2sgbXkgZmlyc3QgcmVhbCBkZWVwIGRpdmUgaW50byBpT1MgcHJvZ3JhbW1pbmcgYW5kIHN0YXJ0ZWQgd2l0aCBTd2lmdC4gVGhlcmUgYXJlIHR3byBncmVhdCB0dXRvcmlhbHMgb3V0IHRoZXJlLiBUaGUgZmlyc3QgaXMgZnJvbSBibG9jLmlvIGFuZCBpcyBmcmVlLiBJdCdzIGEgZ2FtZSwgU3dpZnRyaXMsIHNvIGdldCByZWFkeSBmb3Igc29tZSBhY3Rpb24uIDxiciAvPjxiciAvPiBUaGUgc2Vjb25kIHdpbGwgaGVscCB5b3UgYnVpbGQgc29tZXRoaW5nIG1vcmUgYXBwaXNoLCBpdCdzIGJ5IEFwcGNvZGEuIEdvdCB0aGVpciBib29rIGFuZCB3aWxsIGJlIGRvbmUgd2l0aCBpdCB0aGlzIHdlZWsuIFNvIGZhciwgYm9va3Mgb2ssIGJ1dCBpdCBtb3ZlcyByZWFsbHkgc2xvdy4gSSdsbCBwb3N0IGEgYmxvZyBpbiBhIGZldyBkYXlzIHdpdGggbGlua3MgdG8gdGhlIGFwcCB3YXMgYWJsZSB0byBidWlsZC5cIixcbiAgICAgIFwicmVzb3VyY2UxXCIgOiBcImh0dHBzOi8vd3d3LmJsb2MuaW8vc3dpZnRyaXMtYnVpbGQteW91ci1maXJzdC1pb3MtZ2FtZS13aXRoLXN3aWZ0XCIsXG4gICAgICBcInJlc291cmNlMlwiIDogXCJodHRwOi8vd3d3LmFwcGNvZGEuY29tL3N3aWZ0L1wiXG4gICAgfSxcbiAgICB7XG4gICAgICBcImRhdGVcIiA6IFwiUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciAxMSwgMjAxNFwiLFxuICAgICAgXCJoZWFkaW5nXCIgOiBcIldoeSBJIGdldCBnb29zZSBidW1wcyB3aGVuIHlvdSB0YWxrIGFib3V0IGF1dG9tYXRlZCBlbWFpbCBtYXJrZXRpbmcgYW5kIHNlZ21lbnRhdGlvbiBhbmQgY3VzdG9tZXIuaW8gYW5kIHRoaW5ncyBsaWtlIHRoYXQuXCIsXG4gICAgICBcImF1dGhvcmltZ1wiIDogXCIvaW1nL2ZyYW5rLnBuZ1wiLFxuICAgICAgXCJpbWdcIiA6IFwiL2ltZy9kZWMvcHJlcGVtYWlscy5wbmdcIixcbiAgICAgIFwiYmxvYlwiIDogXCJJIGdldCB0ZWFyeSBleWVkIHdoZW4gSSB0YWxrIGFib3V0IG15IHdvcmsgYXQgQmVuY2hQcmVwLmNvbS4gSW4gc2hvcnQsIEkgd2FzIHRoZSBmaXJzdCBlbXBsb3llZSBhbmQgaGVscGVkIHRoZSBjb21wYW55IGdldCB0byB0aGVpciBzZXJpZXMgQiBuZWFyIHRoZSBlbmQgb2YgeWVhciB0d28uIEkgZ290IGEgbG90IGRvbmUgdGhlcmUsIGFuZCBvbmUgb2YgdGhlIHRoaW5ncyBJIHJlYWxseSBlbmpveWVkIHdhcyBidWlsZGluZyBvdXQgdGVjaG5vbG9neSB0byBzZWdtZW50IGxlYWRzLCBicmluZyBkaWZmZXJlbnQgdXNlcnMgZG93biBkaWZmZXJlbnQgY29tbXVuaWNhdGlvbiBwYXRocyBhbmQgaG93IEkgbWFwcGVkIG91dCB0aGUgZW50aXJlIHN5c3RlbSB1c2luZyBjb21wbGV4IGRpYWdyYW1zIGFuZCB3b3JrZmxvd3MuIDxiciAvPjxiciAvPlNvbWUgb2YgdGhlIHRvb2xzIHdlcmUgYnVpbHQgYW5kIGJhc2VkIG9uIHF1ZXMgbGlrZSBSZWRpcyBvciBSZXNxdWUsIG90aGVycyB3ZSBidWlsdCBpbnRvIEV4YWN0VGFyZ2V0IGFuZCBDdXN0b21lci5pby4gSW4gdGhlIGVuZCwgSSBiZWNhbWUgc29tZXdoYXQgb2YgYW4gZXhwZXJ0IGF0IG1vbmV0aXppbmcgZW1haWxzLiBXaXRoaW4gb3VyIGVtYWlsIG1hcmtldGluZyBjaGFubmVsLCB3ZSBleHBsb3JlZCB0YWdnaW5nIHVzZXJzIGJhc2VkIG9uIHRoZWlyIGFjdGlvbnMsIHN1Y2ggYXMgb3BlbnMgb3Igbm9uIG9wZW5zLCBvciB3aGF0IHRoZXkgY2xpY2tlZCBvbiwgd2UgdGFyZ2VkIGVtYWlsIHVzZXJzIHdobyBoYWQgYmVlbiB0b3VjaGVkIHNldmVuIHRpbWVzIHdpdGggc3BlY2lhbCBpcnJpc2l0YWJsZSBzYWxlcywgYmVjYXVzZSB3ZSBrbm93IGFmdGVyIDYgdG91Y2hlcywgd2UgY291bGQgY29udmVydC4gVGhlc2UgdHJpY2tzIHdlIGxlYXJuZWQgbGVkIHRvIDI1LTMwayBkYXlzLCBhbmQgZXZlbnR1YWxseSwgZGF5cyB3aGVyZSB3ZSBzb2xkIDEwMGsgd29ydGggb2Ygc3Vic2NyaXB0aW9ucy4gPGJyIC8+PGJyIC8+U28sIG15IHBvaW50PyBEb24ndCBiZSBzdXJwcmlzZWQgaWYgSSBnZWVrIG91dCBhbmQgZmFpbnQgd2hlbiBJIGhlYXIgeW91IHRhbGsgYWJvdXQgdHJhbnNhY3Rpb25hbCBlbWFpbGluZyBhbmQgY2FkZW5jZXMgYW5kIGNvbnN1bWVyIGpvdXJuaWVzIGFuZCBzdHVmZiBsaWtlIHRoYXQuXCJcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiZGF0ZVwiIDogXCJQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDEwLCAyMDE0XCIsXG4gICAgICBcImhlYWRpbmdcIiA6IFwiSWYgSSBjb3VsZCBoYXZlIG9uZSB3aXNoOyBJIGdldCB0byB1c2UgdGhpcyBtZXRob2Qgd2hlbiBkZXNpZ25pbmcgeW91ciBjb25zdW1lciBqb3VybmV5IGZ1bm5lbC5cIixcbiAgICAgIFwiYXV0aG9yaW1nXCIgOiBcIi9pbWcvZnJhbmsucG5nXCIsXG4gICAgICBcImltZ1wiIDogXCIvaW1nL2RlYy91eF9ib2FyZC5qcGdcIixcbiAgICAgIFwiYmxvYlwiIDogXCJTbyBhZnRlciBhIGJ1bmNoIG9mIGV0aG5vZ3JhcGhpYyBzdHVkaWVzIGZyb20gcGVyc29uYSBtYXRjaGVzIEkgZ2F0aGVyIGluLXBlcnNvbiwgSSBnZXQgdG8gZmlsbCBhIHdhbGwgdXAgd2l0aCBrZXkgdGhpbmdzIHBlb3BsZSBzYWlkLCBmZWx0LCBoZWFyZCAtIG1vdGl2YXRvcnMsIGJhcnJpZXJzLCBxdWVzdGlvbnMsIGF0dGl0dWRlcyBhbmQgc3VjaC4gSSB0aGVuIGdyb3VwIHRoZXNlIHBvc3QtaXQgdGhvdWdodHMgaW4gdmFyaW91cyB3YXlzLCBsb29raW5nIGZvciBwYXR0ZXJucywgc2VudGltZW50LCBuZXcgaWRlYXMuIDxiciAvPjxiciAvPkkgdGhlbiB0YWtlIHRoaXMgcmljaCBkYXRhIGFuZCBkZXZlbG9wIGEgd2hhdCBjb3VsZCBiZSBicmFuZGluZywgYSBsYW5kaW5nIHBhZ2Ugb3IgYW4gZW1haWwgLSB3aXRoIHdoYXQgSSBjYWxsLCBhbiBpbnZlcnRlZCBweXJhbWlkIGFwcHJvYWNoIHRvIGNvbnRlbnQsIHdoZXJlIGFkZHJlc3NpbmcgdGhlIG1vc3QgaW1wb3J0YW50IHRoaW5ncyBmb3VuZCBpbiB0aGUgdXNlciByZXNlYXJjaCBnZXQgYWRkcmVzc2VkIGluIGEgaGVyaWFyY2hpY2FsIG9yZGVyLiBJIGNyZWF0ZSA1LTYgaXRlcmF0aW9ucyBvZiB0aGUgbGFuZGluZyBwYWdlIGFuZCByZS1ydW4gdGhlbSB0aHJvdWdoIGEgc2Vjb25kIGdyb3VwIG9mIHBhcnRpY2lwYW50cywgc3Rha2Vob2xkZXJzIGFuZCBmcmllbmRzLiBJIHRoZW4gdGFrZSBldmVuIG1vcmUgbm90ZXMgb24gcGVvcGxlcyBzcGVhay1hbG91ZCByZWFjdGlvbnMgdG8gdGhlIGxhbmRpbmcgcGFnZXMuIEFmdGVyIHRoaXMsIEknbSByZWFkeSB0byBkZXNpZ24gdGhlIGZpbmFsIGNvcHkgYW5kIHBhZ2VzIGZvciB5b3VyIGZ1bm5lbC5cIiBcbiAgICB9LFxuICAgIHtcbiAgICAgIFwiZGF0ZVwiIDogXCJQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDksIDIwMTRcIixcbiAgICAgIFwiaGVhZGluZ1wiIDogXCJXaG8gc2F5cyBJIGRvbid0IGJlbG9uZyBoZXJlP1wiLFxuICAgICAgXCJhdXRob3JpbWdcIiA6IFwiL2ltZy9mcmFuay5wbmdcIixcbiAgICAgIFwiaW1nXCIgOiBcIi9pbWcvZGVjL3VjbGEuanBnXCIsXG4gICAgICBcImJsb2JcIiA6IFwiVGhpcyBjb21pbmcgd2Vla2VuZCB0aGVyZSdzIHByb2JhYmx5IGEgaGFja2F0aG9uIGdvaW5nIG9uIGluIHlvdXIgY2l0eS4gU29tZSBvZiB0aGVtIGFyZSBnZXR0aW5nIHJlYWxseSBiaWcuIEkgd2Fzbid0IHJlZ2lzdGVyZWQgZm9yIExBIEhhY2tzIHRoaXMgc3VtbWVyLiBJIGRvbid0IGV2ZW4ga25vdyBob3cgSSBlbmRlZCB1cCB0aGVyZSBvbiBhIEZyaWRheSBuaWdodCwgYnV0IHdoZW4gSSBzYXcgd2hhdCB3YXMgZ29pbmcgb24sIEkgZ3JhYmJlZCBhIGNoYWlyIGFuZCBzdGFydGVkIGhhY2tpbmcgYXdheS4gV29ycmllZCBJIGhhZCBqdXN0IHNudWNrIGluIHRoZSBiYWNrIGRvb3IgYW5kIHN0YXJ0ZWQgY29tcGV0aW5nLCBteSByaWRlIGxlZnQgYW5kIHRoZXJlIEkgd2FzLCBmb3IgdGhlIG5leHQgdHdvIGRheXMuIDxiciAvPjxiciAvPlRoYXQncyByaWdodC4gSSBzbnVjayBpbiB0aGUgYmFjayBvZiBMQSBIYWNrcyBsYXN0IHN1bW1lciBhdCBVQ0xBIGFuZCBoYWNrZWQgd2l0aCBraWRzIDEwIHllYXJzIHlvdW5nZXIgdGhhbiBtZS4gSSBjb3VsZG4ndCBtaXNzIGl0LiBJIHdhcyBmbG9vcmVkIHdoZW4gSSBzYXcgaG93IG1hbnkgcGVvcGxlIHdlcmUgaW4gaXQuIE1lLCBiZWluZyB0aGUgbWlzY2hldmlvdXMgaGFja2VyIEkgYW0sIEkgdGhvdWdodCBpZiBJIHVzZWQgdGhlIGVuZXJneSBvZiB0aGUgZW52aXJvbm1lbnQgdG8gbXkgYWR2YW50YWdlLCBJIGNvdWxkIGJ1aWxkIHNvbWV0aGluZyBjb29sLiBMb25nIHN0b3J5IHNob3J0LCBsZXQgbWUganVzdCBzYXksIHRoYXQgaWYgeW91IGhhdmUgYmVlbiBoYXZpbmcgYSBoYXJkIHRpbWUgbGF1bmNoaW5nLCBzaWduIHVwIGZvciBhIGhhY2thdGhvbi4gSXQncyBhIGd1YXJhbnRlZWQgd2F5IHRvIG92ZXItY29tcGVuc2F0ZSBmb3IgeW91ciBjb25zdGFudCBmYWlsdXJlIHRvIGxhdW5jaC4gTW9yZSBvbiB3aGF0IGhhcHBlbmVkIHdoZW4gSSB0b29rIHRoZSBzdGFnZSBieSBzdXJwcmlzZSBhbmQgZ290IGJvb3RlZCBsYXRlci4uLlwiIFxuICAgIH0sXG4gICAge1xuICAgICAgXCJkYXRlXCIgOiBcIlBvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgOCwgMjAxNFwiLFxuICAgICAgXCJoZWFkaW5nXCIgOiBcIlN0YXJ0ZWQgaW4gRW1iZXIuanMsIGZpbmlzaGVkIGluIEFuZ3VsYXIuanMuIFdoeSBhbmQgaG93IGRpZCB0aGlzIGhhcHBlbj9cIixcbiAgICAgIFwiYXV0aG9yaW1nXCIgOiBcIi9pbWcvZnJhbmsucG5nXCIsXG4gICAgICBcImltZ1wiIDogXCIvaW1nL2RlYy91eDEuanBnXCIsXG4gICAgICBcImJsb2JcIiA6IFwiSSBnb3QgbG92ZSBmb3IgYWxsIFNQQSBmcmFtZXdvcmtzLiBDb2xsZWN0aXZlbHksIHRoZXkgYWxsIHB1c2ggdGhlIGVudmVsb3BlLiBNeSBmaXJzdCBjbGllbnQtc2lkZSBNVkMgcHJvamVjdCB3YXMgYSBiYWNrYm9uZSBwcm9qZWN0IC0gYW5kIHdlIHN0YXJ0ZWQgd2hlbiB0aGV5IHdlcmUgaW4gQmV0YS4gVGhhdCBwcm9qZWN0IHdhcyBCZW5jaFByZXAuIEF0IHRoZSB0aW1lLCBhcyBhIGZyb250LWVuZCBkZXZlbG9wZXIsIEkgd2FzIGNvbmZ1c2VkIGJ5IHRoZSBzd2VlcGluZyBjaGFuZ2VzIHRvIGhvdyB0aGluZ3MgbmVlZGVkIHRvIGJlIGRvbmUuIEZ1bGwgZmxlZGdlZCBNVkMgZnJhbWV3b3JrcyBpbiBKYXZhU2NyaXB0IGxlbmRlZCBhIHdob2xlIG5ldyBzeW50YXgsIGFuZCB0byB0b3AgaXQgb2ZmLCBvdXIgZW5naW5lZXJzIG9uIHRoZSB0ZWFtIHdlcmUgdXNpbmcgQ29mZmVlU2NyaXB0LCBIQU1MLCBTQVNTIGFuZCBKYXNtaW5lLCBldGMuIE15IGZpcnN0IFNQQSBwcm9qZWN0IGRpZCBub3QgZ28gd2VsbCBhbmQgaXQgd2Fzbid0IHVudGlsIHdlIGNvbXBsZXRlbHkgcmUtd3JvdGUgdGhlIHNvZnR3YXJlIHRoYXQgSSBzdGFydGVkIHVuZGVyc3RhbmRpbmcgZXZlcnl0aGluZyBjbGVhcmx5LiBUd28geWVhcnMgbGF0ZXIsIGEgbmV3IHRlYW0gSSB3YXMgd29ya2luZyB3aXRoIGRlY2lkZWQgdG8gYnVpbGQgPGEgaHJlZj0naHR0cDovL2FnZW50cnVuLmNvbScgdGFyZ2V0PSdfYmxhbmsnPkFnZW50cnVuLmNvbTwvYT4gaW4gRW1iZXIuanMuIFdlIGRvdmUgaW4uIEZvdXIgbW9udGhzIGxhdGVyLCB3ZSBwb3J0ZWQgdG8gQW5ndWxhciBhbmQgc2luY2UsIEkndmUgbmV2ZXIgbG9va2VkIGJhY2suIEknbSBvbiBteSBmaWZ0aCBvciBzaXh0aCBhbmd1bGFyIHByb2plY3Qgbm93IGFuZCBJIGRvbid0IHBsYW4gb24gY2hhbmdpbmcgZnJhbWV3b3JrcyBmb3IgYSB3aGlsZSAtIGF0IGxlYXN0IHBlcnNvbmFsbHkuIDxiciAvPjxiciAvPlRoZSBhbmd1bGFyIG1vdmVtZW50IHJlbWluZHMgbWUgdGhlIG1vc3Qgb2YgdGhlIFJvUiBtb3ZlbWVudC4gSSBkb24ndCBnZXQgc3R1Y2sgdHJ5aW5nIHRvIGRvIHRoaW5ncyBsaWtlIEkgZG8gaW4gQmFja2JvbmUgb3IgRW1iZXIuIEkgY291bGQgZ2V0IGludG8gZGlzY3Vzc2lvbiBhbmQgdGVjaG5pY2FsIGV4YW1wbGVzLCBidXQgdGhlcmUgYXJlIGJldHRlciBwbGFjZXMgdG8gY29tcGFyZSB0aGUgdHdvLiBJIGNhbid0IHdhaXQgZm9yIHRoZSBjb21wbGV0ZWx5IHJldmFtcGVkIEFuZ3VsYXIgMi4wIGFuZCBhbSBsb29raW5nIGZvcndhcmQgdG8gYSA1LTcgeWVhciBmdXR1cmUgd2l0aCBBbmd1bGFyIGJlZm9yZSBzb21ldGhpbmcgbmV3IGNvbWVzIG91dCwgc29tZXRoaW5nIHRoYXQgcGVyaGFwcyBqdXN0IGJ1aWxkcyBhcHBzIGZvciB5b3UgYnkgcmVhZGluZyB5b3VyIG1pbmQuIDxiciAvPjxiciAvPk9oLCBhbmQgaWYgeW91ciB3b25kZXJpbmcgd2hvIGRlc2lnbmVkIHRoaXMgbG92ZWx5IHdlYnNpdGUsIHRoYXQgd2FzIHlvdXJzIHRydWx5LiBJIGxlZCB0aGUgVVggcmVzZWFyY2gsIFVYIHByb3RvdHlwaW5nLCB1c2VyIHJlc2VhcmNoIGFuZCBncmFwaGljIGRlc2lnbiBvZiB0aGlzIHByb2R1Y3QuXCIgXG4gICAgfSxcbiAgICB7XG4gICAgICBcImRhdGVcIiA6IFwiUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciA3LCAyMDE0XCIsXG4gICAgICBcImhlYWRpbmdcIiA6IFwiUGxlYXNlIGRvbid0IGFzayBtZSBhYm91dCBteSBhcnQgYW5kIG1peGVkIG1lZGlhIGJhY2tncm91bmQuIEkgbWlnaHQgdG90YWxseSBhdm9pZCB0aGUgcXVlc3Rpb24uXCIsXG4gICAgICBcImF1dGhvcmltZ1wiIDogXCIvaW1nL2ZyYW5rLnBuZ1wiLFxuICAgICAgXCJpbWdcIiA6IFwiL2ltZy9kZWMvbWl4ZWQuanBnXCIsXG4gICAgICBcImJsb2JcIiA6IFwiSSBoYXZlIGEgaHVnZSBjb21wbGV4IGFib3V0IG15IGh5YnJpZCBiYWNrZ3JvdW5kLiBJIGNhbid0IHRlbGwgeW91IGhvdyBtYW55IHRpbWVzIEkndmUgYmVlbiBvbiBhbiBpbnRlcnZpZXcgd2hlcmUgSSd2ZSB0cmllZCB0byBleHBsYWluIHRoZSBmYWN0IHRoYXQgSSdtIGFuIGFydGlzdCBhbmQgYSBwcm9ncmFtbWVyLiBUaGUgbWludXRlIEkgZG8gdGhpcywgSSdtIGFsbW9zdCBpbnN0YW50bHkgd3JpdHRlbiBvZmYgYXMgYSBqYWNrLW9mLWFsbCB0cmFkZXMgb3Igd2VhayBvbiBvbmUgc2lkZS4gPGJyIC8+PGJyIC8+U28sIEknbSBhYm91dCB0byBvZmZpY2lhbGx5IGV4cGxhaW4gdG8gZXZlcnlvbmUgc29tZXRoaW5nIEknbSBwcmV0dHkgc2Vuc2F0aXZlIGFib3V0LiBJJ20gYSB2ZXJ5IHRhbGVudGVkIGNyZWF0aXZlIGRpcmVjdG9yIHdpdGggYSB2ZXJ5IHNvcGhpc3RpY2F0ZWQgdGVjaG5pY2FsIGJhY2tncm91bmQuIEkgbWFrZSBleHBsYWluZXIgdmlkZW9zLCBJIGZpbG0sIEkgZG8gdXNlciByZXNlYXJjaCwgSSBkZXNpZ24gYW5kIEkgcHJvZ3JhbS4gWWVzLCBJIHByb2dyYW0gLSBJIHdpbGwgZnJvbnQtZW5kIHdpdGggdGhlIGJlc3QgYW5kIGhhdmUgYSBrbmFjayBmb3IgZnJvbnQtZW5kIE1WQyBmcmFtZXdvcmtzLiA8YnIgLz48YnIgLz5ZZXMsIHRoZXJlIGFyZSBzb21lIHRoaW5ncyBJJ20gbm90IGdvb2QgYXQuIEknbSBub3QgeW91ciBnZW5pdXMgcHJvZ3JhbW1lciB0aGF0IHdpbGwgbGVhZCB5b3VyIG90aGVyIHByb2dyYW1tZXJzIHRvIHRoZSBwcm9taXNlIGxhbmQsIGJ1dCBub3Qgd2VhayBsaWtlIHlvdXIgdGhpbmtpbmcgLSBJIGp1c3Qga25vdyBhIGxvdCBvZiBoYWNrZXJzIHdobyBkb24ndCBjb25jZXJuIHRoZW1zZWx2ZXMgd2l0aCB0aGluZ3MgdGhhdCBJIGdldCBsb3N0IGluLCBsaWtlIGRlc2lnbiBvciBjb250ZW50IHN0cmF0ZWd5LCBvciB1c2VyIHJlc2VhcmNoLiBTbyB3aGVuIEkgc2F5IHdlYWssIEkgbWVhbiB3ZWFrIGxpa2UsIEknbSB0YWxraW5nLCBwb3NzaWJseSwgZmF1bC10b2xlcmFudCBmdW5jdGlvbmFsIHByb2dhbW1pbmcgaW4gbG93IGxldmVsIGxhbmd1YWdlcyBvciBFcmxhbmcgb3IgRWxpeGVyIHdpdGggc3VwZXJ2aXNlciBPVFAgYXJjaGl0ZWN0dXJlcyBhbmQgbWVzc2FnZSBwYXNzaW5nLiBJJ20gdGFsaW5nIG1pZGRsZXdhcmUgZGV2ZWxvcG1lbnQuIEknbSB0YWxraW5nIFRERCBkZXYgYWxsIGRheSBldmVyeSBkYXkgb24gYSBoYXJkY29yZSBzY3J1bSB0ZWFtLiBUaGF0J3Mgbm90IG1lLiBJJ20gbm90IHlvdXIgbGVhZCBoZXJlLCBob3dldmVyIEkgd2lsbCBKci4gb24gdW5kZXJzdGFuZGluZyBob3cgZXZlcnkgbGluZSBvZiBjb2RlIHdvcmtzIGluIHlvdXIgYXBwLiBJJ20geW91ciBwcm90b3R5cGVyLCBNVlAgZ3V5IG9yIGZvbGxvdyB5b3VyIGxlYWQgZ3V5IHdoZW4gaXQgY29tZXMgdG8gcHJvZ3JhbW1pbmcuIEkgY2FuIG1ha2UganVzdCBhYm91dCBhbnl0aGluZyBJIHdhbnQsIGJ1dCBkb24ndCBmZWVsIGNvbWZvcnRhYmxlIGxlYWRpbmcgc2F5LCBhbiBpT1Mgb3IgSmF2YSB0ZWFtLiBJIGp1c3QgZG9uJ3QgaGF2ZSBlbm91Z2ggbG93LWxldmVsIHByb2dyYW1taW5nIGV4cGVyaWVuY2UgaW4gdGhvc2UgcGFydGljdWxhcmUgZnJhbWV3b3Jrcy4gV2hlbiBpdCBjb21lcyB0byBKYXZhU2NyaXB0LCBJJ20gYSA3LiBUaGVyZSBpc24ndCBhbnl0aGluZyB5b3UgY2FuJ3QgYXNrIG1lIHRvIGRvIHdpdGggSmF2YVNjcmlwdCwgZnJvbSBGYW1vLnVzIHRvIE1WQyBzdHVmZiAtIGhvd2V2ZXIsIEknbSBub3QgeW91ciBndXkgd2hvJ3MgZ29pbmcgdG8gaW50cm9kdWNlIHRoZSBuZXh0IGJpZyBvcGVuLXNvdXJjZSB0b29sIGluIEpTLiBJJ20gYSBtYWNybyBKUyBkZXZlbG9wZXIgLSBtZWFuaW5nIEkgY2FuIHRha2UgZXN0YWJsaXNoZWQgcGF0dGVybnMgYW5kIGNvbXBvbmVudHMgYW5kIGNvbmNlcHRzIGFuZCBydW4gd2l0aCB0aGVtLiBJIGRvbid0IGdpdmUgdGFsa3Mgb24gYmlnLW8gbm90YXRpb25zIGFuZCBJIG1pZ2h0IG5vdCBiZSBkb3duIGZvciBhIDQwIGhvdXIgYSB3ZWVrIGpvYiBvZiBoYXJkY29yZSBUREQgcHJvZ3JhbW1pbmcgLSBidXQgdGhpcyBkb2Vzbid0IG1lYW4geW91IHNob3VsZCB3cml0ZSBtZSBvZmYgYXMgYSBnZW5lcmFsaXN0LjxiciAvPjxiciAvPlRoZSBmYWN0IGlzIHRoYXQgSSd2ZSBuZXZlciBiZWVuIHRoZSB0eXBlIGZvciBhIHJvbGUgd2l0aCBhbiBlYXJseSBzdGFnZSBzdGFydHVwIHdoZXJlIEkgZGlkbid0IHdlYXIgYSBidW5jaCBvZiBoYXRzIG9yIHRyYW5zaXRpb24gcGVyaW9kaWNhbGx5IGZyb20gYSBkZXNpZ24gbWluZGVkIHRoaW5rZXIgdG8gYSB0ZWNobmljYWwgc2NydW0sIHJlcXVpcmVtZW50IHdyaXRpbmcsIHByb2R1YyBtYW5hZ2luZyBhbmFsLWlzdC5cIiBcbiAgICB9XG4gIF1cblxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQmxvZ1JvbGxDdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0Fib3V0Q3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdBcHBDdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1Jlc3VtZUN0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuYmxvYiA9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyXCI+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2Pk5PViAyMDEzIC0gUFJFU0VOVDwvaDY+PGJyLz48aDI+SHlicmlkIEV4cGVyaWVuY2UgRGVzaWduZXIvRGV2ZWxvcGVyLCBJbmRlcGVuZGVudDwvaDI+PGJyLz48cD5Xb3JrZWQgd2l0aCBub3RlYWJsZSBlbnRyZXByZW5vdXJzIG9uIHNldmVyYWwgbmV3IHByb2R1Y3QgYW5kIGJ1c2luZXNzIGxhdW5jaGVzLiBIZWxkIG51bWVyb3VzIHJvbGVzLCBpbmNsdWRpbmcgY29udGVudCBzdHJhdGVnaXN0LCB1c2VyIHJlc2VhcmNoZXIsIGRlc2lnbmVyIGFuZCBkZXZlbG9wZXIuIDwvcD48cD48c3Ryb25nPkNvbXBhbmllczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJub1wiPjxsaT48YSBocmVmPVwiaHR0cDovL3RhcGNlbnRpdmUuY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+VGFwY2VudGl2ZTwvYT48L2xpPjxsaT48YSBocmVmPVwiaHR0cDovL2NwZy5pb1wiIHRhcmdldD1cIl9ibGFua1wiPkNQR2lvPC9hPjwvbGk+PGxpPjxhIGhyZWY9XCJodHRwOi8va291LnBuL1wiIHRhcmdldD1cIl9ibGFua1wiPktvdS5wbiBNZWRpYTwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9tZWR5Y2F0aW9uLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPk1lZHljYXRpb248L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vd3d3LnN1bnRpbWVzLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5DaGljYWdvIFN1biBUaW1lczwvYT48L2xpPjwvdWw+PGJyLz48cD48c3Ryb25nPlRhcGNlbnRpdmUgRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+Q29tcGxldGUgVGFwY2VudGl2ZS5jb20gbWFya2V0aW5nIHdlYnNpdGUgYW5kIFVYIG92ZXJoYXVsIG9mIGNvcmUgcHJvZHVjdCwgdGhlIFwiVGFwY2VudGl2ZSBNYW5hZ2VyXCI8L2xpPjxsaT5JbmR1c3RyaWFsIGRlc2lnbiBvZiB0aGUgVGFwY2VudGl2ZSBUb3VjaHBvaW50PC9saT48bGk+Q29udGVudCBzdHJhdGVneSBmb3IgY29ycG9yYXRlIG1hcmtldGluZyBzaXRlPC9saT48bGk+TW9iaWxlIGZpcnN0IG1hcmtldGluZyB3ZWJzaXRlIHVzaW5nIElvbmljIGFuZCBBbmd1bGFyPC9saT48L3VsPjxwPjxzdHJvbmc+Q1BHaW8gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+UHJvZHVjdCBhbmQgYnVzaW5lc3Mgc3RyYXRlZ3ksIHRlY2huaWNhbCBhcmNoaXRlY3R1cmUgYW5kIHNwZWNpZmljYXRpb24gZGVzaWduPC9saT48bGk+T25lIGh1bmRyZWQgcGFnZSBwcm9wb3NhbCB0ZW1wbGF0ZSBvbiBidXNpbmVzcyBtb2RlbCBhbmQgY29ycG9yYXRlIGNhcGFiaWxpdGllczwvbGk+PGxpPk1hcmtldGluZyB3ZWJzaXRlIGRlc2lnbiBhbmQgY29udGVudCBzdHJhdGVneTwvbGk+PGxpPkNvcmUgcHJvZHVjdCBkZXNpZ24gYW5kIE1WUCBmdW5jdGlvbmFsIHByb3RvdHlwZTwvbGk+PC91bD48cD48c3Ryb25nPktvdS5wbiBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Lb3UucG4gTWVkaWEgYnJhbmQgcmVmcmVzaDwvbGk+PGxpPk1hcmtldGluZyBzaXRlIHJlZGVzaWduPC9saT48bGk+UG9ydGFsIHVzZXIgZXhwZXJpZW5jZSBvdmVyaGF1bDwvbGk+PC91bD48cD48c3Ryb25nPk1lZHljYXRpb24gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+Q29uY2VwdHVhbCBkZXNpZ24gYW5kIGFydCBkaXJlY3Rpb248L2xpPjxsaT5Vc2VyIHJlc2VhcmNoPC9saT48bGk+UmFwaWQgcHJvdG90eXBlczwvbGk+PC91bD48cD48c3Ryb25nPkNoaWNhZ28gU3VuIFRpbWVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+Q29uY2VwdHVhbCBkZXNpZ24gYW5kIGFydCBkaXJlY3Rpb248L2xpPjxsaT5OYXRpdmUgaU9TIGFuZCBBbmRyb2lkIGFwcCBkZXNpZ24gYW5kIGp1bmlvciBkZXZlbG9wbWVudDwvbGk+PGxpPkh5YnJpZCBJb25pYy9Bbmd1bGFyIGRldmVsb3BtZW50PC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2Pk1BUkNIIDIwMTAgLSBPQ1RPQkVSIDIwMTM8L2g2Pjxici8+PGgyPkRpcmVjdG9yIG9mIFVzZXIgRXhwZXJpZW5jZSwgTGlnaHRiYW5rPC9oMj48YnIvPjxwPkxhdW5jaGVkIGFuZCBzdXBwb3J0ZWQgbXVsdGlwbGUgbmV3IGNvbXBhbmllcyB3aXRoaW4gdGhlIExpZ2h0YmFuayBwb3J0Zm9saW8uIDwvcD48cD48c3Ryb25nPkNvbXBhbmllczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJub1wiPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9jaGljYWdvaWRlYXMuY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q2hpY2Fnb0lkZWFzLmNvbTwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9iZW5jaHByZXAuY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+QmVuY2hQcmVwLmNvbTwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9zbmFwc2hlZXRhcHAuY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+U25hcFNoZWV0QXBwLmNvbTwvYT48L2xpPjxsaT5Nb250aGx5cy5jb20gKGRlZnVuY3QpPC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vZG91Z2guY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+RG91Z2guY29tPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL2dyb3Vwb24uY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+R3JvdXBvbi5jb208L2E+PC9saT48L3VsPjxici8+PHA+PHN0cm9uZz5DaGljYWdvIElkZWFzIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPldlYnNpdGUgZGVzaWduIHJlZnJlc2gsIGFydCBkaXJlY3Rpb248L2xpPjxsaT5DdXN0b20gdGlja2V0IHB1cmNoYXNpbmcgcGxhdGZvcm0gVVggcmVzZWFyY2ggJmFtcDsgZGVzaWduPC9saT48bGk+UnVieSBvbiBSYWlscyBkZXZlbG9wbWVudCwgbWFpbnRlbmVuY2U8L2xpPjxsaT5HcmFwaGljIGRlc2lnbiBzdXBwb3J0PC9saT48bGk+QW5udWFsIHJlcG9ydCBkZXNpZ248L2xpPjwvdWw+PHA+PHN0cm9uZz5CZW5jaFByZXAuY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPlJlLWJyYW5kaW5nLCBjb21wbGV0ZSBCZW5jaFByZXAgaWRlbnRpdHkgcGFja2FnZTwvbGk+PGxpPlN1cHBvcnRlZCBjb21wYW55IHdpdGggYWxsIGRlc2lnbiBhbmQgdXggZnJvbSB6ZXJvIHRvIGVpZ2h0IG1pbGxpb24gaW4gZmluYW5jaW5nPC9saT48bGk+TGVhZCBhcnQgYW5kIFVYIGRpcmVjdGlvbiBmb3IgdHdvIHllYXJzPC9saT48bGk+RnJvbnQtZW5kIHVzaW5nIEJhY2tib25lIGFuZCBCb290c3RyYXA8L2xpPjxsaT5Vc2VyIHJlc2VhcmNoLCBldGhub2dyYXBoaWMgc3R1ZGllcywgdXNlciB0ZXN0aW5nPC9saT48bGk+RW1haWwgbWFya2V0aW5nIGNhZGVuY2Ugc3lzdGVtIGRlc2lnbiBhbmQgZXhlY3V0aW9uPC9saT48bGk+U2NyaXB0ZWQsIHN0b3J5Ym9hcmRlZCBhbmQgZXhlY3V0ZWQgYm90aCBhbmltYXRlZCBhbmQgbGl2ZSBtb3Rpb24gZXhwbGFpbmVyIHZpZGVvczwvbGk+PC91bD48cD48c3Ryb25nPlNuYXBTaGVldEFwcC5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+TGFyZ2Ugc2NhbGUgcG9ydGFsIFVYIHJlc2VhcmNoIGFuZCBpbmZvcm1hdGlvbiBhcmNoaXRlY3R1cmU8L2xpPjxsaT5UaHJlZSByb3VuZHMgb2YgcmFwaWQgcHJvdG90eXBpbmcgYW5kIHVzZXIgdGVzdGluZzwvbGk+PGxpPkdyYXBoaWMgZGVzaWduIGFuZCBpbnRlcmFjdGlvbiBkZXNpZ24gZnJhbWV3b3JrPC9saT48bGk+VXNlciB0ZXN0aW5nPC9saT48L3VsPjxwPjxzdHJvbmc+TW9udGhseXMuY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPklkZW50aXR5IGFuZCBhcnQgZGlyZWN0aW9uPC9saT48bGk+UHJvZHVjdCBzdHJhdGVneSBhbmQgbmV3IGNvbXBhbnkgbGF1bmNoPC9saT48bGk+T25saW5lIG1hcmtldGluZyBzdHJhdGVneSwgaW5jbHVkaW5nIHRyYW5zYWN0aW9uYWwgZW1haWwsIHByb21vdGlvbiBkZXNpZ24gYW5kIGxlYWQgZ2VuZXJhdGlvbjwvbGk+PGxpPlByb2R1Y3QgZXhwZXJpZW5jZSBkZXNpZ24gYW5kIGZyb250LWVuZDwvbGk+PGxpPkNvbnRlbnQgc3RyYXRlZ3k8L2xpPjxsaT5TY3JpcHRlZCwgc3Rvcnlib2FyZGVkIGFuZCBleGVjdXRlZCBib3RoIGFuaW1hdGVkIGFuZCBsaXZlIG1vdGlvbiBleHBsYWluZXIgdmlkZW9zPC9saT48L3VsPjxwPjxzdHJvbmc+RG91Z2guY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzIGJ1bGxldHNcIj48bGk+Q29uc3VtZXIgam91cm5leSBtYXBwaW5nIGFuZCBldGhub2dyYXBoaWMgc3R1ZGllczwvbGk+PGxpPlJhcGlkIHByb3RvdHlwaW5nLCBjb25jZXB0dWFsIGRlc2lnbjwvbGk+PGxpPk1lc3NhZ2luZyBzdHJhdGVneSwgdXNlciB0ZXN0aW5nPC9saT48L3VsPjxwPjxzdHJvbmc+R3JvdXBvbi5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+RW1lcmdpbmcgbWFya2V0cyByZXNlYXJjaDwvbGk+PGxpPlJhcGlkIGRlc2lnbiBhbmQgcHJvdG90eXBpbmc8L2xpPjxsaT5WaXN1YWwgZGVzaWduIG9uIG5ldyBjb25jZXB0czwvbGk+PGxpPkVtYWlsIHNlZ21lbnRhdGlvbiByZXNlYXJjaDwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5OT1ZFTUJFUiAyMDA3IC0gQVBSSUwgMjAxMDwvaDY+PGJyLz48aDI+RGV2ZWxvcGVyICZhbXA7IENvLWZvdW5kZXIsIERpbGx5ZW8uY29tPC9oMj48YnIvPjxwPkNvLWZvdW5kZWQsIGRlc2lnbmVkIGFuZCBkZXZlbG9wZWQgYSBkYWlseSBkZWFsIGVDb21tZXJjZSB3ZWJzaXRlLjwvcD48cD48c3Ryb25nPlJvbGU8L3N0cm9uZz48YnIvPkRlc2lnbmVkLCBkZXZlbG9wZWQgYW5kIGxhdW5jaGVkIGNvbXBhbmllcyBmaXJzdCBjYXJ0IHdpdGggUEhQLiBJdGVyYXRlZCBhbmQgZ3JldyBzaXRlIHRvIG1vcmUgdGhhbiB0d28gaHVuZHJlZCBhbmQgZmlmdHkgdGhvdXNhbmQgc3Vic2NyaWJlcnMgaW4gbGVzcyB0aGFuIG9uZSB5ZWFyLiA8L3A+PHA+PHN0cm9uZz5Ob3RlYWJsZSBTdGF0czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkJ1aWx0IGEgbGlzdCBvZiAyNTAsMDAwIHN1YnNjcmliZXJzIGluIHRoZSBmaXJzdCB5ZWFyPC9saT48bGk+UGl2b3RlZCBhbmQgdHdlYWtlZCBkZXNpZ24sIGJ1c2luZXNzIGFuZCBhcHByb2FjaCB0byAxMDAwIHRyYW5zYWN0aW9ucyBwZXIgZGFpbHk8L2xpPjxsaT5Tb2xkIGJ1c2luZXNzIGluIERlY2VtYmVyIDIwMDkgdG8gSW5ub3ZhdGl2ZSBDb21tZXJjZSBTb2x1dGlvbnM8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+TUFSQ0ggMjAwNSAtIE9DVE9CRVIgMjAwNzwvaDY+PGJyLz48aDI+U29sdXRpb25zIEFyY2hpdGVjdCAmYW1wOyBTZW5pb3IgRGV2ZWxvcGVyLCA8YSBocmVmPVwiaHR0cDovL3d3dy5tYW5pZmVzdGRpZ2l0YWwuY29tL1wiPk1hbmlmZXN0IERpZ2l0YWw8L2E+PC9oMj48YnIvPjxwPkJ1aWx0IGFuZCBtYW5hZ2VkIG11bHRpcGxlIENhcmVlckJ1aWxkZXIuY29tIG5pY2hlIHNpdGVzIGZvciB0aGUgbGFyZ2VzdCBpbmRlcGVuZGVudCBhZ2VuY3kgaW4gdGhlIG1pZHdlc3QuPC9wPjxwPjxzdHJvbmc+Um9sZTwvc3Ryb25nPjxici8+UmVzZWFyY2ggYW5kIGV4cGxvcmUgZW1lcmdpbmcgdGVjaG5vbG9naWVzLCBpbXBsZW1lbnQgc29sdXRpb25zIGFuZCBtYW5hZ2Ugb3RoZXIgZGV2ZWxvcGVycy4gV29ya2VkIHdpdGggYXNwLm5ldCBvbiBhIGRhaWx5IGJhc2lzIGZvciBhbG1vc3QgdHdvIHllYXJzLiA8L3A+PHA+PHN0cm9uZz5Ob3RlYWJsZSBBY2NvbXBsaXNobWVudHM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5SZWNvZ25pemVkIGZvciBsYXVuY2hpbmcgaGlnaCBxdWFsaXR5IHdlYiBhcHAgZm9yIENhcmVlciBCdWlsZGVyIGluIHJlY29yZCB0aW1lPC9saT48bGk+TWFuYWdlZCBleHRyZW1lIFNFTyBwcm9qZWN0IHdpdGggbW9yZSB0aGFuIDUwMCB0aG91c2FuZCBsaW5rcywgcGFnZXMgYW5kIG92ZXIgOCBtaWxsaW9uIFVHQyBhcnRpZmFjdHM8L2xpPjxsaT5TaGlmdGVkIGFnZW5jaWVzIGRldmVsb3BtZW50IHByYWN0aWNlcyB0byB2YXJpb3VzIG5ldyBjbGllbnQtY2VudHJpYyBBSkFYIG1ldGhvZG9sb2dpZXM8L2xpPjxsaT5NYW5hZ2VkIG11bHRpcGxlIHByb2plY3RzIGNvbmN1cnJlbnRseSwgaW5jbHVkaW5nIGNob29zZWNoaWNhZ28uY29tIGFuZCBicmllZmluZy5jb208L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+QVBSSUwgMjAwNCAtIEpBTlVBUlkgMjAwNzwvaDY+PGJyLz48aDI+SnVuaW9yIFBMRCBEZXZlbG9wZXIsICA8YSBocmVmPVwiaHR0cDovL3d3dy5hdmVudWUtaW5jLmNvbS9cIj5BdmVudWU8L2E+PC9oMj48YnIvPjxwPkZyb250LWVuZCBkZXZlbG9wZXIgYW5kIFVYIGRlc2lnbiBpbnRlcm4gZm9yIEF2ZW51ZSBBIFJhem9yZmlzaHNcXCcgbGVnYWN5IGNvbXBhbnksIEF2ZW51ZS1pbmMuPC9wPjxwPjxzdHJvbmc+Um9sZTwvc3Ryb25nPjxici8+RGV2ZWxvcCBmcm9udC1lbmQgZm9yIG11bHRpcGxlIGNsaWVudCB3ZWJzaXRlcywgaW5jbHVkaW5nIGZsb3IuY29tLCBhY2hpZXZlbWVudC5vcmcsIGNhbnlvbnJhbmNoLmNvbSBhbmQgdHVyYm9jaGVmLjwvcD48cD48c3Ryb25nPk5vdGVhYmxlIEFjY29tcGxpc2htZW50czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkV4ZWN1dGVkIGZyb250LWVuZCBwcm9qZWN0cyBvbi10aW1lIGFuZCB1bmRlci1idWRnZXQ8L2xpPjxsaT5Bc3NpZ25lZCBVWCBpbnRlcm5zaGlwIHJvbGUsIHJlY29nbml6ZWQgYnkgZGVzaWduIHRlYW0gYXMgYSB5b3VuZyB0YWxlbnQ8L2xpPjxsaT5XaXJlZnJhbWVkIGN1c3RvbSBzaG9wcGluZyBjYXJ0IHBsYXRmb3JtIGZvciBmbG9yLmNvbTwvbGk+PGxpPkRldmVsb3BlZCBpbnRlcm5hbCBTRU8gcHJhY3RpY2U8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+SlVMWSAyMDAwIC0gSkFOVUFSWSAyMDA0PC9oNj48YnIvPjxoMj5lQ29tbWVyY2UgRGV2ZWxvcGVyLCBBdG92YTwvaDI+PGJyLz48cD5HZW5lcmFsIHdlYiBkZXNpZ25lciBhbmQgZGV2ZWxvcGVyIGZvciBmYW1pbHkgb3duZWQgcGFpbnQgZGlzdHJpYnV0aW9uIGJ1c2luZXNzLiA8L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5CdWlsdCBzZXZlcmFsIHNob3BwaW5nIGNhcnRzIGluIGNsYXNzaWMgQVNQIGFuZCBQSFAuIEdyZXcgYnVzaW5lc3MgdXNpbmcgb25saW5lIG1hcmtldGluZyBzdHJhdGVnaWVzIHRvIHR3byBtaWxsaW9uIGluIHJldmVudWUuIDwvcD48cD48c3Ryb25nPk5vdGVhYmxlIEFjY29tcGxpc2htZW50czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkJlY2FtZSBmaXJzdCBjb21wYW55IHRvIHNoaXAgcGFpbnRzIGFuZCBjb2F0aW5ncyBhY3Jvc3MgdGhlIFVuaXRlZCBTdGF0ZXM8L2xpPjxsaT5GaXJzdCBlbXBsb3llZSwgZGV2ZWxvcGVkIGNvbXBhbnkgdG8gMisgbWlsbGlvbiBpbiByZXZlbnVlIHdpdGggT3ZlcnR1cmUsIEdvb2dsZSBBZHdvcmRzIGFuZCBTRU88L2xpPjxsaT5DcmVhdGVkLCBtYXJrZXRlZCBhbmQgc3Vic2NyaWJlZCB2b2NhdGlvbmFsIHNjaG9vbCBmb3Igc3BlY2lhbHR5IGNvYXRpbmdzPC9saT48bGk+V29ya2VkIHdpdGggdG9wIEl0YWxpYW4gcGFpbnQgbWFudWZhY3R1cmVycyBvdmVyc2VhcyB0byBidWlsZCBleGNsdXNpdmUgZGlzdHJpYnV0aW9uIHJpZ2h0czwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5TRVBURU1CRVIgMjAwMCAtIE1BWSAyMDAyPC9oNj48YnIvPjxoMj5FZHVjYXRpb248L2gyPjxici8+PHA+U2VsZiBlZHVjYXRlZCBkZXNpZ25lci9wcm9ncmFtbWVyIHdpdGggdm9jYXRpb25hbCB0cmFpbmluZy4gPC9wPjxwPjxzdHJvbmc+Q2VydGlmaWNhdGlvbnM8L3N0cm9uZz48YnIvPmlORVQrLCBBKyBDZXJ0aWZpY2F0aW9uIDwvcD48cD48c3Ryb25nPkFwcHJlbnRpY2VzaGlwPC9zdHJvbmc+PGJyLz5ZZWFyIGxvbmcgcGVyc29uYWwgYXBwcmVudGljZXNoaXAgd2l0aCBmaXJzdCBlbmdpbmVlciBhdCBBbWF6b24uY29tPC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2Pjxici8+PGJyLz4nXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JUYXBjZW50aXZlQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JUYXBjZW50aXZlVHdvQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JDcGdpb0N0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iQ3N0Q3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JLb3VwbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iVHJvdW5kQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JNb250aGx5c09uZUN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTW9udGhseXNUd29DdHJsJywgKCRzY29wZSkgLT5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYkJlbmNocHJlcEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQ29udGFjdEN0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnRGV2ZWxvcGVyc0N0cmwnLCAoJHNjb3BlKSAtPlxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnRGV2ZWxvcGVyQ2VudGVyQ3RybCcsICgkc2NvcGUpIC0+XG5cbkZyYW5jaGluby5jb250cm9sbGVyICdEb2NzQ3RybCcsICgkc2NvcGUsIERvY3MpIC0+XG4gICRzY29wZS4kd2F0Y2ggKC0+IERvY3MubGlzdCksIC0+XG4gICAgJHNjb3BlLmRvY3MgPSBEb2NzLmxpc3RcblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0RvY0N0cmwnLCAoJHNjb3BlLCAkc2NlLCAkc3RhdGVQYXJhbXMsICR0aW1lb3V0LCBEb2NzKSAtPlxuICAkc2NvcGUuaW5kZXggPSBpZiAkc3RhdGVQYXJhbXMuc3RlcCB0aGVuICRzdGF0ZVBhcmFtcy5zdGVwLTEgZWxzZSAwXG5cbiAgJHNjb3BlLiR3YXRjaCAoLT4gRG9jcy5saXN0KSwgLT5cbiAgICAkc2NvcGUuZG9jID0gRG9jcy5maW5kKCRzdGF0ZVBhcmFtcy5wZXJtYWxpbmspXG4gICAgaWYgJHNjb3BlLmRvY1xuICAgICAgJHNjb3BlLnN0ZXAgPSAkc2NvcGUuZG9jLnN0ZXBzWyRzY29wZS5pbmRleF1cbiAgICAgICRzY29wZS5zdGVwLnVybCA9ICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKCRzY29wZS5zdGVwLnVybClcblxuICAgICAgaWYgJHNjb3BlLnN0ZXAudHlwZSA9PSAnZGlhbG9nJ1xuICAgICAgICAkc2NvcGUubWVzc2FnZUluZGV4ID0gMFxuICAgICAgICAkc2NvcGUubWVzc2FnZXMgPSBbXVxuICAgICAgICAkdGltZW91dCgkc2NvcGUubmV4dE1lc3NhZ2UsIDEwMDApXG5cbiAgJHNjb3BlLmhhc01vcmVTdGVwcyA9IC0+XG4gICAgaWYgJHNjb3BlLnN0ZXBcbiAgICAgICRzY29wZS5zdGVwLmluZGV4IDwgJHNjb3BlLmRvYy5zdGVwcy5sZW5ndGhcblxuRnJhbmNoaW5vLmRpcmVjdGl2ZSAnbXlTbGlkZXNob3cnLCAtPlxuICByZXN0cmljdDogJ0FDJ1xuICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSAtPlxuICAgIGNvbmZpZyA9IGFuZ3VsYXIuZXh0ZW5kKFxuICAgICAgc2xpZGVzOiAnLnNsaWRlJywgIFxuICAgIHNjb3BlLiRldmFsKGF0dHJzLm15U2xpZGVzaG93KSlcbiAgICBzZXRUaW1lb3V0ICgtPlxuICAgICAgJChlbGVtZW50KS5jeWNsZSAtPlxuICAgICAgICBmeDogICAgICdmYWRlJywgXG4gICAgICAgIHNwZWVkOiAgJ2Zhc3QnLFxuICAgICAgICBuZXh0OiAgICcjbmV4dDInLCBcbiAgICAgICAgcHJldjogICAnI3ByZXYyJyxcbiAgICAgICAgY2FwdGlvbjogJyNhbHQtY2FwdGlvbicsXG4gICAgICAgIGNhcHRpb25fdGVtcGxhdGU6ICd7e2ltYWdlcy5hbHR9fScsXG4gICAgICAgIHBhdXNlX29uX2hvdmVyOiAndHJ1ZSdcbiAgICAgICAgICBcbiAgICApLCAwXG4iLCJcbiMgbm90IHN1cmUgaWYgdGhlc2UgYXJlIGFjdHVhbGx5IGluamVjdGluZyBpbnRvIHRoZSBhcHAgbW9kdWxlIHByb3Blcmx5XG5hbmd1bGFyLm1vZHVsZShcInRhcC5jb250cm9sbGVyc1wiLCBbXSlcblxuIyBtb3ZlIGNvbnRyb2xsZXJzIGhlcmVcblxuXG5cblxuIiwiYW5ndWxhci5tb2R1bGUoXCJ0YXAuZGlyZWN0aXZlc1wiLCBbXSlcbiAgLmRpcmVjdGl2ZSBcImRldmljZVwiLCAtPlxuICAgIHJlc3RyaWN0OiBcIkFcIlxuICAgIGxpbms6IC0+XG4gICAgICBkZXZpY2UuaW5pdCgpXG5cbiAgLnNlcnZpY2UgJ2NvcHknLCAoJHNjZSkgLT5cbiAgICBjb3B5ID1cbiAgICAgIGFib3V0OlxuICAgICAgICBoZWFkaW5nOiBcIldlJ3JlIDxzdHJvbmc+dGFwcGluZzwvc3Ryb25nPiBpbnRvIHRoZSBmdXR1cmVcIlxuICAgICAgICBzdWJfaGVhZGluZzogXCJUYXBjZW50aXZlIHdhcyBjcmVhdGVkIGJ5IGEgdGVhbSB0aGF0IGhhcyBsaXZlZCB0aGUgbW9iaWxlIGNvbW1lcmNlIHJldm9sdXRpb24gZnJvbSB0aGUgZWFybGllc3QgZGF5cyBvZiBtQ29tbWVyY2Ugd2l0aCBXQVAsIHRvIGxlYWRpbmcgdGhlIGNoYXJnZSBpbiBtb2JpbGUgcGF5bWVudHMgYW5kIHNlcnZpY2VzIHdpdGggTkZDIHdvcmxkd2lkZS5cIlxuICAgICAgICBjb3B5OiBcIjxwPkZvciB1cywgbW9iaWxlIGNvbW1lcmNlIGhhcyBhbHdheXMgYmVlbiBhYm91dCBtdWNoIG1vcmUgdGhhbiBwYXltZW50OiAgbWFya2V0aW5nLCBwcm9tb3Rpb25zLCBwcm9kdWN0IGNvbnRlbnQsIGFuZCBsb3lhbHR5LCBhbGwgY29tZSB0byBsaWZlIGluc2lkZSBhIG1vYmlsZSBwaG9uZS4gTW9iaWxlIGNvbW1lcmNlIHJlYWxseSBnZXRzIGludGVyZXN0aW5nIHdoZW4gaXQgYnJpZGdlcyB0aGUgZGlnaXRhbCBhbmQgcGh5c2ljYWwgd29ybGRzLjwvcD48cD5PdXIgZ29hbCBhdCBUYXBjZW50aXZlIGlzIHRvIGNyZWF0ZSBhIHN0YXRlLW9mLXRoZS1hcnQgbW9iaWxlIGVuZ2FnZW1lbnQgcGxhdGZvcm0gdGhhdCBlbmFibGVzIG1hcmtldGVycyBhbmQgZGV2ZWxvcGVycyB0byBjcmVhdGUgZW50aXJlbHkgbmV3IGN1c3RvbWVyIGV4cGVyaWVuY2VzIGluIHBoeXNpY2FsIGxvY2F0aW9ucyDigJMgYWxsIHdpdGggYSBtaW5pbXVtIGFtb3VudCBvZiB0ZWNobm9sb2d5IGRldmVsb3BtZW50LjwvcD48cD5XZSB0aGluayB5b3XigJlsbCBsaWtlIHdoYXQgd2XigJl2ZSBidWlsdCBzbyBmYXIuIEFuZCBqdXN0IGFzIG1vYmlsZSB0ZWNobm9sb2d5IGlzIGNvbnN0YW50bHkgZXZvbHZpbmcsIHNvIGlzIHRoZSBUYXBjZW50aXZlIHBsYXRmb3JtLiBHaXZlIGl0IGEgdGVzdCBkcml2ZSB0b2RheS48L3A+XCJcbiAgICAgIHRlYW06XG4gICAgICAgIGhlYWRpbmc6IFwiXCJcbiAgICAgICAgYmlvczpcbiAgICAgICAgICBkYXZlX3JvbGU6IFwiXCJcbiAgICAgICAgICBkYXZlX2NvcHk6IFwiXCJcbiAgICBcblxuXG4gICAgdHJ1c3RWYWx1ZXMgPSAodmFsdWVzKSAtPlxuICAgICAgXy5lYWNoIHZhbHVlcywgKHZhbCwga2V5KSAtPlxuICAgICAgICBzd2l0Y2ggdHlwZW9mKHZhbClcbiAgICAgICAgICB3aGVuICdzdHJpbmcnXG4gICAgICAgICAgICAkc2NlLnRydXN0QXNIdG1sKHZhbClcbiAgICAgICAgICB3aGVuICdvYmplY3QnXG4gICAgICAgICAgICB0cnVzdFZhbHVlcyh2YWwpXG5cbiAgICB0cnVzdFZhbHVlcyhjb3B5KVxuXG4gICAgY29weVxuIiwiaWYgZGV2aWNlLmRlc2t0b3AoKVxuXG5lbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuXG5cdCQgPSBkb2N1bWVudCAjIHNob3J0Y3V0XG5cdGNzc0lkID0gJ215Q3NzJyAjIHlvdSBjb3VsZCBlbmNvZGUgdGhlIGNzcyBwYXRoIGl0c2VsZiB0byBnZW5lcmF0ZSBpZC4uXG5cdGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuXHQgICAgaGVhZCAgPSAkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cblx0ICAgIGxpbmsgID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcblx0ICAgIGxpbmsuaWQgICA9IGNzc0lkXG5cdCAgICBsaW5rLnJlbCAgPSAnc3R5bGVzaGVldCdcblx0ICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcydcblx0ICAgIGxpbmsuaHJlZiA9ICdodHRwczovL2NvZGUuaW9uaWNmcmFtZXdvcmsuY29tLzEuMC4wLWJldGEuMTMvY3NzL2lvbmljLm1pbi5jc3MnXG5cdCAgICBsaW5rLm1lZGlhID0gJ2FsbCdcblx0ICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluaylcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==