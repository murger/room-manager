## Room Manager

This is a solution we've been working on, to be able to utilise our meeting
rooms more efficiently and without having to check on the calendar first. It
allows booking a room on the spot, as well as providing a quick glance into the
room's daily timeline and most importantly, we can now see even from a distance
whether the room is available or not.

## UI

We've opt'ed for a simple look in order to blend in, light mode (white
background) denotes the room is available, displaying the room's title in the
middle and how long till the next meeting. Dark mode signifies the room is
occupied, displaying the current event title and a remainder.

<img src="https://s19.postimg.cc/3lo3998b5/room-manager.png">

## Run it

We're using [Parcel](https://parceljs.org/) to bundle the project, have a `npm i`
to get the dependencies first, then in order to run it with the built-in mockup
data, use the command `npm run dev`. If you'd rather test it through the API,
use `npm run stage`.

You may find room details within `src/index.js` where `id` is the calendar ID of
the room and `title` is the display name. We've kept these hardcoded rather than
set as environment variables as we're wrapping this up as an Android app.

It's possible to change the API address within `src/services/schedule.js` or
play around with the mockup data in `src/services/mockup/schedule.js`.