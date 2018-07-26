import EventEntity from '../entities/event';

export default class ScheduleService {
    constructor () {
        this._promise = null;
        this._cache = null;
        this._updated = null;
        this._expiry = 1000 * 5;
        this._api = 'https://meeting-room-api-emakinatr.herokuapp.com/api/v1';
    }

    hasValidCache () {
        return (this._cache && Date.now() < (this._updated + this._expiry));
    }

    getToday (id, bypass) {
        if (!bypass && this.hasValidCache()) {
            return Promise.resolve(this._cache);
        }

        if (!this._promise) {
            return fetch(this._api + '/schedule/' + id, {
                mode: 'cors',
                cache: 'no-cache'
            })
            .then(res => res.json())
            .then(data => {
                this._cache = [];

                for (let item of data) {
                    this._cache.push(new EventEntity(item));
                }

                this._updated = Date.now();
                console.log('ScheduleService', this._updated);

                return this._cache;
            });
        }

        return this._promise;
    }

    getCurrentEvent () {
        let now = Date.now();

        return this._cache.find((event) => {
            let start = event.start.getTime(),
                end = event.end.getTime();

            return (start < now && end > now);
        });
    }

    getNextEvent () {
        let now = Date.now();

        return this._cache.find((event) => {
            return (event.start.getTime() > now);
        });
    }

    sendBookingRequest (id, mins) {
        return fetch(this._api + '/schedule/' + id, {
            mode: 'cors',
            method: 'POST',
            cache: 'no-cache',
            body: JSON.stringify({ mins }),
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        })
        .then((response) => {
            if (response.ok) { return response.json(); }
            else { return false; }
        });
    }

    setCurrentEvent (data) {
        let event = new EventEntity(data);

        this._cache.push(event);

        return event;
    }
}