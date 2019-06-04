---
title: "Leaping into Linked Lists"
date: "2019-06-16"
description: Structuring and working with singly and doubly linked lists
---

## Leaping Into Linked Lists

**June 16, 2019**

When working with arrays, _finding_ the point of insertion/deletion is constant in time but _performing_ the insertion/deletion is O(n). This potentially costly operation happens since elements in arrays are allocated contiguously in memory, leading to a reorganization of the structure while performing the insertion/deletion.

On the flip side, linked lists, which are comprised of nodes containing a data value and a pointer to the next node (and previous node in the case of doubly linked lists), allow for constant-time insertion/deletion of elements. This performance gain - relative to arrays - occurs since we only need to track the current pointer in memory during traversal and re-assign that pointer when the target element is added or removed.

In other words, regardless of the linked list size, the act of insertion/deletion requires a single action of pointer reassignment, i.e., O(1) time complexity. Though, the traversal to find the element to add/remove has a complexity of O(n). In summary, the time complexities of insertion/deletion between arrays and linked lists are:

**Arrays**

- Finding the point of insertion/deletion: O(1)
- Performing the point of insertion/deletion: O(n)

**Linked Lists**

- Finding the point of insertion/deletion: O(n)
- Performing the point of insertion/deletion: O(1)

Let's leap into the world of singly and doubly linked lists.

![Chains](./post-assets/chains.jpg)

### Singly linked lists

#### Creating Node and SinglyLinkedList Classes

Using ES6 classes as syntactic sugar for prototypal inheritance, we can start by defining classes for nodes and the singly linked list structure.

Each `Node` in the list is instantiated with some value (e.g. an integer)and an initial `next` property set to `null`.

<!-- prettier-ignore -->
```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
```

A new instance of `Node` is created with the `new` operator and the desired value passed into it:

<!-- prettier-ignore -->
```javascript
const node = new Node(5);
console.log(node);
// Node { value: 5, next: null }
```

The list is instantiated by defining two properties: a `head` that initially is set to null and a `length` that is initially zero.

<!-- prettier-ignore -->
```javascript
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // Methods to be added next
}

const sll = new SinglyLinkedList();
console.log(sll);
// SinglyLinkedList { head: null, length: 0 }
```

A new instance of SinglyLinkedList is created with the `new` operator:

<!-- prettier-ignore -->
```javascript
const sll = new SinglyLinkedList();
```

#### Adding nodes

Adding a node at the end of a singly linked list takes the following steps:

1. Create a new node from the `Node` class
2. Check if the list is empty, i.e., the `head` is `null`.
3. If empty, set the list's head to the new node.
4. If not empty, traverse the list until the last node (which has a `next` value of `null`) is found, then set the last node's `next` property to point to the new node.
5. Increment the list's length.

<!-- prettier-ignore -->
```javascript
add(value) {
  let node = new Node(value);
  
  if (!this.head) {
    this.head = node;
  } else {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = node;
  }
  this.length++;
}

//
const sll = new SinglyLinkedList;
sll.add(1);
console.log(JSON.stringify(ll, null, '\t'))
// {
//   "head": {
//     "value" 1,
//     "next": null
//   }
// }
```
