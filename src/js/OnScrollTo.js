import _ from './LodashShim.js';

let OnScrollTo = ['$window', '$timeout', 'lazyLoad', ($window, $timeout, lazyLoad) => {
  let defaults = {
    intersectionThreshold: 0.1,
    throttleWait: 20,
    unobserveInstantly: true,
    useIntersectionObserver: lazyLoad.useIntersectionObserver,
    intersectionRoot: null,
    intersectionRootMargin: "0px",
    scrollOffset: lazyLoad.scrollOffset
  };
  return {
    restrict: 'A',
    link(scope, element, attrs) {
      let fn = scope.$eval(attrs.onScrollTo);
      let attrOptions = {
        intersectionRatio: scope.$eval(attrs.scrollThreshold),
        throttleWait: scope.$eval(attrs.scrollThrottle),
        unobserveInstantly: scope.$eval(attrs.scrollUnobserve),
        intersectionRoot: scope.$eval(attrs.scrollRoot),
        intersectionRootMargin: scope.$eval(attrs.scrollRootMargin),
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
          let topOffset = (element) => element[0].getBoundingClientRect().top
            + window.pageYOffset
            - element[0].ownerDocument.documentElement.clientTop;
          let rootEl = angular.element(options.intersectionRoot);
          let fold = (rootEl[0]) ? topOffset(rootEl) : (window.innerHeight + window.pageYOffset);
          if (fold > topOffset(element) - scrollOffset) {
            console.log("lazy loading");
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

export default OnScrollTo;