let AngularLazyLoad = ['ngLazyLoad', (lazyLoad) => {
  return {
    restrict: 'A',
    controller: ['$element', function($element) {
      this.scrollOffset = lazyLoad.scrollOffset;
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
    template: "<img on-scroll-to='ll.scrollHandler' use-io='!ll.aot' />",
    replace: true,
    priority: 50
  }
}];

export default AngularLazyLoad;