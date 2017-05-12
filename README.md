# angular-scroll-to
Simple angular directive to handle events when a user scrolls to an element. Optionally, you can use IntersectionObserver instead of attaching an event listener to the document.

[Plunker Demo](https://embed.plnkr.co/q9Zm5IpRd4fpiY83DZIm/)

## Install
```
npm install angular-scroll-to
```

## Usage
```javascript
angular.module('myApp', ['angular-scroll-to']).controller('myController',
  function() {
    $scope.doSomething = function() {
      console.log("Doing something!");
    }
  }
);
```

```html
<body ng-app="myApp">
  <div ng-controller="myController">
    <div style="height: 1000px;"></div>
    <div scroll-to="doSomething"></div>
  </div>
</body>
```

### Default options
```html
<div scroll-to="doSomething" scroll-to-threshold="0.1" scroll-to-throttle="20" scroll-to-unobserve="true" scroll-to-root="null" scroll-to-root-margin="0px" scroll-offset="0"></div>
```

## Development
```
npm install
gulp watch
```