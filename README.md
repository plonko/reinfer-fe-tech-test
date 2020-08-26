# reinfer front-end developer test

## Whyyyy ლ(ಠ 益 ಠლ)

This repo was shared with me privately yet I am resharing it publicly, why? I'm not one to come on all high and mighty, but we all know tech tests suck. I produced a good chunk of the work here - for the 'add-tags' challenge I produced all of it - and it was a challenge! I believe in openness and freedom, plus this is something to be proud of.

It is kind of weird to do a test like this in isolation, under duress of time - even if no deadline or time limit is given. We all spend our professional lives waxing on about collaboration, team work, pair programming, agile process, estimating.. but when it comes to the crunch people are tested on how they work alone, without team creativity or imagination. Maybe it reflects the interviewer more than the interviewee.

Sharing the work here means it won't just languish on my laptop and one day be deleted, it might help someone else trim a few hours (or days) off a test that "should only take 10 minutes, or as long as it takes you to make toast", or it could just help someone get started.

Good luck!

hmu
sebastianjthomas@gmail.com

## My notes on my solutions

### Add Tags

- Notes are mostly in the code comments
- But I will say I'm impressed with the solution I came up with! Without anything to go on it was way harder than it initially looked, with lots of cases to consider. I guess knowing the solution, it's not that hard to see how to get there, but working on it while doing a day job and job hunting - doesn't aid focus.
- h/t to @NinaScholz for her/his amazing niche JS skills, specifically this fortuitous SO answer which pushed me in the right direction:
  https://stackoverflow.com/a/39230416/662826
- The feedback states one of the tag order cases is wrong, but I covered that in my comments - you just need to invert the operation. It was working fine in console but for some reason it was inverted in testing, I was tired and just wanted the tests to pass so I inverted the operation. Clearly when the interviewer ran their tests it reverted, so I'm not sure what's happening there. But it _does_ work, I made sure it does :)

### JS Star Wars

- This was fairly straightforward. I had to stop myself from redoing the whole thing - first step, read the brief: The changes should be small.

## Feedback from interviewer

### Add Tags

- The solution wasn't very inefficient. It isn't necessary to check all the tags against all the other tags to avoid interleaving (this is very expensive) - you can just sort them by starting index and then ending index (in reverse) and keep a stack of open tags. That way, any new tag you encounter only has to close before the top tag on the stack - it's guaranteed to close before the others if you haven't already run into an error.

- The solution also failed to add concurrent tags in the same order they appear in the input array.

### JS Star Wars

- There were some nice improvements made, but I think the single most important things were to show some sort of feedback whilst requests were in flight, and to sanitize requests before sending them to the API rather than just adding them to the querystring, and neither of these was done.
