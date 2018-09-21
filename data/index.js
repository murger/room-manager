import DeviceServiceMockup from './mock-device';
import ScheduleServiceMockup from './mock-schedule';

export default {
	device: new DeviceServiceMockup(),
	schedule: new ScheduleServiceMockup()
};