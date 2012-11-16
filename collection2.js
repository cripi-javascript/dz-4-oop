var Collection = function (items) {
	'use strict';
	var item;
	this.items = [];
	for (item in items) {
		if (items.hasOwnProperty(item)) {
			if (items[item].validate()) {
				this.items.push(items[item]);
			}
		}
	}
};

/**
 * @return {Collection}
 */
Collection.prototype =
	{
		add : function (model) {
			'use strict';
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
			'use strict';
			var tmp = this.items.filter(selector);
			return new this.constructor(tmp);
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
			'use strict';
			this.items.sort(selector);
			if (asc) {
				this.items.reverse();
			}
			return this;
		}
	};