import _ from './LodashShim.js';

let ScrollTo = ['$window', '$timeout', 'lazyLoad', ($window, $timeout, lazyLoad) => {
  let defaults = {
    intersectionThreshold: 0.1,
    throttleWait: 20,
    unobserveInstantly: true,
    useIntersectionObserver: true,
    intersectionRoot: null,
    intersectionRootMargin: "0px",
    scrollOffset: lazyLoad.scrollOffset
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
        intersectionRootMargin: scope.$eval(attrs.scrollToRootMargin),
        scrollOffset: scope.$eval(attrs.scrollOffset),
        useIntersectionObserver: scope.$eval(attrs.useIo)
      };
      let options = defaults;
      for (let k in attrOptions) {
        let v = attrOptions[k];
        if (v != null) { options[k] = v; }
      }
      if (options.useIntersectionObserver &&
        (typeof IntersectionObserver !== 'undefined')) {
        let rootMargin = "0px";
        if (options.scrollOffset != null) {
          if (options.intersectionRootMargin) {
            let parts = options.intersectionRootMargin.split(" ").splice(0, 1);
            parts = parts.concat([`${options.scrollOffset}px`]);
            rootMargin = parts.join(" ");
          } else {
            rootMargin = `0px 0px 0px ${options.scrollOffset}px`;
          }
        }
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
        let scrollOffset = options.scrollOffset || 0;
        let scrollHandler = _.throttle(function(e) {
          let docViewTop = $window.scrollY;
          let docViewBottom = docViewTop + $window.innerHeight;
          let elemTop = element[0].offsetTop;
          let elemBottom = elemTop + element[0].offsetHeight;
          if ((elemBottom <= docViewBottom + scrollOffset) && (elemTop >= docViewTop - scrollOffset)) {
            scope.$apply(fn);
            if (options.unobserveInstantly) {
              return $window.removeEventListener('scroll', scrollHandler);
            }
          }
        }
        , options.throttleWait
        );
        $window.addEventListener('scroll', scrollHandler);
        return $timeout(scrollHandler);
      }
    }
  };
}];

export default ScrollTo;