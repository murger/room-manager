import DeviceService from './device';
import ScheduleService from './schedule';
import MockupServices from '../../data'

let api = 'https://meeting-room-api-emakinatr.herokuapp.com/api/v1';

export default (process.env.mockup) ? MockupServices : {
		device: new DeviceService(api),
		schedule: new ScheduleService(api)
	};