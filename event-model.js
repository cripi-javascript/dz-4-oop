/*jslint devel: true */
var Event = (function () {
	'use strict';
	function checkStartDate(date) {
		if (date === null) {
			date = new Date();
		} else if (!(date instanceof Date && isFinite(date))) {
			console.log("Start date is invalid, check syntax");
			date = null;
		}
		return date;
	}

	function checkEndDate(endDate, startDate) {
		var date;
		if (endDate === null) {
			date = startDate;
			date.setHours(startDate.getHours() + 1);
		} else if (endDate instanceof Date && isFinite(endDate)) {
			if (endDate < startDate) {
				console.log("End date should be after start date");
				date = null;
			} else {
				date = endDate;
			}
		} else {
			console.log("End date is invalid, check syntax");
			date = null;
		}
		return date;
	}

	function checkRepeat(repeat) {
		if (repeat === null) {
			repeat = Const.REPEAT.NEVER;
		} else if (!(repeat.title && repeat.value)) {
			console.log("Unknown type of 'repeat' variable");
			repeat = null;
		} else if (!Utils.checkAddTime(repeat.value)) {
			console.log("Add time in 'repeat' variable must have format '+ dd.MM.YY hh:mm'");
			repeat = null;
		}
		return repeat;
	}

	function checkAlert(alert) {
		if (alert === null) {
			alert = Const.ALERT.NONE;
		} else if (!(alert.title && alert.value)) {
			console.log("Unknown type of 'alert' variable");
			alert = null;
		} else if (!Utils.checkAddTime(alert.value)) {
			console.log("Add time in 'alert' variable must have format '+ dd.MM.YY hh:mm'");
			alert = null;
		}
		return alert;
	}
	/**
	 * Создает объект Event
	 *
	 * @param {String}      [title="New Event"]     Имя события
	 * @param {String}      [location]              Место события
	 * @param {Number|Date} [starts="new Date()"]   Начало события
	 * @param {Number|Date} [ends="starts + 1"]     Конец события
	 * @param {Object}      [repeat="Const.REPEAT.NEVER"] Периодичность события
	 * @param {Object}      [alert="Const.ALERT.NONE"]    Предупреждение
	 * @param {String}      [notes]                 Заметки
	 *
	 * @example
	 *   new Event({title: "Лекция JavaScript",
	 *          location: "УРГУ",
	 *          startDate: new Date('2011-10-10T14:48:00'),
	 *          endDate: new Date('2011-10-10T15:48:00'),
	 *          repeat: REPEAT.WEEK,
	 *          alert: ALERT.B30MIN,
	 *          notes: "Вспомнить, что проходили на прошлом занятии"})
	 *
	 * @return {Event}
	 */
	var Event = function (data) {
		Model.apply(this, arguments);
	};
	inherits(Event, Model);

	Event.prototype.constructor = Event;

	/**
	  * Функция, валидирующая объект Event 
	  * 
	  * @return {Event}
	 */
	Event.prototype.validate = function () {
		this.startDate = checkStartDate(this.startDate);
		if (this.startDate === null) {
			return;
		}
		this.endDate = checkEndDate(this.endDate, this.startDate);
		if (this.endDate === null) {
			return;
		}
		this.repeat = checkRepeat(this.repeat);
		if (this.repeat === null) {
			return;
		}
		this.alert = checkAlert(this.alert);
		if (this.alert === null) {
			return;
		}
		return this;
	};
	/**
	 * Вычисляет когда в следующий раз случится периодическое событие
	 *
	 * @return {Date}
	 */
	Event.prototype.getNextHappenDate = function () {
		var nhd, today;
		if (!this.nextHappenDate) {
			today = new Date();
			nhd = this.startDate;
			while (nhd < today) {
				nhd = Utils.addDateTime(nhd, this.repeat.value);
			}
			this.nextHappenDate = nhd;
		}
		return this.nextHappenDate;
	};
	/**
	 * Вычисляет следующее время напоминания для периодических событий
	 *
	 * @param {Event} event          Событие
	 *
	 * @return {Date}
	 */
	Event.prototype.getNextAlarmTime = function () {
		var nhd = this.getNextHappenDate();
		return Utils.addDateTime(nhd, this.alert.value);
	};
	/**
	 * Функция проверяет, нужно ли напомнить о событии
	 *
	 * @param {Event} event          Событие
	 *
	 * @return {Boolean}
	 */
	Event.prototype.isAlertTime = function () {
		var today, diff;
		today = new Date();
		diff = today - this.getNextAlarmTime();
		return diff > -500 && diff < 500;
	};
	return Event;
}());