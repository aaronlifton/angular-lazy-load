import OnScrollTo from './OnScrollTo.js';
import LazyLoadProvider from './LazyLoadConfigProvider.js';
import AngularLazyLoad from './AngularLazyLoad.js';

angular.module('angular-lazy-load', [])
  .directive('onScrollTo', OnScrollTo)
  .provider('lazyLoad', LazyLoadProvider)
  .directive('lazyLoad', AngularLazyLoad);