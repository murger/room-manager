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
	@observable remainder = Infinity;
	@observable isServing = false;
	@observable isLoading = true;
	@observable isConnected = true;
	@observable hasError = false;

	err = {
		device: 'Device unknown',
		room: 'Room unavailable',
		network: 'Network unreachable',
	};

	@action setupDevice () {
		let mac = this.getMACAddress();

		(mac) && services.device.getDetails(mac).then(room => {
			if (!room) {
				return this.setError(this.err.device);
			}

			this.room = room;
			this.isLoading = false;
			this.timer = setInterval(() => this.pollSchedule(), this.delay);
		}).catch(() => {
			this.setError(this.err.device);
		});
	}

	getMACAddress () {
		let params = new URLSearchParams(window.location.search),
			mac = params.get('mac');

		if (!mac) {
			this.setError(this.err.device);
		}

		return mac;
	}

	setError (val) {
		this.hasError = val;
	}

	@action pollSchedule (callback) {
		let id = this.room.id,
			schedule = services.schedule;

		this.updateRemainder();
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
		}).catch(() => {
			this.isConnected = false;
		});
	}

	updateRemainder () {
		let current = this.current,
			next = this.next;

		this.remainder = (current)
			? -current.remainder
			: (next) ? next.until : Infinity;
	}

	@action toggleOptions (toggle) {
		this.isServing = toggle;

		// Hide options on a timeout
		if (toggle === true) {
			this.idler = setTimeout(() => {
				this.isServing = false;
				this.setError(false);
			}, this.timeout);
		} else if (this.idler) {
			this.setError(false);
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
				this.toggleOptions(false);
			} else {
				this.isLoading = false;
				this.setError(this.err.room);
			}
		}).catch(() => {
			this.isServing = true;
			this.isLoading = false;
			this.setError(this.err.network);
		});
	}
}

const Store = new StateStore();
export default Store;
export { StateStore };