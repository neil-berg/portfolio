---
title: "Carried Away With Arrays"
date: "2019-02-02"
description: "Deep dive into the amazing array capabilities of JavaScript"
---

## Carried Away With Arrays

**February 2, 2019**

Arrays are one of my favorite data structures in JavaScript (and Python). They can store all sorts of goodies: numbers, strings, objects, more arrays, and so forth. JavaScript has a wealth of methods for dealing with the [Array object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). In this post, we'll examine a few of them to demonstrate the power and usefullness of arrays.

We'll work with a sample data array storing items in an online shopping cart:

<!-- prettier-ignore -->
```javascript
const cart = [ 
  { department: 'clothing', description: 'shirt', price: 17 },
  { department: 'clothing', description: 'hat', price: 8 },
  { department: 'bedroom', description: 'pillow', price: 12 },
  { department: 'kitchen', description: 'bowls', price: 44 },
  { department: 'kitchen', description: 'plates', price: 30 },
  { department: 'toys', description: 'frisbee', price: 7 }
]
```

###Map/Filter/Reduce

Map, filter, and reduce...the holy trio of higher-order array methods.

####Map

[map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) is perhaps my most commonly used array method as it creates a new array based on a function applied to each item in the current array, going from left to right.

**Example 1**: It's our lucky day and upon checking out, we're notified that we get 10% off each item. How do we update our cart to reflect the new prices?

<!-- prettier-ignore -->
```javascript
const cartWithDiscount = cart.map(item => 
  ({...item, price: item.price * .90 }));

// [{department: "clothing", description: "shirt", price: 15.3},
// {department: "clothing", description: "hat", price: 7.2},
// {department: "bedroom", description: "pillow", price: 10.8},
// {department: "kitchen", description: "bowls", price: 39.6},
// {department: "kitchen", description: "plates", price: 27},
// {department: "toys", description: "frisbee", price: 6.3}]
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

// [{department: "clothing", description: "shirt", price: 17}.
// {department: "clothing", description: "hat", price: 8},
// {department: "bedroom", description: "pillow", price: 12},
// {department: "kitchen", description: "bowls", price: 39},
// {department: "kitchen", description: "plates", price: 25},
// {department: "toys", description: "frisbee", price: 7}]
```

Similar to Example 1, only this time we add a ternary operator to check whether the `department` is "kitchen" or not. If so, we return a new object with the item's price reduced by \$5 and if not, we just return the original item unchanged.

####Filter

Alongside `map`, we have the [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) function that creates a new array based on whether each item in the current array passes some defined condition. Whereas `map` will not change the number of items in the new array, `filter` can decrease the number of items in the new array.

**Example 3:** Turns out that we really only need some new clothes; a new pillow, bowls, plates, and frisbee will have to be purchased another time. How do we filter our cart so that only items in the "clothing" department remain?

<!-- prettier-ignore -->
```javascript
const onlyClothing = cart.filter(item => item.department === 'clothing');

// [{department: "clothing", description: "shirt", price: 17},
// {department: "clothing", description: "hat", price: 8}]
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

**Example 4:** We only have $10 to spend on this shopping trip, so how can we identify which items are $10 or less in our cart?

<!-- prettier-ignore -->
```javascript
const tenDollarsOrLess = cart.filter(item => item.price <= 10);

// [{department: "clothing", description: "hat", price: 8},
// {department: "toys", description: "frisbee", price: 7}]
```

As we saw in Example 3, we test each item on a condition - in this case, whether the item's price is $10 or less - and if the item passes that condition, we return it in a new array. Since we have two items that cost $10 or less (hat and frisbee), `tenDollarsOrLess` has a length of two.

####Reduce

As the name suggests, we use [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) to shrink an array of items down to a single value. Specifically, we execute a defined "reducer" callback function on each array item where the reducer function takes at least these two arguments:

1. Accumulator (often abbreviated as "acc") that gathers or accumulates return values from the callback
2. Current value (often abbreviated as "curr") that represents the current item being processed in the array

Optionally, the callback can also take arguments pertaining to the current index being processed and the source or original array that `reduce` was called upon.

We also set the initial value of the accumulator in our callback. This can be a number (if we want to sum values in the array), an array itself (if we want to distill array items into another array), an object (if we want to copy array items into a new object), and so forth.

**Example 5:** What is the total cost of items in our cart?

<!-- prettier-ignore -->
```javascript
const totalCost = cart.reduce((acc, curr) => acc + curr.price, 0);

// 118
```

Let's break this down. We define our callback function with two arguments `(acc, curr)`, then execute that callback on each item, extracting the current item's price, and add it to the accumulated cost (which has an inital value of 0).

**Example 6:** We are interested in counting the number of items in our cart per department. How do we accomplish this using `reduce`?

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

**Example 7:** Let's say another piece of our code needs to have the cart transformed to a nested array where the inner array contains the item's description and price, e.g. `[ ['shirt', 17], ['hat', 8] ]`. How do we accomplish this using `reduce`?

<!-- prettier-ignore -->
```javascript
const nestedCartArray = cart.reduce((acc, curr) => 
  acc.concat([ [curr.description, curr.price] ]), []);

