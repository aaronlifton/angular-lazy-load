let scrollToProvider = function() {
  this.scrollOffset = null;
  this.setScrollOffset = function(newScrollOffset) {
    this.scrollOffset = newScrollOffset;
  };
  this.$get = function() {
    return this;
  };
};

angular.module('angular-scroll-to').provider('scrollTo', scrollToProvider);