let ScrollTo = ['$window', ($window) => {
  let defaults = {
    intersectionRatio: 0.1,
    throttleWait: 20,
    unobserveInstantly: true,
    useIntersectionObserver: false
  };
  return {
    restrict: 'A',
    link(scope, element, attrs) {
      let fn = scope.$eval(attrs.scrollTo);
      let attrOptions = {
        intersectionRatio: scope.$eval(attrs.scrollToRatio),
        throttleWait: scope.$eval(attrs.scrollToThrottle),
        unobserveInstantly: scope.$eval(attrs.scrollToUnobserve)
      };
      let options = defaults;
      for (let k in attrOptions) {
        let v = attrOptions[k];
        if (v != null) { options[k] = v; }
      }
      if (options.useIntersectionObserver &&
        (typeof IntersectionObserver !== 'undefined')) {
        var io = new IntersectionObserver(function(entries) {
          scope.$apply(fn);
          if (options.unobserveInstantly) {
            return io.unobserve(element[0]);
          }
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