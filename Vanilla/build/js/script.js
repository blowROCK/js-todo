(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calendar = void 0;

var _calenderItem = require("./calender-item");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Calendar = /*#__PURE__*/function () {
  function Calendar(ids) {
    _classCallCheck(this, Calendar);

    this._curr = new Date();
    this._seletedDate = this._curr;
    this.domId = ids;
    this.dayWeekEng = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.monthNameEng = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December"
    };
    document.getElementById(this.domId.left).addEventListener('click', this.onClickGoPrevWeek.bind(this));
    document.getElementById(this.domId.right).addEventListener('click', this.onClickGoNextWeek.bind(this));
    document.getElementById(this.domId.week).addEventListener('click', this.onClickDates.bind(this));
    this._dateChangeEvent = null;
    this.updateCalendar();
  }

  _createClass(Calendar, [{
    key: "isToday",
    value: function isToday(dateData) {
      return this._curr.toDateString() === dateData.toDateString();
    }
  }, {
    key: "getDayOfThisWeek",
    value: function getDayOfThisWeek(index) {
      var time = this.selectedDate;
      var date = this.today - this.dayOfWeek + index;
      return new Date(time.setDate(date));
    }
  }, {
    key: "addSelectedClass",
    value: function addSelectedClass() {
      var deleteClassLi = document.querySelector('.SELECTED');
      if (deleteClassLi) deleteClassLi.classList.remove('SELECTED');
      var selectLi = document.querySelector("#".concat(this.domId.week, " #dates[date=\"").concat(this.yyyymmdd, "\"]"));
      selectLi.classList.add("SELECTED");
    }
  }, {
    key: "updateCalendar",
    value: function updateCalendar() {
      var week_dom = document.getElementById(this.domId.week);
      week_dom.innerHTML = '';
      document.getElementById(this.domId.year).innerHTML = '';
      document.getElementById(this.domId.month).innerHTML = this.monthNameEng[this.month];
      this.getAllDatesElement().forEach(function (el) {
        week_dom.insertAdjacentHTML("beforeend", el);
      });
    }
  }, {
    key: "getAllDatesElement",
    value: function getAllDatesElement() {
      var _this = this;

      return this.dayWeekEng.map(function (day, index) {
        var tempDay = _this.getDayOfThisWeek(index);

        var className = _this.isToday(tempDay) ? "TODAY SELECTED" : "";
        return (0, _calenderItem.getCalendarItem)(day, tempDay, className);
      });
    }
  }, {
    key: "onClickGoPrevWeek",
    value: function onClickGoPrevWeek(e) {
      this.selectedDate = this.getDayOfThisWeek(-1);

      this._dateChangeEvent();

      this.updateCalendar();
      this.addSelectedClass();
    }
  }, {
    key: "onClickGoNextWeek",
    value: function onClickGoNextWeek() {
      this.selectedDate = this.getDayOfThisWeek(+7);

      this._dateChangeEvent();

      this.updateCalendar();
      this.addSelectedClass();
    }
  }, {
    key: "onClickDates",
    value: function onClickDates(e) {
      var target = e.target.closest('#dates');
      if (!target) return false;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      this.selectedDate = target.getAttribute('date');

      this._dateChangeEvent();

      this.updateCalendar();
      this.addSelectedClass();
    }
  }, {
    key: "setDateChangeEvent",
    set: function set(func) {
      this._dateChangeEvent = func;
    }
  }, {
    key: "selectedDate",
    set: function set(date) {
      this._seletedDate = new Date(date);
    },
    get: function get() {
      return new Date(this._seletedDate);
    }
  }, {
    key: "curr",
    get: function get() {
      return this._curr;
    }
  }, {
    key: "year",
    get: function get() {
      return this._seletedDate.getFullYear();
    }
  }, {
    key: "month",
    get: function get() {
      return this._seletedDate.getMonth() + 1;
    }
  }, {
    key: "today",
    get: function get() {
      return this._seletedDate.getDate();
    }
  }, {
    key: "dayOfWeek",
    get: function get() {
      return this._seletedDate.getDay();
    }
  }, {
    key: "yyyymmdd",
    get: function get() {
      return "".concat(this.year, "-").concat(("0" + this.month).slice(-2), "-").concat(("0" + this.today).slice(-2));
    }
  }]);

  return Calendar;
}();

