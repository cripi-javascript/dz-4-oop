/*jslint plusplus: true*/
var Const = {
	ACTIVITIES : ["Studying", "Drunken feast", "Karaoke singing", "Hanging around"],
	LOCATIONS : ["My home", "My work", "My friend's house", "1905 Sq.", "UrFU", "Unknown"],
	REPEAT : {
		NEVER: {title: "None", value: "+ 0.0.0 0:0"},
		DAY: {title: "Every Day", value: "+ 1.0.0 0:0"},
		WEEK: {title: "Every Week", value: "+ 7.0.0 0:0"},
		TWOWEEK: {title: "Every 2 weeks", value: "+ 14.0.0 0:0"},
		MONTH: {title: "Every month", value: "+ 0.1.0 0:0"},
		YEAR: {title: "Every year", value: "+ 0.0.1 0:0"}
	},
	ALERT : {
		NONE: {title: "None", value: "+ 0.0.0 0:0"},
		B5MIN: {title: "5 minutes before", value: "- 0.0.0 0:5"},
		B15MIN: {title: "15 minutes before", value: "- 0.0.0 0:15"},
		B30MIN: {title: "30 minutes before", value: "- 0.0.0 0:30"},
		B1HOUR: {title: "1 hour before", value: "- 0.0.0 1:0"},
		B1DAY: {title: "1 day before", value: "- 0.0.0 24:0"}
	}
};
var Utils = (function () {
	'use strict';
	var Random = function (e) {
			this.activities = e.ACTIVITIES;
			this.locations = e.LOCATIONS;
			this.repeat = e.REPEAT;
			this.alert = e.ALERT;
		};

	Random.prototype =
		{
			/**
			 * Возвращает случайное число в интервале [min, max]
			 *
			 * @param {Number} min  нижний предел
			 * @param {Number} max  верхний предел
			 *
			 * @return {Number}
			 */
			getRandomInt : function (min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			},

			/**
			 * Возвращает случайный элемент массива
			 *
			 * @param {Array} arr   массив
			 *
			 * @return {Object}
			 */
			getRandomElement : function (arr) {
				return arr[this.getRandomInt(0, arr.length - 1)];
			},

			/**
			 * Возвращает сгенерированную строку из случайных символов
			 *
			 * @return {String}
			 */
			getRandomString : function () {
				var chars, length, str, i;
				chars = "01234 56789 ABCDE FGHIJ KLMNO PQRST UVWXT Zabcd efghi klmno pqrst uvwxy z";
				chars = chars.split('');
				length = this.getRandomInt(4, chars.length);
				str = '';
				for (i = 0; i < length; i++) {
					str += this.getRandomElement(chars);
				}
				return str;
			},

			/**
			 * Возвращает случайное собственное свойство объекта
			 *
			 * @param {Object} obj   объект
			 *
			 * @return {Object}
			 */
			getRandomPropertyVal : function (obj) {
				var keys, prop;
				keys = [];
				for (prop in obj) {
					if (obj.hasOwnProperty(prop)) {
						keys.push(prop);
					}
				}
				return obj[this.getRandomElement(keys)];
			},

			/**
			 * Возвращает сгенерированную дату начала события
			 * Вычисляется как текущая дата начала события + случайное число дней от -28 до 28
			 *
			 * @return {Date}
			 */
			getRandomStartDate : function () {
				var startDate = new Date();
				startDate.setDate(startDate.getDate() + this.getRandomInt(-28, 28));
				startDate.setHours(this.getRandomInt(0, 23));
				startDate.setMinutes(this.getRandomInt(0, 59));
				return startDate;
			},

			/**
			 * Возвращает сгенерированную дату окончания события
			 * Вычисляется как дата начала события + случайное число часов от 1 до 23
			 * @param {Number|Date} startDate   Начало события
			 *
			 * @return {Date}
			 */
			getRandomEndDate : function (startDate) {
				var endDate = new Date(startDate.getTime());
				endDate.setHours(startDate.getHours() + this.getRandomInt(1, 23));
				endDate.setMinutes(this.getRandomInt(0, 59));
				return endDate;
			},

			/**
			 * Возвращает сгенерированный случайным образом объект Event
			 *
			 * @return {Event}
			 */
			getRandomEvent : function () {
				var title, location, starts, ends, repeat, alert, notes;
				title = this.getRandomElement(this.activities);
				location = this.getRandomElement(this.locations);
				starts = this.getRandomStartDate();
				ends = this.getRandomEndDate(starts);
				repeat = this.getRandomPropertyVal(this.repeat);
				alert = this.getRandomPropertyVal(this.alert);
				notes = this.getRandomString();
				return new Event({
					title: title,
					location: location,
					startDate: starts,
					endDate: ends,
					repeat: repeat,
					alert: alert,
					notes: notes
				});
			},

			getRandomEventCollection : function (size) {
				var i, events;
				events = new Events();
				for (i = 0; i < size; i++) {
					events.add(this.getRandomEvent());
				}
				return events;
			}
		};

	return {
		randomEventCollection: function (size) {
			return new Random(Const).getRandomEventCollection(size);
		}
	};
}());

var events = Utils.randomEventCollection(20);