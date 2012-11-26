var Events = (function () {
	'use strict';
	var Events = function (items) {
		Collection.apply(this, arguments);
	};
	inherits(Events, Collection);

	Events.prototype.constructor = Events;
	/**
	 * Возвращает новую коллекцию, содержащую только прошедшие события
	 * @return {Events}
	 */
	Events.prototype.findPastEvents = function () {
		return this.filter(function (event) {
			return event.endDate < new Date();
		});
	};
	/**
	 * Возвращает новую коллекцию, содержащую только будущие события
	 * @return {Events}
	 */
	Events.prototype.findFutureEvents = function () {
		return this.filter(function (event) {
			return event.startDate > new Date();
		});
	};
	/**
	 * Возвращает новую коллекцию, содержащую только события этой недели
	 * @return {Events}
	 */
	Events.prototype.findThisWeekEvents = function () {
		return this.filter(function (event) {
			return event.startDate > Utils.getWeekStartDate() && event.startDate < Utils.getWeekEndDate();
		});
	};
	/**
	 * Возвращает новую коллекцию, содержащую только события 'Drunken feast'
	 * @return {Events}
	 */
	Events.prototype.findPartyEvents = function () {
		return this.filter(function (event) {
			return event.title === 'Drunken feast';
		});
	};
	/**
	 * Возвращает новую коллекцию, содержащую только те события, напоминание которых сработает ночью
	 * @return {Events}
	 */
	Events.prototype.findNightAlarms = function () {
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
		return this.sortBy(function (a, b) {
			return a.startDate - b.startDate;
		}, asc);
	};
	/**
	 * Сортирует коллекцию по следующей дате периодического события
	 * @return {Events}
	 */
	Events.prototype.sortByNextHappenDate = function (asc) {
		return this.sortBy(function (a, b) {
			return a.getNextHappenDate() - b.getNextHappenDate();
		}, asc);
	};
	return Events;
}());