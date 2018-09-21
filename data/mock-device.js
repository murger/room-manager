import DeviceService from '../src/services/device';
import RoomEntity from '../src/entities/room';

export default class DeviceServiceMockup extends DeviceService {
	getDetails (mac) {
		return Promise.resolve({
			id: null,
			title: 'Jupiter'
		});
	}
}