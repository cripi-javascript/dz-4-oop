var Model = function (data) {
	"use strict";
	var propName;
	for (propName in data) {
		this[propName] = data[propName];
	}

};

/**
 * @param {Object} attributes
 *
 * @example
 *     item.set({title: "March 20", content: "In his eyes she eclipses..."});
 */
Model.prototype.set = function (attributes) {
	"use strict";
	var attribute;
	for (attribute in attributes) {
		this[attribute] = attributes[attribute];
	}
};
/**
 * @param {String} attribute
 */
Model.prototype.get = function (attribute) {
	if (this.hasOwnProperty(attribute)) {
		return this[attribute];
	}
};
/**
 * @param {Object} attributes
 */
Model.prototype.validate = function (attributes) {throw new Error('this is Abstract method')};

function inherits(Constructor, SuperConstructor) {
	var F = function () {}; // Временный, чистый конструктор
	// Сохраняем ссылку
	F.prototype = SuperConstructor.prototype;
	// Применяем __proto__ = prototype
	Constructor.prototype = new F();
}