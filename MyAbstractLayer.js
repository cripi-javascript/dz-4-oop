/**
 * Created with PyCharm.
 * User: stribog
 * Date: 07.11.12
 * Time: 1:20
 * To change this template use File | Settings | File Templates.
 */

/**
 *
 *
 * Model
 *
 *
*/

/**
 * Метакласс для создания классов Model.
 *
 * @constructor
 * @param {Object}              ext                     Обект, расширяющийинформацию поведение класса или изменяющий его.
 * @return {function constructor}                       Конструктор моделей
 *
 * @example
 * var Event = Model({
 *      'default' : {
 *          'title': "myEvent"
 *      },
 *      'constructor' : function (title, start_time) {
 *          if (title) {
 *              this.title = title;
 *          }
 *          this.start = start_time;
 *      },
 *      errors: function (name) {
 *          if (name == "title" && this.get("title") === "WTF") {
 *             return "Can not create WTF event title";
 *          }
 *
 *          var error = "";
 *          if (!this.get("title")) {
 *              error += "Required title. ";
 *          }
 *          if (this.get("title") && this.get("title") === "WTF") {
 *              error += "Can not create WTF event title. ";
 *          }
 *          return error;
 *      }
 * });
 *
 * var my_event = new Event("cool skool party", 123214121);
 *
 * my_event.get("title");
 * my_event.set("countPerson", 4);
 */
var Model = function (ext) {
    var ModelConstructor = function () { // faced construct
        if (this === window) {
            throw new SyntaxError('WARNING: miss new');
        }

        this.__private_attrs = _.extend({}, this.default);
        this.constructor.apply(this, arguments);
        var errors = this.errors();
        if (errors) {
            throw new SyntaxError("Invalid value in constructor: " + errors);
        }
    };
    ModelConstructor.prototype = _.extend({}, Model.prototype, ext);

    return ModelConstructor;
};

/**
 * Коллекция, с значениями по умолчанию, для полей модели.
 */
Model.prototype.default = {};

/**
 * Конструктор, который будет вызван в моделе, порожденной конструктором Model (метоклассом).
 * Количество параметров и поведение конструктора определяется индивидуально.
 *
 * @constructor
 */
Model.prototype.constructor = function () {};

/**
 * Отдает текущее значение атрибута модели.
 *
 * @param name              Имя атрибута
 * @return {*} Значение
 *
 * @example
 * alert(my_event.get('title'));
 */
Model.prototype.get = function (name) {
    if (typeof name !== "string") {
        throw new SyntaxError("Invalid parameter");
    }

    return this.__private_attrs[name];
};

/**
 * Устанавливает значение для модели.
 * Если установлен флаг no_check_error становлен, проверка целостности не будет проводиться (функция error не будет вызвана).
 *
 * @param {String}      name                        Имя атрибута
 * @param {*}           value                       Значение атрибута
 * @param {Boolean}     no_check_error              Флаг, отвечающий за проверку ошибок
 * @return {Boolean}                                Возвращает тру, если занчение установлено
 *
 * @example
 * var my_event = new Event("cool skool party", 123214121);
 * if (my_event.set("title", "WTF")) {
 *      alert('ok');
 * } else {
 *      alert('no set =(');
 * }
 */
Model.prototype.set = function (name, value, no_check_error) {
    if (typeof name !== "string") {
        throw new SyntaxError("Invalid parameter");
    }

    var back = this.__private_attrs[name];
    this.__private_attrs[name] = value;

    if (!no_check_error) {
        var errors = this.errors(name);
        if (errors) {
            console.log('WARNING: rollback set method. validation error: ' + errors);
            this.__private_attrs[name] = back; // rollback;
            return false;
        }
    }
    return true;
};

/**
 * Устанавливает занчение для нескольких параметров.
 * Если установка хотя бы одного из значений вызовет ошибку, тогда состояние модели не будет изменено.
 *
 * @param {Object}      dict                        Коллекция параметров
 * @return {Boolean}                                Возвращает тру, если все занчения установлены
 */
Model.prototype.update = function (dict) {
    var self = this;
    var back = {};

    _.forEach(dict, function(val, key) {
        self.set(key, val, true);
        back[key] = val;
    });

    var errors = this.errors();
    if (errors) {
        console.log('WARNING: rollback update method. validation error: ' + errors);
        _.update(this.__private_attrs, back); // rollback;
        return false;
    }

    return true;
};

