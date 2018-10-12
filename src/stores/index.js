import { observable, action, computed } from 'mobx';
import services from '../services';

class StateStore {
	timer = null;
	delay = 1000;
	timeout = 1000 * 15;

	@observable room = null;
	@observable events = [];
	@observable current = null;
	@observable next = null;
	@observable isActive = false;
	@observable isUnknown = false;
	@observable isServing = false;
	@observable isLoading = true;
	@observable isConnected = true;
	@observable hasError = false;

	@action setupDevice (mac) {
		services.device.getDetails(mac).then(room => {
			this.room = room;
			this.isActive = true;
			this.pollSchedule(() => this.isLoading = false);
			this.timer = setInterval(() => this.pollSchedule(), this.delay);
		}).catch(err => {
			this.isUnknown = true;
			this.isLoading = false;
			this.hasError = 'Device unknown';
			console.log(err);
		});
	}

	@action pollSchedule (callback) {
		let id = this.room.id,
			schedule = services.schedule;

		schedule.getToday(id).then((events) => {
			let current = schedule.getCurrentEvent(),
				next = schedule.getNextEvent();

			// Hide options
			if (current && this.isServing) {
				this.toggleOptions(false);
			}

			// Update stuff
			this.next = next;
			this.current = current;
			this.events = (events) ? events : this.events;
			this.isConnected = Boolean(events);

			// We will call you
			if (callback instanceof Function) { callback(); }
		}).catch(err => {
			this.isConnected = false;
			console.log(err);
		});
	}

	@action toggleOptions (toggle) {
		this.isServing = toggle;

		// Hide options on a timeout
		if (toggle === true) {
			this.idler = setTimeout(() => {
				this.isServing = false;
				this.hasError = false;
			}, this.timeout);
		} else if (this.idler) {
			this.hasError = false;
			clearTimeout(this.idler);
		}
	}

	@action sendBookingRequest (mins) {
		let id = this.room.id,
			schedule = services.schedule;

		this.isLoading = true;

		schedule.sendBookingRequest(id, mins).then(data => {
			if (data) {
				this.isLoading = false;
				this.current = schedule.addNewEvent(data);
				this.toggleOptions(false);
			} else {
				this.isLoading = false;
				this.hasError = 'Room unavailable';
			}
		}).catch(err => {
			this.isServing = true;
			this.isLoading = false;
			this.hasError = 'Network unreachable';
			console.log(err);
		});
	}
}

const Store = new StateStore();
export default Store;
export { StateStore };