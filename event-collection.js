var Events = function (items) {
	Collection.apply(this, arguments);
};
inherits(Events, Collection);

/**
 * @return {Events}
 */
Events.prototype.findPastEvents = function () {
	'use strict';
	return this.filter(function (event) {
		return event.endDate < new Date();
	});
};
/**
 * @return {Events}
 */
Events.prototype.findFutureEvents = function () {
	'use strict';
	return this.filter(function (event) {
		return event.startDate > new Date();
	});
};
/**
 * @return {Events}
 */
Events.prototype.findThisWeekEvents = function () {
	'use strict';
	return this.filter(function (event) {
		return event.startDate > getWeekStartDate() && event.startDate < getWeekEndDate();
	});
};
/**
 * @return {Events}
 */
Events.prototype.findPartyEvents = function () {
	'use strict';
	return this.filter(function (event) {
		return event.title === 'Drunken feast';
	});
};
/**
 * @return {Events}
 */
Events.prototype.findNightAlarms = function () {
	'use strict';
	return this.filter(function (event) {
		var alarm = getNextAlarmTime(event);
		return alarm.getHours() > 0 && alarm.getHours() < 8;
	});
};
/**
 * @return {Events}
 */
Events.prototype.sortByStartDate = function (asc) {
	'use strict';
	return this.sortBy(function (a, b) {
		return b.startDate - a.startDate;
	}, asc);
};
/**
 * @return {Events}
 */
Events.prototype.sortByNextHappenDate = function (asc) {
	'use strict';
	return this.sortBy(function (a, b) {
		return getNextHappenDate(b) - getNextHappenDate(a);
	}, asc);
};