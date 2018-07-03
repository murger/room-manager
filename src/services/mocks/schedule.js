import ScheduleService from '../schedule';
import EventEntity from '../../entities/event';

export default class ScheduleServiceMockup extends ScheduleService {
    getEvents (room) {
        let schedule = [],
            now = Date.now(),
            events = [{
                id: 97328,
                title: 'Boring Meeting',
                contact: 'The Incredible Hulk',
                start: '2018-07-03T06:00:00.000Z',
                end: '2018-07-03T07:30:00.000Z'
            }, {
                id: 34478,
                title: 'HR & Technical Interview',
                contact: 'John Doe',
                start: '2018-07-03T07:30:00.000Z',
                end: '2018-07-03T09:15:00.000Z'
            }, {
                id: 37493,
                title: 'Weekly Catchup',
                contact: 'Samantha Jones',
                start: '2018-07-03T10:00:00.000Z',
                end: '2018-07-03T11:45:00.000Z'
            }, {
                id: 43536,
                title: 'Some Meeting',
                contact: 'Ant-Man',
                start: '2018-07-03T12:15:00.000Z',
                end: '2018-07-03T14:00:00.000Z'
            }, {
                id: 43536,
                title: 'Some Meeting',
                contact: 'Ant-Man',
                start: '2018-07-03T15:00:00.000Z',
                end: '2018-07-03T16:00:00.000Z'
            }];

        events.forEach((event) => schedule.push(new EventEntity(event)));

        return Promise.resolve(schedule);
    }
}