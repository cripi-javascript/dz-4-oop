/**
 * Created with PyCharm.
 * User: meded
 * Date: 10/13/12
 * Time: 12:53 PM
 * To change this template use File | Settings | File Templates.
 */

var slice = Array.prototype.slice;
function partial(fn) {
    var args = slice.call(arguments, 1);
    return function () {
        return fn.apply(this, args.concat(slice.call(arguments)));
    };
}
function isMore(a,b) {
    return a > b;
}
function isLess(a,b) {
    return a < b;
}
function isEqual(a,b) {
    return a === b;
}
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var nowDate = new Date
var MoreNow = partial(isMore,nowDate);
var LessNow = partial(isLess,nowDate);

function searchAnArray(array,str) {
    var Equal = partial(isEqual,str);
    return array.reduce(
        function (sum, x) {
            return sum+Equal(x)

        },0
    )
}

/**
 * Описания собития
 * @param {Object}          eventOptions                      Обекс с параметарми
 * @param {Number | Date}   eventOptions.startEvent           Начало собития
 * @param {Number | Date}   eventOptions.endEvent             Конец события
 * @param {string}          eventOptions.name                 Заголовок
 * @param {string}          eventOptions.description          Описание
 * @param {string}          eventOptions.tegs                 Теги
 * @param {string}          eventOptions.place                Адрес собития
 * @param {string}          eventOptions.coordinates          Кардинаты собития
 * @param {string}          eventOptions.colorFon             Цвети стикира
 * @param {boolean}         eventOptions.reminders            Индекатор уведомлений
 * @param {Number | Date}   eventOptions.reminderTimeBefore   Время уведомления
 * @param {string}          eventOptions.friends              сылки на друзей из соц сетей
 *
 * @return {Object}
 */
var EventModel = Backbone.Model.extend({
    defaults: {
        startEvent: new Date,
        endEvent: new Date,
        name:  "Событие",
        description: "",
        tegs: undefined,
        place:  "",
        coordinates:  "",
        color:  "#fff",
        reminders:  false,
//        reminderTimeBeforeEvent: this.get(startEvent),
        friends:  undefined
    },
    initialize: function() {
        this.bind("error", function (Error) {
            console.log(Error);
        })
    },
    errorList:function(){
        console.log(1);
    },
    validate: function(attrs){
        var Error = {};
        function isData(time,attr){
            if ('string' === typeof(time)){
                var timeToData = new Date(time)
                if ('Invalid Date' === timeToData){
                    Error[attr]= "не верный формат даты";
                    return timeToData
                }
            } else{
                return time
            }
        }
        attrs.startEvent = isData(attrs.startEvent,"startEvent");
        attrs.endEvent = isData(attrs.endEvent,"endEvent");

        var regColorcode = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
        if (regColorcode.test(attrs.color) !== false) {
            attrs.color = "";
            Error.color = "все плохо это не цвет";
        }

        if(!_.isEmpty(Error)) {
            return Error
        } else return false;
    }
});

var EventList = Backbone.Collection.extend({
    model: EventModel,
    initialize:function () {
        this.bind("all", function (nemeEvent) {
            console.log(nemeEvent);
        })
        this.bind("cheng", function () {
            console.log(this);
        })
    },
    evemts:{
        "add": function(model, collection) {
            console.log(collection);
        }
    },
    endEvintListNow: function () {
        return new EventList(this.filter(function (item) {
            return LessNow(item.get("endEvent"))
        }))
    },
    startEventMoreNow: function () {
        return new EventList(this.filter(function (item) {
            return MoreNow(item.get("startEvent"))
        }))
    },
    evinteNow: function () {
        return new EventList(this.filter(function (item) {
                return LessNow(item.get("startEvent"))
            }
        ).filter(function (item) {
                return MoreNow(item.get("endEvent"))
            }
        ))
    },
    withFriends:function (nemeFriends) {
        return new EventList(this.filter(function (item) {
            return searchAnArray(item.get("friends"),nemeFriends)
        }))
    },
    withAlex_eho: function () {
        return new EventList(this.filter(function (item) {
            return searchAnArray(item.get("friends"),"http://vk.com/alex_eho")
        }))
    },
    atOneTime:  function () {
        return new EventList(this.map(
            function (item, index, array) {

                var MoreThisItemStart = partial(isMore,item.get("startEvent"));
                var LessThisItemEnd = partial(isLess,item.get("endEvent"));
                var EqualThisItemEnd = partial(isEqual,item.get("endEvent"));
                return array
                    .map(function (el, index, array) {
                        if (MoreThisItemStart(el.get("startEvent"))){
                            return el
                        }
                    })
                    .map(function (el) {
                        if (!el) return
                        if (LessThisItemEnd(el.get("endEvent"))){
                            return el
                        }
                    });
            }
        ))
    },
    sortStartEvinte:function () {
        return new EventList(this.sort(function (a,b) {
            return 0+isMore( a.get("startEvent").getTime(), b.get("startEvent").getTime())

        }))
    }
});

