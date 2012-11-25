/*jslint devel: true */
var ValidationResult = (function () {
	"use strict";
	var ValidationError = function (fieldName, errorText) {
		this.fieldName = fieldName;
		this.errorText = errorText;
	}, ValidationResult = function (valid) {
		this.valid = valid;
		this.errors = [];
	};

	ValidationResult.prototype =
		{
			addError : function (fieldName, errorText) {
				this.errors.push(new ValidationError(fieldName, errorText));
				this.valid = false;
			},
			log : function () {
				var error;
				if (!this.valid) {
					for (error in this.errors) {
						if (this.errors.hasOwnProperty(error)) {
							console.log(error.errorText);
						}
					}
				}
			}
		};
	return ValidationResult;
}());