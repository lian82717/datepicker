const calendarDays = 7 * 6; //6 week

let year = new Date().getFullYear();
let monthName = [
    {
        en: 'January',
        tc: '一月',
    },
    {
        en: 'February',
        tc: '二月',
    },
    {
        en: 'March',
        tc: '三月',
    },
    {
        en: 'April',
        tc: '四月',
    },
    {
        en: 'May',
        tc: '五月',
    },
    {
        en: 'June',
        tc: '六月',
    },
    {
        en: 'July',
        tc: '七月',
    },
    {
        en: 'August',
        tc: '八月',
    },
    {
        en: 'September',
        tc: '九月',
    },
    {
        en: 'October',
        tc: '十月',
    },
    {
        en: 'November',
        tc: '十一月',
    },
    {
        en: 'December',
        tc: '十二月',
    },
]

let Datepicker = function(element, options = {}){
    this.el = element;

    //options
    this.lang = options.lang || 'en';

    this.date = {
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        days: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
    }
    this.status = 'start';
    this.selectDays = [];
    this.daysAry = []
    this.init();
}

Datepicker.prototype.init = function(){
    const _this = this;
    _this.build();
    _this.buildDayTable();
    $(_this.el).find('.date-input-frame').on('click', function(){
        $(_this.el).find('.datepicker-panel').fadeToggle('fast');
        $(_this.el).toggleClass('active');
    })
    $(_this.el).find('.datepicker-panel').on('click', function(e){
        e.stopPropagation();
    })
    _this.closePanel();
}

Datepicker.prototype.build = function(){
    let _this = this;
    const temp = `
        <div class="date-input-frame">
            <div class="date-input">
                <p>date range</p>
                <div class="calender-icon">
                    <img src="./images/ic-actions-calendar.png" alt="">
                </div>
            </div>
        </div>
        <div class="datepicker-panel">
            <div class="datepicker-panel-header">
                <div class="range-input">
                    <div class="date-input start-date-input active">
                        <p>From</p>
                        <div class="calender-icon">
                            <img src="./images/ic-actions-calendar.png" alt="">
                        </div>
                    </div>
                    <span></span>
                    <div class="date-input end-date-input">
                        <p>To</p>
                        <div class="calender-icon">
                            <img src="./images/ic-actions-calendar.png" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="datepicker-panel-body">
            </div>
            <div class="datepicker-panel-footer">
                <div class="btn-group">
                    <div class="cancel">
                        <p>Cancel</p>
                    </div>
                    <div class="apply">
                        Apply
                    </div>
                </div>
            </div>
        </div>
    `
    $(this.el).addClass('datepicker').append(temp);
}

Datepicker.prototype.buildDayTable = function(){
    let _this = this;
    _this.daysAry = [];
    for(let i = 1; i <= _this.date.days; i ++) {
        _this.daysAry.push({
            class: 'day',
            day: i,
            timestamp: new Date(_this.date.year, _this.date.month, i).getTime()
        });
    }
    _this.fillDaysAry(_this.daysAry);
}

Datepicker.prototype.fillDaysAry = function(daysAry){
    const _this = this;
    let startDayWeek = new Date(`${_this.date.year}/${_this.date.month + 1}/1`).getDay();
    let prevYM = {
        getY: function(){
            if(_this.date.month === 0) {
                return _this.date.year - 1;
            } else {
                return _this.date.year;
            }
        },
        getM: function(){
            if(_this.date.month === 0) {
                return 12;
            } else {
                return _this.date.month
            }
        }
    }
    let prevYMDays = new Date(prevYM.getY(), prevYM.getM(), 0).getDate();
    for(let i = prevYMDays; i > prevYMDays - startDayWeek; i--){
        daysAry.unshift({
            class: 'old day',
            day: i,
            timestamp: ''
        })
    }
    let shortDays = calendarDays - daysAry.length; 
    for(let i = 1; i <= shortDays; i ++){
        daysAry.push({
            class: 'new day',
            day: i,
            timestamp: ''
        });
    }

    _this.buildDaysTableIn(daysAry);
}

