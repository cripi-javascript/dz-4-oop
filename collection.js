var Collection = function(items) {
    this.items = [];

    for (var key in items) {
        if (items.hasOwnProperty(key)) {
            this.items.push(items[key]);
        }
    }
}

/**
 * @return {Collection}
 */
Collection.prototype.add = function (model) {
    this.items.push(model);
    return this.items;
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
    if (typeof selector !== "function") {
        throw new Error('Argument must be function');
    }

    return new Collection(this.items.filter(selector));
};

/**
 * @return {Collection}
 */
//Collection.prototype.sortBy = function (fieldName) {};
// Другие необходимые вам поля