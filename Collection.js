var Collection = function (items) {

};

/**
 * @return {Collection}
 */
Collection.prototype.add = function (model) {};
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
Collection.prototype.filter = function (selector) {};
/**
 * @return {Collection}
 */
Collection.prototype.sortBy = function (fieldName) {};