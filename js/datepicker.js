"use strict";

var calendarDays = 7 * 6; //6 week

var year = new Date().getFullYear();
var monthName = [{
  en: 'January',
  tc: '一月'
}, {
  en: 'February',
  tc: '二月'
}, {
  en: 'March',
  tc: '三月'
}, {
  en: 'April',
  tc: '四月'
}, {
  en: 'May',
  tc: '五月'
}, {
  en: 'June',
  tc: '六月'
}, {
  en: 'July',
  tc: '七月'
}, {
  en: 'August',
  tc: '八月'
}, {
  en: 'September',
  tc: '九月'
}, {
  en: 'October',
  tc: '十月'
}, {
  en: 'November',
  tc: '十一月'
}, {
  en: 'December',
  tc: '十二月'
}];

var Datepicker = function Datepicker(element) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  this.el = element; //options

  this.lang = options.lang || 'en';
  this.date = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    days: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  };
  this.status = 'start';
  this.selectDays = [];
  this.daysAry = [];
  this.init();
};

Datepicker.prototype.init = function () {
  var _this = this;

  _this.build();

  _this.buildDayTable();

  $(_this.el).find('.date-input-frame').on('click', function () {
    $(_this.el).find('.datepicker-panel').fadeToggle('fast');
    $(_this.el).toggleClass('active');
  });
  $(_this.el).find('.datepicker-panel').on('click', function (e) {
    e.stopPropagation();
  });

  _this.closePanel();
};

Datepicker.prototype.build = function () {
  var _this = this;

  var temp = "\n        <div class=\"date-input-frame\">\n            <div class=\"date-input\">\n                <p>date range</p>\n                <div class=\"calender-icon\">\n                    <img src=\"./images/ic-actions-calendar.png\" alt=\"\">\n                </div>\n            </div>\n        </div>\n        <div class=\"datepicker-panel\">\n            <div class=\"datepicker-panel-header\">\n                <div class=\"range-input\">\n                    <div class=\"date-input start-date-input active\">\n                        <p>From</p>\n                        <div class=\"calender-icon\">\n                            <img src=\"./images/ic-actions-calendar.png\" alt=\"\">\n                        </div>\n                    </div>\n                    <span></span>\n                    <div class=\"date-input end-date-input\">\n                        <p>To</p>\n                        <div class=\"calender-icon\">\n                            <img src=\"./images/ic-actions-calendar.png\" alt=\"\">\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"datepicker-panel-body\">\n            </div>\n            <div class=\"datepicker-panel-footer\">\n                <div class=\"btn-group\">\n                    <div class=\"cancel\">\n                        <p>Cancel</p>\n                    </div>\n                    <div class=\"apply\">\n                        Apply\n                    </div>\n                </div>\n            </div>\n        </div>\n    ";
  $(this.el).addClass('datepicker').append(temp);
};

Datepicker.prototype.buildDayTable = function () {
  var _this = this;

  _this.daysAry = [];

  for (var i = 1; i <= _this.date.days; i++) {
    _this.daysAry.push({
      "class": 'day',
      day: i,
      timestamp: new Date(_this.date.year, _this.date.month, i).getTime()
    });
  }

  _this.fillDaysAry(_this.daysAry);
};

Datepicker.prototype.fillDaysAry = function (daysAry) {
  var _this = this;

  var startDayWeek = new Date("".concat(_this.date.year, "/").concat(_this.date.month + 1, "/1")).getDay();
  var prevYM = {
    getY: function getY() {
      if (_this.date.month === 0) {
        return _this.date.year - 1;
      } else {
        return _this.date.year;
      }
    },
    getM: function getM() {
      if (_this.date.month === 0) {
        return 12;
      } else {
        return _this.date.month;
      }
    }
  };
  var prevYMDays = new Date(prevYM.getY(), prevYM.getM(), 0).getDate();

  for (var i = prevYMDays; i > prevYMDays - startDayWeek; i--) {
    daysAry.unshift({
      "class": 'old day',
      day: i,
      timestamp: ''
    });
  }

  var shortDays = calendarDays - daysAry.length;

  for (var _i = 1; _i <= shortDays; _i++) {
    daysAry.push({
      "class": 'new day',
      day: _i,
      timestamp: ''
    });
  }

  _this.buildDaysTableIn(daysAry);
};

