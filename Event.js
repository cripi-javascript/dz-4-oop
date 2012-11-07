/*jslint plusplus: true, browser: true, devel: true */

function datatype(data) {// возвращает true, если data имеет тип дата и она корректна
    "use strict";
    if (typeof data === 'undefined') {
        return false;
    }
    if (!data.getTime) {
        return false;
    }
    if ('Invalid Date' === data) {
        return false;
    }
    return true;
}

function ratingtype(rating) {// возвращает true, если rating - число от 0 до 5
    "use strict";
    if (typeof rating !== 'number') {
        return false;
    }
    if (rating > 5 || rating < 0) {
        return false;
    }
    return true;
}

function inherits(Constructor, SuperConstructor) {
    "use strict";
    var F = function () {}; // Временный, чистый конструктор
    // Сохраняем ссылку
    F.prototype = SuperConstructor.prototype;
    // Применяем __proto__ = prototype
    Constructor.prototype = new F();
}

/**
* Абстрактный конструктор Model
* 
* @constructor
* @param {Object} data
**/

var Model = function (data) {
    "use strict";
    var keyName;
    for (keyName in data) {
        if (data.hasOwnProperty(keyName)) {
            this[keyName] = data[keyName];
        }
    }
};
/**
 * @param {Object} attributes
 *
 * @example
 *     item.set({title: "March 20", content: "In his eyes she eclipses..."});
 */

Model.prototype.set = function (attributes) {
    "use strict";
    var keyName;
    for (keyName in attributes) {
        if (attributes.hasOwnProperty(keyName)) {
            this[keyName] = attributes[keyName];
        }
    }
};
/**
 * возвращает аттрибут объекта, если это его собственное свойсово
 * @param {String} attribute    атрибуты объекта, которые получаем
 */

Model.prototype.get = function (attribute) {
    "use strict";
    if (this.hasOwnProperty(attribute)) {
        return this[attribute];
    }
};
/**
 * @param {Object} attributes
 */
Model.prototype.validate = function (attributes) {"use strict"; throw new Error('this is Abstract method'); };


// наследуем от Абстракнтого конструктора Model объект Event
var Event = function (data) {
    "use strict";
    Model.apply(this, arguments);
};
inherits(Event, Model);

Event.prototype.validate = function () {//проверяет корректность переданных данных.
    "use strict";
    if (!datatype(this.start)) {
        throw new Error(this.start + " не является датой!");
    }
    if (!datatype(this.end)) {
        throw new Error(this.end + " не является датой!");
    }
    if (this.start.getTime() - this.end.getTime() > 0) {
        throw new Error("некорректное событие: не может закончиться раньше, чем начаться!!!");
    }
    if (!ratingtype(this.rating)) {
        throw new Error("введите рейтинг от 0 до 5");
    }
};



// абстрактная коллекция Collection, представляющая из себя набор объектов Model
/**
* @constructor
* @param {Object} items
**/
var Collection = function (items) {
    "use strict";
    this.items = [];
    var keyName;
    for (keyName in items) {
        if (items.hasOwnProperty(keyName)) {
            this.items.push(items[keyName]);
        }
    }
};

/**
 * @param {Model} model
 *
 * @return {Collection}
 */
Collection.prototype.add = function (model) {
    "use strict";
    this.items.push(model);
};

/**
 * @param {Function} selector
 *
 * @example
 *    new Collection().filter(function (item) {
 *        return item.get('attendee').indexOf("me") !== -1;
 *    });
 * @return {Collection}
 */
Collection.prototype.filter = function (selector) {
    "use strict";
    return new Collection(this.items.filter(selector));
};
/**
 * @param {String} fieldName    параметр, по которому происходит сотрировка
 * @return {Collection}
 */
Collection.prototype.sortBy = function (fieldName) {
    "use strict";
    if (fieldName === "start") { // сортировка по началу события
        return new Collection(this.items.sort(function (Event1, Event2) {return Event1.start - Event2.start; }));
    }
    if (fieldName === "length") {//сортировка по длине события
        return new Collection(this.items.sort(function (Event1, Event2) {return (Event1.end - Event1.start) - (Event2.end - Event2.start); }));
    }
    if (fieldName === "rating") {//сортировка по рейтингу события
        return new Collection((this.items.sort(function (Event1, Event2) {return Event1.rating - Event2.rating; })).reverse());
    }
};


