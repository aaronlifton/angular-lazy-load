'use strict';

var ScrollTo = ['$window', function ($window) {
  var defaults = {
    intersectionRatio: 0.1,
    throttleWait: 20,
    unobserveInstantly: true,
    useIntersectionObserver: false
  };
  return {
    restrict: 'A',
    link: function link(scope, element, attrs) {
      var fn = scope.$eval(attrs.scrollTo);
      var attrOptions = {
        intersectionRatio: scope.$eval(attrs.scrollToRatio),
        throttleWait: scope.$eval(attrs.scrollToThrottle),
        unobserveInstantly: scope.$eval(attrs.scrollToUnobserve)
      };
      var options = defaults;
      for (var k in attrOptions) {
        var v = attrOptions[k];
        if (v != null) {
          options[k] = v;
        }
      }
      if (options.useIntersectionObserver && typeof IntersectionObserver !== 'undefined') {
        var io = new IntersectionObserver(function (entries) {
          scope.$apply(fn);
          if (options.unobserveInstantly) {
            return io.unobserve(element[0]);
          }
        });
        return io.observe(element[0]);
      } else {
        var scrollHandler = _.throttle(function (e) {
          var docViewTop = $($window).scrollTop();
          var docViewBottom = docViewTop + $($window).height();
          var elemTop = $(element).offset().top;
          var elemBottom = elemTop + $(element).height();
          if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
            scope.$apply(fn);
            if (options.unobserveInstantly) {
              return $($window).off('scroll');
            }
          }
        }, options.throttleWait);
        return $($window).on('scroll', scrollHandler);
      }
    }
  };
}];

angular.module('angular-scroll-to', []).directive('scrollTo', ScrollTo);