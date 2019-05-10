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

   - `test` - returns true if matched or false if no match
   - `exec` - returns array of matched details or null if no match

2. Using methods of the String object:
   - `match` - returns array of matched details or null if no match
   - `replace` - returns new string with replaced matched text
   - (less common): `search` and `split`

### Flags

In addition to the RegEx pattern, flags can be attached that modify parameters of the search. Common flags include:

- `g` - global matching, aka find all matches
- `i` - case insensitive, aka ignore casing
- `m` - multi-line searching for matches

### Letters, digits, quantifiers, and metacharacters

#### Letters

Letters in a regular expression can be lowercase a-z or uppercase A-Z. When used in a character set (more on that below), the hypen represents a range of letters, e.g. A-Za-z includes all upper and lowercase letters.

#### Digits

Digits or numbers are represented by 0-9 and like letters, when used in a character set, the hypen represents a range of digits.

#### Quantifiers

Certain quantifiers can be included after patterns to refine their specificity.

- `pattern?` - optional matching of preceding pattern
- `pattern+` - matches one or more of the preceding pattern
- `pattern*` - matches one or more _or none_ of the preceding pattern
- `^pattern` - matches text starting with the pattern
- `pattern$` - matches text ending with the pattern
- `pattern{number}` - match preceding pattern an exact number of times
- `pattern{number,}` - match preceding pattern at least a certain number of times
- `pattern{number1, number2}` - match preceding pattern between number1 and number2 times.

#### Metacharacters

In addition to letters and digits, regular expressions can also be composed with metacharacters, which are always prefaced by a backslash. A few common metacharacters include:

- `\w` - any alphanumeric or word character
- `\W` - any non-alphanumeric or word character
- `\d` - any digit
- `\D` - any non-digit
- `\s` - any whitespace character (space, tab, newline)
- `\S` - any non-whitespace character

### Direct matches

The simplest regular expression is directly (exactly) matching the pattern in between slashes:

<!-- prettier-ignore -->
```javascript
/flower/i.test("Flowerpot")
// true since 'flower' is matched in 'Flowerpot' 
// and the 'i' flag ignores case differences
```

<!-- prettier-ignore -->
```javascript
/\d\d\s\w{8}/.test('99 problems')
// true since the following is matched:
// digit, digit, whitespace, 8 alphanumeric characters
```

<!-- prettier-ignore -->
```javascript
/\w\.?\s\w/.test('Mr Rogers')
// true since the following is matched:
// word character, optional period, space, word character
// 'Mr. Rogers' also tests true
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

When used _inside_ of a character set, the special caret `^` creates a invert set, aka match anything _but_ those characters.

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
// capture group 1 is "same"
// capture group 2 is "different"
// \1 and \2 reference "same" and "different", respectively
// true since the following is matched:
// one or more word characters (capture group 1), whitespace, 
// value of capture group 1, whitespace, one or more word characters
// (capture group 2), whitespace, value of capture group 2 
```

Using the `exec` RegExp method, we can more clearly see the details of this regular expressions:

<!-- prettier-ignore -->
```javascript
/(\w+)\s\1\s\w+\s(\w+)\s\2/.exec('same same but different different')
// "same same but different different", "same", "different", index: 0, 
// input: "same same but different different", groups: undefined]
```

The returned result includes:

- the full string of characters matched
- capture groups
- starting index of the match
- original string (entirely matched here)

This logic can be used to replace duplicate words in a sentence.

<!-- prettier-ignore -->
```javascript
'My name is is Neil'.replace(/(\w+)\s\1/, '$1');
// "My name is Neil"
```

Using the replace Sring method, we first match a word (capture group 1), followed by a space, followed by the value of capture group 1. Then that entire matched text ("is is") is replaced with `$1`, which is the value of capture group 1 ("is").
