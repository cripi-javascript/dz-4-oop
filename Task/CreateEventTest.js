test('Create event', function () {
    "use strict";
    var dateToString = function (currentTime) {
        var month = currentTime.getMonth() + 1, day = currentTime.getDate(), year = currentTime.getFullYear();
        return month + "/" + day + "/" + year;
    }, currentTime = new Date(), testEvent = new Event({"start":currentTime});
    equal(dateToString(testEvent.start), dateToString(currentTime));
    testEvent = new Event({"start": new Date(2), "end": new Date(1)});
    ok(testEvent.start.getTime() < testEvent.end.getTime());
    testEvent = new Event({"start": new Date(1), "end": new Date(2)});
    ok(testEvent.start.getTime() < testEvent.end.getTime());
});