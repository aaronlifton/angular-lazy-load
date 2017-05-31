# angular-scroll-to
Simple angular directive to handle events when a user scrolls to an element. By default, it uses IntersectionObserver instead of attaching an event listener to the document. Optionally, you can use the event listener instead.

[Plunker Demo](https://embed.plnkr.co/q9Zm5IpRd4fpiY83DZIm/)

## Install
```
npm install angular-scroll-to
```

## Usage
```javascript
angular.module('myApp', ['angular-scroll-to']).controller('myController',
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
<div scroll-to="doSomething" scroll-to-threshold="0.1" scroll-to-throttle="20" scroll-to-unobserve="true" scroll-to-root="null" scroll-to-root-margin="0px" scroll-offset="0"></div>

<img lazy-src="myImg" lazy-load />
```

## Development
```
npm install
gulp watch
```
