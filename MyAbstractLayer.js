/**
 * Created with PyCharm.
 * User: stribog
 * Date: 07.11.12
 * Time: 1:20
 * To change this template use File | Settings | File Templates.
 */

// Model interface
var Model = function (attrs) {};
Model.prototype.default = {};
Model.prototype.constructor = function () { throw new SyntaxError("no implement"); }; // void
Model.prototype.get = function () { throw new SyntaxError("no implement"); }; // true / false
Model.prototype.set = function () { throw new SyntaxError("no implement"); }; // true / false
Model.prototype.has = function () { throw new SyntaxError("no implement"); }; // true / false
Model.prototype.validate = function () { throw new SyntaxError("no implement"); }; // true / false
//Model.prototype.extend = Model2;
//Model.prototype.super = function () {}; // void

function TestModel() {
    function ok(name, val1, val2) {
        if (val1 !== val2) {
            console.log(name + " [FAILED]");
        } else {
            console.log(name + " [OK]");
        }
    }

    var M0 = new Model({
        'default': {
            'val0' : -1
        },
        'constructor': function (v0) {
            if (v0) {
                this.set('val0', v0);
            }
        },
        'validate': function () {
            return this.get('val0') < 0;
        }
    });
    var M1 = new Model({
        'default' : {
            'val1': 1,
            'val2': 2
        },
        'constructor' : function (v0, v2) {
            this.super(v0);
            if (v2) {
                this.set('val2', v2);
            }
        },
        'validate' : function() {
            return this.get('val1') < 5 && this.get('val2') < 5;
        },
        'extend' : M0
    });

    var m = new M0();
    ok('Default', m.get('val0'), -1);

    m = new M0(-2);
    ok('Constructor', m.get('val0'), -2);

    m = new M0(-3);
    m.set('val9', -1);
    ok('Set and Get', m.get('val9'), -1);

    m = new M0(8888);
    m.set('val0', 9999);
    ok('Validator', m.get('val0'), -1);

    m = new M1();
    ok('Parent Default', m.get('val0'), -1);

    m = new M1(-10, -20);
    ok('Parent Constructor 1', m.get('val0'), -10);
    ok('Parent Constructor 2', m.get('val2'), -20);

    m = new M1();
    m.set('val0', 9);
    m.set('val1', 9);
    ok('Parent Get and Set', m.get('val0'), -1);
    ok('Parent Get and Set', m.get('val1'), 1);
}