import ScheduleService from '../schedule';
import EventEntity from '../../entities/event';

export default class ScheduleServiceMockup extends ScheduleService {
    getEvents (room) {
        let schedule = [],
            now = new Date(),
            today = now.toISOString().split('T')[0],
            events = [{
                id: 97328,
                title: 'Somewhat Boring Meeting in the Morning',
                contact: 'Burgundy Flemming',
                start: today + 'T06:00:00.000Z',
                end: today + 'T07:15:00.000Z'
            }, {
                id: 34478,
                title: 'HR & Technical Interview',
                contact: 'Jonquil Von Haggerston',
                start: today + 'T07:15:00.000Z',
                end: today + 'T09:00:00.000Z'
            }, {
                id: 37493,
                title: 'Weekly Catchup',
                contact: 'Inverness McKenzie',
                start: today + 'T10:00:00.000Z',
                end: today + 'T12:00:00.000Z'
            }, {
                id: 43536,
                title: 'Once Upon a Time',
                contact: 'Bartholomew Shoe',
                start: today + 'T12:00:00.000Z',
                end: today + 'T13:30:00.000Z'
            }, {
                id: 34573,
                title: 'Happily Ever After in the Discoteque',
                contact: 'Girth Wiedenbauer',
                start: today + 'T14:00:00.000Z',
                end: today + 'T15:30:00.000Z'
            }];

        events.forEach((event) => schedule.push(new EventEntity(event)));

        return Promise.resolve(schedule);
    }
}