(function ($) {

    /*var content = [];
     var slider,sliderContent;*/

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $slider = $(this);
                var data = $slider.data('LPSlider');

                if (!data) {

                    var $content = $slider.find('.slider_content');

                    var autoPlay = ($slider.attr('data-autoplay') === 'true');
                    var timeout = parseInt($slider.attr('data-timeout')) || 5000;
                    var animationTime = parseInt($slider.attr('data-animationTime')) || 1000;
                    var effect = $slider.attr('data-effect');
                    var autoPlayDirection = $slider.attr('data-autoPlayDirection');

                    $content.find('.slider_section').each(function () {
                        var $this = $(this);
                        var _d = {
                            position: $this.css('position'),
                            top: $this.css('top'),
                            opacity: $this.css('opacity')
                        };
                        $this.data('startcss', _d);
                    });

                    var _data = {
                        autoPlay: autoPlay,
                        effect: effect,
                        timeout: timeout,
                        animationTime: animationTime,
                        autoPlayDirection: autoPlayDirection
                    };

                    _data.settings = $.extend({
                        /*itemWidth: 100,
                         itemMarginLeft: 5*/
                    }, options);


                    function _autoPlay() {
                        /*if (_data._timeout)
                         clearTimeout(_data._timeout);
                         _data._timeout = setTimeout(function () {
                         if (_data.autoPlayDirection === 'reverse')*/
                        if (_data._interval)
                            clearInterval(_data._interval);
                        _data._interval = setInterval(function () {
                            if (_data._intervalSkip) {
                                _data._intervalSkip = false;
                                return;
                            }
                            if (_data.autoPlayDirection === 'reverse')
                                $slider.find('.prev').click();
                            else
                                $slider.find('.next').click();
                        }, _data.timeout);
                    }
                    var __block = false;
                    function switchTo(id, toNext) {
                        if(__block) return;
                        __block = true;
                        var currentSection = $slider.find('.slider_section.selected');
                        if (currentSection.attr('id') === id)
                            return;
                        var nexSection = $slider.find('#' + id);

                        $slider.find('.pagination .selected').removeClass('selected');
                        $slider.find('.pagination [data-id="' + id + '"]').addClass('selected');


                        /*if (_data._timeout)
                         clearTimeout(_data._timeout);*/
                        if (_data._interval)
                            _data._intervalSkip = true;

                        animateSwitch(currentSection, nexSection, effect, function () {
                            __block = false;
                            if (_data.autoPlay) {
                                _autoPlay();
                            }
                        }, toNext, _data.animationTime);

                    }

                    function animateSwitch(currentSection, nexSection, effect, cb, toNext, animationTime) {
                        animationTime = animationTime || 1000;

                        switch (effect) {
                            case 'effect2':
                                var w = $content.innerWidth();
                                currentSection
//                                        .removeClass('selected')
                                        .css({position: 'absolute'});
                                if (toNext) {
                                    nexSection
                                            .addClass('selected')
                                            .css({display: 'block', opacity: 1, position: 'absolute', left: w + 'px'});
                                    if (nexSection.width() === 0)
                                        nexSection.width('100%');

                                    currentSection.stop().animate({left: (-w) + 'px'}, animationTime, "linear", function () {
                                        currentSection.css({display: 'none'})
                                                .removeClass('selected');
                                    });
                                    nexSection.stop().animate({left: 0}, animationTime, "linear", cb);
                                } else {
                                    nexSection
                                            .addClass('selected')
                                            .css({display: 'block', opacity: 1, position: 'absolute', left: (-w) + 'px'});
                                    if (nexSection.width() === 0)
                                        nexSection.width('100%');
                                    currentSection.stop().animate({left: w + 'px'}, animationTime, "linear", function () {
                                        currentSection.css({display: 'none'})
                                                .removeClass('selected');
                                    });
                                    nexSection.stop().animate({left: 0}, animationTime, "linear", cb);
                                }
                                break;
                            case 'effect1':
                                var _back = {
                                    nexSection: nexSection.data('startcss'),
                                    currentSection: currentSection.data('startcss')
                                };

                                nexSection.addClass('selected');
                                nexSection.css({opacity: 0, position: 'absolute', top: _back.nexSection.top || 0});
                                currentSection.css({position: 'absolute', top: _back.currentSection.top || 0});
//                                currentSection.removeClass('selected');

                                currentSection.stop().animate({opacity: 0}, animationTime, "linear", function () {
                                    currentSection.removeClass('selected');
                                    currentSection.css(_back.currentSection);
                                });
                                nexSection.stop().animate({opacity: _back.nexSection.opacity}, animationTime, "linear", function () {
                                    nexSection.css(_back.nexSection);
                                    cb();
                                });
                                break;
                            default:
                                nexSection.css({opacity: 0});
                                currentSection.removeClass('selected');
                                nexSection.addClass('selected');
                                currentSection.stop();
                                nexSection.stop();
                                currentSection.css({opacity: 0});
                                nexSection.css({opacity: 1});
                                if (cb)
                                    cb();
                                break;
                        }
                    }

                    function switchToNextSection() {
                        var currentSection = $slider.find('.slider_section.selected');
                        var nextSection = currentSection.next();
                        if (nextSection.length === 0)
                            nextSection = $slider.find('.slider_section:first');
                        switchTo(nextSection.attr('id'), true);
                    }
                    function switchToPrevSection() {
                        var currentSection = $slider.find('.slider_section.selected');
                        var nextSection = nextSection = currentSection.prev();
                        if (nextSection.length === 0)
                            nextSection = $slider.find('.slider_section:last');
                        switchTo(nextSection.attr('id'), false);
                    }
                    $slider.on('nextSection.LPSlider', function () {
                        switchToNextSection();
                    }).on('prevSection.LPSlider', function () {
                        switchToPrevSection();
                    }).on('click.LPSlider', '.next, .prev', function () {
                        if ($(this).hasClass('next')) {
                            switchToNextSection();
                        } else {
                            switchToPrevSection();
                        }
                    }).on('click.LPSlider', '.pagination .img', function () {
                        var newSectionID = $(this).attr('data-id');
                        switchTo(newSectionID);
                    }).on('swToNext.LPSlider', function (e) {
                        switchToNextSection();
                    }).on('swToPrev.LPSlider', function (e) {
                        switchToPrevSection();
                    }).on('swToN.LPSlider', function (e, n) {
                        try {
                            var $_e = $slider.find('.slider_section:eq('+parseInt(n)+')');
                            var id = $_e.attr('id');
                            switchTo(id, $_e.index() > $slider.find('.slider_section.selected').index());
                        }catch(e){}
                    });

                    if (_data.autoPlay) {
                        _autoPlay();
                    }
                    $slider.data('LPSlider', _data);
                }
            });
        },
        destroy: function ( ) {
            return this.each(function () {
                var $slider = $(this);
                var data = $slider.data('LPSlider');
                if (data.interval) {
                    clearInterval(data.interval);
                }
                $slider.off('.LPSlider');
                $slider.removeData('LPSlider');
            });
        }
    };


    $.fn.LPSlider = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.LPSlider');
        }
    };
})(jQuery);