// [ ["shirt", 17],
// ["hat", 8],
// ["pillow", 12],
// ["bowls", 44],
// ["plates", 30],
// ["frisbee", 7] ]
```

This time our accumulator is initialized as an empty array and we concatenate inner arrays to it via the return value in our callback reducer function.

Alternatively, we could have simply used `map` for this transformation:

<!-- prettier-ignore -->
```javascript
const nestedCartArrayWithMap = cart.map(item => 
  [item.description, item.price]);
```

Though this example demonstrates how powerful `reduce` is by containing `map` capabilities and so much more.

###Sorting

JavaScript conveniently includes a built-in [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) method, though the algorithm is not standard across browsers. There's also an interesting [history of sorting](https://v8.dev/blog/array-sort) inside Google's V8 JS engine.

**Example 8:** How do we sort items in our cart from lowest to highest price?

<!-- prettier-ignore -->
```javascript
const sortedByPrice = cart.sort((a, b) => a.price - b.price);

// [{department: "toys", description: "frisbee", price: 7}
// {department: "clothing", description: "hat", price: 8}
// {department: "bedroom", description: "pillow", price: 12}
// {department: "clothing", description: "shirt", price: 17}
// {department: "kitchen", description: "plates", price: 30}
// {department: "kitchen", description: "bowls", price: 44}]
// 
```

This seems a bit like magic using arrow functions and seemingly random `a` and `b` arguments. So let's write the code in its long-form to more clearly understand the logic.

<!-- prettier-ignore -->
```javascript
const sortedByPrice = cart.sort(function(curr, next) {
	if (curr.price < next.price) return -1;
	else if (curr.price > next.price) return 1;
	return 0;
})
```

Now we see that the callback is a comparison function that takes in the current and next items in the array, or `a` and `b`, as is commonly used. If the price of the current item is less than the next item's price, we return -1, which in-place sorts `curr` to a lower index than `next`. On the other hand, if the current item's price is greater than the next item's price, we return 1, and `curr` is in-place sorted to a higher index than `next`. If the prices between the two items are equal, we return 0 and the indices are unchanged.

Want to instead sort prices from high-to-low? Just reverse the `return` statements in the long-form or use `b.price - a.price` in the arrow function. The beauty of `sort` is how flexible and customizable the comparison function can be.

###Locating items and indices

Oftentimes we want to determine whether an item exists in an array and if so, what its index is. There are several handy methods to accomplish these tasks.

####indexOf
[indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) returns either the first index where a given array element is found or -1 if the given element is not found.

**Example 9:** Do we have any items in our cart from the "toys" department?

<!-- prettier-ignore -->
```javascript
const anyToysInCart = cart.map(item => item.department)
                          .indexOf('toys') !== -1 ? 'yes' : 'no';
// 'yes'
```

Here we chain together two methods - first mapping over `cart` to extract the departments of each item and then checking whether "toys" exists in that newly-created array of department names. Since our frisbee is classified in the "toys" department, `indexOf(toys)` will yield its index in the array (in this case, 5). Since 5 doesn't equal -1, our ternary operator will return `yes` as the value to `anyToysInCart`.

####includes

Minus Internet Explorer, all other major browsers support the [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) method. While `indexOf` returns a number (either the index of a given element or -1 if missing), `includes` returns a Boolean `true` or `false` in its search for an element in the array.

**Example 10:** Do we have any items in our cart from the "kitchen" department? What about the "garden" department?

<!-- prettier-ignore -->
```javascript
const anyKitchenItems = cart.map(item => item.department)
                          .includes('kitchen'); // true;
const anyGardenItems = cart.map(item => item.department)
                          .includes('garden'); // false
```

Similar to Example 9, we first create a new array of department names using `map` and check whether "kitchen" or "garage" exist in that array.

####find

A more flexible method for element searching in arrays is accomplished through [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find). `find` returns the value of the first element that passes a defined testing callback function.

**Example 11:** We need to pare down our shopping cart and want to locate the first pricey item in it. What is the first item in our cart with a price over \$25?

<!-- prettier-ignore -->
```javascript
const firstPriceyItem = cart.find(item => item.price > 25);
// {department: "kitchen", description: "bowls", price: 44}
```

Bowls are the first item in `cart` with a price greater than \$25, hence it is returned from the `find` method.

###'some' and 'every' questions

Often we'll ask questions on our arrays like "Does at least one item pass some condition?" and "Do all items pass some condition?". The [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some) and [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) methods return Boolean `true` or `false` expressions as answers to those questions, respectively.

**Example 12:** Do any items in our cart have a price above \$40? What about \$50?

<!-- prettier-ignore -->
```javascript
const anyAbove40 = cart.some(item => item.price > 40); // true
const anyAbove50 = cart.some(item => item.price > 50); // false
```

The `some` method uses a callback comparison function to test the truthiness of each item in the array. If _any_ item is truthy, then `true` is returned. If not, then `false` is returned.

`every` has an identical structure to `some`, only this time _all_ items must be deemed truthy for `true` to be returned.

**Example 13:** Do all items in our cart have a price less than \$100? Less than \$40?

<!-- prettier-ignore -->
```javascript
const allBelow100 = cart.every(item => item.price < 100); //true
const allbelow40 = cart.every(item => item.price < 40); //false
```

This post just scratched the surface of the amazing world of arrays in JavaScript. Curious to learn more about array methods? Simply type an array into the console and click on the `__proto__` tag to reveal dozens of delicious methods inherited from `Array.prototype`. Or [read about them on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/prototype).
