function inherits(Constructor, SuperConstructor) {
	var F = function () {}; // Временный, чистый конструктор
	// Сохраняем ссылку
	F.prototype = SuperConstructor.prototype;
	// Применяем __proto__ = prototype
	Constructor.prototype = new F();
}

/**
 * Добавляет к дате кол-во лет, месяцев, дней и т.д определенных в параметре
 * Параметр добавления даты должен иметь формат + dd.MM.YY hh:mm
 * @param {Number|Date} date          Дата
 * @param {String}      dateTimeStr   Строка в формате '+ dd.MM.YY hh:mm'
 *
 * @return {Date}
 */
function addDateTime(date, dateTimeStr) {
	'use strict';
	var result, splitted, sign, addDate, dd, mm, yy, addTime, hh, min;
	splitted = checkAddTime(dateTimeStr);
	result = new Date(date.getTime());
	if (splitted) {
		if (splitted[1] === '-') {
			sign = -1;
		} else {
			sign = 1;
		}
		addDate = splitted[2].split('.');
		addTime = splitted[3].split(':');
		result.setDate(result.getDate() + sign * addDate[0]);
		result.setMonth(result.getMonth() + sign * addDate[1]);
		result.setYear(result.getYear() + sign * addDate[2]);
		result.setHours(result.getHours() + sign * addTime[0]);
		result.setMinutes(result.getMinutes() + sign * addTime[1]);
	} else {
		console.log("Add time in 'addDateTime' function must have format '+ dd.MM.YY hh:mm'");
	}
	return result;
}

/**
 * Вычисляет когда в следующий раз случится периодическое событие
 *
 * @param {Event} event          Событие
 *
 * @return {Date}
 */
function getNextHappenDate(event) {
	'use strict';
	var nhd, today;
	if (!event.nextHappenDate) {
		today = new Date();
		nhd = event.startDate;
		while (nhd < today) {
			nhd = addDateTime(nhd, event.repeat.value);
		}
		event.nextHappenDate = nhd;
	}
	return event.nextHappenDate;
}

/**
 * Вычисляет следующее время напоминания для периодических событий
 *
 * @param {Event} event          Событие
 *
 * @return {Date}
 */
function getNextAlarmTime(event) {
	'use strict';
	var nhd = getNextHappenDate(event);
	return addDateTime(nhd, event.alert.value);
}

/**
 * Функция проверяет, нужно ли напомнить о событии
 *
 * @param {Event} event          Событие
 *
 * @return {Boolean}
 */
function isAlertTime(event) {
	'use strict';
	var today, diff;
	today = new Date();
	diff = today - getNextAlarmTime(event);
	return diff > -500 && diff < 500;
}

/**
 * Вычисляет дату начала недели
 *
 * @param {Date} [date="new Date()"]          Дата
 *
 * @return {Date}
 */
function getWeekStartDate(date) {
	'use strict';
	var startOfWeek;
	date = date || new Date();
	startOfWeek = new Date(date.getTime());
	startOfWeek.setDate(date.getDate() - date.getDay() + 1);
	startOfWeek.setHours(0);
	startOfWeek.setMinutes(0);
	return startOfWeek;
}

/**
 * Вычисляет дату конца недели
 *
 * @param {Date} [date="new Date()"]          Дата
 *
 * @return {Date}
 */
function getWeekEndDate(date) {
	'use strict';
	var startOfWeek, endOfWeek;
	startOfWeek = getWeekStartDate(date);
	endOfWeek = new Date(startOfWeek.getTime());
	endOfWeek.setDate(startOfWeek.getDate() + 7);
	return endOfWeek;
}