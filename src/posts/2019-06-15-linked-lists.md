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

Singly linked lists are defined by nodes, which are plain objects, that contain two properties:

1. A value, such as an integer or a string
2. A pointer to the _next_ node in the list, or null if at the end of the list.

The list itself also has two properties:

1. A _head_ whose value points to the first node in the list
2. A length

For instance, a singly linked list with three nodes containing the values of 5, 8, and 13 looks like:

![linked list schematic](./post-assets/singly-linked-list-schematic.png)

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
  add(value) {}
  addAt(k, value) {}
  remove(value) {}
  removeAt(k) {}
  indexOf(value) {}
  nodeAt(k) {}
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

1. Create a new node with the inputted value.
2. Check if the list is empty, i.e., the `head` is `null`.
3. If empty, set the list's head to the new node.
4. If not empty, traverse the list until the last node (which has a `next` value of `null`) is found, then set the last node's `next` property to point to the new node.
5. Increment the list's length.

<!-- prettier-ignore -->
```javascript
add(value) {
  const node = new Node(value);
  
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
const sll = new SinglyLinkedList();
sll.add(5);
sll.add(8);
sll.add(13);
console.log(JSON.stringify(sll, null, 4))
// {
//     "head": {
//         "value": 5,
//         "next": {
//             "value": 8,
//             "next": {
//                 "value": 13,
//                 "next": null
//             }
//         }
//     },
//     "length": 3
// }
```

Adding a node at a index _k_ is accomplished with the following steps:

1. Ensure that index _k_ is non-negative and less than the list's length
2. Create a new node with the inputted value
3. If _k_ = 0, set the new node's `next` value to the initial `next` value of the list's `head` and reassign the `head` to the new node
4. If _k_ > 0, loop _k_ times starting at the `head` and track the `previous` and `current` nodes during the traversal. These nodes are used to bracket the new node in the next step.
5. Set the `previous` node's `next` value to the new node and the new node's `next` value to the `current` node
6. Increment the list's length

<!-- prettier-ignore -->
```javascript
  addAt(k, value) {
    if (k < 0 || k > this.length) {
      return false;
    }

    const node = new Node(value);
    if (k === 0) {
      node.next = this.head.next;
      this.head = node;
    } else {
      let current = this.head;
      let previous = undefined;
      for (let i = 0; i < k; i++) {
        previous = current;
        current = current.next;
      }
      previous.next = node;
      node.next = current;
    }
    this.length++
  }

// Example -- 
const sll = new SinglyLinkedList();
sll.add(5);
sll.add(8);
sll.add(13);
sll.addAt(2, 10);
console.log(JSON.stringify(sll, null, 4));
// {
//     "head": {
//         "value": 5,
//         "next": {
//             "value": 8,
//             "next": {
//                 "value": 10,
//                 "next": {
//                     "value": 13,
//                     "next": null
//                 }
//             }
//         }
//     },
//     "length": 4
// }
```

#### Removing nodes

Removing nodes with a specific value is accomplished in the following steps:

1. If the target value is the value of the `head`, point the `head` to the `next` value of the `head` and decrement the list's length.
2. Otherwise, traverse the list - tracking the `previous` and `current` nodes - until the target node's value is reached.
3. Set the `previous` node's `next` value to the `current` node's `next` value.
4. Decrement the list's length.

<!-- prettier-ignore -->
```javascript
remove(value) {
  if (value === this.head) {
    this.head = this.head.next;
    this.length--;
  } else {
    let current = this.head;
    let previous = undefined;
    while (current.next) {
      // Traverse until target value found or end of list when current.next === null
      if (current.value === value) {
        previous.next = current.next;
        this.length--;
        break;
      }
    }
  }
}
// Example --
const sll = new SinglyLinkedList();
sll.add(5);
sll.add(8);
sll.add(13);
sll.addAt(2, 10);
sll.remove(8);
console.log(JSON.stringify(sll, null, 4));
// {
//     "head": {
//         "value": 5,
//         "next": {
//             "value": 10,
//             "next": {
//                 "value": 13,
//                 "next": null
//             }
//         }
//     },
//     "length": 3
// }
```

Removing nodes at index _k_ is accomplished in the following steps:

1. Ensure that _k_ is non-negative and less than the list's length.
2. If k === 0, re-set the `head` to point to it's `next` value and decrement the list's length.
3. If k > 0, traverse the list _k_ times - keeping track of the `previous` and `current` node - and then set the `previous` node's `next` value to the `current` node's next value. Decrement the list.

<!-- prettier-ignore -->
```javascript
removeAt(k) {
  if (k < 0 || k > this.length) {
    return false;
  }

  if (k === 0) {
    this.head = this.head.next;
    this.length--;
  } else {
    let current = this.head;
    let previous = undefined;
    for (let i = 0; i < k; i++) {
      previous = current;
      current = current.next;
    }
    previous.next = current.next;
    this.length--;
  }
}
// Example --
const sll = new SinglyLinkedList();
sll.add(5);
sll.add(8);
sll.add(13);
sll.removeAt(1);
console.log(JSON.stringify(sll, null, 4));singlyLinkedList.js
// {
//     "head": {
//         "value": 5,
//         "next": {
//             "value": 13,
//             "next": null
//         }
//     },
//     "length": 2
// }
```

#### The index of a value

Locating the index associated with a certain value is accomplished by simply traversing the list until the target value is found and returning how many steps the traversal required. If no value is found we can return -1 or something similar.

<!-- prettier-ignore -->
```javascript
indexOf(value) {
  let i = 0;
  let current = this.head;
  while (i < this.length) {
    if (current.value === value) {
      return i;
    }
    current = current.next;
    i++;
  }
  return -1;
}

// Example --
const sll = new SinglyLinkedList();
sll.add(5);
sll.add(8);
sll.add(13);
console.log(sll.indexOf(5)); // 0
console.log(sll.indexOf(8)); // 1
console.log(sll.indexOf(13)); // 2
```

#### The node at index _k_

Locating the node at a particular index is accomplished by simply traversing the list _k_ times and returning the resulting node. As done before, we also check to make sure a valid index is provided first.

<!-- prettier-ignore -->
```javascript
nodeAt(k) {
  if (k < 0 || k > this.length - 1) {
    return false;
  }
  let current = this.head;
  for (let i = 0; i < k; i++) {
    current = current.next;
  }
  return current;
}

// Example --
const sll = new SinglyLinkedList();
sll.add(5);
sll.add(8);
sll.add(13);
console.log(JSON.stringify(sll.nodeAt(1), null, 4));
// {
//     "value": 8,
//     "next": {
//         "value": 13,
//         "next": null
//     }
// }
```

### Doubly Linked Lists

We saw that only forward traversal (starting at the head) was possible in singly linked lists. Enabling forward _and_ backward traversal is possible by adding a `previous` or `prev` property to each node and a `tail` property to the linked list. The result is a doubly linked list and conceptually looks like:

![doubly linked list schematic](./post-assets/doubly-linked-list-schematic.png)
