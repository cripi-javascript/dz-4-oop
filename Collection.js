/**
 * Коллекции для модели Event.
 * 
 * @constructor
 * @this {EventsCollection}
 * @param {Array} collect_list Список Event классов.
 */
var EventsCollection = new Collection({
    'model': Event
});

/**
 * Отфильтровывает события, которые произошли до указанной даты.
 *
 * @return {EventsCollection} Новый объект EventsCollection.
 */
EventsCollection.prototype.start_before = function(date) {
    return this.filter(function (event) {
        return event.get('start_time') < date;
    });
};

/**
 * Возвращает количество событий (Event) в коллекции.
 *
 * @return {number} Кол-во событий.
 */
EventsCollection.prototype.count_events = function() {
    return this.size();
};

/**
 * Отфильтровывает события, которые произошли после указанной даты.
 *
 * @return {EventsCollection} Новый объект EventsCollection.
 */
EventsCollection.prototype.start_after = function(date) {
    return this.filter(function (event) {
        return event.get('start_time') > date;
    });
};

/**
 *
 * TESTS
 *
 */

function ok(name, val1, val2) {
    if (val1 !== val2) {
        console.log(name + " [FAILED]");
    } else {
        console.log(name + " [OK]");
    }
}

function Collection_tests() {
    var a1 = createNewEvent(222, 333, 'lol');
    var a2 = createNewEvent(223, 333, 'lol2');
    var a3 = createNewEvent(100, 500, 'lol2');
    var events_data = [a1, a2, a3];
    var events_callect = new EventsCollection(events_data);

    // t1
    var events_before_date = events_callect.start_before(223);
    ok('events_before_date filter', events_before_date.size(), 2);
    
    // t2
    ok('events_before_date count_events()', events_before_date.count_events(), 2);
    
    // t3
    var events_after_date = events_callect.start_after(222);
    ok('events_after_date filter count_events()', events_after_date.count_events(), 1);
    
    // t4 combine methods
    var some_filtered_event = events_callect.start_before(223).start_after(100);
    ok('sequence filters', some_filtered_event.count_events(), 1);
}
Collection_tests();