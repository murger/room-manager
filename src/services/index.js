import ScheduleService from './schedule';

let api = 'https://meeting-room-api-emakinatr.herokuapp.com/api/v1';

export default {
	schedule: new ScheduleService(api)
};