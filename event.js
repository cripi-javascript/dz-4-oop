/*global alert: true*/

function isDate(date) {
    "use strict";

    if (typeof date === 'undefined') {
        return false;
    }
    if (typeof date.getMonth !== 'function') {
        return false;
    }
    return true;
}

function inherits(event, model) {
    var func = function() {};

    func.prototype = model.prototype;
    event.prototype = new func();
}

var Event = function (data) {
    Model.apply(this, arguments);
    };

    inherits(Event, Model);
/**
 * Возвращает объект event, либо undefined, если в объекте  отсутвуют обязательные поля
 * eventObject{
 *            name - название события
 *            start  - начало
 *            end - окончание
 *            location - место
 *            remindTime - за сколько минут до события напомнить
 *            description - описание
 * }
 
 * @param {object} obj             Объект
 * @example
 *    Event({
 *          name: "Пара по веб-технологиям",
 *          start: new Date("2012-10-20 10:00:00"),
 *          end: new Date("2012-10-20 12:50:00"),
 *          location: "5 этаж",
 *          remindTime: 10,
 *          description: "Взять бумагу и ручку, не брать бук!"
 *    })
 *
 * @return {Object}
 */
Event.prototype.validate = function () {
    "use strict";

    var remindTime = this.remindTime || 0;
    this.raiting = this.raiting || 0;

    if (!isDate(this.get("start"))) {
       throw new Error('Field "start" must be Date format');
    }

    if (!isDate(this.end)) {
        this.end = this.start;
    }

    if (this.end < this.start) {
        this.end = this.start;
    }

    return {
        "name": this.name || "(Нет темы)",
        "start": this.start,
        "end": this.end,
        "location": this.location || "",
        "remindTime": remindTime,
        "description": this.description || "(отсутствует)",
        "raiting": this.raiting
    };
}

/**
 * Возвращает строковое представление объекта типа event
 * @param {events} - объект типа event
 * @return строковое представление event
*/
event.show = function (events) {
    "use strict";

    if (typeof events === "undefined") return;

    return events.name + "\n" +" начало: " + events.start + "\n" 
        + " конец: " + events.end + "\n" 
        + " место события: "  + events.location + " напомнить за " + events.remindTime + " минут" + "\n"
        + " описание: " + events.description + "\n";
}

function sortFactory(selector) {

    return function (array) {
        return array.sort(selector);
    }
};

event.sortByStartTime = sortFactory(function (a, b) {
    return a.start - b.start;
});

event.sortByEndTime = sortFactory(function (item) {
    return a.end - b.end;
});

event.sortByRaiting = sortFactory(function (item) {
    return a.raiting - b.raiting;
});

function test(obj) {
    "use strict";

    var result = event(obj);
    if (typeof result !== 'undefined') {
        alert(event.show(result));
    }
}

function runTestsCalendar() {
    "use strict";

    test({});

    test({
        name: "hello",
        start: new Date("2012-10-20 10:00:00")
    });

    test({
        name: "hello",
        start: new Date("2012-10-20 10:00:00"),
        end: new Date("2012-10-20 12:50:00")
    });

    test({
        name: "Пара по веб-технологиям",
        start: new Date("2012-10-20 10:00:00"),
        end: new Date("2012-10-20 12:50:00"),
        location: "5 этаж",
        remindTime: 10,
        description: "Взять бумагу и ручку, не брать бук!"
    });
}