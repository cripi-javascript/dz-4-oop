var Collection = function (items) {
	'use strict';
	this.items = [];
	for (var item in items) {
		if (items[item].validate()) {
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
	var tmp = this.items.filter(selector);
	return new this.constructor(tmp);
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