Datepicker.prototype.buildDaysTableIn = function(daysAry){
    const _this = this;
    let _body = document.getElementsByClassName('datepicker-panel-body')[0];
    _body.innerHTML = `
        <table class="day-frame">
            <thead>
                <tr>
                    <th class="prev">
                        <img src="./images/ic-chevron-left.png" alt="">
                    </th>
                    <th class="MAndY" colspan="5">${monthName[_this.date.month][_this.lang]} ${_this.date.year}</th>
                    <th class="next">
                        <img src="./images/ic-chevron-right.png" alt="">
                    </th>
                </tr>
                <tr>
                    <th class="dow">Su</th>
                    <th class="dow">Mo</th>
                    <th class="dow">Tu</th>
                    <th class="dow">We</th>
                    <th class="dow">Th</th>
                    <th class="dow">Fr</th>
                    <th class="dow">Sa</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `;
    for(let i = 0; i < 6; i ++){
        let tr = document.createElement('tr');
        for(let j = 0; j < 7; j ++) {
            let td = document.createElement('td');
            let btn = document.createElement('button');
            let textNode = document.createTextNode(daysAry[i*7+j].day);
            td.className = daysAry[i*7+j].class;
            td.setAttribute('data-time',daysAry[i*7+j].timestamp);
            if(_this.selectDays.length === 2) {
                _this.selectDays.sort();
                if(daysAry[i*7+j].timestamp > _this.selectDays[0] && daysAry[i*7+j].timestamp < _this.selectDays[1]) {
                    td.className = td.className + ' range';
                }
            }
            btn.appendChild(textNode);
            td.appendChild(btn);
            tr.appendChild(td);
        }
        document.querySelector('.day-frame tbody').appendChild(tr);
    }

    if(_this.selectDays.length === 2) {
        $(_this.el).find(`[data-time='${_this.selectDays[0]}']`).addClass('select start-day');
        $(_this.el).find(`[data-time='${_this.selectDays[1]}']`).addClass('select end-day');
    }

    $(_this.el).find('.day:not(.old,.new)').on('click', function(){
        let timestamp = parseInt($(this).attr('data-time'));
        if(_this.status === 'start') {
            _this.selectDays = [];
            _this.selectDays.push(timestamp);
            _this.buildDaysTableIn(daysAry);
            _this.status = 'end';
            
            let startDay = new Date(_this.selectDays[0]);
            $(_this.el).find(`[data-time='${_this.selectDays[0]}']`).addClass('select');
            $(_this.el).find('.start-date-input').find('p').text(`${startDay.getFullYear()}/${startDay.getMonth() + 1}/${startDay.getDate()}`);
            $(_this.el).find('.end-date-input').addClass('active');
        } else if (_this.status === 'end') {
            _this.selectDays.push(timestamp);
            _this.buildDaysTableIn(daysAry);
            _this.status = 'start';

            let startDay = new Date(_this.selectDays[0]);
            let endDay = new Date(_this.selectDays[1]);
            $(_this.el).find('.start-date-input').find('p').text(`${startDay.getFullYear()}/${startDay.getMonth() + 1}/${startDay.getDate()}`);
            $(_this.el).find('.end-date-input').find('p').text(`${endDay.getFullYear()}/${endDay.getMonth() + 1}/${endDay.getDate()}`);
        }
    })

    $(_this.el).find('.next').on('click', function(){
        _this.changeMonth(_this.plusM().getY(), _this.plusM().getM());
    })

    $(_this.el).find('.prev').on('click', function(){
        _this.changeMonth(_this.minusM().getY(), _this.minusM().getM());
    })

    $(_this.el).find('.MAndY').on('click', function(){
        _this.buildYearsTable(_this.date.year);
    })

    $(_this.el).find('.start-date-input.active').on('click', function(){
        $(_this.el).find('.start-date-input').find('p').text('From');
        $(_this.el).find('.end-date-input').find('p').text('To');
        $(_this.el).find('.end-date-input').removeClass('active');
        $(_this.el).find('.day').removeClass('select range');
        _this.status = 'start';
        _this.selectDays = [];
    })

    $(_this.el).find('.apply').on('click', function(){
        let startDay = $(_this.el).find('.start-date-input').find('p').text().trim();
        let endDay = $(_this.el).find('.end-date-input').find('p').text().trim();
        $(_this.el).find('.date-input-frame').find('p').text(`${startDay} ~ ${endDay}`);
        $(_this.el).find('.datepicker-panel').fadeOut('fast');
        $(_this.el).removeClass('active');
    })

    $(_this.el).find('.cancel').on('click', function(){
        $(_this.el).find('.datepicker-panel').fadeOut('fast');
        $(_this.el).removeClass('active');
    })
}

Datepicker.prototype.changeMonth = function(Y, M){
    const _this = this;
    _this.date.year = Y;
    _this.date.month = M;
    _this.date.days = new Date(Y, M+1, 0).getDate();
    _this.buildDayTable(_this.daysAry);
}

