var Event = (function () {
	'use strict';
	function checkStartDate(date, validator) {
		if (date === null) {
			date = new Date();
		} else if (!(date instanceof Date && isFinite(date))) {
			validator.addError("startDate", "Start date is invalid, check syntax");
			date = null;
		}
		return date;
	}

	function checkEndDate(endDate, startDate, validator) {
		var date;
		if (endDate === null) {
			date = startDate;
			if (date !== null) {
				date.setHours(startDate.getHours() + 1);
			}
		} else if (endDate instanceof Date && isFinite(endDate)) {
			if (endDate < startDate) {
				validator.addError("endDate", "End date should be after start date");
				date = null;
			} else {
				date = endDate;
			}
		} else {
			validator.addError("endDate", "End date is invalid, check syntax");
			date = null;
		}
		return date;
	}

	function checkRepeat(repeat, validator) {
		if (repeat === null) {
			repeat = Const.REPEAT.NEVER;
		} else if (!(repeat.title && repeat.value)) {
			validator.addError("repeat", "Unknown type of 'repeat' variable");
			repeat = null;
		} else if (!Utils.checkAddTime(repeat.value)) {
			validator.addError("repeat", "Add time in 'repeat' variable must have format '+ dd.MM.YY hh:mm'");
			repeat = null;
		}
		return repeat;
	}

	function checkAlert(alert, validator) {
		if (alert === null) {
			alert = Const.ALERT.NONE;
		} else if (!(alert.title && alert.value)) {
			validator.addError("alert", "Unknown type of 'alert' variable");
			alert = null;
		} else if (!Utils.checkAddTime(alert.value)) {
			validator.addError("alert", "Add time in 'alert' variable must have format '+ dd.MM.YY hh:mm'");
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
	  * @return {ValidationResult}
	 */
	Event.prototype.validate = function () {
		var result = new ValidationResult(true);
		this.startDate = checkStartDate(this.startDate, result);
		this.endDate = checkEndDate(this.endDate, this.startDate, result);
		this.repeat = checkRepeat(this.repeat, result);
		this.alert = checkAlert(this.alert, result);
		result.log();
		return result;
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