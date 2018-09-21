export default class EventEntity {
	constructor (item) {
		this._id = item.id;
		this._title = item.title;
		this._contact = item.contact;
		this._start = item.start;
		this._end = item.end;
	}

	get id () {
		return this._id;
	}

	set title (data) {
		this._title = data;
	}

	get title () {
		return this._title;
	}

	set contact (data) {
		this._contact = data;
	}

	get contact () {
		return this._contact;
	}

	set start (data) {
		this._start = data;
	}

	get start () {
		return new Date(this._start);
	}

	set end (data) {
		this._end = data;
	}

	get end () {
		return new Date(this._end);
	}

	get remainder () {
		let now = Date.now(),
			end = this.end.getTime();

		return Math.ceil((end - now) / (1000 * 60));
	}

	get until () {
		let now = Date.now(),
			start = this.start.getTime();

		return Math.ceil((start - now) / (1000 * 60));
	}
}