/*
* Создается коллекция типа Events из объектов типа Event. 
* 
* В консоль выводится всевозможная информация об объектах в коллекции
*/
var allEvents = new Events();
var testEvent= new Event({"name": "Pewpe", "start": "11.12.2012", "end": "13.12.2012"});
var Work = new Event({
    "name": "Совещание",
    "start": "2012-10-10",
    "end": "2012-10-10",
    "place": "Луначарского 92, кб.31",
    "info": "Будут обсуждаться вопросы...",
    "reminder": "За день до встречи",
    "party": "участвую"});
var NewYear = new Event({
     "name": "Праздник",
     "start": "2012-12-10",
     "end": "2012-12-10",
     "place": "Луначарского 92, кб.31",
     "info": "Всем быть в костюмах...",
     "reminder": "За неделю",
     "type": "Отдых",
     "party": "участвую"});
var study = new Event({
     "name": "Конференция",
     "start": "2012-11-24",
     "end": "2012-11-24",
     "place": "Луначарского 92, кб.31",
     "info": "Анализ биологических последовательностей",
     "type": "Дела",
     "party": "участвую"});
var conf = new Event({
      "name": "Конференция",
      "start": "2012-12-08",
      "end": "2012-12-08",
      "place": "Луначарского 92, кб.31",
      "info": "Матроиды и графы",
      "reminder": "За день",
      "type": "Дела",
      "party": "не участвую"});
var Sport = new Event({
       "name": "Дополнительные тренировки",
       "start": "2012-12-10",
       "end": "2012-12-12",
       "place": "Луначарского 92, кб.31",
       "info": "Ура! У вас есть возможность посетить дополнительные тренировки",
       "reminder": "За час",
       "type": "Отдых",
       "party": "участвую"});
									
allEvents.add([Sport, conf, study, NewYear, Work]);
console.log('Встречи, отсортированные по дате:', allEvents.sortToDate());
console.log('Предстоящие события:', allEvents.filterToDate(1));
console.log('События в которых я участвую:', allEvents.FilterToParty(1));
