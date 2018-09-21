import DeviceEntity from '../entities/device';

export default class RoomService {
	constructor () {
		this._data = [
			{ mac: 'XX-XX-XX-XX-XX-XX', id: 0, title: 'Outer Space' },
			{ mac: '9C-0E-4A-17-4C-8C', id: 99, title: 'Saturn' }
		];
	}

	getDetails (mac) {
		return this._data.find((item) => {
			if (item.mac === mac) {
				return new DeviceEntity(item);
			}
		});
	}
}