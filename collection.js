var Collection = function () {
	'use strict';
	this.items = [];
};

/**
 * @return {Collection}
 */
Collection.prototype.add = function (model) {
	'use strict';
	this.items.push(model);
};
/**
 * @param {Function} selector
 *
 * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
 *
 * @example
 *    new Collection().filter(function (item) {
 *        return item.get('attendee').indexOf("me") !== -1;
 *    });
 * @return {Collection}
 */
Collection.prototype.filter = function (selector) {
	'use strict';
	this.items.filter(selector);
	return this;
};
/**
 * @return {Collection}
 */
Collection.prototype.sortBy = function (selector) {
	'use strict';
	this.items.sort(selector);
	return this;
};