let ScrollTo = ['$window', ($window) => {
  let defaults = {
    intersectionThreshold: 0.1,
    throttleWait: 20,
    unobserveInstantly: true,
    useIntersectionObserver: true,
    intersectionRoot: null,
    intersectionRootMargin: "0px"
  };
  return {
    restrict: 'A',
    link(scope, element, attrs) {
      let fn = scope.$eval(attrs.scrollTo);
      let attrOptions = {
        intersectionRatio: scope.$eval(attrs.scrollToThreshold),
        throttleWait: scope.$eval(attrs.scrollToThrottle),
        unobserveInstantly: scope.$eval(attrs.scrollToUnobserve),
        intersectionRoot: scope.$eval(attrs.scrollToRoot),
        intersectionRootMargin: scope.$eval(attrs.scrollToRootMargin)
      };
      let options = defaults;
      for (let k in attrOptions) {
        let v = attrOptions[k];
        if (v != null) { options[k] = v; }
      }
      if (options.useIntersectionObserver &&
        (typeof IntersectionObserver !== 'undefined')) {
        var io = new IntersectionObserver(function(entries) {
          if (entries[0].intersectionRatio == 0) { return; }
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
        let scrollHandler = _.throttle(function(e) {
          let docViewTop = $($window).scrollTop();
          let docViewBottom = docViewTop + $($window).height();
          let elemTop = $(element).offset().top;
          let elemBottom = elemTop + $(element).height();
          if ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) {
            scope.$apply(fn);
            if (options.unobserveInstantly) {
              return $($window).off('scroll');
            }
          }
        }
        , options.throttleWait
        );
        return $($window).on('scroll', scrollHandler);
      }
    }
  };
}];

angular.module('angular-scroll-to', []).directive('scrollTo', ScrollTo);