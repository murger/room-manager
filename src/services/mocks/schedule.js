import ScheduleService from '../schedule';
import EventEntity from '../../entities/event';

export default class ScheduleServiceMockup extends ScheduleService {
    getEvents (room) {
        let schedule = [],
            now = new Date(),
            today = now.toISOString().split('T')[0],
            events = [{
                id: 97328,
                title: 'Some Boring Meeting',
                contact: 'The Incredible Hulk',
                start: today + 'T06:00:00.000Z',
                end: today + 'T07:30:00.000Z'
            }, {
                id: 34478,
                title: 'HR & Technical Interview',
                contact: 'John Doe',
                start: today + 'T07:30:00.000Z',
                end: today + 'T09:15:00.000Z'
            }, {
                id: 37493,
                title: 'Weekly Catchup',
                contact: 'Samantha Jones',
                start: today + 'T10:00:00.000Z',
                end: today + 'T11:45:00.000Z'
            }, {
                id: 43536,
                title: 'Once Upon a Time',
                contact: 'James Hemmingway',
                start: today + 'T12:15:00.000Z',
                end: today + 'T14:00:00.000Z'
            }, {
                id: 43536,
                title: 'Closer than a Galaxy',
                contact: 'George McGregor',
                start: today + 'T14:30:00.000Z',
                end: today + 'T15:30:00.000Z'
            }];

        events.forEach((event) => schedule.push(new EventEntity(event)));

        return Promise.resolve(schedule);
    }
}