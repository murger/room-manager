import { observable, action, computed } from 'mobx';
import services from '../services';

class StateStore {
	timer = null;
	delay = 1000;
	timeout = 1000 * 10;

	@observable room = null;
	@observable events = [];
	@observable current = null;
	@observable next = null;
	@observable remainder = Infinity;
	@observable isBooking = false;
	@observable isLoading = true;
	@observable isConnected = true;
	@observable hasError = false;

	err = {
		api: 'API error',
		mac: 'Device unknown',
		network: 'Network error',
	};

	setError (val) {
		this.hasError = val;
	}

	getMACAddress () {
		let params = new URLSearchParams(window.location.search),
			mac = params.get('mac');

		if (!mac) {
			this.setError(this.err.mac);
		}

		return mac;
	}

	@action setupDevice () {
		let mac = this.getMACAddress();

		(mac) && services.device.getRoomDetails(mac).then(data => {
			this.isLoading = false;

			if (!data) {
				return this.setError(this.err.api);
			} else if (data.error) {
				return this.setError(data.error);
			}

			this.room = data;
			this.pollSchedule();
			this.timer = setInterval(() => this.pollSchedule(), this.delay);
		}).catch(err => {
			this.isLoading = false;
			this.setError(this.err.network);
		});
	}

	updateRemainder () {
		let current = this.current,
			next = this.next;

		this.remainder = (current)
			? -current.remainder
			: (next) ? next.until : Infinity;
	}

	@action pollSchedule () {
		let id = this.room.id,
			schedule = services.schedule;

		this.updateRemainder();

		schedule.getEvents(id).then(data => {
			if (!data || data.error) {
				this.isConnected = false;
			}

			this.events = (data) ? data : this.events;
			this.next = schedule.getNextEvent();
			this.current = schedule.getCurrentEvent();
			this.isConnected = true;

			// Hide options on current
			if (this.current && (this.isBooking || this.isLoading)) {
				this.isLoading = false;
				this.toggleOptions(false);
			}
		}).catch(err => {
			this.isConnected = false;
		});
	}

	@action sendBookingRequest (mins) {
		let id = this.room.id,
			schedule = services.schedule;

		this.isLoading = true;

		schedule.sendBookingRequest(id, mins).then(data => {
			this.isLoading = false;

			if (!data) {
				this.setError(this.err.api);
			} else if (data.error) {
				this.setError(data.error);
			} else if (!this.current) {
				this.current = schedule.addNewEvent(data);
				this.toggleOptions(false);
			}
		}).catch(err => {
			this.isLoading = false;

			if (!this.current) {
				this.setError(this.err.network);
			}
		});
	}

	@action toggleOptions (toggle) {
		this.isBooking = toggle;

		// Hide options on a timeout
		if (toggle === true) {
			this.idleTimeout = setTimeout(() => {
				this.isBooking = false;
				this.setError(false);
			}, this.timeout);
		} else if (this.idleTimeout) {
			this.setError(false);
			clearTimeout(this.idleTimeout);
		}
	}
}

const Store = new StateStore();
export default Store;
export { StateStore };