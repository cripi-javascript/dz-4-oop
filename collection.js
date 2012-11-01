var Collection = function (items) {
    "use strict";

    this.items = [];
    var key;

    for (key in items) {
        if (items.hasOwnProperty(key)) {
            this.items.push(items[key]);
        }
    }
};

/**
 * Добавляет в коллекцию объект
 * @param {object} model
 *
 * @return {Collection} * @example
 *
 */
Collection.prototype.add = function (model) {
    "use strict";

    var temp = new Collection(this.items);
    temp.items.push(model);
    return temp;
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
    "use strict";

    if (typeof selector !== "function") {
        throw new Error('Argument must be function');
    }

    return new Collection(this.items.filter(selector));
};

/**
 * Принимает функцию сортировки и сортирует на основе ее
 * @param {function} selector
 *
 * @return {Collection} * @example
 *
 */
Collection.prototype.sort = function (selector) {
    "use strict";

    if (typeof selector !== "function") {
        throw new Error('Argument must be function');
    }

    return new Collection(this.items.sort(selector));
};