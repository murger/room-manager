import EventEntity from '../entities/event';

export default class ScheduleService {
    getEvents (room) {
        return fetch('https://127.0.0.1/api/v1/schedule/' + room, {
            mode: 'cors'
        }).then(response => {
            return response.json();
        }).then(data => {
            let schedule = [];

            for (let item of data) {
                schedule.push(new EventEntity(item));
            }

            return schedule;
        });
    }

    getCurrentEvent (room) {
        let now = Date.now();

        return this.getEvents(room).then((schedule) => {
            return schedule.find((event) => {
                let start = new Date(event.start).getTime(),
                    end = new Date(event.end).getTime();

                return (start < now && end > now);
            });
        });
    }
}