Datepicker.prototype.plusM = function(){
    const _this = this;
    return {
        getY: function(){
            if(_this.date.month === 11) {
                return _this.date.year + 1;
            } else {
                return _this.date.year;
            }
        },
        getM: function(){
            if(_this.date.month === 11) {
                return 0;
            } else {
                return _this.date.month + 1
            }
        }
    }
}

Datepicker.prototype.minusM = function(){
    const _this = this;
    return {
        getY: function(){
            if(_this.date.month === 0) {
                return _this.date.year - 1;
            } else {
                return _this.date.year;
            }
        },
        getM: function(){
            if(_this.date.month === 0) {
                return 11;
            } else {
                return _this.date.month - 1
            }
        }
    }
}

Datepicker.prototype.buildYearsTable = function(Y){
    const _this = this;
    let _body = document.getElementsByClassName('datepicker-panel-body')[0];
    _body.innerHTML = `
        <table class="year-frame">
            <thead>
                <tr>
                    <th colspan="6">
                        <div class="thead">
                            <div class="back">back</div>
                            <div class="prev">
                                <img src="./images/ic-chevron-left.png" alt="">
                            </div>
                            <div colspan="2">${Y - 10} ~ ${Y + 10}</div>
                            <div class="next">
                                <img src="./images/ic-chevron-right.png" alt="">
                            </div>
                            <div class="empty">back</div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `
    for(let i = 0; i < 7; i ++){
        let tr = document.createElement('tr');
        for(let j = 0; j < 3; j ++) {
            let td = document.createElement('td');
            let div = document.createElement('div');
            let year = Y - 10 + (i*3+j);
            let textNode = document.createTextNode(year);
            if(year === Y) {
                td.className = 'year select';
            } else {
                td.className = 'year';
            }
            div.appendChild(textNode);
            td.setAttribute('colspan', '2');
            td.setAttribute('data-year', year);
            td.appendChild(div);
            tr.appendChild(td);
        }
        document.querySelector('.year-frame tbody').appendChild(tr);
    }

    $(_this.el).find('.btn-group').hide();

    $(_this.el).find('.year-frame').find('.back').on('click', function(){
        _this.buildDayTable();
        $(_this.el).find('.btn-group').show();
    })

    $(_this.el).find('.year-frame').find('.year').on('click', function(){
        let selectY = parseInt($(this).attr('data-year'));
        _this.buildMonthTable(selectY);
    })

    $(_this.el).find('.year-frame').find('.prev').on('click', function(){
        _this.buildYearsTable(Y - 20);
    })

    $(_this.el).find('.year-frame').find('.next').on('click', function(){
        _this.buildYearsTable(Y + 20);
    })
    
}

Datepicker.prototype.buildMonthTable = function(Y){
    const _this = this;
    let _body = document.getElementsByClassName('datepicker-panel-body')[0];
    _body.innerHTML = `
        <table class="month-frame">
            <thead>
                <tr>
                    <th colspan="6">
                        <div class="thead">
                            <div class="back">back</div>
                            <div>Month</div>
                            <div class="empty">back</div>
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    `
    for(let i = 0; i < 6; i ++){
        let tr = document.createElement('tr');
        for(let j = 0; j < 2; j ++) {
            let td = document.createElement('td');
            let div = document.createElement('div');
            let textNode = document.createTextNode(monthName[i*2+j].en);
            if(i*2+j === _this.date.month) {
                td.className = 'month select';
            } else {
                td.className = 'month';
            }
            div.appendChild(textNode);
            td.setAttribute('colspan','3');
            td.setAttribute('data-month', i*2+j);
            td.appendChild(div);
            tr.appendChild(td);
        }
        document.querySelector('.month-frame tbody').appendChild(tr);
    }

    $(_this.el).find('.month-frame').find('.back').on('click', function(){
        _this.buildYearsTable(Y);
    });

    $(_this.el).find('.month-frame').find('.month').on('click', function(){
        let selectM = parseInt($(this).attr('data-month'));
        _this.date.year = Y;
        _this.date.month = selectM;
        _this.date.days = new Date(Y, selectM+1, 0).getDate()
        _this.buildDayTable(_this.daysAry);
        $(_this.el).find('.btn-group').show();
    })
    
}

Datepicker.prototype.closePanel = function(){
    $(document).on('click', function(e) {
        if(!e.target.matches('.datepicker, .datepicker *')) {
            $('.datepicker-panel').fadeOut('fast');
            $('.datepicker').removeClass('active')
        }
    })
}