'use strict';

var ScrollTo = ['$window', function ($window) {
  var defaults = {
    intersectionThreshold: 0.1,
    throttleWait: 20,
    unobserveInstantly: true,
    useIntersectionObserver: true,
    intersectionRoot: null,
    intersectionRootMargin: "0px",
    scrollOffset: null
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
        scrollOffset: scope.$eval(attrs.scrollOffset)
      };
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
            rootMargin = options.scrollOffset + 'px 0px 0px 0px';
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
          var docViewTop = $($window).scrollTop();
          var docViewBottom = docViewTop + $($window).height();
          var elemTop = $(element).offset().top;
          var elemBottom = elemTop + $(element).height();
          if (elemBottom <= docViewBottom + scrollOffset && elemTop >= docViewTop - scrollOffset) {
            scope.$apply(fn);
            if (options.unobserveInstantly) {
              return $($window).off('scroll', scrollHandler);
            }
          }
        }, options.throttleWait);
        return $($window).on('scroll', scrollHandler);
      }
    }
  };
}];

angular.module('angular-scroll-to', []).directive('scrollTo', ScrollTo);