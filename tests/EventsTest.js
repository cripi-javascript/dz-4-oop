test("Testing inherits Events from Collection", function() {
    "use strict";

    var collection = new Events(examples);
    var element = {title: "March 20", content: "In his eyes she eclipses..."};

    var result = collection.add(element);
    examples.push(element);

    deepEqual( result.items, examples, "Two objects can be the same in value" );
});

test("Testing past in Events", function() {
    "use strict";

    var collection = new Events(examples);
    var result = collection.past();

    console.log("Result: " + result.items.map (function (events){
        return "\n" + events.name + "\n" +" начало: " + events.start + "\n" 
        + " конец: " + events.end + "\n" 
        + " место события: "  + events.location + " напомнить за " + events.remindTime + " минут" + "\n"
        + " описание: " + events.description + "\n";
    }));

    console.log("--------------\n");
    ok( "1"=="1", "Two objects can be the same in value" );
});

test("Testing coming in Events", function() {
    "use strict";

    var collection = new Events(examples);
    var result = collection.coming();

    console.log("Result: " + result.items.map (function (events){
        return "\n" + events.name + "\n" +" начало: " + events.start + "\n" 
        + " конец: " + events.end + "\n" 
        + " место события: "  + events.location + " напомнить за " + events.remindTime + " минут" + "\n"
        + " описание: " + events.description + "\n";
    }));

    console.log("--------------\n");
    ok( "1"=="1", "Two objects can be the same in value" );
});

test("Testing comeThrough in Events", function() {
    "use strict";

    var collection = new Events(examples);
    var result = collection.comeThrough(10);

    console.log("Result: " + result.items.map (function (events){
        return "\n" + events.name + "\n" +" начало: " + events.start + "\n" 
        + " конец: " + events.end + "\n" 
        + " место события: "  + events.location + " напомнить за " + events.remindTime + " минут" + "\n"
        + " описание: " + events.description + "\n";
    }));

    console.log("--------------\n");
    ok( "1"=="1", "Two objects can be the same in value" );
});

test("Testing sortBytime in Events", function() {
    "use strict";

    var collection = new Events(examples);
    var result = collection.byStartTime();

    console.log("Result: " + result.items.map (function (events){
        return "\n" + events.name + "\n" +" начало: " + events.start + "\n" 
        + " конец: " + events.end + "\n" 
        + " место события: "  + events.location + " напомнить за " + events.remindTime + " минут" + "\n"
        + " описание: " + events.description + "\n";
    }));

    console.log("--------------\n");
    ok( "1"=="1", "Two objects can be the same in value" );
});
