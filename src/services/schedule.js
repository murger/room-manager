import EventEntity from '../entities/event';

export default class ScheduleService {
    constructor () {
        this._promise = null;
        this.cache = null;
        this.updated = null;
        this.expiry = 1000 * 5;
        this.api = 'https://meeting-room-api-emakinatr.herokuapp.com/api/v1';
    }

    getEvents (room) {
        if (this.cache && Date.now() < (this.updated + this.expiry)) {
            return Promise.resolve(this.cache);
        }

        if (!this._promise) {
            return fetch(this.api + '/schedule/' + room, {
                mode: 'cors',
                cache: 'no-cache'
            })
            .then(res => res.json())
            .catch(err => console.error(err))
            .then(data => {
                this.cache = [];

                for (let item of data) {
                    this.cache.push(new EventEntity(item));
                }

                this.updated = Date.now();
                // console.log('ScheduleService', this.updated);

                return this.cache;
            });
        }

        return this._promise;
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