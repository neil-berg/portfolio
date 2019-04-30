---
title: "Carried Away With Arrays"
date: "2019-02-02"
description: "Deep dive into the amazing array capabilities of JavaScript"
---

## Carried Away With Arrays

**February 2, 2019**

Arrays are one of my favorite data structures in JavaScript (and Python). They can store all sorts of goodies: numbers, strings, objects, more arrays, and so forth. JavaScript has a wealth of methods for dealing with the [Array object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). In this post, we'll step through a few of them to see how powerful and useful it is to manipulate data with arrays.

###Map/Filter/Reduce

Map, filter, and reduce...the holy trio of higher-order array methods. Let's demonstrate their utility on a sample of data from an online shopping cart:

<!-- prettier-ignore -->
```javascript
const cart = [ 
  {department: 'clothing', description: 'shirt', price: 17},
  {department: 'clothing', description: 'hat', price: 8},
  {department: 'bedroom', description: 'pillow', price: 12},
  {department: 'kitchen', description: 'bowls', price: 44},
  {department: 'kitchen', description: 'plates', price: 30},
  {department: 'toys', description: 'frisbee', price: 7},
]
```

####Map

[map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) is perhaps my most commonly used array method as it creates a new array based on a function applied to each item in the current array, going from left to right.

**Example 1**: it's our lucky day and upon checking out on our site, we're notified that we get 10% off each item. How do we update our cart to reflect the new prices?

<!-- prettier-ignore -->
```javascript
const cartWithDiscount = cart.map(item => 
  ({...item, price: item.price * .90 }))
```

We define and create a new array by mapping over each item in `cart` and returning a new object where the `price` property on each item is reduced by 10%. I'm making use of arrow functions with an implicit `return` statement here. And I'm also employing the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to copy each object and then modify its `price` property.

**Example 2**: We have a coupon for \$5 off items from the "kitchen" department. How do we shave off five bucks from the bowls and plates in our cart?

<!-- prettier-ignore -->
```javascript
const cartWithCoupon = cart.map(item => 
  item.department === 'kitchen' 
    ? { ...item, price: item.price - 5 } 
    : item
  );
```

Similar to Example 1, only this time we add a ternary operator to check whether the `department` is "kitchen" or not. If so, we return a new object with the item's price reduced by \$5 and if not, we just return the original item unchanged.

####Filter

Alongside `map`, we have the [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) function that creates a new array based on whether each item in the current array passes some defined condition. Whereas `map` will not change the number of items in the new array, `filter` can decrease the number of items in the new array.

**Example 1:** Turns out that we really only need some new clothes; a new pillow, bowls, plates, and frisbee will have to be purchased another time. How do we filter our cart so that only items in the "clothing" department remain?

<!-- prettier-ignore -->
```javascript
const onlyClothing = cart.filter(item => item.department === 'clothing');
```

Again, I'm using arrow functions and implicit return statements here for brevity. But let me show the code without arrow functions to help reveal what exactly is going on.

<!-- prettier-ignore -->
```javascript
const onlyClothing = cart.filter(function(item) {
	if (item.department === 'clothing') {
		return item;
    }
});
```

We more clearly see that a callback function is applied on each `item` such that only items in the clothing department are returned to create a new array. In this case, the new array has a length of 2 since we have 2 clothing items in our original cart.