function getRandomInt(min, max) {//Случайное целое число  между min и max
    "use strict";
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var today = new Date();

function addDay(n) {// прибавляет к текущей дате n дней
    "use strict";
    return new Date(today.getTime() + (86400000 * n));
}
function nDay(n) {// возвращает n-ый день от текущей даты в 00часов 00минут
    "use strict";
    var Day, a, b;
    Day = addDay(n);
    a = Day.getTime();
    b = Day.getMilliseconds() + (Day.getHours() * 3600000) + (Day.getMinutes() * 60000) + (Day.getSeconds() * 1000);
    return new Date(a - b);
}
function hours(milis) {// переводит миллисекунда в часы. Возвращает строку
    "use strict";
    var hour, minute, s;
    hour = Math.floor(milis / 3600000);
    minute = Math.floor((milis - (hour * 3600000)) / 60000);
    s = hour + "ч " + minute + "мин";
    return s;
}
var week = addDay(7);
var maxdate = addDay(31);
var mindate = addDay(-31);


// наследуем коллекцию событий Events от абстрактной коллекции Collection
var Events = function (items) {
    "use strict";
	Collection.apply(this, arguments);
};
inherits(Events, Collection);


Events.prototype.write = function () {//выводит на консоль все элементы коллекции
    "use strict";
	this.items.forEach(function (NewEvent) {
        console.log(NewEvent.name + ":  начало: " + NewEvent.start + "  конец: " + NewEvent.end + "  рейтинг: " + NewEvent.rating + " продолжительность: " + hours(NewEvent.end - NewEvent.start));
    });
};
/**
 * показывает все будующие события
 * @return {Events}
 */
Events.prototype.findFutureEvents = function () {
    "use strict";
	return new Events((this.filter(function (NewEvent) {return (NewEvent.start > today); })).items);
};
/**
 * показывает все прошедшие события
 * @return {Events}
 */
Events.prototype.findPastEvents = function () {
    "use strict";
	return new Events((this.filter(function (NewEvent) {return (NewEvent.start < today); })).items);
};
/**
 * сортировка по началу события
 * @return {Events}
 */
Events.prototype.sortByStart = function () {
    "use strict";
	return new Events((this.sortBy("start")).items);
};
/**
 * сортировка по продолжительности события
 * @return {Events}
 */
Events.prototype.sortByLength = function () {
    "use strict";
	return new Events((this.sortBy("length")).items);
};
/**
 * сортировка по рейтингу события
 * @return {Events}
 */
Events.prototype.sortByRating = function () {
    "use strict";
	return new Events((this.sortBy("rating")).items);
};


//создаем коллекцию из 5 случайных событий:
var randomEvents = new Events();
var i;
for (i = 0; i < 5; i++) {
    var startrandom = new Date(getRandomInt(mindate.getTime(), maxdate.getTime()));// начало события - случайная дата в интервале +-месяц от текущей
    var endrandom = new Date(startrandom.getTime() + (getRandomInt(0, 86400000)));//конец события - случайная дата в течении суток начиная от начала события
    randomEvents.add(new Event({
        start: startrandom,
        end: endrandom,
        name: "Событие " + (i + 1),
        place: "",
        rating: getRandomInt(0, 5),//рейтинг - случайное целое число от 0 до 5
        comment: "",
        link: ""
    }));
}
// примеры
console.log("все события, отсортированные по рейтингу:");
(randomEvents.sortByRating()).write();

console.log("все будущие события, отсортированные по дате начала:");
var futureEvents = (randomEvents.findFutureEvents()).sortByStart();
futureEvents.write();

console.log("все прошедшие события, отсортированые по продолжительности:");
var pastEvents = (randomEvents.findPastEvents()).sortByLength();
pastEvents.write();