'use strict';

var ScrollTo = ['$window', '$timeout', 'scrollTo', function ($window, $timeout, scrollTo) {
  var defaults = {
    intersectionThreshold: 0.1,
    throttleWait: 20,
    unobserveInstantly: true,
    useIntersectionObserver: true,
    intersectionRoot: null,
    intersectionRootMargin: "0px",
    scrollOffset: scrollTo.scrollOffset
  };
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      var fn = scope.$eval(attrs.scrollTo);
      var attrOptions = {
        intersectionRatio: scope.$eval(attrs.scrollToThreshold),
        throttleWait: scope.$eval(attrs.scrollToThrottle),
        unobserveInstantly: scope.$eval(attrs.scrollToUnobserve),
        intersectionRoot: scope.$eval(attrs.scrollToRoot),
        intersectionRootMargin: scope.$eval(attrs.scrollToRootMargin),
        scrollOffset: scope.$eval(attrs.scrollOffset),
        useIntersectionObserver: scope.$eval(attrs.useIo)
      };
      console.log(attrOptions.useIntersectionObserver);
      var options = defaults;
      for (var k in attrOptions) {
        var v = attrOptions[k];
        if (v != null) {
          options[k] = v;
        }
      }
      if (options.useIntersectionObserver && typeof IntersectionObserver !== 'undefined') {
        var rootMargin = "0px";
        if (options.scrollOffset != null) {
          if (options.intersectionRootMargin) {
            var parts = options.intersectionRootMargin.split(" ").splice(0, 1);
            parts = parts.concat([options.scrollOffset + 'px']);
            rootMargin = parts.join(" ");
          } else {
            rootMargin = '0px 0px 0px ' + options.scrollOffset + 'px';
          }
        }
        var io = new IntersectionObserver(function (entries) {
          if (entries[0].intersectionRatio == 0) {
            return;
          }
          scope.$apply(fn);
          if (options.unobserveInstantly) {
            return io.unobserve(element[0]);
          }
        }, {
          root: options.intersectionRoot,
          rootMargin: options.intersectionRootMargin,
          threshold: options.intersectionThreshold
        });
        return io.observe(element[0]);
      } else {
        var scrollOffset = options.scrollOffset || 0;
        var scrollHandler = _.throttle(function (e) {
          var docViewTop = $window.scrollY;
          var docViewBottom = docViewTop + $window.innerHeight;
          var elemTop = element[0].offsetTop;
          var elemBottom = elemTop + element[0].offsetHeight;
          if (elemBottom <= docViewBottom + scrollOffset && elemTop >= docViewTop - scrollOffset) {
            scope.$apply(fn);
            if (options.unobserveInstantly) {
              return $window.removeEventListener('scroll', scrollHandler);
            }
          }
        }, options.throttleWait);
        return $window.addEventListener('scroll', scrollHandler);
        $timeout(scrollHandler);
      }
    }
  };
}];

angular.module('angular-scroll-to', []).directive('scrollTo', ScrollTo);
'use strict';

var scrollToProvider = function scrollToProvider() {
  this.scrollOffset = null;
  this.setScrollOffset = function (newScrollOffset) {
    this.scrollOffset = newScrollOffset;
  };
  this.$get = function () {
    return this;
  };
};

angular.module('angular-scroll-to').provider('scrollTo', scrollToProvider);
'use strict';

var scrollToLazyLoad = ['scrollTo', function (scrollTo) {
  return {
    restrict: 'A',
    controller: ['$element', function ($element) {
      this.scrollOffset = scrollTo.scrollOffset;
      this.aot = $element.attr('aot') || false;
      this.scrollHandler = function (e) {
        if ($element.attr('lazy-src')) {
          $element.attr('src', $element.attr('lazy-src'));
          $element.removeAttr('lazy-src');
        }
        if ($element.attr('use-io')) {
          $element.removeAttr('use-io');
        }
      };
    }],
    controllerAs: 'll',
    template: "<img scroll-to='ll.scrollHandler' use-io='!ll.aot' />",
    replace: true,
    priority: 50
  };
}];

angular.module('angular-scroll-to').directive('lazyLoad', scrollToLazyLoad);