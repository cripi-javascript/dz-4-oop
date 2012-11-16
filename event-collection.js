var Events = function (items) {
	'use strict';
	Collection.apply(this, arguments);
};
inherits(Events, Collection);

Events.prototype.constructor = Events;
/**
 * Возвращает новую коллекцию, содержащую только прошедшие события
 * @return {Events}
 */
Events.prototype.findPastEvents = function () {
	'use strict';
	return this.filter(function (event) {
		return event.endDate < new Date();
	});
};
/**
 * Возвращает новую коллекцию, содержащую только будущие события
 * @return {Events}
 */
Events.prototype.findFutureEvents = function () {
	'use strict';
	return this.filter(function (event) {
		return event.startDate > new Date();
	});
};
/**
 * Возвращает новую коллекцию, содержащую только события этой недели
 * @return {Events}
 */
Events.prototype.findThisWeekEvents = function () {
	'use strict';
	return this.filter(function (event) {
		return event.startDate > Utils.getWeekStartDate() && event.startDate < Utils.getWeekEndDate();
	});
};
/**
 * Возвращает новую коллекцию, содержащую только события 'Drunken feast'
 * @return {Events}
 */
Events.prototype.findPartyEvents = function () {
	'use strict';
	return this.filter(function (event) {
		return event.title === 'Drunken feast';
	});
};
/**
 * Возвращает новую коллекцию, содержащую только те события, напоминание которых сработает ночью
 * @return {Events}
 */
Events.prototype.findNightAlarms = function () {
	'use strict';
	return this.filter(function (event) {
		var alarm = event.getNextAlarmTime();
		return alarm.getHours() > 0 && alarm.getHours() < 8;
	});
};
/**
 * Сортирует коллекцию по дате начала события
 * @return {Events}
 */
Events.prototype.sortByStartDate = function (asc) {
	'use strict';
	return this.sortBy(function (a, b) {
		return b.startDate - a.startDate;
	}, asc);
};
/**
 * Сортирует коллекцию по следующей дате периодического события
 * @return {Events}
 */
Events.prototype.sortByNextHappenDate = function (asc) {
	'use strict';
	return this.sortBy(function (a, b) {
		return b.getNextHappenDate() - a.getNextHappenDate();
	}, asc);
};