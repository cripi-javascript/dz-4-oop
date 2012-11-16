function checkStartDate(date) {
	'use strict';
	if (date === null) {
		date = new Date();
	} else if (!(date instanceof Date && isFinite(date))) {
		console.log("Start date is invalid, check syntax");
		date = null;
	}
	return date;
}

function checkEndDate(endDate, startDate) {
	'use strict';
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

function checkAddTime(addTime) {
	'use strict';
	var re, splitted;
	re = "([+-]) (\\d?\\d.\\d?\\d.\\d?\\d) (\\d?\\d:\\d?\\d)";
	splitted = addTime.match(re);
	if (splitted === null || splitted.length !== 4) {
		splitted = null;
	}
	return splitted;
}

function checkRepeat(repeat) {
	'use strict';
	if (repeat === null) {
		repeat = Const.REPEAT.NEVER;
	} else if (!(repeat.title && repeat.value)) {
		console.log("Unknown type of 'repeat' variable");
		repeat = null;
	} else if (!checkAddTime(repeat.value)) {
		console.log("Add time in 'repeat' variable must have format '+ dd.MM.YY hh:mm'");
		repeat = null;
	}
	return repeat;
}

function checkAlert(alert) {
	'use strict';
	if (alert === null) {
		alert = Const.ALERT.NONE;
	} else if (!(alert.title && alert.value)) {
		console.log("Unknown type of 'alert' variable");
		alert = null;
	} else if (!checkAddTime(alert.value)) {
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

/**
  * Функция, валидирующая объект Event 
  * 
  * @return {Event}
 */
Event.prototype =
	{
		constructor : Event,
		validate : function () {
			'use strict';
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
		},
		/**
		 * Вычисляет когда в следующий раз случится периодическое событие
		 *
		 * @return {Date}
		 */
		getNextHappenDate : function() {
			'use strict';
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
		},
		/**
		 * Вычисляет следующее время напоминания для периодических событий
		 *
		 * @param {Event} event          Событие
		 *
		 * @return {Date}
		 */
		getNextAlarmTime : function() {
			'use strict';
			var nhd = this.getNextHappenDate();
			return Utils.addDateTime(nhd, event.alert.value);
		},
		/**
		 * Функция проверяет, нужно ли напомнить о событии
		 *
		 * @param {Event} event          Событие
		 *
		 * @return {Boolean}
		 */
		isAlertTime : function() {
			'use strict';
			var today, diff;
			today = new Date();
			diff = today - this.getNextAlarmTime();
			return diff > -500 && diff < 500;
		}
	};