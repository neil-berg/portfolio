---
title: "Leaping into Linked Lists"
date: "2019-06-16"
description: Structuring and working with singly and doubly linked lists
---

## Leaping Into Linked Lists

**June 16, 2019**

Due to the indexed nature of arrays, _finding_ the point of insertion/deletion is constant in time but _performing_ the insertion/deletion is O(n). This potentially costly operation happens since elements in arrays are allocated contiguously in memory, leading to a reorganization of the structure while performing the insertion/deletion.

On the flip side, linked lists, which are comprised of nodes containing a data value and a pointer to the next node (and previous node in the case of doubly linked lists), allow for constant-time insertion/deletion of elements. This performance gain - relative to arrays - occurs since we only need to track the current pointer in memory during traversal and re-assign that pointer when the target element is added or removed.

In other words, regardless of the linked list size, the act of insertion/deletion requires a single act of pointer reassignment, i.e., O(1) time complexity. Though, the traversal to find the element to add/remove has a complexity of O(n). In summary, the time complexities of insertion/deletion between arrays and linked lists are:

**Arrays**

- Finding the point of insertion/deletion: O(1)
- Performing the point of insertion/deletion: O(n)

**Linked Lists**

- Finding the point of insertion/deletion: O(n)
- Performing the point of insertion/deletion: O(1)

Let's leap into the world of singly and doubly linked lists.

![Chains](./post-assets/chains.jpg)

### Singly linked lists
