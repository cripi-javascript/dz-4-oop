/**
 * Creates an instance of Event.
 *
 * @param {data} - is start event
 * @field {start} - is start event
 * @field {end} - is end event
 * @field {id} - is id
 * @field {location} - location - is gps and name of event's place
 * @field {participants} - participants - array of participants
 * @field {stars} - is assess the importance of the event
 * @field {cost} - is price for entry
 * @method {setLocation} - is setter for location's field
 * @method {leaveMark} - is setter for stars's field (0,1,2,3,4,5 - допустимые значения)
 */

function Event(data) {
    "use strict";
    Model.call(this,data);
    this.validate();
}


(function () { 
    var inherits = function (Constructor, SuperConstructor) {
    var tempConstructor = function () {}; 
    tempConstructor.prototype = SuperConstructor.prototype;
    Constructor.prototype = new tempConstructor();
    }

    inherits(Event, Model);
    
    Event.prototype.dateValidator = function (date) {
        if (Object.prototype.toString.call(date) === "[object Date]") {
            if (!isNaN(date.getTime())) {
                return true;
            }
        }
        return false;
    }
    Event.prototype.setLocation = function (gps, name) {
        if (typeof gps !== "undefined"  && typeof gps.x !== "undefined" && typeof gps.y !== "undefined" && typeof name === "string") {
            this.location.gps = gps;
            this.location.nameLocation = name;
        } else {
            this.location = {
                "gps" : {"x": 0, "y": 0},
                "nameLocation" : "Earth"
            };
        }
    };
    Event.prototype.leaveMark = function (stars) {
        if (isNaN(parseFloat(stars)) || !isFinite(stars) || stars < 0) {
            stars = 0;
        }
        if (stars > 5) {
            stars = 5;
        }
        stars = (stars - (stars % 1)); //обрезаем дробную часть
        this.stars = stars;
    };
    Event.prototype.validate = function () {
        var tempDate;
        this.id = this.id || Math.random();
        this.location = this.location || {
            "gps": {x: 0, y: 0},
            "nameLocation": "Earth"
        }; 
        this.location = this.location || [];
        this.stars = this.stars || 0;
        this.cost = this.cost || 0;
        this.parties =this.parties || [];
        
        if (!this.dateValidator(this.start)) {
            this.start = new Date();
        }
        if (!this.dateValidator(this.end)) {
            this.end = this.start;
        }
        if (this.end < this.start) {
            tempDate = this.start;
            this.start = this.end;
            this.end = tempDate;
        }
        this.setLocation(this.location);
        this.leaveMark(this.stars);
}
}());


