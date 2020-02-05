---
title: "In-place array sorting"
date: "2020-02-05"
description: A JavaScript solution with visual aids to the classic question of sorting an array in-place with linear time complexity and constant space complexity.
---

## In-place array sorting

<time datetime="2020-02-05">February 5, 2020</time>

There is a common interview question that tests the concept of using pointers to sort an array containing three different values in O(n) time complexity and O(1) space complexity. Surprisingly, there are a few explanations of the solution using JavaScript and more importantly, with graphics to help understand the core concepts of the optimal solution. Here is my JavaScript solution with visual aids for the in-place array sorting question.

### The question

How can one sort an array in-place of 0's, 1's, and 2's in ascending order in linear time complexity and constant space complexity? For instance, sort the array `[2, 0, 1, 2, 1, 0]` in-place.

Let's break this down a bit further before proceeding with the solution.

1. Sorting in-place means that we are choosing to modify the original array. So often in web development, it is advisable to _not_ mutuate arrays directly, rather making copies and then modifying them. In this question, we _are_ going to mutate the original array directly.

2. Linear time complexity means that we are striving for only one-pass through the array that would result in it being sorted correctly. Since an array as n-elements, linear time, or O(n) time complexity is our goal.

3. Constant space complexity means that we are striving for consuming a constant amount of memory during the sorting process. We are _not_ looking to create new, temporary arrays of potential variable length to perform the sort. Rather, we will track a constant amount of pointers throughout the exercise. As we'll see, we will only need to track three pointers/values to complete the task.

### Setting up the solution space

When facing these types of algorithmic questions, I like to setup the solution space. By that I mean drawing out all aspects of the question with as much clarifying information as possible, along with any edge cases, questions, etc.

We know that 0's must be placed at the beginning of the array and 2's must be placed at the end of the array. Since 1's naturally fall in the middle, we only concern ourselves with moving around 0's and 2's during the sorting. Therefore, we need to define and keep track of 3 pointers during the array traversal:

1. Where the next 0 should be placed, i,e. the zero-pointer or `p0`
2. Where the next 2 should be placed, i.e. the two-pointer or `p2`
3. Where we currently are in the array, i,e, the current-pointer or `c`.

`p0` is initially set to index 0, the very start of the array. `p2` is initially set to index 5 (using the example array), the very end of the array. `c` is also initially set to index 0, since that where we begin the sorting.

Visually this looks like:

```
Iteration: 0
-------------------
p0
          p2
c
===========
2 0 1 2 1 0
===========
```

And programatically, our setup is:

<!-- prettier-ignore -->
```javascript
function inPlaceSort(arr) {
    let p0 = 0;
    let p2 = arr.length - 1;
    let c = 0;

    // Sorting algorithm next

    return arr;
}

const arr = [2, 0, 1, 2, 1, 0];
inPlaceSort(arr);
```

### Creating the sorting algorithm
