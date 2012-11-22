//Cоздать абстрактную коллекцию Collection представляющую из себя набор объектов Model каждый вызов метода 
//Collection должен создавать новую коллекцию, а не изменять текущую
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

var allEvents = new Events();
var testEvent = new Event({"name": "Pewpe", "start": "11.12.2012", "end": "13.12.2012"});
allEvents.add(testEvent);
allEvents.add([new Event({"start": "11.12.2012"}), new Event({"start": "11.12.2012"}), new Event({"start": "11.12.2012"})]);
allEvents.add(new Event({"name": "Two", "start": "11.12.2012"}));
console.log(allEvents.add(testEvent));

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