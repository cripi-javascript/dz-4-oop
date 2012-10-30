Collection = function (otherItems) {
    var item;
    this.items = [];
    for(item in otherItems) {
        if (otherItems.hasOwnProperty(item)) {
            this.items.push(otherItems[item]);
        }
    }
};

/**
 * @param {Model} 
 * @help Создает коллекцию со старыми элементами текущей коллекции + новый элемент. 
 * @return {Collection}
 */
Collection.prototype.add = function (model) {    
    var newEvents = [model].concat(this.events);
    return new Collection(newEvents);
}
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
    var newItems = this.items.filter(selector);
    return new Collection(newItems);
}
/**
 * @return {Collection}
 */
Collection.prototype.sortBy = function (comparator, isDownToUp) {    
    var newItems = [].concat(this.events);
    if (newItems.length == 0) {
        return [];
    }
    if (comparator) {
        if (isDownToUp) {
            var tempComparator = function(a, b) {
                return -1*comparator(a, b)
            }
            comparator = tempComparator;
        }
        newItems.sort(comparator);
    }
    else {
        newItems.sort();
    }
    return new Collection(newItems);
}
// Другие необходимые вам поля





