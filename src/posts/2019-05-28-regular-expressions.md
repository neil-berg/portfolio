---
title: "Regular expressions for regular people"
date: "2019-05-28"
description: Explanations and recipies for useful regular expressions
---

## Regular Expressions for Regular People

**May 28, 2019**

Equally elegant and mysterious, regular expressions are a critical tool for input validation, string manipulations, and a host of other tasks. Their syntax can be daunting at first, but there is a clear logic between the slashes, and I find that it's best revealed through stepping through a handful of examples.

As such, this post covers the creation and application of some common uses of regular expressions in JavaScript. It is intended for regular people. By that I mean people like me, people who are not RegExperts, but commonfolk who only occasionally need to reach for them.

### Creating regular expressions

There are two ways to create a regular expression (RegEx):

1. RegEx literal of a pattern in between slashes

   - Most common creation method
   - Used when you know the pattern upfront and it does not change

   <!-- prettier-ignore -->

```javascript
const re = /flower/
```

2. Constructor function RegExp

   - Used when the pattern is not known unfront, but changes during code execution or pattern comes from user input or external sources

<!-- prettier-ignore -->
```javascript
const re = new RegExp('flower')
```

### Testing regular expressions

There are two ways to test a regular expressions:

1. Using methods of the RegExp object:

   - `test` - returns true if matched or false if no match
   - `exec` - returns array of matched details or null if no match

<!-- prettier-ignore -->
```javascript
/flower/.test('flowerpot')
// true 
```

<!-- prettier-ignore -->
```javascript
/flower/.exec('flowerpot')
// ["flower", index: 0, input: "flowerpot", groups: undefined]
// returned details include: matched text, starting index of the match
// and the original text input
```

2. Using methods of the String object:
   - `match` - returns array of matched details or null if no match
   - `replace` - returns new string with matched text replaced with defined new text
   - (less common): `search` and `split`

<!-- prettier-ignore -->
```javascript
'Los Angeles, California'.match(/California/)
//["California", index: 13, input: "Los Angeles, California", groups: undefined]
```

<!-- prettier-ignore -->
```javascript
'Los Angeles, California'.replace(/California/, 'CA')
// "Los Angeles, CA"
```

### Flags

Flags can be attached to patterns that modify the search parameters. Common flags include:

- `g` - global matching, aka find all matches
- `i` - case insensitive, aka ignore casing

<!-- prettier-ignore -->
```javascript
'one hat two hat red had blue hat'.match(/hat/g)
// ["hat", "hat", "hat"]
```

<!-- prettier-ignore -->
```javascript
'App.js app.js wrapper.js'.match(/app/gi)
// ["App", "app", "app"]
```

### Quantifiers

Certain quantifying characters and expressions can be included after patterns to refine their specificity.

#### Optional matching with `?`

<!-- prettier-ignore -->
```javascript
/colou?r/.test('color')
// true 
// The "u" is optional
```

#### One or more matches with `+`

<!-- prettier-ignore -->
```javascript
'yassss queen'.match(/yas+/)
// ["yassss", index: 0, input: "yassss queen", groups: undefined]
// The "s" is matched one or more times (4 times in this case)
```

#### None, one or more matches with `*`

<!-- prettier-ignore -->
```javascript
'ya queen'.match(/yas*/)
// ["ya", index: 0, input: "ya queen", groups: undefined]
// The "s" does not need to be matched
```

#### "Starts with" using `^`

<!-- prettier-ignore -->
```javascript
/^App/.test('App.js');
// true
```

#### "Ends with" using `$`

<!-- prettier-ignore -->
```javascript
/js$/.test('App.js');
// true
```

#### Match an exact _n_ number of times using `{n}`

<!-- prettier-ignore -->
```javascript
/5{3}/.test('555');
// true
// Three 5's are exactly matched
```

#### Match at least _n_ number of times using `{n,}`

<!-- prettier-ignore -->
```javascript
/5{3,}/.test('5555');
// true
// At least three 5's are matched
```

#### Match between _n_ and _m_ number of times using `{n,m}`

<!-- prettier-ignore -->
```javascript
/5{1,4}/.test('55');
// true
// Between one and four 5's are matched
```

### Metacharacters

In addition to letters and digits, regular expressions can also be composed with metacharacters, which are always prefaced by a backslash. A few common metacharacters include:

- `\w` - any alphanumeric or word character
- `\W` - any non-alphanumeric or word character

