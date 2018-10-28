## Room Manager

This is a solution we really needed, to be able to utilise our meeting rooms more efficiently and without having to check on the calendar first. It allows booking a room on the spot while providing a quick glance into the room's daily timeline.

### Interface

We targeted an unobtrusive, simple look in order to blend in with the office environment. There two main modes, expressed via background color. This allows us to see, even from a distance, whether the space is available or not. White background means the room is available, while black background signifies the room is occupied. A title of the current event (or the room name) displayed in the center along a remainder for the current event, or until the next one.

<img src="https://s19.postimg.cc/3lo3998b5/room-manager.png">

### Build

Do an `npm i` to install the dependencies, in order to run the solution on mockups, use the command `npm run mockup`. To run it normally through the API, use `npm start` and `npm run build` for deployments.

Change the API address within `src/services/index.js` or fiddle with the mockup data in `data/mock-schedule.js`.