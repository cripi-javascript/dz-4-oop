/*global Collection: true*/
Collection = function (otherItems) {
    "use strict";
    var item;
    this.items = [];
    for (item in otherItems) {
        if (otherItems.hasOwnProperty(item)) {
            this.items.push(otherItems[item]);
        }
    }
};

/**
 * @param {obj} 
 * @help Создает коллекцию со старыми элементами текущей коллекции + новый элемент. 
 * @return {Collection}
 */
Collection.prototype.add = function (obj) {
    "use strict";
    var newEvents = this.items.concat([obj]);
    return new Collection(newEvents);
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
    var newItems = this.items.filter(selector);
    return new Collection(newItems);
};
/**
 * @return {Collection}
 */
Collection.prototype.sortBy = function (comparator, isInvert) {
    "use strict";
    var newItems = [].concat(this.items);
    if (newItems.length === 0) {
        return [];
    }
    if (comparator) {
        if (isInvert) {
            newItems.sort(function (a, b) {
                return -1 * comparator(a, b);
            });
        } else {
            newItems.sort(comparator);
        }
    } else {
        newItems.sort();
    }
    return new Collection(newItems);
};
// Другие необходимые вам поля