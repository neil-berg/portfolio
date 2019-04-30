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

**Example 1**: It's our lucky day and upon checking out, we're notified that we get 10% off each item. How do we update our cart to reflect the new prices?

<!-- prettier-ignore -->
```javascript
const cartWithDiscount = cart.map(item => 
  ({...item, price: item.price * .90 }))
```

We declare and create a new array by mapping over each item in `cart` and applying a function that returns a new object where the value of the `price` property on each item is reduced by 10%. I'm making use of arrow functions with an implicit `return` statement here. And I'm also employing the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) to copy each object and then update values of the `price` property.

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

We more clearly see that a callback function is applied on each `item` such that only items in the clothing department are returned in the new array. In this case, the new array has a length of 2 since we have 2 clothing items in our original cart.

**Example 2:** We only have $10 to spend on this shopping trip, so how can we identify which items are $10 or less in our cart?

<!-- prettier-ignore -->
```javascript
const tenDollarsOrLess = cart.filter(item => item.price <= 10);
```

As we saw in Example 1, we test each item on a condition - in this case, whether the item's price is $10 or less - and if the item passes that condition, we return it in a new array. Since we have two items that cost $10 or less (hat and frisbee), `tenDollarsOrLess` has a length of two.

####Reduce

As the name suggests, we use [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) to shrink an array of items down to a single value. Specifically, we execute a defined "reducer" callback function on each array item where the reducer function takes at least these two arguments:

1. Accumulator (often abbreviated as "acc") that gathers or accumulates return values from the callback
2. Current value (often abbreviated as "curr") that represents the current item being processed in the array

Optionally, the callback can also take arguments pertaining to the current index being processed and the source or original array that `reduce` was called upon.

We also set the initial value of the accumulator in our callback. This can be a number (if we want to sum values in the array), an array itself (if we want to distill array items into another array), an object (if we want to copy array items into a new object), and so forth.

**Example 1:** What is the total cost of items in our cart?

<!-- prettier-ignore -->
```javascript
const totalCost = cart.reduce((acc, curr) => acc + curr.price, 0);
```

Let's break this down. We define our anonymous callback function with two arguments `(acc, curr)`, then execute that callback on each item, extracting the current item's price, and add it to the accumulated cost (which has an inital value of 0).

**Example 2:** We are interested in counting the nunber of items in our cart based on their department value. How do we accomplish this using `reduce`?

<!-- prettier-ignore -->
```javascript
const countInstances = cart.reduce((acc, curr) => {
	if (acc.hasOwnProperty(curr.department)) {
		acc[curr.department]++;
	} else {
		acc[curr.department] = 1;
	}
	return acc;
}, {})

// {clothing: 2, bedroom: 1, kitchen: 2, toys: 1}
```

Our reducer callback has the usual `acc` and `curr` arguments, though this time the accumulator is initialized as an empty object `{}`. The body of this arrow function is now multiple lines, requiring us to wrap it in curly braces and include an explicit `return` statement. The logic in the function checks whether `acc` (an empty object to start) has a property of the current item's department value. If that property exists (i.e. we already have an item from that department), then we increment the value of that property. If no property exists, we create a new property on `acc` with the current item's department and assign it a value of 1.

**Example 3:** Let's say another piece of our code needs to have the cart transformed to a nested array where the inner array the item's description and price, e.g. `[ ['shirt', 17], ['hat', 8] ]`. How do we accomplish this using `reduce`?

<!-- prettier-ignore -->
```javascript
const nestedCartArray = cart.reduce((acc, curr) => 
  acc.concat([ [curr.description, curr.price] ]), [])
```

This time our accumulator is an empty array and we concatenate inner arrays to it via the return value in our callback reducer function.

Alternatively, we could have simply used `map` for this transformation:

<!-- prettier-ignore -->
```javascript
const nestedCartArrayWithMap = cart.map(item => 
  [item.description, item.price])
```

Though this example demonstrates how powerful `reduce` is by containing `map` capabilities and so much more.