/**
 * Проверяет установлено ли занчение атрибута.
 *
 * @param               name                        Имя атрибута
 * @return {Boolean}                                Возваращает тру, если данный атрибут присутствует в модели
 */
Model.prototype.has = function (name) {
    if (typeof name !== "string") {
        throw new SyntaxError("Invalid parameter");
    }

    return this.__private_attrs[name] !== null;
};

/**
 * Проверка на ошибки.
 * Если параметр namе отсутствует, то будут проверены все атрибуты модели.
 *
 * @param               name                        Имя атрибута проверяемого на наличие ошибок (не обязательный параметр)
 * @return {String}                                 Строкое представление текста ошибок, если они были замечены
 */
Model.prototype.errors = function (name) { return ""; };

/*
 *
 *  Collection
 *
 */

/**
 * Метакласс для создания коллекций моделей.
 *
 * @constructor
 * @param {Object}          ext                     Обект, расширяющийинформацию поведение коллекции или изменяющий его.
 * @return {function constructor}                   Конструткор коллекций
 *
 * @example
 * var EventsCollection = new Collection({
 *      'model': new Model({
 *          'default': {
 *              'val0' : -1
            },
            'constructor': function (v) {
                if (v) this.set('val0', v);
            }
        })
 * });
 *
 *
 * var my_event_collection = new EventsCollection();
 *
 * my_event_collection.add(new my_event_collection.model());
 * my_event_collection.add(new my_event_collection.model(1));
 *
 * var my_event_collection_max_to_min_sorted = my_event_collection.sortBy(function (model) { return model.get('val0'); });
 * var my_event_collection_less_zero_filtered = my_event_collection.filter(function (model) { return model.get('val0') < 0; });
 *
 * var M = new Model({
 *     'default': {
 *         'a': 0,
 *         'b': 100
 *     },
 *     'constructor': function(a, b) {
 *         if (a) this.set('a', a);
 *         if (b) this.set('b', b);
 *     }
 * });
 *
 * var C = new Collection({
 *     'model': M,
 * });
 *
 * var c = new C([
 *     new M(1), new M(2), new M(3), new M(4), new M(5), new M(6), new M(7)
 * ]);
 *
 * c.each(function (m) {
 *     if (!m.has('b')) m.set('b', 100);
 * });
 *
 * c.map(function (m) {
 *     return m.get('a');
 * });
 *
 * c.find(function (m) {
 *     return m.get('a') % 5 == 2;
 * });
 *
 * c.all(function (m) {
 *     return m.get('b') == 100;
 * });
 *
 * c.any(function (m) {
 *     return m.get('b') == 100;
 * });
 *
 * c.include(new M(1)); // --> false
 *
 * c.contains(new M(1)); // --> false
 *
 * c.max(function (m) {
 *     return m.get('a');
 * });
 *
 * c.min(function (m) {
 *     return m.get('a');
 * });
 *
 * c.toArray();
 *
 * c.size();
 *
 * c.first();c.head();
 * c.tail();c.last();
 *
 * c.indexOf(new M(1)); // --> -1
 * c.lastIndexOf(new M(1)); // --> -1
 *
 * c.groupBy(function (m) {
 *     return m.get('a') % 3;
 * });
 *
 * c.isEmpty();
 *
 * c.foldl(function (memo, m) {
 *     return memo + m.get('a');
 * }, 0);
 *
 * c.foldr(function (memo, m) {
 *     return memo + m.get('a');
 * }, 0);
 */
var Collection = function (ext) {
    var CollectionConstructor = function (models) { // faced construct
        if (this === window) {
            throw new SyntaxError('WARNING: miss new');
        }

        this.__private_models = [];
        this.__private_constructor = arguments.callee; /* may be memory leek ? */

        if (_.isArray(models)) {
            for (var i = 0; i < models.length; i++) {
                this.add(models[i]);
            }
        }
        this.initialize.apply(this, arguments);
    };
    CollectionConstructor.prototype = _.extend({}, Collection.prototype, ext);

    return CollectionConstructor;
};

/**
 * Функция вызываемая после созания соллекции.
 */
Collection.prototype.initialize = function (models) {};

/**
 * Модель для членов коллекции
 */
Collection.prototype.model = new Model();

/**
 * Взятие элемента по индексу из коллекции.
 *
 * @param               index                   Индекс
 * @return {*}                                  Экземпляр модели (instanceof this.model)
 */
Collection.prototype.at = function(index){ return this.__private_models[index]; };

