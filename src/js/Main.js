import ScrollTo from './ScrollTo.js';
import LazyLoadProvider from './LazyLoadConfigProvider.js';
import AngularLazyLoad from './AngularLazyLoad.js';

angular.module('angular-lazy-load', [])
  .directive('scrollTo', ScrollTo)
  .provider('lazyLoad', LazyLoadProvider)
  .directive('lazyLoad', AngularLazyLoad);