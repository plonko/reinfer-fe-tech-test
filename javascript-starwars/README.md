# reinfer front-end developer test

## Instructions

This directory contains two other files, `index.html` and `index.js`, which together make up a simple web app. You should be able to run them locally by simply running the following in a terminal in the project root:

```sh
google-chrome index.html # or another evergreen browser
```

Alternatively, you could use a local static server like Python 3's:

```sh
python3 -m http.server
```

The webapp uses some modern JS features (like async/await), so it will only work in an up-to-date browser.

The app in question is very simple: it allows the user to input a search string, which it then uses to query the [Star Wars API](https://swapi.dev/documentation), collecting the first matching Star Wars character and gathering the names of all the films they were in. These are then presented back to the user in the UI.

As it stands, the app pretty much works; typing `Luke` into the input box and pressing the button should give you the details for Luke Skywalker. But there are many ways in which it's deficient and wouldn't be considered a production-ready app.

## Aims

Your job is to identify all the ways the app could be improved to make it production-grade, and to implement them in the JS code. Some of them can be done very simply, others need a bit more thought and code, but the whole exercise should be completed in 60-90 minutes.

There are a handful of key deficiencies that we're looking for you to identify and hopefully fix, but if you have any other ideas for improvements, we're also keen to hear about them.

Some notes:

- This is _purely a javascript test_ - please don't change `index.html` or add CSS as that's not what we're trying to test here. You can, however, use Javascript to mutate the DOM in any way you want, as per the existing code.
- The solution should still be vanilla JS which runs in an evergreen browser without needing transpilation, so no JS frameworks should be introduced.
- There's also no need to add external libraries unless you have a very good reason for doing so - you can, but you'll need to explain why.