eventList = new EventList;
function generTestCollection() {
    for (var i = 0; i < 30; i++) {
        var eventOptions = {};

        function rendomTime () {
            var newTime = new Date;
            newTime.setMonth(newTime.getMonth() - getRandomInt(0,1));
            newTime.setDate(getRandomInt(1,31));
            newTime.setHours(getRandomInt(0,24));
            newTime.setMinutes(getRandomInt(0,59));
            return newTime
        }
        eventOptions.startEvent = rendomTime();
        eventOptions.endEvent = rendomTime();

        eventOptions.name =  "Событие N" + i;

        function giberArow() {
            var tegs = [];
            if (getRandomInt(0,1)){
                tegs.push("Программирование")
            }
            if (getRandomInt(0,1)){
                tegs.push("Веб-разработка")
            }
            if (getRandomInt(0,1)){
                tegs.push("Информационная безопасность")
            }
            if (getRandomInt(0,1)){
                tegs.push("JavaScript")
            }
            if (getRandomInt(0,1)){
                tegs.push("Фриланс")
            }
            if (getRandomInt(0,1)){
                tegs.push("DIY или Сделай Сам")
            }
            if (getRandomInt(0,1)){
                tegs.push("Android")
            }
            if (getRandomInt(0,1)){
                tegs.push("Linux")
            }
            return tegs.toString();
        }
        eventOptions.tegs = giberArow();
        eventOptions.place = "г Екатеринбург";
        eventOptions.coordinates = "56.828561,60.602373";

        function giberColor() {
            var numberColor = getRandomInt(0,4);
            if (numberColor === 0){
                return "#fff"
            }
            if (numberColor === 1){
                return "#F75050"
            }
            if (numberColor === 2){
                return "#5566E7"
            }
            if (numberColor === 3){
                return "#4DC743"
            }
            if (numberColor === 4){
                return
            }
        }
        eventOptions.color = giberColor();
        eventOptions.reminders = !!getRandomInt(0,4);
        eventOptions.reminderTimeBeforeEvent = rendomTime();

        function giberFriends() {
            var trgs = [];
            if (getRandomInt(0,1)){
                trgs.push("http://vk.com/alex_eho")
            }
            if (getRandomInt(0,1)){
                trgs.push("http://vk.com/id29476786")
            }
            if (getRandomInt(0,1)){
                trgs.push("http://vk.com/ostornfirst")
            }
            if (getRandomInt(0,1)){
                trgs.push("http://vk.com/chbgp")
            }
            if (getRandomInt(0,1)){
                trgs.push("http://vk.com/id20061985")
            }
            if (getRandomInt(0,1)){
                trgs.push("http://vk.com/id126316413")
            }
            if (getRandomInt(0,1)){
                trgs.push("http://vk.com/id31116305")
            }
            return trgs
        }
        eventOptions.friends = giberFriends();
        eventList.push(new EventModel(eventOptions));
    }
}
generTestCollection();
console.log("вся колеция");
console.log(eventList);


