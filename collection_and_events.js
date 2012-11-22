/*
* Collection - абстрактная коллекция объектов
* Collection.prototype.add - добавление объекта в коллекцию
*
* Events - коллекция событий в календаре. Объект наследуется от Collection
* 
* Event - объект события в календаре
* Event.prototype.validate - проверяет корректность полей объекта 
* Events.prototype.filterToDate - возвращает предстоящие или прощедшие события в зависимости от входящего параметра flag
* Events.prototype.FilterToParty - возвращает события, в которых я принимаю/ не принимаю участие в зависимости от входящего параметра flag
* Events.prototype.sortToDate - сортирует события по дате
* function str2date(s) - преобразует строку в дату 
*/
var Collection = function (elem) {
        'use strict';
        this.elem = [];
        var key;
	    for (key in elem) {
	        this.elem.push(elem[key]);
        }
    };

Collection.prototype.add = function (model) {
    'use strict';
    var key;
    if (model.length > 0) {
        for (key in model) {
		    if (model[key].validate() === true) {
	            this.elem.push(model[key]);
		    }
        }
    } else {
        if (model.validate() === true) {
	        this.elem.push(model);
        }
    }
};

var Events = function (items) {
    "use strict";
    Collection.apply(this, arguments);
};
inherits(Events, Collection);

Events.prototype.constructor = Events;

function str2date(s) {
    "use strict";
    var dateParts = s.split('.');
    if (typeof dateParts[2] === 'string') {
        return new Date(dateParts[2], dateParts[1], dateParts[0]);
    }
    if (typeof dateParts[2] === 'undefined') {
        dateParts = s.split('-');
        return new Date(dateParts[0], dateParts[1], dateParts[2]);
    }
}

Events.prototype.filterToDate = function (flag) {
    "use strict";
    var result, collection;
    collection = this.elem;
    if (flag === -1) {
        result = collection.filter(function (collection) {
            var s = str2date(collection.start);
            return s < new Date();
        });
	} else {
        result = collection.filter(function (collection) {
            var s = str2date(collection.start);
            return s >= new Date();
        });
    }
    return result;
};

Events.prototype.FilterToParty = function (flag) {
    "use strict";
    var result, collection;
    collection = this.elem;
    if (flag === -1) {
        result = collection.filter(function (collection) {
            return collection.party === "не участвую";
	    });
    } else {
        result = collection.filter(function (collection) {
	        return collection.party === "участвую";
        });
    }
    return result;
};

Events.prototype.sortToDate = function () {
    "use strict";
    var collection = this.elem;
    collection.sort(function (a, b) {
        return str2date(a.start) > str2date(b.start) ? 1 : -1;
    });
    return collection;
};