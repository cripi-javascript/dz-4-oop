
function isValidDate(d) {
    if ( Object.prototype.toString.call(d) === "[object Date]" ) {
        // it is a date
        if ( isNaN( d.getTime() ) ) {  // d.valueOf() could also work
            // date is not valid
            return false;
        }
        else {
            // date is valid
            return true;
        }
    }
    else {
        // not a date
        return false;
    }
}


/**
 * Модель для класса Event.
 * 
 * @constructor
 * @param {Object} info Обект, описывающий общую информацию о мероприятии (место проведения, название, описание, временные рамки).
 */
var Event = new Model({
    'default': {
        title: "event",
        go: false
    },
    'constructor': function (info) {
        if (typeof info.start_time === 'string') {
            info.start_time = new Date(Date.parse(info.start_time));
        }
        if (typeof info.end_time === 'string') {
            info.end_time = new Date(Date.parse(info.end_time));
        }

        this.update(info);
    },
    'errors': function (name) {
        if (!this.get('start_time') || !this.get('end_time')) {
            return "miss required fields";
        }
        if (!isValidDate(this.get('start_time'))) {
            return "invalid start_time value";
        }
        if (!isValidDate(this.get('end_time'))) {
            return "invalid end_time value";
        }
        if (this.get('start_time') > this.get('end_time')) {
            return "starat_time more then end_time";
        }
        return null;
    }
});

/**
 * Создает объект Event
 *
 * @param {Number|Date} start_at             Начало события
 * @param {Number|Date} end_at               Конец события
 * @param {String}      [name="Событие"]  Имя события
 *
 * @example
 *    Event(new Date("2011-10-10T14:48:00"),
 *          new Date("2011-10-10T15:48:00"),
 *          "Совещание")
 *
 * @return {Object}
 */
function createNewEvent(start_at, end_at, name, go) {
    var info = {
        start_time: start_at,
        end_time: end_at,
        title: name
    };
    if (go) {
        info.go = true;
    }

    return new Event(info);
}


function ModelTests() {
    var a = createNewEvent(222, 333, 'lol'); // invalid date
}
