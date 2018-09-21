export default class RoomEntity {
	constructor (item) {
		this._id = item.id;
		this._title = item.title;
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
}