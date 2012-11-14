/**
* Возвращает объект Event
*
* @param {String}    [name = "Событие"]  Имя события
* @param {String}    [address = ""]      Адресс события
* @param {Object}    time                Дата события
* @param {Array}     member              Участники
* @param {Number}    [raiting=3]         Важность события (по шкале от 0 до 5)
*
* @example
*   Event(
*       "Совещание", "Екатеринбург, ул. Тургенева, д. 4, ауд. 150",
*       EventTime(new Date(2011, 10, 10, 14, 48, 00), 60),
*       ["Жигалов Сергей Алексеевич"], 5)
*
* @see EventTime
*/

var Event = function (name, address, time, member, raiting) {
    "use strict";
    this.name = name || "Событие";
    this.address = address.toString();
    this.time = time;
    this.member = member || [];
    this.raiting = +raiting || 3;
}


/**
* Возвращает объект EventTime
*
* @private
* @param {Number|Date} start          Начало события
* @param {Number}      [length=0]     Длительность события в минутрах
*
* @example
*    EventTime(new Date(2011, 10, 10, 14, 48, 00), 60)
*
* @return {Object}
*/
function EventTime(start, length) {
    "use strict";
    return {
        "start": +start,
        "length": +length || 0
    };
}

Event.prototype = {
    __proto__: Model.prototype
};

/**
 * @param {Object} attributes
 */
Event.prototype.validate = function (attributes) {
    if (!attributes.time) {
        return "Time can't be null";
    }
};

var modelEvents = new Event("jsy6on0kz4", "7429kpz7nh", EventTime(new Date(2012, 10, 8), 45), ["Иванов", "я", "Петров"]);