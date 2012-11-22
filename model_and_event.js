var Model = function (attributes) {
	    "use strict";
	    var key;
	    for (key in attributes) {
	        if (attributes.hasOwnProperty(key)) {
		        this[key] = attributes[key];
		    }
        }
    };
//Сеттер - устанавливает аттрибуты и значения атрибутов, в соответсвии с принятым в качестве параметра объектом
Model.prototype.set = function (attributes) {
    "use strict";
    var key;
    for (key in attributes) {
	    if (attributes.hasOwnProperty(key)) {
		    this[key] = attributes[key];
		}
    }
};
//Геттер - возвращает запрашиваемое свойство у объекта
Model.prototype.get = function (attribute) {
    "use strict";
    if (this.hasOwnProperty(attribute)) {
        return this[attribute];
    }
    return undefined;
};

Model.prototype.validate = function (attributes) {
    "use strict";
    throw new Error('this is Abstract method');
};

var Event = function (data) {
        "use strict";
        Model.apply(this, arguments);
        this.name = this.name || "Встреча";
        this.place = this.place || {};
        this.info = this.info || {};
        this.reminder = this.reminder || "За день до встречи";
        this.type = this.type || "Работа";
        this.party = this.party || "участвую";
    };

function inherits(Constructor, SuperConstructor) {
    "use strict";
    var F = function () {};
    F.prototype = SuperConstructor.prototype;
    Constructor.prototype = new F();
}

inherits(Event, Model);

Event.prototype.validate = function () {
    "use strict";
    if (this.start === "undefined") {
        console.log("starts is can not be null");
        return "starts is can not be null";
    }
    if (this.end !== "undefined" && this.end < this.start) {
        console.log("can't end before it starts");
        return "can't end before it starts";
    }
    return true;
};
