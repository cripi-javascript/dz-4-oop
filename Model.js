var Model = function (attributes) {
    for (var keyName in attributes) {
        this[keyName] = attributes[keyName];
    }
};

/**
 * @param {Object} attributes
 *
 * @example
 *     item.set({title: "March 20", content: "In his eyes she eclipses..."});
 */
Model.prototype.set = function (attributes) {
    for (var keyName in attributes) {
        this[keyName] = attributes[keyName];
    }
};
/**
 * @param {String} attribute
 */
Model.prototype.get = function (attribute) {
    return this[attribute];
};
/**
 * @param {Object} attributes
 */
Model.prototype.validate = function (attributes) { throw new Error('this is Abstract method') };
