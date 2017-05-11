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
