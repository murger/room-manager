import ScheduleService from '../schedule';
import EventEntity from '../../entities/event';

export default class ScheduleServiceMockup extends ScheduleService {
    getToday (id, bypass) {
        let now = new Date(),
            today = now.toISOString().split('T')[0],
            events = [{
                id: 97328,
                title: 'Somewhat Boring Meeting in the Morning',
                contact: 'Burgundy Flemming',
                start: today + 'T06:00:00.000Z',
                end: today + 'T07:00:00.000Z'
            }, {
                id: 34478,
                title: 'HR & Technical Interview',
                contact: 'Jonquil Von Haggerston',
                start: today + 'T08:00:00.000Z',
                end: today + 'T10:00:00.000Z'
            }, {
                id: 37493,
                title: 'Weekly Catchup',
                contact: 'Inverness McKenzie',
                start: today + 'T10:00:00.000Z',
                end: today + 'T11:00:00.000Z'
            }, {
                id: 43536,
                title: 'Happily Ever After in the Discotheque',
                contact: 'Bartholomew Shoe',
                start: today + 'T11:00:00.000Z',
                end: today + 'T12:30:00.000Z'
            }, {
                id: 34573,
                title: 'Once Upon a Time',
                contact: 'Girth Wiedenbauer',
                start: today + 'T13:00:00.000Z',
                end: today + 'T14:30:00.000Z'
            }];

        this._cache = [];

        events.forEach((event) => this._cache.push(new EventEntity(event)));

        return Promise.resolve(this._cache);
    }
}