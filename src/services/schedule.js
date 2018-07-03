import EventEntity from '../entities/event';

export default class ScheduleService {
    constructor () {
        // TODO: keep an internal cache
        this._data = null;
    }

    getEvents (room) {
        return fetch('https://127.0.0.1/api/v1/schedule/' + room, {
            mode: 'cors'
        }).then(response => {
            return response.json();
        }).then(data => {
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
}