Datepicker.prototype.buildDaysTableIn = function (daysAry) {
  var _this = this;

  var _body = document.getElementsByClassName('datepicker-panel-body')[0];
  _body.innerHTML = "\n        <table class=\"day-frame\">\n            <thead>\n                <tr>\n                    <th class=\"prev\">\n                        <img src=\"./images/ic-chevron-left.png\" alt=\"\">\n                    </th>\n                    <th class=\"MAndY\" colspan=\"5\">".concat(monthName[_this.date.month][_this.lang], " ").concat(_this.date.year, "</th>\n                    <th class=\"next\">\n                        <img src=\"./images/ic-chevron-right.png\" alt=\"\">\n                    </th>\n                </tr>\n                <tr>\n                    <th class=\"dow\">Su</th>\n                    <th class=\"dow\">Mo</th>\n                    <th class=\"dow\">Tu</th>\n                    <th class=\"dow\">We</th>\n                    <th class=\"dow\">Th</th>\n                    <th class=\"dow\">Fr</th>\n                    <th class=\"dow\">Sa</th>\n                </tr>\n            </thead>\n            <tbody>\n            </tbody>\n        </table>\n    ");

  for (var i = 0; i < 6; i++) {
    var tr = document.createElement('tr');

    for (var j = 0; j < 7; j++) {
      var td = document.createElement('td');
      var btn = document.createElement('button');
      var textNode = document.createTextNode(daysAry[i * 7 + j].day);
      td.className = daysAry[i * 7 + j]["class"];
      td.setAttribute('data-time', daysAry[i * 7 + j].timestamp);

      if (_this.selectDays.length === 2) {
        _this.selectDays.sort();

        if (daysAry[i * 7 + j].timestamp > _this.selectDays[0] && daysAry[i * 7 + j].timestamp < _this.selectDays[1]) {
          td.className = td.className + ' range';
        }
      }

      btn.appendChild(textNode);
      td.appendChild(btn);
      tr.appendChild(td);
    }

    document.querySelector('.day-frame tbody').appendChild(tr);
  }

  if (_this.selectDays.length === 2) {
    $(_this.el).find("[data-time='".concat(_this.selectDays[0], "']")).addClass('select start-day');
    $(_this.el).find("[data-time='".concat(_this.selectDays[1], "']")).addClass('select end-day');
  }

  $(_this.el).find('.day:not(.old,.new)').on('click', function () {
    var timestamp = parseInt($(this).attr('data-time'));

    if (_this.status === 'start') {
      _this.selectDays = [];

      _this.selectDays.push(timestamp);

      _this.buildDaysTableIn(daysAry);

      _this.status = 'end';
      var startDay = new Date(_this.selectDays[0]);
      $(_this.el).find("[data-time='".concat(_this.selectDays[0], "']")).addClass('select');
      $(_this.el).find('.start-date-input').find('p').text("".concat(startDay.getFullYear(), "/").concat(startDay.getMonth() + 1, "/").concat(startDay.getDate()));
      $(_this.el).find('.end-date-input').addClass('active');
    } else if (_this.status === 'end') {
      _this.selectDays.push(timestamp);

      _this.buildDaysTableIn(daysAry);

      _this.status = 'start';

      var _startDay = new Date(_this.selectDays[0]);

      var endDay = new Date(_this.selectDays[1]);
      $(_this.el).find('.start-date-input').find('p').text("".concat(_startDay.getFullYear(), "/").concat(_startDay.getMonth() + 1, "/").concat(_startDay.getDate()));
      $(_this.el).find('.end-date-input').find('p').text("".concat(endDay.getFullYear(), "/").concat(endDay.getMonth() + 1, "/").concat(endDay.getDate()));
    }
  });
  $(_this.el).find('.next').on('click', function () {
    _this.changeMonth(_this.plusM().getY(), _this.plusM().getM());
  });
  $(_this.el).find('.prev').on('click', function () {
    _this.changeMonth(_this.minusM().getY(), _this.minusM().getM());
  });
  $(_this.el).find('.MAndY').on('click', function () {
    _this.buildYearsTable(_this.date.year);
  });
  $(_this.el).find('.start-date-input.active').on('click', function () {
    $(_this.el).find('.start-date-input').find('p').text('From');
    $(_this.el).find('.end-date-input').find('p').text('To');
    $(_this.el).find('.end-date-input').removeClass('active');
    $(_this.el).find('.day').removeClass('select range');
    _this.status = 'start';
    _this.selectDays = [];
  });
  $(_this.el).find('.apply').on('click', function () {
    var startDay = $(_this.el).find('.start-date-input').find('p').text().trim();
    var endDay = $(_this.el).find('.end-date-input').find('p').text().trim();
    $(_this.el).find('.date-input-frame').find('p').text("".concat(startDay, " ~ ").concat(endDay));
    $(_this.el).find('.datepicker-panel').fadeOut('fast');
    $(_this.el).removeClass('active');
  });
  $(_this.el).find('.cancel').on('click', function () {
    $(_this.el).find('.datepicker-panel').fadeOut('fast');
    $(_this.el).removeClass('active');
  });
};

Datepicker.prototype.changeMonth = function (Y, M) {
  var _this = this;

  _this.date.year = Y;
  _this.date.month = M;
  _this.date.days = new Date(Y, M + 1, 0).getDate();

  _this.buildDayTable(_this.daysAry);
};