exports.Calendar = Calendar;

},{"./calender-item":4}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTodoItem = void 0;

var getTodoItem = function getTodoItem(el, index) {
  return "<li id=\"todoItem\" class=\"".concat(el.isDone ? 'done' : 'do', "\" data-order=\"").concat(index, "\">\n\t\t\t\t<span data-action=\"onToggleDone\" class=\"fa ").concat(el.isDone ? 'fa-check-circle-o' : 'fa-circle-o', "\"></span>\n\t\t\t\t<span data-action=\"onToggleImportant\" class=\"fa ").concat(el.isImportant ? 'fa-star' : 'fa-star-o', "\"></span>\n\t\t\t\t<div data-action=\"onTodoItemModify\" >").concat(el.contents, "</div>\n\t\t\t</li>");
};

exports.getTodoItem = getTodoItem;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Todo = void 0;

var _modal = require("./modal");

var _TodoItem = require("./Todo-item");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Storage = window.localStorage;

var Todo = /*#__PURE__*/function () {
  function Todo(yyyymmdd) {
    _classCallCheck(this, Todo);

    this._todoList = this.getStorage(yyyymmdd);
    this._listChangedEvent = null;
    this.doUl = document.getElementById('doUl');
    this.doneUl = document.getElementById('doneUl');
    this.doUl.addEventListener('click', this.onClickTodoList.bind(this));
    this.doneUl.addEventListener('click', this.onClickTodoList.bind(this));
    this.updateAllList('get', yyyymmdd);
  }

  _createClass(Todo, [{
    key: "toggleDone",
    value: function toggleDone(index) {
      this._todoList[index].isDone = !this._todoList[index].isDone;
    }
  }, {
    key: "toggleImportant",
    value: function toggleImportant(index) {
      this._todoList[index].isImportant = !this._todoList[index].isImportant;
    }
  }, {
    key: "addItem",
    value: function addItem(_ref) {
      var contents = _ref.contents,
          isDone = _ref.isDone,
          isImportant = _ref.isImportant;

      this._todoList.push({
        contents: contents,
        isDone: isDone,
        isImportant: isImportant
      });
    }
  }, {
    key: "modifyItem",
    value: function modifyItem(index, _ref2) {
      var contents = _ref2.contents;
      this._todoList[index].contents = contents;
    }
  }, {
    key: "deleteItem",
    value: function deleteItem(index) {
      this._todoList.splice(index, 1);
    }
  }, {
    key: "saveStorage",
    value: function saveStorage(yyyymmdd) {
      Storage.setItem("Todo.list-" + yyyymmdd, JSON.stringify(this._todoList));
    }
  }, {
    key: "getStorage",
    value: function getStorage(yyyymmdd) {
      var storageList = Storage.getItem("Todo.list-" + yyyymmdd);
      if (storageList === null) return [];
      return JSON.parse(storageList);
    }
  }, {
    key: "updateAllList",
    value: function updateAllList(type, yyyymmdd) {
      var _this = this;

      if (type === 'get') this.setList = this.getStorage(yyyymmdd);
      this.doneUl.innerHTML = '';
      this.doUl.innerHTML = '';

      this._todoList.forEach(function (el, index) {
        var liTag = htmlToElements((0, _TodoItem.getTodoItem)(el, index));

        if (el.isDone) {
          _this.doneUl.appendChild(liTag);
        } else if (el.isImportant) {
          _this.doUl.insertBefore(liTag, _this.doUl.childNodes[0]);
        } else {
          _this.doUl.appendChild(liTag);
        }
      });

      if (type === 'save') this.saveStorage(yyyymmdd);
    }
  }, {
    key: "onClickTodoList",
    value: function onClickTodoList(e) {
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      var action = e.target.dataset.action;
      var li = e.target.closest('#todoItem');
      var order = li.dataset.order;
      this[action](order);
    }
  }, {
    key: "onToggleDone",
    value: function onToggleDone(order) {
      this.toggleDone(order);

      this._listChangedEvent();
    }
  }, {
    key: "onToggleImportant",
    value: function onToggleImportant(order) {
      this.toggleImportant(order);

      this._listChangedEvent();
    }
  }, {
    key: "onTodoItemModify",
    value: function onTodoItemModify(order) {
      var _this2 = this;

      (0, _modal.showModal)('modify', this._todoList[order].contents).then(function (resolve) {
        if (resolve.type === 'success') {
          _this2.modifyItem(order, {
            contents: resolve.body
          });
        } else if (resolve.type === 'delete') {
          _this2.deleteItem(order);
        }

        _this2._listChangedEvent();
      })["catch"](function (err) {});
      return false;
    }
  }, {
    key: "setListChangedEvent",
    set: function set(callback) {
      this._listChangedEvent = callback;
    }
  }, {
    key: "setList",
    set: function set(list) {
      this._todoList = list;
    }
  }, {
    key: "getList",
    get: function get() {
      return this._todoList;
    }
  }]);

  return Todo;
}(); // 유틸


