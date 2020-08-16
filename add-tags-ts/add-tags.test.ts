import assert from "assert";
import addTags from "./add-tags";

type tags = [number, number, string][];

// I stole this test runner from the internet https://www.sohamkamani.com/blog/javascript/making-a-node-js-test-runner/
// because I wanted a quick way of getting some feedback on whether the tests has completed, and make them
// easier to debug and encapsulate. This is exactly what I was thinking of and pretty neato.
const tests: { name: string; fn: Function }[] = [];

function test(name: string, fn: Function) {
  tests.push({ name, fn });
}

function run() {
  tests.forEach((t) => {
    try {
      t.fn();
      console.log("✅", t.name);
    } catch (e) {
      if (e.message.includes("_thrownError")) {
        console.log("✅", t.name);
        console.log(e.message);
      } else {
        console.log("❌", t.name);
        console.log(e.stack);
      }
    }
  });
}

test("Test the test - true is true", () => {
  assert.equal(true, true);
});

test("The standard example should be ordered correctly <i>this</i> <em><b>is</b> a strin</em><b>g</b>", () => {
  const text = "this is a string";
  const tags = [
    [5, 7, "b"],
    [0, 4, "i"],
    [5, 15, "em"],
    [15, 16, "b"],
  ] as tags;

  const expected = "<i>this</i> <em><b>is</b> a strin</em><b>g</b>";

  assert.equal(addTags(text, tags), expected);
});

test("If two tags have the same indices, they should be opened in the order they appear in the original list <a><b>xy</b></a>", () => {
  const text = "xy";
  const expected = "<a><b>xy</b></a>";

  assert.equal(
    addTags(text, [
      [0, 2, "a"],
      [0, 2, "b"],
    ]),
    expected
  );
});

test("If two tags share only one index, they should be opened and closed in whatever order necessary to ensure they are not interleaved <b><a>x</a>y</b>", () => {
  const text = "xy";
  const expected = "<b><a>x</a>y</b>";

  assert.equal(
    addTags(text, [
      [0, 1, "a"],
      [0, 2, "b"],
    ]),
    expected
  );
});

test("Interleaving should be handled correctly <x><y>text</y> some text after</x>", () => {
  const text = "text some text after";
  const expected = "<x><y>text</y> some text after</x>";

  assert.equal(
    addTags(text, [
      [0, 4, "y"],
      [0, 20, "x"],
    ]),
    expected
  );
});

test("Interleaving at the opening position works <y>t<x>ext</x> some text after</y>", () => {
  const text = "text some text after";
  const expected = "<y>t<x>ext</x> some text after</y>";

  assert.equal(
    addTags(text, [
      [1, 4, "x"],
      [0, 20, "y"],
    ]),
    expected
  );
});

test("Interleaving incorrectly (end position) throws an error <x>t<y>ext</x> some text after</y>", () => {
  const text = "text some text after";
  const expected = "<x>t<y>ext</x> some text after</y>";

  assert.equal(
    addTags(text, [
      [0, 4, "x"],
      [1, 20, "y"],
    ]),
    expected
  );
});

test("Start index is greater than the end index throws an error", () => {
  const text = "some text";
  const expected = "some text";

  assert.equal(addTags(text, [[2, 0, "em"]]), expected);
});

test("Start index is out of bounds index throws an error", () => {
  const text = "some text";
  const expected = "some text";

  assert.equal(addTags(text, [[-1, 10, "b"]]), expected);
});

test("End index is out of bounds index throws an error", () => {
  const text = "some text";
  const expected = "some text";

  assert.equal(addTags(text, [[0, 20, "b"]]), expected);
});

run();
