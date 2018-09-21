import DeviceEntity from '../entities/device';
import RoomDetails from '../rooms.json';

export default class RoomService {
	constructor () {
		this._data = RoomDetails;
	}

	getDetails (mac) {
		return this._data.find((item) => {
			if (item.mac === mac) {
				return new DeviceEntity(item);
			}
		});
	}
}