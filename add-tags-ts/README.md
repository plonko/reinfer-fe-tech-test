# Adding HTML Tags to a String

Implement and test (using [Node assert](https://nodejs.org/api/assert.html)) a
function which adds a list of HTML tags to a string.

Given a piece of text:

```ts
const text = "this is a string";
```

And a list of HTML tags and their start and end positions:

```ts
const tags = [
  [5, 7, "b"],
  [0, 4, "i"],
  [5, 15, "em"],
  [15, 16, "b"],
];
```

The output of the function should be

```ts
assert.equal(
  addTags(text, tags),
  "<i>this</i> <em><b>is</b> a strin</em><b>g</b>"
);
```

The tags must be open and closed at given character positions in the text. The
signature of your function should be something like this:

```ts
/**
 * Adds HTML tags to a piece of text.
 * @param {string} text - The text to add tags to.
 * @param {[number, number, string][]} tags - A tag list, expressed as (start_index, end_index, tag_name)
 *
 * e.g. `(1, 5, "a")`.
 *
 * `start_index` is inclusive and `end_index` is exclusive.
 *
 * The `tag_name` can be any string as long as it doesn't contain
 * angle brackets `<>`.
 * @return {string} The string with the tags inserted.
 * @throws {TypeError} if the tag list is invalid.
 */
function addTags(text: string, tags: Array<[number, number, string]>) {}
```

Your implementation should satisify the following requirements

1. Throw an error if a tag's indices are wrong:
   - If its start index is greater than the end index: `[2, 0, "em"]` should
     be rejected.
   - If either index is out of bounds in the string (negative or greater than
     the length of the string).
2. Throw an error if two tags are interleaved. A tag that starts after
   another must close before it. So, the following is correct:
   ```html
   <x><y>text</y>some text after</x>
   ```
   but, the following is wrong:
   ```html
     <x><y>text</x>some text after</y>
   ```
   because `inner` is closed after `outer`, even though `outer` was opened
   first.
3. If two tags have the same indices, they should be opened in the order they
   appear in the original list.
   So:
   ```ts
   assert.equal(
     addTags("xy", [
       [0, 2, "a"],
       [0, 2, "b"],
     ]),
     "<a><b>xy</b></a>"
   );
   ```
4. If two tags share only one index, they should be opened and closed in
   whatever order necessary to ensure they are not interleaved.
   So:
   ```ts
   assert.equal(addTags("xy", [[0, 1, 'a'], [0, 2, 'b']]) == "<b><a>x</a>y</b>"
   ```
   even though `"a"` appears before `"b"` in the list.
5. Is your solution computationally efficient? Explain why or why not and
   mention how it could be improved. What is its complexity? Use comments in
   the javascript code.

Submit your implementaion [as a pull request](https://help.github.com/articles/creating-a-pull-request/)
against this repo. The pull request should add two files:

1. `add-tags.ts` containing the `addTags` function and any supporting code.
1. `add-tags.test.ts` containing the `assert` tests for the function.

Feel free to add any relevant explanations or notes as code comments in the
files.
