---
title: "Regular expressions for regular people"
date: "2019-05-28"
description: Explanations and recipies for useful regular expressions
---

## Regular Expressions for Regular People

**May 28, 2019**

Equally elegant and mysterious, regular expressions are a critical tool for input validation, string manipulations, and a host of other tasks. Their syntax can be daunting at first, but there is a clear logic between the slashes, and I find that it's best revealed through stepping through a handful of use cases.

As such, this post covers the creation and application of some common uses of regular expressions in JavaScript. It is intended for regular people. By that I mean people like me, people who are not RegExperts, but commonfolk who only occasionally need to apply them in their development tasks.

### Creating regular expressions

There are two ways to create a regular expression (RegEx):

1. RegEx literal of a pattern in between slashes

   - `/pattern/`
   - Most common creation method
   - Used when you know the pattern upfront and it does not change

2. Constructor function RegExp

   - `const re = new RegExp(pattern)`
   - Used when the pattern is not known unfront, but changes during code execution or pattern comes from user input or external sources

### Testing regular expressions

There are two ways to test a regular expressions:

1. Using methods of the RegExp object:

   - test - returns true if matched or false if no match
   - exec - returns array of matched details or null if no match

2. Using methods of the String object:
   - match - returns array of matched details or null if no match
   - replace - returns new string with replaced matched text
   - (less common): search and split

### Flags

In addition to the RegEx pattern, flags can be attached that modify parameters of the search. Common flags include:

- g - global matching, aka find all matches
- i - case insensitive, aka ignore casing
- m - multi-line searching for matches

### Letters, digits, special characters

#### Letters

Letters in a regular expression can be lowercase a-z or uppercase A-Z. When used in a character set (more on that below), the hypen represents a range of letters, e.g. A-Za-z includes all upper and lowercase letters.

####Digits

Digits or numbers are represented by 0-9 and like letters, when used in a character set, the hypen represents a range of digits.

#### Special characters

The following characters have special meanings in regular expressions and need to be prefaced by a backwards slash to be treated literally:

- open and closing parenthesis, `(` and `)`
- open and closing square brackets, `[` and `]`
- the question mark, `?`
- the period, `.`
- the up carrot, `^`

### Direct matches

The simplest regular expression is directly (exactly) matching the pattern in between slashes:

<!-- prettier-ignore -->
```javascript
/flower/i.test("Flowerpot")
// true since 'flower' is matched in 'Flowerpot' 
// and the 'i' flag ignores case differences
```

### Character sets

Square brackets define sets of characters that match when _any_ character in that set is matched:

<!-- prettier-ignore -->
```javascript
/[A-D]/.test('C')
// true since C is within A-D
```

<!-- prettier-ignore -->
```javascript
/[5-9]/.test("4")
// false since 4 is outside of 5-9
```

<!-- prettier-ignore -->
```javascript
/[a-z0-9]/.test('h3llo')
// true since a lowercase letter and digit are matched
```

When used _inside_ of a character set, the special up carrat `^` creates a negating set, aka match anything _but_ those characters.

<!-- prettier-ignore -->
```javascript
/[^A-D]/.test('E')
// true since E is outside of A-D
```

<!-- prettier-ignore -->
```javascript
/[^3-8]/.test('5')
// false since 5 is within 3-8
```

<!-- prettier-ignore -->
```javascript
/[^A-Z0-9]/.test('h3llo')
// true since not-uppercase (aka lowercase)
// letters are matched
```
