test('Create event', function () {
    "use strict";
    var dateToString = function (currentTime) {
        var month = currentTime.getMonth() + 1, day = currentTime.getDate(), year = currentTime.getFullYear();
        return month + "/" + day + "/" + year;
    }, currentTime = new Date(), testEvent = new Event({"start":currentTime});
    equal(dateToString(testEvent.start), dateToString(currentTime));
    testEvent = new Event({"start": new Date(1), "end": new Date(2)});
    ok(testEvent.start.getTime() < testEvent.end.getTime());
    
    throws(
        function (){new Event({"start": new Date(2), "end": new Date(1)})},
        'Error("Даты начала и конца перепутаны")'
    );
    throws(
        function (){new Event({"cost":-1})},
        'Error("Цена за вход не может быть отрицательной")'
    );
    throws(
        function (){new Event({"parties":"NoArray"})},
        'Error("Участники - это массив")'
    );
    throws(
        function (){new Event({"parties":["sds"]})},        	
        'Error("У одного из участников нет поля <ИМЯ>")'
    );
    equal(new Event({"stars":2}).stars, 2,"При присваивании звезд произошла ошибка" );
    equal(new Event({"stars":2.1}).stars, 2,"Функция устанавливающая звездочки не сработала" );    
    
    
});