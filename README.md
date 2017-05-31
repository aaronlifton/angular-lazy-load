# angular-lazy-load
2kb lazy load module for angular. Only requirement is angular! By default, it uses IntersectionObserver instead of attaching an event listener to the document. Optionally, you can use the event listener instead. Comes with a `lazy-load` directive for lazy loading images, but you can extend the `scroll-to` directive to lazy load anything!

[Plunker Demo](https://embed.plnkr.co/q9Zm5IpRd4fpiY83DZIm/)

## Install
```
npm install angular-lazy-load
```

## Usage
```javascript
angular.module('myApp', ['angular-lazy-load']).controller('myController',
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
    <div scroll-to="doSomething"></div>

    <div style="height: 1000px;"></div>
    <img lazy-src="http://lorempixel.com/300/300/cats" lazy-load/>
  </div>
</body>
```

### Default options
```html
<div scroll-to="doSomething" scroll-to-threshold="0.1" scroll-to-throttle="20" scroll-to-unobserve="true" scroll-to-root="null" scroll-to-root-margin="0px" scroll-offset="0" use-io="true"></div>

<img lazy-src="myImg" lazy-load />
```

## Development
```
npm install
gulp watch
```