Datepicker.prototype.plusM = function () {
  var _this = this;

  return {
    getY: function getY() {
      if (_this.date.month === 11) {
        return _this.date.year + 1;
      } else {
        return _this.date.year;
      }
    },
    getM: function getM() {
      if (_this.date.month === 11) {
        return 0;
      } else {
        return _this.date.month + 1;
      }
    }
  };
};

Datepicker.prototype.minusM = function () {
  var _this = this;

  return {
    getY: function getY() {
      if (_this.date.month === 0) {
        return _this.date.year - 1;
      } else {
        return _this.date.year;
      }
    },
    getM: function getM() {
      if (_this.date.month === 0) {
        return 11;
      } else {
        return _this.date.month - 1;
      }
    }
  };
};

Datepicker.prototype.buildYearsTable = function (Y) {
  var _this = this;

  var _body = document.getElementsByClassName('datepicker-panel-body')[0];
  _body.innerHTML = "\n        <table class=\"year-frame\">\n            <thead>\n                <tr>\n                    <th colspan=\"6\">\n                        <div class=\"thead\">\n                            <div class=\"back\">back</div>\n                            <div class=\"prev\">\n                                <img src=\"./images/ic-chevron-left.png\" alt=\"\">\n                            </div>\n                            <div colspan=\"2\">".concat(Y - 10, " ~ ").concat(Y + 10, "</div>\n                            <div class=\"next\">\n                                <img src=\"./images/ic-chevron-right.png\" alt=\"\">\n                            </div>\n                            <div class=\"empty\">back</div>\n                        </div>\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n            </tbody>\n        </table>\n    ");

  for (var i = 0; i < 7; i++) {
    var tr = document.createElement('tr');

    for (var j = 0; j < 3; j++) {
      var td = document.createElement('td');
      var div = document.createElement('div');

      var _year = Y - 10 + (i * 3 + j);

      var textNode = document.createTextNode(_year);

      if (_year === Y) {
        td.className = 'year select';
      } else {
        td.className = 'year';
      }

      div.appendChild(textNode);
      td.setAttribute('colspan', '2');
      td.setAttribute('data-year', _year);
      td.appendChild(div);
      tr.appendChild(td);
    }

    document.querySelector('.year-frame tbody').appendChild(tr);
  }

  $(_this.el).find('.btn-group').hide();
  $(_this.el).find('.year-frame').find('.back').on('click', function () {
    _this.buildDayTable();

    $(_this.el).find('.btn-group').show();
  });
  $(_this.el).find('.year-frame').find('.year').on('click', function () {
    var selectY = parseInt($(this).attr('data-year'));

    _this.buildMonthTable(selectY);
  });
  $(_this.el).find('.year-frame').find('.prev').on('click', function () {
    _this.buildYearsTable(Y - 20);
  });
  $(_this.el).find('.year-frame').find('.next').on('click', function () {
    _this.buildYearsTable(Y + 20);
  });
};

Datepicker.prototype.buildMonthTable = function (Y) {
  var _this = this;

  var _body = document.getElementsByClassName('datepicker-panel-body')[0];
  _body.innerHTML = "\n        <table class=\"month-frame\">\n            <thead>\n                <tr>\n                    <th colspan=\"6\">\n                        <div class=\"thead\">\n                            <div class=\"back\">back</div>\n                            <div>Month</div>\n                            <div class=\"empty\">back</div>\n                        </div>\n                    </th>\n                </tr>\n            </thead>\n            <tbody>\n            </tbody>\n        </table>\n    ";

  for (var i = 0; i < 6; i++) {
    var tr = document.createElement('tr');

    for (var j = 0; j < 2; j++) {
      var td = document.createElement('td');
      var div = document.createElement('div');
      var textNode = document.createTextNode(monthName[i * 2 + j].en);

      if (i * 2 + j === _this.date.month) {
        td.className = 'month select';
      } else {
        td.className = 'month';
      }

      div.appendChild(textNode);
      td.setAttribute('colspan', '3');
      td.setAttribute('data-month', i * 2 + j);
      td.appendChild(div);
      tr.appendChild(td);
    }

    document.querySelector('.month-frame tbody').appendChild(tr);
  }

  $(_this.el).find('.month-frame').find('.back').on('click', function () {
    _this.buildYearsTable(Y);
  });
  $(_this.el).find('.month-frame').find('.month').on('click', function () {
    var selectM = parseInt($(this).attr('data-month'));
    _this.date.year = Y;
    _this.date.month = selectM;
    _this.date.days = new Date(Y, selectM + 1, 0).getDate();

    _this.buildDayTable(_this.daysAry);

    $(_this.el).find('.btn-group').show();
  });
};

Datepicker.prototype.closePanel = function () {
  $(document).on('click', function (e) {
    if (!e.target.matches('.datepicker, .datepicker *')) {
      $('.datepicker-panel').fadeOut('fast');
      $('.datepicker').removeClass('active');
    }
  });
};