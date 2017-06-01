let LazyLoadProvider = function() {
  this.scrollOffset = null;
  this.useIntersectionObserver = true;
  this.setScrollOffset = function(newScrollOffset) {
    this.scrollOffset = newScrollOffset;
  };
  this.setUseIntersectionObserver = function(newUseIO) {
    this.useIntersectionObserver = newUseIO;
  };
  this.$get = function() {
    return this;
  };
};

export default LazyLoadProvider;