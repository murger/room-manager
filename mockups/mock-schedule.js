import ScheduleService from '../src/services/schedule';
import EventEntity from '../src/entities/event';

export default class ScheduleServiceMockup extends ScheduleService {
    setupCache () {
        let events = [{
                id: this.generateID(),
                title: 'Somewhat Boring Meeting in the Morning',
                contact: 'Burgundy Flemming',
                start: this.makeISODate('06:00'),
                end: this.makeISODate('06:30')
            }, {
                id: this.generateID(),
                title: 'Happily Ever After in the Discotheque',
                contact: 'Jonquil Von Haggerston',
                start: this.makeISODate('07:30'),
                end: this.makeISODate('08:15')
            }, {
                id: this.generateID(),
                title: 'Weekly Catchup',
                contact: 'Inverness McKenzie',
                start: this.makeISODate('09:30'),
                end: this.makeISODate('10:30')
            }, {
                id: this.generateID(),
                title: 'HR & Technical Interview',
                contact: 'Bartholomew Shoe',
                start: this.makeISODate('11:00'),
                end: this.makeISODate('12:30')
            }, {
                id: this.generateID(),
                title: 'Once Upon a Time',
                contact: 'Girth Wiedenbauer',
                start: this.makeISODate('14:30'),
                end: this.makeISODate('16:00')
            }];

        this._cache = [];
        events.forEach((event) =>this._cache.push(new EventEntity(event)));
    }

    getToday (id) {
        if (!this._cache.length) {
            this.setupCache();
        }

        return Promise.resolve(this._cache);
    }

    // sendBookingRequest (id, mins) {
    //     let start = new Date(),
    //         end = new Date(start.getTime() + (mins * (60 * 1000)));

    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => resolve({
    //             id: this.generateID(),
    //             title: null,
    //             contact: null,
    //             start: start.toISOString(),
    //             end: end.toISOString()
    //         }), 2000);
    //     });
    // }

    generateID () {
        return Math.random().toString(36).substr(2, 9);
    }

    makeISODate (time) {
        let now = new Date(),
            today = now.toISOString().split('T')[0];

        return [today, time + ':00.000Z'].join('T');
    }
}