/**
 * Срез коллекции
 *
 * @param               from                    Начальный индекс
 * @param               to                      Конечный индекс
 * @return {Array}                              Срез
 */
Collection.prototype.slice = function(from, to){ return this.__private_models.slice(from, to); };

/**
 * Добавление элемента в модель
 *
 * @param {Object instanceof this.model} model_obj      Элемент, который надо добавить в воллекцию
 */
Collection.prototype.add = function(model_obj){
    if (! model_obj instanceof this.model) {
        throw new SyntaxError("can add object with strange model");
    }
    this.__private_models.push(model_obj);
};

// Underscore methods that we want to implement on the Collection.
var methods = ['each', 'map', 'find',
    'all', 'any',
    'include', 'contains',
    'max', 'min',
    'toArray',
    'size',
    'first', 'head', 'tail', 'last',
    'indexOf', 'lastIndexOf', 'groupBy',
    'isEmpty',
    'foldr', 'foldl'];

// Mix in each Underscore method as a proxy to `Collection#models`.
_.each(methods, function(method) {
    Collection.prototype[method] = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(this.__private_models);
        return _[method].apply(_, args);
    };
});

// Underscore methods
var state_change_methods = ['filter', 'sortBy'];

_.each(state_change_methods, function(method) {
    Collection.prototype[method] = function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(this.__private_models);
        return new this.__private_constructor(_[method].apply(_, args));
    };
});

/*
 *  TESTS
 */

function ok(name, val1, val2) {
    if (val1 !== val2) {
        console.log(name + " [FAILED]");
    } else {
        console.log(name + " [OK]");
    }
}

function TestModel() {
    var M0 = new Model({
        'default': {
            'val0' : -1
        },
        'constructor': function (v0) {
            if (v0) {
                this.set('val0', v0);
            }
        },
        'errors': function (name) {
            if (this.get('val0') >= 0) {
                return 'val0 can not be great than zero';
            }
            return null;
        }
    });

    var m = new M0();
    ok('Default', m.get('val0'), -1);

    m = new M0(-2);
    ok('Constructor', m.get('val0'), -2);

    m = new M0(-3);
    m.set('val9', -1);
    ok('Set and Get', m.get('val9'), -1);

    m = new M0(8888);
    ok('Validator return false', m.set('val0', 9999), false);
    ok('Validator 1', m.get('val0'), -1);
    ok('Validator return true', m.set('val0', -5), true);
    ok('Validator 2', m.get('val0'), -5);

    var M1 = new Model({
        'default': {
            'val0' : -2
        },
        'constructor': function (v0, v1) {
            if (v0) {
                this.set('val0', v0);
            }
            if (v1) {
                this.set('val1', v1);
            }
        }
    });

    m = new M1(4);
    ok('Validate new Model no error', m.get('val0'), 4);

     m = new M1();
     ok('Validate new Model Default', m.get('val0'), -2);

     m = new M1(-10, -20);
     ok('Validate new Model Constructor 1', m.get('val0'), -10);
     ok('Validate new Model Constructor 2', m.get('val1'), -20);

     m = new M1();
     m.set('val0', 9);
     m.set('val1', 9);
     ok('Validate new Model Get and Set', m.get('val0'), 9);
     ok('Validate new Model Get and Set', m.get('val1'), 9);
}
function TestCollection() {
    var M0 = new Model({
        'default': {
            'val0' : -1
        },
        'constructor': function (v0) {
            if (v0) {
                this.set('val0', v0);
            }
        },
        'errors': function (name) {
            if (this.get('val0') >= 0) {
                return 'val0 can not be great than zero';
            }
            return null;
        }
    });

    var C0 = new Collection({
        'model': M0
    });

    var c = new C0();
    ok('Collection Model test', c.model, M0);

    var m = new M0(-10000);

    c = new C0([
        new M0(-10), new M0(-20), new M0(-30), new M0(-100), new M0(-200), new M0(-300), m
    ]);
    ok('Crate collection', c.size(), 7);

    var cf = c.filter(function (val) {
        return val.get('val0') < -50;
    });
    ok('Filter collection', cf.size(), 4);
    ok('Initial collection', c.size(), 7);

    ok('Include in collection', c.include(m), true);
    ok('Max in collection', c.min(function (val) { return val.get('val0'); }), m);

    // big ---> small
    ok('SortBy collection', c.sortBy(function (val) { return (val.get('val0') % 3) * 10000 + val.get('val0') * -1; }).at(0).get('val0'), -20);

}

TestModel();
TestCollection();
