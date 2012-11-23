var Model = (function () {
	"use strict";
	var Model = function (data) {
		var propName;
		for (propName in data) {
			if (data.hasOwnProperty(propName)) {
				this[propName] = data[propName];
			}
		}

	};

	Model.prototype =
		{
			/** Мутатор
			 * @param {Object} attributes
			 *
			 * @example
			 *     item.set({title: "March 20", notes: "In his eyes she eclipses..."});
			 */
			set : function (attributes) {
				var attribute;
				for (attribute in attributes) {
					if (attributes.hasOwnProperty(attribute)) {
						this[attribute] = attributes[attribute];
					}
				}
			},
			/** Аксессор
			 * @param {String} attribute
			 */
			get : function (attribute) {
				if (this.hasOwnProperty(attribute)) {
					return this[attribute];
				}
			},
			/** Валидатор
			 * @param {Object} attributes
			 */
			validate : function (attributes) {
				console.log('this is Abstract method');
			}
		};
	return Model;
}());

function inherits(Constructor, SuperConstructor) {
	"use strict";
	var F = function () {};
	F.prototype = SuperConstructor.prototype;
	Constructor.prototype = new F();
}