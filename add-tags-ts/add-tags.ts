/**
 * Adds HTML tags to a piece of text.
 * @param {string} text - The text to add tags to.
 * @typedef {[number, number, string]} TagItem
 * @param {TagItem[]} tags - A tag list, expressed as (start_index, end_index, tag_name)
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
type TagItem = [number, number, string];

/*
This was my first draft I built up in the console just to try out some ideas.
I knew I had to reduce to a single value, and although I knew I wanted to
change the value of each letter in place, I didn't know how to do that without
changing the length, or index of each letter.
It works to a degree but is limited as you have to track the offset created by
adding each tag, and that gets complicated. It helped me think about the problem
and led me to a better solution

function insertAt(text, position, insert) {
  return [text.slice(0, position), insert, text.slice(position)].join("");
}

function addTags(str, tagList) {
  let offset = 0;
  function addToOffset(num) {
    offset += num;
  }
  return tagList
    .sort((a, b) => {
      if (a[0] === b[0]) {
        return b[1] - a[1];
      }
      return a[0] - b[0];
    })
    .reduce((acc, cur, idx, src) => {
      const [start, end, tag] = cur;
      const startTag = `<${tag}>`;
      const endTag = `</${tag}>`;

      const startOffset = startTag.length;
      const endOffset = endTag.length;
      const startPosition = start + offset;
      const endPosition = end + offset + startOffset;

      const openingTagText = insertAt(acc, startPosition, startTag);
      const closingTagText = insertAt(openingTagText, endPosition, endTag);

      addToOffset(startOffset);
      addToOffset(endOffset);

      return closingTagText;
    }, str);
}
*/

// Note: This solution is perhaps a bit inefficient because it splits the text into
// and array, and if the text were very long that might be a problem.
// But it makes it much more simple to edit the string without tracking offsets

// Note: I would normally have each of these functions in a separate file
// and in this case I could have used a better module pattern.
// I just wanted to share the text and tags over a couple of different functions
// without too much fuss.

// Note: I found one of the criteria a bit confusing, it says:
// "Throw an error if two tags are interleaved."
// "The following is wrong: <x><y>text</x>some text after</y>."
// To get that you'd have to have the tags [0, 4, "x"], [0, 20, "y"]
// But my program wouldn't error it would just sort them to make it work:
// <y><x>text</x>some text after</y>
// I have addressed this in the tests an added an additional test which does error:
// [0, 4, "x"], [1, 20, "y"] = <x>t<y>ext</x> some text after</y>

// The complexity in this program is probably in the sorting, it's quite tricky
// to get your head around (for me at least).

function addTags(text: string, tags: Array<TagItem>) {
  // These sort returns could be done more concisely but it was tricky to
  // figure out and I thought verbosity is perferred here so everyone can
  // quickly see what's going on.
  function sortTags(a: TagItem, b: TagItem) {
    // These just sort in ascending order by the end position
    if (a[1] > b[1]) {
      return 1;
    }

    if (b[1] > a[1]) {
      return -1;
    }

    // If end is the same, 'a' needs to be opened before 'b'
    if (a[1] === b[1] && a[0] > b[0]) {
      return -1;
    }

    // If start and end are the same, invert the order
    if (a[0] === b[0] && a[1] === b[1]) {
      // I don't quite understand this.. in the console to invert the order I had to
      // return -1 (a comes first), but using assert I have to return 1 (b comes first).
      // It's very confusing! I would like to understand this more, but need to send it!
      return 1;
    }

    return 0;
  }

  // To avoid interleaving we need to check if any end positions are in
  // the range of any other tag items
  function isInRange(start: number, end: number, number: number) {
    return number > start && number < end;
  }

  function checkForInterleave(elem: TagItem, array: Array<TagItem>) {
    const [startY, endY] = elem;
    // Would prefer .some() here but also wanted to return the array
    // item which was part-responsible for interleaving

    // I would also prefer not to iterate over the tags array again,
    // but this seemed preferable to another solution involving stringifying the array

    // If the start is in the range of another tag item, and it doesn't close before the
    // end of the other item, it must error because there's no way to make it work
    const interleavedFind = array.find(
      ([startX, endX]) => isInRange(startX, endX, startY) && endY > endX
    );

    return {
      isInterleaved: interleavedFind !== undefined,
      offendingElem: interleavedFind,
    };
  }

  function checkForErrors(elem: TagItem) {
    const [start, end] = elem;
    // For brevity I'm relying on the original array passed in as
    // parameter 'tags' to be in scope. This wouldn't be necessary if the error checking
    // was done within the reducer, and I would prefer to have used a better pattern to
    // share the tags across the two function.
    const { isInterleaved, offendingElem } = checkForInterleave(elem, tags);

    if (start > end) {
      throw new Error(
        `_thrownError: Start position is greater than end position in: ${JSON.stringify(
          elem
        )}`
      );
    }

    if (start < 0) {
      throw new Error(
        `_thrownError: Start position is out of bounds: ${JSON.stringify(elem)}`
      );
    }

    // Same as above - relying on 'text' param being in scope - would be better to pass it in somehow
    if (end > text.length) {
      throw new Error(
        `_thrownError: End position is out of bounds: ${JSON.stringify(elem)}`
      );
    }

    // if start postion of x is in range of elem y, end position of x must be < end positon of y;
    if (isInterleaved) {
      throw new Error(
        `_thrownError: Element ${JSON.stringify(
          offendingElem
        )} is interleaved with ${JSON.stringify(elem)}`
      );
    }

    return elem;
  }

  function tagReducer(acc: Array<string>, cur: TagItem) {
    const [start, end, tagName] = cur;

    acc[start] = `<${tagName}>${acc[start]}`;
    acc[end - 1] += `</${tagName}>`;

    return acc;
  }

  // It would be more efficient not to iterate over the array once for errors
  // and once for the reduce, but I like the idea of keeping the error checking
  // function out of the reducer, and having it separately "clean" the data
  // before it gets to the reducer.
  const stringWithTags = tags
    .map(checkForErrors)
    .sort(sortTags)
    .reduce(tagReducer, text.split(""))
    .join("");

  return stringWithTags;
}

export default addTags;
