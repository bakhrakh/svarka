(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('rubberTimer');

                if (!data) {
                    var _data = {};

                    _data.settings = $.extend({}, options);

                    if (!_data.settings.date) {
                        _data.settings.date = new Date(Date.now() + 1000 * 60 * 60);
                    }

                    $this.data('rubberTimer', _data);

                    $this.addClass('rubberTimer');
                    $this.html($.fn.rubberTimer.prototype.template);

                    setInterval(function () {
                        updateDate($this);
                    }, 1000);

                    //$(window).bind('click.rubberTimer', methods.scrollContent);
                }
            });
        },
        destroy: function ( ) {
            return this.each(function () {
                var $this = $(this);
                $this.removeData('rubberTimer');
            });
        },
        updateSettings: function (options) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('rubberTimer');
                data.settings = $.extend(data.settings, options);
                $this.data('rubberTimer', data);
                updateDate($this);
            });
        }
    };

    function updateDate($this) {

        var data = $this.data('rubberTimer');
        var d = data.settings.date;
        var now = new Date();
        var _t = d.getTime() - now.getTime();
        if(_t<0) _t=0;
        var _d = new Date(_t + (now.getTimezoneOffset() * 60000));

        _t = _d.getSeconds().toString();
        if (_t.length < 2)
            _t = '0' + _t;
        $('.timerSh', $this).text(_t[0]);
        $('.timerSl', $this).text(_t[1]);
        _t = _d.getMinutes().toString();
        if (_t.length < 2)
            _t = '0' + _t;
        $('.timerMh', $this).text(_t[0]);
        $('.timerMl', $this).text(_t[1]);
        _t = _d.getHours().toString();
        if (_t.length < 2)
            _t = '0' + _t;
        $('.timerHh', $this).text(_t[0]);
        $('.timerHl', $this).text(_t[1]);

        _t = Math.floor((_d.getTime() - (now.getTimezoneOffset() * 60000)) / (1000 * 60 * 60 * 24)).toString();
        //console.log(_t);
        var days = $('.timerD', $this);
        if (days.length !== _t.length) {
            var _p = days.parent();
            days.remove();
            for (var i = _t.length - 1; i >= 0; i--) {
                _p.prepend('<div class="timerD timerN">' + _t[i] + '</div>');
                //console.log(i, _t[i]);
            }
        } else {
            for (var i in _t)
                $(days[i]).text(_t[i]);
        }
    }

    $.fn.rubberTimer = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.rubberTimer');
        }
    };
    $.fn.rubberTimer.prototype.template = 
                        '<div class="timerRow">\
                            <div class="timerWrap">\
                                <div class="timer-D timerGroup">\
                                    <div class="numbersGroup">\
                                        <div class="timerD timerN">0</div>\
                                    </div>\
                                    <span>Дни</span>\
                                </div>\
                                <div class="timerS timerS-h">:</div>\
                                <div class="timer-H timerGroup">\
                                    <div class="numbersGroup">\
                                        <div class="timerHh timerN">0</div>\
                                        <div class="timerHl timerN">0</div>\
                                    </div>\
                                    <span>Часы</span>\
                                </div>\
                                <div class="timerS timerS-m">:</div>\
                                <div class="timer-M timerGroup">\
                                    <div class="numbersGroup">\
                                        <div class="timerMh timerN">0</div>\
                                        <div class="timerMl timerN">0</div>\
                                    </div>\
                                    <span>Минуты</span>\
                                </div>\
                                <div class="timerS timerS-s">:</div>\
                                <div class="timer-S timerGroup">\
                                    <div class="numbersGroup">\
                                        <div class="timerSh timerN">0</div>\
                                        <div class="timerSl timerN">0</div>\
                                    </div>\
                                    <span>Секунды</span>\
                                </div>\
                            </div>\
                        </div>';
})(jQuery);