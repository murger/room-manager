import RoomEntity from '../entities/room';

export default class DeviceService {
	constructor (api) {
		this._api = api;
		this._promise = null;
	}

	getDetails (mac) {
		if (!this._promise) {
			this._promise = fetch([this._api, 'device', mac].join('/'), {
				mode: 'cors',
				cache: 'no-cache'
			})
			.then((res) => res.json())
			.then((data) => {
				this._promise = null;

				return new RoomEntity(data);
			})
			.catch(() => this._promise = null);
		}

		return this._promise;
	}
}