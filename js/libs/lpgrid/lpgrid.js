(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var $rule = $(this);
                var data = $rule.data('LPGrid');

                if (!data) {
                    var _data = {
                        axis: "x",
                        values: [],
                        margin: 0,
                        segments: 100,
                        marks: []
                    };
                    _data = $.extend(_data, options);

                    var $sliders = $('<div class="ruleSliders">');
                    var $segments = $('<div class="ruleSegments">');
                    var $ruleInfo = $('<div class="ruleInfo">');
                    $ruleInfo.hide();

                    $rule.append($segments);
                    $rule.append($sliders);
                    $('body').append($ruleInfo);


                    function removeThisEl(e) {
                        e.stopPropagation();
                        $(this).remove();
                        $ruleInfo.hide();
                    }
                    function updateInfoPosition(event, position) {
                        $ruleInfo.css({
                            top: event.pageY + 10,
                            left: event.pageX + 10
                        });
                        if (_data.axis === 'x')
                            $ruleInfo.text((position.left - _data.margin) + 'px');
                        else
                            $ruleInfo.text((position.top - _data.margin) + 'px');
                    }

                    var isDrag = false;

                    function createRuleSlider(position) {
                        var lastPosition = {};
                        $element = $('<div class="ruleSliderWrap"><div class="ruleSlider"><span></span></div></div>');
                        $sliders.append($element);
                        if (_data.axis === 'x') {
                            lastPosition.left = position + _data.margin;
                            $element.css('left', lastPosition.left);
                        } else {
                            lastPosition.top = position + _data.margin;
                            $element.css('top', lastPosition.top);
                        }
                        $element.draggable({
                            axis: _data.axis,
                            containment: $rule,
                            scroll: false,
                            iframeFix: true,
                            start: function (event, ui) {
                                isDrag = true;
                                $ruleInfo.show();
                                updateInfoPosition(event, ui.position);
                            },
                            stop: function (event, ui) {
                                lastPosition = ui.position;
                                isDrag = false;
                                $ruleInfo.hide();
                            },
                            drag: function (e, ui) {
                                updateInfoPosition(e, ui.position);
                            }
                        });
                        $element.mouseenter(function (e) {
                            if (!isDrag) {
                                $ruleInfo.show();
                                updateInfoPosition(e, lastPosition);
                            }
                        }).mouseleave(function (e) {
                            if (!isDrag)
                                $ruleInfo.hide();
                        });
                        $element.dblclick(removeThisEl);

                    }

                    var $element = '';
                    for (var i in _data.values) {
                        createRuleSlider(_data.values[i]);
                    }
                    var sb = -_data.margin;
                    for (var i = 0; i < _data.segments; i++) {
                        var val = sb + i * 50;
                        $segments.append('<div class="ruleSegment"><span>' + val + '</span></div>');
                    }
                    for (var i in _data.marks) {
                        $element = $('<div class="ruleMarkWrap"><div class="ruleMark"><span></span></div></div>');
                        if (_data.marks[i].class)
                            $element.addClass(_data.marks[i].class);
                        $sliders.append($element);
                        if (_data.axis === 'x')
                            $element.css('left', _data.marks[i].position + _data.margin);
                        else
                            $element.css('top', _data.marks[i].position + _data.margin);
                    }

                    $rule.closest('.ruleWrap').click(function (e) {
                        if ($(e.target).hasClass('ruleSlider') || $(e.target).parent().hasClass('ruleSlider'))
                            return;

                        var p;
                        if (_data.axis === 'x') {
                            p = $(e.target).offset().left 
                                    - parseInt($(e.target).closest('.ruleWrap').css('margin-left')) 
                                    + e.offsetX-_data.margin
                                    -parseInt($(e.target).closest('.rule').css('margin-left'))
                                    -parseInt($(e.target).closest('.frame_wrap').css('margin-left'));
                        } else {
                            //p = $(e.target).offset().top - parseInt($(e.target).closest('.ruleWrap').css('margin-top')) + e.offsetY;
                            p = e.offsetY+parseInt($(e.target).closest('.ruleWrap').prev().height());
                        }
                        createRuleSlider(p);
                    });

                    $rule.data('LPGrid', _data);
                }
            });
        },
        scroll: function (v) {
            return this.each(function () {
                var $rule = $(this);
                var data = $rule.data('LPGrid');
                var m = -data.margin - v;
                if (data.axis === 'x')
                    $rule.css('margin-left', m);
                else
                    $rule.css('margin-top', m);
            });
        },
        destroy: function ( ) {
            return this.each(function () {
                var $rule = $(this);
                var data = $rule.data('LPGrid');
                $rule.off('.LPGrid');
                $rule.removeData('LPGrid');
            });
        }
    };


    $.fn.LPGrid = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.LPGrid');
        }
    };
})(jQuery);