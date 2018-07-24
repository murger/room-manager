import EventEntity from '../entities/event';

export default class ScheduleService {
    constructor () {
        this._promise = null;
        this.cache = null;
        this.updated = null;
        this.expiry = 1000 * 5;
        this.api = 'https://meeting-room-api-emakinatr.herokuapp.com/api/v1';
    }

    getToday (id, force) {
        if (this.cache && !force && Date.now() < (this.updated + this.expiry)) {
            return Promise.resolve(this.cache);
        }

        if (!this._promise) {
            return fetch(this.api + '/schedule/' + id, {
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
                console.log('ScheduleService', this.updated);

                return this.cache;
            });
        }

        return this._promise;
    }

    getCurrentEvent () {
        let now = Date.now();

        return this.cache.find((event) => {
            let start = event.start.getTime(),
                end = event.end.getTime();

            return (start < now && end > now);
        });
    }

    getNextEvent () {
        let now = Date.now();

        return this.cache.find((event) => {
            return (event.start.getTime() > now);
        });
    }

    sendBookingRequest (id, mins) {
        return fetch(this.api + '/schedule/' + id, {
            mode: 'cors',
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify({ mins }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        })
        .catch(err => console.error(err))
        .then(response => {
            return (response.status > 200 && response.status < 300)
        });
    }
}