import ScheduleService from '../src/services/schedule';
import EventEntity from '../src/entities/event';

export default class ScheduleServiceMockup extends ScheduleService {
	setupCache () {
		let events = [{
				id: this.generateID(),
				title: 'Weekly Catchup',
				contact: 'Alper Tunga Gülbahar',
				start: this.makeDate('09:00'),
				end: this.makeDate('10:30')
			}, {
				id: this.generateID(),
				title: 'Somewhat Boring Meeting in the Morning',
				contact: 'Jonquil Von Haggerston',
				start: this.makeDate('10:30'),
				end: this.makeDate('12:00')
			}, {
				id: this.generateID(),
				title: 'HR & Technical Interview',
				contact: 'Inverness McKenzie',
				start: this.makeDate('13:00'),
				end: this.makeDate('14:00')
			}, {
				id: this.generateID(),
				title: 'Happily Ever After in the Discotheque',
				contact: 'Bartholomew Shoe',
				start: this.makeDate('14:00'),
				end: this.makeDate('15:30')
			}, {
				id: this.generateID(),
				title: 'Once Upon a Time',
				contact: 'Girth Wiedenbauer',
				start: this.makeDate('17:30'),
				end: this.makeDate('18:30')
			}];

		this._cache = [];
		events.forEach((event) => this._cache.push(new EventEntity(event)));
	}

	getEvents (id) {
		if (!this._cache.length) {
			this.setupCache();
		}

		return Promise.resolve(this._cache);
	}

	sendBookingRequest (id, mins) {
		let start = new Date(),
			end = new Date(start.getTime() + (mins * (60 * 1000)));

		return new Promise((resolve) => {
			setTimeout(() => resolve({
				id: this.generateID(),
				title: 'Meeting',
				contact: null,
				start: start.toISOString(),
				end: end.toISOString()
			}), 3000);
		});
	}

	generateID () {
		return Math.random().toString(36).substr(2, 9);
	}

	makeDate (time) {
		let tz = '+03:00',
			now = new Date(),
			today = now.toISOString().split('T')[0];

		return [today, time + ':00' + tz].join('T');
	}
}