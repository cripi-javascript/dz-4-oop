test("Testing qunit", function() {
    "use strict";

    ok("1" === "1", "Passed!");
});

test("Creating absract object Model", function () {
    "use strict";

    var item = new Model({title: "March 20", content: "In his eyes she eclipses..."});
    ok(item.title === "March 20", "Passed!");
});


test("Testing setter for Model", function () {
    "use strict";

    var item = new Model();
    item.set({title: "March 20", content: "In his eyes she eclipses..."});
    ok(item.title === "March 20", "Passed!");
});

test("Testing getter for Model", function () {
    "use strict";

    var item = new Model();
    item.set({title: "March 20", content: "In his eyes she eclipses..."});

    ok(item.get("title") === "March 20", "Passed!");
});

test("Create object Event using Model constructor", function () {
    "use strict";

    var item = new Event({title: "March 20", content: "In his eyes she eclipses..."});

    ok(item.title === "March 20", "Passed!");
});

test("Testing inherits Event from Model", function () {
    "use strict";

    var item = new Event({title: "March 20", content: "In his eyes she eclipses..."});

    ok(item.get("title") === "March 20", "Passed!");
});

test("Test for validate method", function () {
    "use strict";

    var item = new Event({name: "hello", start: new Date("2012-10-20 10:00:00")});
    var valide = item.validate();

    ok(valide.name === "hello", "Passed!");
});

