var Collection = function (items) {
	'use strict';
	var item;
	this.items = [];
	for (item in items) {
		if (items.hasOwnProperty(item)) {
			this.add(item);
		}
	}
};

/**
 * @return {Collection}
 */
Collection.prototype =
	{
		add : function (model) {
			if (model.validate()) {
				this.items.push(model);
			}
		},
		/**
		 * Фильтрация коллекции по правилам, определенным в функции selector
		 * 
		 * @param {Function} selector
		 *
		 * @see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
		 *
		 * @return {Collection}
		 */
		filter : function (selector) {
			var tmp;
			tmp = this.items.filter(selector);
			this.items = tmp;
			return this;
		},
		/**
		 * Сортировка коллекции по правилам, определенным в функции selector
		 * 
		 * @param {Function} selector
		 * @param {Boolean} asc
		 *
		 * @return {Collection}
		 */
		sortBy : function (selector, asc) {
			this.items.sort(selector);
			if (asc) {
				this.items.reverse();
			}
			return this;
		}
	};