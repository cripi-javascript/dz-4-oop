var Events = function (data) {
    Collection.apply(this, arguments);
    };

    inherits(Events, Collection);

/**
 * Возвращает прошедшие события, отсортированные по дате начала
 * @param {events} - коллекция объектов типа event
 * @return коллекция объектов типа event
*/
Events.prototype.past = function() {
    "use strict";

    return this.filter(function (events) {
            return events.start < new Date();
           });
}

/**
 * Возвращает предстоящие события, отсортированные по дате начала
 * @return коллекция объектов типа event
*/
Events.prototype.coming = function() {
    "use strict";

    return this.filter(function (events) {
             return events.start > new Date();
            });
}

/**
 * Возвращает события, которые произойдут через опр переиод времени,отсортированные по дате начала
 * @param {days} - период (в днях) времени
 * @return коллекция объектов типа event
*/
Events.prototype.comeThrough = function(days) {
    "use strict";

    var now = new Date();
    now.setDate(now.getDate() + days);

    return this.coming()
               .filter(function (events) {
                return events.start < now;
               });
}

Events.prototype.byEndTime =  function(){
    "use strict";

    return this.sort(function (a, b) {
        return a.end - b.end;
    })
};

Events.prototype.byRaiting = function(){
    "use strict";

    return this.sort(function (a, b) {
        return a.raiting - b.raiting;
    })
};

Events.prototype.byStartTime = function(){
    "use strict";

    return this.sort(function (a, b) {
        return a.start - b.start;
    })
};

/**
 * Возвращает события, отсортированные по дате начала по  возр/убыв 
 * от старых к новым / наоборот. По умолчанию сортирует в порядке возрастания
 * @param {events} - коллекция объектов типа event
 * @param {isAscending} - необязательный параметр - указывает порядок сортировки. 
 * при отсутсвии сортируется по возрастанию.
 * @return коллекция объектов типа event
*/
Events.prototype.sortByTime = function (isAscending) {
    "use strict";

    if (isAscending || typeof isAscending === "undefined") {
        return this
               .byStartTime()
    }
    return this.byStartTime()
            .reverse();
}

/**
 * Возвращает события, отсортированные по рейтингу по  убыв/возрастанию 
 * от с более высоким рейтингом к самому низко приоритетному / наоборот. По умолчанию сортирует в порядке убывания
 * @param {events} - коллекция объектов типа event
 * @param {isAscending} - необязательный параметр - указывает порядок сортировки. 
 * при отсутсвии сортируется по убыванию.
 * @return коллекция объектов типа event
*/
Events.prototype.sortByRaiting = function (isAscending) {
    "use strict";

    if (isAscending || typeof isAscending === "undefined") {
        return this
               .byRaiting();
    }
    return this
            .byRaiting()
            .reverse();
}


