import DeviceService from './device';
import ScheduleService from './schedule';

let api = 'https://meeting-room-api-emakinatr.herokuapp.com/api/v1';

export default {
	device: new DeviceService(api),
	schedule: new ScheduleService(api)
};