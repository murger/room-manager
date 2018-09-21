import RoomService from './room';
import ScheduleService from './schedule';

let api = 'https://meeting-room-api-emakinatr.herokuapp.com/api/v1';

export default {
	room: new RoomService(),
	schedule: new ScheduleService(api)
};