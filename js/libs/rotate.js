(function ($) {

    var methods = {
        init: function (options) {
            return this.each(function () {
                var obj;
                var x0, y0;
                var x, y, x1, y1, drag = 0;
                var self = this;

                $(this).mousemove(function (e) {
                    x1 = e.pageX;
                    y1 = e.pageY;
                    x = x1 - x0;
                    y = y1 - y0;

                    //r = 356 - ((180 / Math.PI) * Math.atan2(y, x));
                    r = (180 / Math.PI) * Math.atan2(y, x);

                    if (drag == 1) {
                        methods.setValue.apply(self, [r]);
                        $(this).trigger('fixedRotate.rChange', [r]);
                    }
                });

                $(this).mousedown(function () {
                    obj = $(this).children('.point');
                    var pos = $(this).offset();

                    x0 = pos.left + ($(this).width() / 2);
                    y0 = pos.top + ($(this).height() / 2);

                    //$('.container').append('<div style="position:absolute;width:1px;height:1px;top:'+ y0 +'px;left:'+ x0 +'px; background:#c00; z-index:1000;"></div>'); // центр, относительно которого вращается

                    if (drag == 0) {
                        drag = 1;
                        $(obj).parent().addClass('process');
                    } else {
                        drag = 0;
                        $(obj).parent().removeClass('process');
                    }
                });
                $(this).mouseleave(function () {
                    drag = 0;
                    $(obj).parent().removeClass('process');
                });
            });

        },
        // TODO http://habrahabr.ru/post/158235/
        destroy: function () {
        },
        setValue: function (r) {
            //console.log(r);
            var obj = $(this).children('.point');
            var _r = -(360-5-r);
            obj.css("transform", "rotate(" + _r + "deg)");
            obj.css("-moz-transform", "rotate(" + _r + "deg)");
            obj.css("-webkit-transform", "rotate(" + _r + "deg)");
            obj.css("-o-transform", "rotate(" + _r + "deg)");
            obj.css("-ms-transform", "rotate(" + _r + "deg)");
        },
        setCB: function (cb) {
            // TODO
            //$(this).cb = options[0];
        }
    };


    $.fn.fixedRotate = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
        }
    };


    $.fn.freeRotate = function () {
        //$('.container').append('<div class="debug" style="position:absolute;top:30%;left:60%;width:150px; height:200px; padding:5px;border:1px solid #c00;background:#fff;z-index:1000;"></div>');

        var obj = this;
        var point = this.find('.point');
        var x0, y0;
        var rx, ry, x1, y1, drag = 0, R, setx, sety;

        $(obj).mousemove(function (e) {

            x1 = e.pageX;
            y1 = e.pageY;

            rx = x1 - x0;
            ry = y1 - y0;

            R = Math.sqrt(rx * rx + ry * ry);

            //$('.debug').html('rx: '+ rx +'<br>'+'ry: '+ ry +'<br>x0: '+ x0 +'<br>'+'y0: '+ y0 +'<br>'+'x1: '+ x1 +'<br>'+'y1: '+ y1 +'<br>R: '+R);

            if (R > 17) {
                drag = 0;
                $(obj).removeClass('process');
            }

            if (drag == 1) {
                point.css('left', (setx + rx) + 'px').css('top', (sety + ry) + 'px');
            }
        });

        $(point).mousedown(function () {
            var pos = $(obj).offset();
            setx = ($(obj).width() / 2);
            sety = ($(obj).height() / 2);
            x0 = pos.left + setx;
            y0 = pos.top + sety;

            //$('.container').append('<div style="position:absolute;width:1px;height:1px;top:'+ y0 +'px;left:'+ x0 +'px; background:#c00; z-index:1000;"></div>'); // центр, относительно которого вращается

            if (drag == 0) {
                drag = 1;
                $(obj).addClass('process');
            } else {
                drag = 0;
                $(obj).removeClass('process');
            }
        });

        $(obj).mouseleave(function () {
            drag = 0;
            $(obj).parent().removeClass('process');
        });
    };
})(jQuery);