exports.Todo = Todo;

function htmlToElements(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}

},{"./Todo-item":2,"./modal":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCalendarItem = void 0;

var getCalendarItem = function getCalendarItem(day, tempDay, className) {
  return "<li id=\"dates\" class=\"".concat(className, "\" date=\"").concat(tempDay.toISOString().slice(0, 10), "\">\n                <div>").concat(day, "</div>\n                <div>").concat(tempDay.getDate(), "</div>\n              </li>");
};

exports.getCalendarItem = getCalendarItem;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setModal = exports.showModal = void 0;

var showModal = function showModal(type) {
  var contents = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var modal = document.getElementById('modal');
  var ta = document.getElementById('textarea');
  modal.classList.add('active', type);
  ta.value = contents;
  return new Promise(function (resolve) {
    document.querySelector('#submit').onclick = function () {
      if (!isInvalidChar(ta.value) && ta.value.length < 120) {
        resolve({
          type: 'success',
          body: ta.value
        });
        hideModal();
      }
    };

    document.querySelector('#delete').onclick = function () {
      resolve({
        type: 'delete'
      });
      hideModal();
    };

    document.querySelector('.modal__back').onclick = function () {
      resolve({
        type: 'close',
        once: true
      });
      hideModal();
    };
  });
};

exports.showModal = showModal;

var hideModal = function hideModal() {
  var modal = document.getElementById('modal');
  var ta = document.getElementById('textarea');
  var tip = document.getElementById('tooltip');
  modal.classList.remove('active', 'modify', 'create');
  ta.value = '';
  tip.innerHTML = '';
};

var setTooltip = function setTooltip(message) {
  var tip = document.getElementById('tooltip');
  tip.innerHTML = message;
};

var setModal = function setModal(id) {
  document.getElementById(id).addEventListener('input', function (event) {
    var val = event.currentTarget.value;

    if (isInvalidChar(val)) {
      setTooltip('!@#$%^&*()_+=,.? 를 제외한 특수 문자는 금지입니다.');
    } else if (val.length >= 120) {
      setTooltip("최대 글자수 120자를 넘길 수 없습니다.");
    } else {
      setTooltip('');
    }
  }, false);
};

exports.setModal = setModal;

var isInvalidChar = function isInvalidChar(str) {
  var rex1 = /[^a-z|A-Z|가-힣|ㄱ-ㅎㅏ-ㅣ0-9|!@#$%^&*()_+=,.?|\n\s\r]/g;
  return rex1.test(str);
};

},{}],6:[function(require,module,exports){
"use strict";

var _modal = require("./modal.js");

var _Calendar = require("./Calendar");

var _Todo = require("./Todo");

document.addEventListener("DOMContentLoaded", function () {
  var cal = new _Calendar.Calendar({
    year: "year",
    month: "month",
    week: "week",
    left: 'left',
    right: 'right'
  });
  var myTodo = new _Todo.Todo(cal.yyyymmdd);
  (0, _modal.setModal)("textarea");

  document.getElementById("addItemBtn").onclick = function () {
    (0, _modal.showModal)('create').then(function (resolve) {
      if (resolve.type !== 'success') return;
      myTodo.addItem({
        contents: resolve.body,
        isDone: false,
        isImportant: false
      });
      myTodo.updateAllList('save', cal.yyyymmdd);
    });
  };

  cal.setDateChangeEvent = function () {
    myTodo.updateAllList('get', cal.yyyymmdd);
  };

  myTodo.setListChangedEvent = function () {
    myTodo.updateAllList('save', cal.yyyymmdd);
  };
});

},{"./Calendar":1,"./Todo":3,"./modal.js":5}]},{},[6]);
