# angular-lazy-load
2kb lazy load module for angular. Only requirement is angular! By default, it uses IntersectionObserver instead of attaching an event listener to the document. Optionally, you can use the event listener instead to load things ahead of time. Comes with a `lazy-load` directive for lazy loading images, but you can extend the `on-scroll-to` directive to lazy load anything! Also, to detect scrolling in a container, set the `scroll-root` attribute to a selector.

[Plunker Demo](https://embed.plnkr.co/q9Zm5IpRd4fpiY83DZIm/)

## Install
```
npm install angular-lazy-load
```

## Usage
```javascript
angular.module('myApp', ['angular-lazy-load'])
  .config(function(lazyLoadProvider) {
    lazyLoadProvider.setUseIntersectionObserver(true);
  })
  .controller('myController',
    ['$scope', function() {
        $scope.doSomething = function() {
          console.log("Doing something!");
        }
    }]
  );
```

```html
<body ng-app="myApp">
  <div ng-controller="myController">
    <div style="height: 1000px;"></div>
    <div on-scroll-to="doSomething"></div>

    <div style="height: 1000px;"></div>
    <img lazy-src="http://lorempixel.com/300/300/cats" ng-lazy-load/>
  </div>
</body>
```

### Default options
```html
<div on-scroll-to="doSomething" scroll-threshold="0.1" scroll-throttle="20" scroll-unobserve="true" scroll-root="null" scroll-root-margin="0px" scroll-offset="0" use-io="true" scroll-observe="true"></div>

<img lazy-src="myImg" ng-lazy-load />
```

## Development
```
npm install
npm run dev
```

## Build
```
npm run build
```
