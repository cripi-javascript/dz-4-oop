var Collection = function (items) {
	'use strict';
	this.items = [];
	for (item in items) {
		if (item.validate()) {
			this.items.push(item);
		}
	}
};

/**
 * @return {Collection}
 */
Collection.prototype.add = function (model) {
	'use strict';
	this.items.push(model);
};
/**
 * Фильтрация коллекции по правилам, определенным в функции selector
 * 
 * @param {Function} selector
 *
 * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
 *
 * @return {Collection}
 */
Collection.prototype.filter = function (selector) {
	'use strict';
	this.items.filter(selector);
	return this;
};
/**
 * Сортировка коллекции по правилам, определенным в функции selector
 * 
 * @param {Function} selector
 * @param {Boolean} asc
 *
 * @return {Collection}
 */
Collection.prototype.sortBy = function (selector, asc) {
	'use strict';
	this.items.sort(selector);
	if (asc) {
		this.items.reverse();
	}
	return this;
};