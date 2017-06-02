import OnScrollTo from './OnScrollTo.js';
import LazyLoadProvider from './LazyLoadConfigProvider.js';
import AngularLazyLoad from './AngularLazyLoad.js';

angular.module('angular-lazy-load', [])
  .provider('lazyLoad', LazyLoadProvider)
  .directive('onScrollTo', OnScrollTo)
  .directive('ngLazyLoad', AngularLazyLoad);