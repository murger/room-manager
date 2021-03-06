import EventEntity from '../entities/event';

export default class ScheduleService {
	constructor (api) {
		this._cache = [];
		this._update = 0;
		this._expiry = 1000 * 5;
		this._promise = null;
		this._api = api;
	}

	hasValidCache () {
		return (this._cache && Date.now() < (this._update + this._expiry));
	}

	getEvents (id) {
		if (this.hasValidCache()) {
			return Promise.resolve(this._cache);
		}

		if (!this._promise) {
			this._promise = fetch([this._api, 'schedule', id].join('/'), {
				mode: 'cors',
				cache: 'no-cache'
			})
			.then(res => res.json())
			.then(data => {
				this._promise = null;

				if (!data) {
					return null;
				} else if (data.error) {
					return data;
				}

				this._cache = [];
				this._update = Date.now();

				for (let item of data) {
					this.addNewEvent(item);
				}

				return this._cache;
			})
			.catch(() => this._promise = null);
		}

		return this._promise;
	}

	addNewEvent (data) {
		let event = new EventEntity(data);

		this._cache.push(event);

		return event;
	}

	getCurrentEvent () {
		let now = Date.now();

		return this._cache.find(event => {
			let start = event.start.getTime(),
				end = event.end.getTime();

			return (start < now && end > now);
		});
	}

	getNextEvent () {
		let now = Date.now();

		return this._cache.find(event => {
			return (event.start.getTime() > now);
		});
	}

	sendBookingRequest (id, mins) {
		return fetch([this._api, 'schedule', id].join('/'), {
			mode: 'cors',
			method: 'POST',
			cache: 'no-cache',
			body: JSON.stringify({ mins }),
			headers: { 'Content-Type': 'application/json; charset=UTF-8' }
		}).then(response => response.json());
	}
}