<!-- prettier-ignore -->
```javascript
'R2-D2'.match(/\w{2}\W\w{2}/);
// ["R2-D2", index: 0, input: "R2-D2", groups: undefined]
// Two word characters (R2), then one non-word character (-), then
// two word characters (D2) are matched
```

- `\d` - any digit
- `\D` - any non-digit

<!-- prettier-ignore -->
```javascript
'C-3PO'.match(/\D{2}\d\D{2}/);
// ["C-3PO", index: 0, input: "C-3PO", groups: undefined]
// Two non-digits (C-), then one digit (3), then
// two non-digits (PO) are matched
```

- `\s` - any whitespace character (space, tab, newline)
- `\S` - any non-whitespace character

<!-- prettier-ignore -->
```javascript
'apples or oranges'.match(/\S+\s\S+\s\S+/);
// ["apples or oranges", index: 0, input: "apples or oranges", groups: undefined]
// One or more non-whitespace characters (apples), then a whitespace,
// then one or more non-whitespace characters (or), then a whitespace,
// then one or more non-whitespace characters (oranges) are matched
```

### Multiple patterns with "or" operator

The OR operator in regular expressions is defined by the pipe `|`. This allows for a positive match to occur if at least one of multiple patterns are found. One common use of OR in regular expressions is validating area code formats of ### _or_ (###):

<!-- prettier-ignore -->
```javascript
'555'.match(/\d{3}|\(\d{3}\)/)
// ["555", index: 0, input: "555", groups: undefined]
// 555 is matched by \d{3}
```

<!-- prettier-ignore -->
```javascript
'(555)'.match(/\d{3}|\(\d{3}\)/)
// ["(555)", index: 0, input: "(555)", groups: undefined]
// (555) is matched by \(\d{3}\)
// Note: parentheses in literal form need to be escaped by backslahes
```

### Character sets

Square brackets define sets of characters that match when _any_ character in that set is matched:

<!-- prettier-ignore -->
```javascript
/[A-Z]\d-[A-Z]\d/.test('R2-D2')
// true since the following is matched:
// any uppercase letter, digit, hypen, any uppercase letter, digit
```

<!-- prettier-ignore -->
```javascript
/[A-D]-[0-4][N-Q][N-Q]/.test('C-3PO')
// true since the following is matched:
// any uppercase letter between A and D, hypen, any digit between 0 and 4, 
// any uppercase letter between N and Q, any uppercase letter between N and Q
```

When used _inside_ of a character set, the caret `^` creates an invert set, aka match anything _but_ those characters.

<!-- prettier-ignore -->
```javascript
/[^A-Q]\d-[^A-C]\d/.test('R2-D2')
// true since the following is matched:
// any uppercase letter not between A and Q, digit, hypen,
// any uppercae letter not between A and C, digit
```

### Capturing groups

Patterns enclosed by parentheses are called capturing groups. This allows the pattern to be referenced later in the regular expression or be referenced in the array of matched details.

<!-- prettier-ignore -->
```javascript
/(\w+)\s\1\s\w+\s(\w+)\s\2/.test('same same but different different')
// true
// capture group 1 is "same"
// capture group 2 is "different"
// \1 and \2 reference "same" and "different", respectively
// true since the following is matched:
// one or more word characters (capture group 1), whitespace, 
// value of capture group 1, whitespace, one or more word characters, 
// one or more word characters (capture group 2), whitespace,  
// value of capture group 2 
```

Using the `exec` RegExp method, we can more clearly see the details of this regular expressions:

<!-- prettier-ignore -->
```javascript
/(\w+)\s\1\s\w+\s(\w+)\s\2/.exec('same same but different different')
// "same same but different different", "same", "different", index: 0, 
// input: "same same but different different", groups: undefined]
```

The returned result includes:

- substring that was matched
- capture groups (e.g. "same" and "different")
- starting index of the first match
- original text

Capture groups can also used to replace repeating words in a sentence.

<!-- prettier-ignore -->
```javascript
'My name is is Neil'.replace(/(\w+)\s\1/, '$1');
// "My name is Neil"
```

We first match a word (capture group 1), followed by a space, followed by the value of capture group 1. Then that entire matched text ("is is") is replaced with `$1`, which is the value of capture group 1 ("is").

### Lookaheads

Lookaheads allow for a match only when one pattern is followed (or not) by another pattern. There are two flavors of lookaheads:

1. "Positive lookaheads" using `pattern1(?=pattern2)`:

<!-- prettier-ignore -->
```javascript
/\w+\s(?=Berg)/.test('Neil Berg');
// True
// "Berg" follows one or more word characters (Neil) and a whitespace
```
