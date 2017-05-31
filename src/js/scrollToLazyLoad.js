let scrollToLazyLoad = ['scrollTo', (scrollTo) => {
  return {
    restrict: 'A',
    controller: ['$element', function($element) {
      this.scrollOffset = scrollTo.scrollOffset;
      this.aot = $element.attr('aot') || false;
      this.scrollHandler = (e) => {
        if ($element.attr('lazy-src')) {
          $element.attr('src', $element.attr('lazy-src'));
          $element.removeAttr('lazy-src');
        }
        if ($element.attr('use-io')) {
          $element.removeAttr('use-io');
        }
      }
    }],
    controllerAs: 'll',
    template: "<img scroll-to='ll.scrollHandler' use-io='!ll.aot' />",
    replace: true,
    priority: 50
  }
}];

angular.module('angular-scroll-to').directive('lazyLoad', scrollToLazyLoad);