import RoomService from '../src/services/room';
import ScheduleServiceMockup from './mock-schedule';

export default {
	room: new RoomService(),
	schedule: new ScheduleServiceMockup()
};