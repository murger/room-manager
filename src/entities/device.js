export default class EventEntity {
	constructor (item) {
		this._id = item.id;
		this._mac = item.mac;
		this._title = item.title;
	}

	get id () {
		return this._id;
	}

	set mac (data) {
		this._contact = data;
	}

	get mac () {
		return this._mac;
	}

	set title (data) {
		this._title = data;
	}

	get title () {
		return this._title;
	}
}