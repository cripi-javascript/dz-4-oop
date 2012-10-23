# Домашнее задание по лекции JavaScript ООП

Пользуясь наработками домашних заданий 2 и 3 необходимо сделать следующее:

  * Сделать "Абстрактный" конструктор Model представляющий из себя абстрактный объект
  и имеющий возможность работать с любыми объектами (основа любых объектов)

```javascript
var Model = function (data) {

};

/**
 * @param {Object} attributes
 *
 * @example
 *     item.set({title: "March 20", content: "In his eyes she eclipses..."});
 */
Model.prototype.set = function (attributes) {};
/**
 * @param {String} attribute
 */
Model.prototype.get = function (attribute) {};
/**
 * @param {Object} attributes
 */
Model.prototype.validate = function (attributes) {throw new Error('this is Abstract method')};
// Другие необходимые вам поля
```

  * Необходимо унаследовать от Абстракнтого конструктора Model ваш объект Event

```javascript
var Event = function (data) {
    Model.apply(this, arguments);
};
inherit(Event, Model);

/**
 * @param {Object} attributes
 */
Model.prototype.validate = function (attributes) {
    if (attributes.end < attributes.start) {
        return "can't end before it starts";
    }
};
// Другие необходимые вам поля
```

  * Cоздать абстрактную коллекцию Collection представляющую из себя набор объектов Model каждый вызов метода Collection
  **должен создавать новую коллекцию, а не изменять текущую**

```javascript
var Collection = function (items) {

};

/**
 * @return {Collection}
 */
Collection.prototype.add = function (model) {};
/**
 * @return {Collection}
 */
Collection.prototype.find = function (fieldName, fieldValue) {};
/**
 * @return {Collection}
 */
Collection.prototype.sortBy = function (fieldName) {};
// Другие необходимые вам поля
```

Что бы можно было делать так:

```javascript
new Collection()
.add(item)
.find('name', 'value')
.sortBy('name');
```

  * На основе Collection вам необходимо создать вашу коллекцию Events и добавить в нее функции, которые вы сделали в домашнем задании
  3 лекции. Каждый вызов метода Events **должен создавать новую коллекцию, а не изменять текущую**

```javascript
var Events = function (items) {
    Collection.apply(this, arguments);
};
inderit(Events, Collection);

/**
 * @return {Events}
 */
Events.prototype.findOnlyMyEvents = function () {};
/**
 * @return {Events}
 */
Events.prototype.findFutureEvents = function () {};
/**
 * @return {Events}
 */
Events.prototype.findPastEvents = function () {};
/**
 * @return {Events}
 */
Events.prototype.sortByName = function () {};
// Другие необходимые вам поля
```

Все это должно работать как-то так

```javascript
var allEvents = new Events()
.add(new Event({"name": "Pewpe", "attendees": ["me"]}))
.add([new Event, new Event, new Event]);

var allMyFutureEventsOrderedByStar = allEvents
.findFutureEvents()
.findMyEvents()
.sortByStars();
```