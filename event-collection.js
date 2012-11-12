var Events = function (items) {
    Collection.apply(this, arguments);
};
inherits(Events, Collection);

/**
 * @return {Events}
 */
Events.prototype.findOnlyMyEvents = function () {};
/**
 * @return {Events}
 */
Events.prototype.findFutureEvents = function () {};
/**
 * @return {Events}
 */
Events.prototype.findPastEvents = function () {};
/**
 * @return {Events}
 */
Events.prototype.sortByName = function () {};