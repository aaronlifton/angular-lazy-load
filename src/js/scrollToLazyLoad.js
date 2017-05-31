let scrollToLazyLoad = () => {
  return {
    restrict: 'A',
    controller: ['$element', function($element) {
      this.scrollOffset = "80";
      this.scrollHandler = (e) => {
        if (angular.element($element).attr('lazy-src')) {
          angular.element($element).attr('src', angular.element($element).attr('lazy-src'));
          angular.element($element).removeAttr('lazy-src');
        }
      }
    }],
    controllerAs: 'll',
    template: "<img scroll-to='ll.scrollHandler' />",
    replace: true,
    priority: 50
  }
};

angular.module('angular-scroll-to').directive('lazyLoad', scrollToLazyLoad);