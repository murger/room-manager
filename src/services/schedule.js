import EventEntity from '../entities/event';

export default class ScheduleService {
    constructor () {
        // TODO: keep an internal cache
        this.data = null;
        this.api = 'https://meeting-room-api-emakinatr.herokuapp.com/api/v1';
    }

    getEvents (room) {
        return fetch(this.api + '/schedule/' + room, {
            mode: 'cors',
            cache: 'no-cache'
        }).then(res => res.json())
        .catch(err => console.error(err))
        .then(data => {
            let schedule = [];

            for (let item of data) {
                schedule.push(new EventEntity(item));
            }

            return schedule;
        });
    }

    getNextEvent (room) {
        let now = Date.now();

        return this.getEvents(room).then((schedule) => {
            return schedule.find((event) => {
                return (event.start.getTime() > now);
            });
        });
    }

    getCurrentEvent (room) {
        let now = Date.now();

        return this.getEvents(room).then((schedule) => {
            return schedule.find((event) => {
                let start = event.start.getTime(),
                    end = event.end.getTime();

                return (start < now && end > now);
            });
        });
    }

    sendBookingRequest (room, mins) {
        return fetch(this.api + '/schedule/' + room, {
            mode: 'cors',
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify({ mins }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        })
        .catch(err => console.error(err))
        .then(response => (response.status === 200));
    }
}