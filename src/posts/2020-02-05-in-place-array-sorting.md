---
title: "In-place Array Sorting"
date: "2020-02-05"
description: A JavaScript solution with visual aids to the classic question of sorting an array in-place with linear time complexity and constant space complexity.
---

## In-place Array Sorting

<time datetime="2020-02-05">February 5, 2020</time>

There is a common interview question that tests the concept of using pointers to sort an array containing three different values in O(n) time complexity and O(1) space complexity. Surprisingly, there are a few explanations of the solution using JavaScript and more importantly, with graphics to help understand the core concepts of the optimal solution. Here is my JavaScript solution with visual aids for the in-place array sorting question.

### The question

How can one sort an array in-place of 0's, 1's, and 2's in ascending order in linear time complexity and constant space complexity? For instance, sort the array `[2, 0, 1, 2, 1, 1]` in-place.

Let's break this down a bit further before proceeding with the solution.

1. Sorting in-place means that we are choosing to modify the original array. So often in web development, it is advisable to _not_ mutuate arrays directly, rather make copies and then modify them. In this question, we _are_ going to mutate the original array directly.

2. Linear time complexity means that we are striving for one traversal of the array to sort it correctly. Since an array as n-elements, linear time, or O(n) time complexity is our goal.

3. Constant space complexity means that we are striving for consuming a constant amount of memory during the sorting process. We are _not_ looking to create new, temporary arrays of variable lengths to perform the sort. Rather, we will track a constant amount of pointers throughout the exercise. As we'll see, we will only need to track three pointers for this task.

### Setting up the solution space

When facing these types of algorithmic questions, I like to first setup the solution space. This includes drawing out all aspects of the question with as much clarifying information as possible, along with any edge cases, questions, and so forth.

We know that 0's must be placed at the beginning of the array and 2's must be placed at the end of the array. Since 1's fall in the middle, we only concern ourselves with moving around 0's and 2's during the sorting. Therefore, we need to define and keep track of 3 pointers during the array traversal:

1. Where the next 0 should be placed, i,e. the zero-pointer or `p0`
2. Where the next 2 should be placed, i.e. the two-pointer or `p2`
3. Where we currently are in the array, i,e, the current-pointer or `c`.

`p0` is initially set to index 0, the very start of the array. `p2` is initially set to index 5 (using the example array), the very end of the array. `c` is also initially set to index 0, since that's where we begin the sorting.

Visually this looks like:

```
Iteration: 0
------------
p0
          p2
c
===========
2 0 1 2 1 1
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

In-place sorting necessitates swapping of elements. There are two swapping scenarios:

1. Currently on a 0, so swap that with the item at the `p0` index
2. Currently on a 2, so swap that with the item at the `p2` index.

When swapping a 0 with the item at the `p0` index, we also need to increment `p0` and `c` by one. Since `p0` starts at index 0, we know that any 0's placed at `p0` initially are thereafter are sorted appropriately and that we can move onto the next item. When swapping a 2 with an item at the `p2` index, then we need to decrement `p2` by one, indicating that we are confident anything beyond `p2` are 2's.

Since we only have three values in the array and we know that 1 must be between 0 and 2, if we are currently on a 1, no swapping needs to happen. We simply move on to the next item by incrementing `c` by one.

Finally, how do we know that the array is sorted? What condition should terminate the sorting process? Once `c` reaches `p2`, we know that every item before `p2` must be 0's and 1's appropriately, and that every item at and beyond `p2` are 2's. Hence, the algorithm ends when `c >= p2`.

<!-- prettier-ignore -->
```javascript{5-16}
function inPlaceSort(arr) {
    let p0 = 0;
    let p2 = arr.length - 1;
    let c = 0;
    while (c <= p2) {
        if (arr[c] === 0) {
            [arr[c], arr[p0]] = [arr[p0], arr[c]];
            c++;
            p0++
        } else if (arr[c] === 1) {
            c++
        } else if (arr[c] === 2) {
            [arr[c], arr[p2]] = [arr[p2], arr[c]];
            p2--;
        }
    }
    return arr;
}

const arr = [2, 0, 1, 2, 1, 0];
inPlaceSort(arr);
```

Note that I am using ES6 swapping via array destructuring. The alternative swapping technique is to temporarily store one of the items to be swapped before re-assigning values in the array. For instance, we could have swapped when reaching a 0 with:

<!-- prettier-ignore -->
```javascript
let temp = arr[c];
arr[c] = arr[p0];
arr[p0] = temp;
```

### Visualizing the sort

With the algorithm in hand, let's visualize each iteration of the in-place sort.

Recall that we start out with:

```
Iteration: 0
------------
p0
          p2
c
===========
2 0 1 2 1 1
===========
```

Currently only a 2, we need to swap it with the item at the `p2` index and decrement `p2`.

```
Iteration: 1
------------
p0
        p2
c
===========
1 0 1 2 1 2
===========
```

Now on a 1, we simply move ahead by 1.

```
Iteration: 2
------------
p0
        p2
  c
===========
1 0 1 2 1 2
===========
```

On a zero, we swap it with the item at `p0`, then increment `p0` and `c`.

```
Iteration: 3
------------
  p0
        p2
    c
===========
0 1 1 2 1 2
===========
```

Again, on a one we just move on ahead.

```
Iteration: 4
------------
  p0
        p2
      c
===========
0 1 1 2 1 2
===========
```

At the 2, we again swap it with the item at `p2` and decrement that pointer by one.

```
Iteration: 5
------------
  p0
      p2
      c
===========
0 1 1 1 2 2
===========
```

`c` is now equal to `p2`, which exits the `while` loop and our function returns the in-place sorted array!

Note how this array only took 4 iterations, showing how at-worst, this solution has O(n) time complexity. Keeping track of 3 pointers allowed us to consume constant amount of memory, or O(1) space complexity.
