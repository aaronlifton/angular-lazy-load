let LazyLoadProvider = function() {
  this.scrollOffset = null;
  this.setScrollOffset = function(newScrollOffset) {
    this.scrollOffset = newScrollOffset;
  };
  this.$get = function() {
    return this;
  };
};

export default LazyLoadProvider;