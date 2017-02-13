(function ($) {

    /*var content = [];
     var slider,sliderContent;*/

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('rubberSlider');
                var $rubberSlider = $this.closest('.block_gallery, .block_gallery1');

                if (!data) {
                    var _data = {
                        //target: $this,
                        'contentLeftPosition': 0,
                        'maxGcontentWidthDiff': 0,
                        'currentElIndex': 0
                    };

                    _data.settings = $.extend({
                        //itemWidth: $this.attr('data-maxImgWidth'),
                        itemMarginLeft: $this.attr('data-imgMargin')
                                /*itemWidth: 100,
                                 itemMarginLeft: 5*/
                    }, options);


                    //data = $this.data('rubberSlider');

                    $(window).bind('resize.rubberSlider', function () {
                        applySettings($this);
                    });

//                    _data.slider = $('<div class="rs-wrap"></div>');
//                    _data.sliderContent = $('<div class="rs-content"></div>');

//                    var ul = $('ul', this);
//                    ul.find('li').each(function () {
//                        var _item = createItem($(this).html());
//                        _data.sliderContent.append(_item);
//                    });
//                    ul.remove();
//
                    var arrowL = $('<div class="rs-arrow-left">&lt;</div>');
                    var arrowR = $('<div class="rs-arrow-right">&gt;</div>');
//
//                    _data.slider.html('');
//                    _data.slider.append(arrowL);
//                    _data.slider.append(_data.sliderContent);
//                    _data.slider.append(arrowR);
//                    $this.append(_data.slider).addClass('rs-slider');

                    $this.addClass('rs-slider');
                    _data.slider = $this.find('.rs-wrap');
                    _data.sliderContent = _data.slider.find('.rs-content');

                    _data.slider.prepend(arrowL);
                    _data.slider.append(arrowR);



                    if (document.location.hash == '#master') {
                    /* fix for old chrome */
                    _data.sliderContent.find('img').each(function () {
                        if (!this.complete) {
                            $(this).load(function () {
                                //console.log('onLoad', this);
                                $(this).closest('.rs-itemContent').css('display','block');
                                setTimeout(function(){
                                    $(this).closest('.rs-itemContent').css('display', 'inline-block');
                                },1)

                            });
                        }else{
                            $(this).closest('.rs-itemContent').css('display','block');
                            setTimeout(function(){
                                $(this).closest('.rs-itemContent').css('display', 'inline-block');
                            },1)
                        }
                        //console.log(this, this.complete);                            
                    });
                    }




                    arrowL.click(function (e) {
//                        scrollContent($this, 30);
                        scrollContentToPrew($this);
                    });
                    arrowR.click(function (e) {
//                        scrollContent($this, -30);
                        scrollContentToNext($this);
                    });
                    $rubberSlider.on('swToNext', function (e) {
                        scrollContentToNext($this);
                    }).on('swToPrev', function (e) {
                        scrollContentToPrew($this);
                    }).on('swToN', function (e, n) {
                        try {
                            scrollContentToN($this, parseInt(n));
                        }catch(e){}
                    });
                    
                    $this.mousewheel(function (event, delta) {
                        if (delta > 0) {
//                            scrollContent($this, 30);
                            scrollContentToPrew($this);
                        }
                        else if (delta < 0) {
//                            scrollContent($this, -30);
                            scrollContentToNext($this);
                        }
                        event.stopPropagation();
                        event.preventDefault();
                    });

                    $this.data('rubberSlider', _data);

                    applySettings($this);

                    //$(window).bind('click.rubberSlider', methods.scrollContent);
                }
            });
        },
        destroy: function ( ) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('rubberSlider');
                $(window).unbind('.rubberSlider');
                $this.removeData('rubberSlider');
            });
        },
        updateSettings: function (options) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('rubberSlider');
                data.settings = $.extend(data.settings, options);
                $this.data('rubberSlider', data);
                applySettings($this);
            });
        },
        setContent: function (content) {
            return this.each(function () {
                var $this = $(this);
                var data = $this.data('rubberSlider');
                data.sliderContent.html('');

                for (var i in content) {
                    var _item = createItem(content[i]);
                    data.sliderContent.append(_item);
                }
                applySettings($this, true);
            });
        }
    };

    function createItem(content) {
        var _item = $('<div class="rs-item"></div>');
        var _c = $('<div class="rs-itemContent"></div>');
        var _h = $('<span class="rs-helper"></span>');
        _c.append(_h);
        _c.append(content);
        _item.append(_c);
        return _item;
    }

    function applySettings($this, scrollTo0) {
        var data = $this.data('rubberSlider');

        var count = data.sliderContent.children().length;

        var itemWidth = data.settings.itemWidth;
        var itemWidths = 0;
        var itemMarginLeft = parseInt(data.settings.itemMarginLeft) || 0;
        if (itemWidth && !isNaN(parseFloat(itemWidth))) {
            itemWidths = itemWidth * count;
            $('.rs-item', data.sliderContent).width(itemWidth);
        } else {
            //itemWidth = $('.rs-item', data.sliderContent).width();
            //$('.rs-item', data.sliderContent).width('auto');
            $('.rs-item', data.sliderContent).each(function () {
                itemWidths += $(this).width();
            });
            //$('.rs-item', data.sliderContent).width("");
        }
        data.sliderContent.width(count * 10000); // TODO fix
        itemWidths += 1; // fix

        //if(itemMarginLeft)
        $('.rs-item', data.sliderContent).not(':first').css('margin-left', itemMarginLeft);
        $('.rs-item:first', data.sliderContent).css('margin-left', 0);
        /*else
         itemMarginLeft = parseInt($('.rs-item', data.sliderContent).css('margin-left'));*/

        var gcontentWidth = itemWidths;
        if (count > 1)
            gcontentWidth += itemMarginLeft * (count - 1);

        data.itemsCount = count;


//        data.sliderContent.width(gcontentWidth);

        data.maxGcontentWidthDiff = gcontentWidth - Number($this.find('.rs-wrap').innerWidth());
        if (data.maxGcontentWidthDiff < 0)
            data.maxGcontentWidthDiff = 0;
        if (data.contentLeftPosition < -data.maxGcontentWidthDiff)
            data.contentLeftPosition = -data.maxGcontentWidthDiff;
        if (scrollTo0)
            data.contentLeftPosition = 0;

        /*if(data.settings.hideArrows){
         $('.rs-arrow-left, .rs-arrow-right', data.slider).hide();
         data.slider.css({'margin-left':0,'margin-right':0});
         }else{
         $('.rs-arrow-left, .rs-arrow-right', data.slider).show();
         data.slider.css({'margin-left':'','margin-right':''});
         }*/

        $this.data('rubberSlider', data);
        scrollContent($this, 0);
    }

    function scrollContentToNext($this) {
        applySettings($this); // TODO
        var data = $this.data('rubberSlider');
        if (data.currentElIndex < data.itemsCount - 1) {
            var $el = $(data.sliderContent.children()[data.currentElIndex+1]);
            var p = -$el.position().left;
            if(p+$el.prev().width() > -data.maxGcontentWidthDiff){
                data.currentElIndex++;
                scrollContentTo($this, p);
            }
        }
    }
    function scrollContentToPrew($this) {
        applySettings($this); // TODO
        var data = $this.data('rubberSlider');
        if (data.currentElIndex > 0) {
            data.currentElIndex--;
            var $el = $(data.sliderContent.children()[data.currentElIndex]);
            scrollContentTo($this, -$el.position().left);
        }
    }
    function scrollContentToN($this, n) {
        applySettings($this); // TODO
        var data = $this.data('rubberSlider');
        var _c = data.sliderContent.children()[n];
        if(_c){
            data.currentElIndex = n;
            var $el = $(_c);
            scrollContentTo($this, -$el.position().left);
        }
    }
    function scrollContent($this, x) {
        var data = $this.data('rubberSlider');
        var p = data.contentLeftPosition + x;
        scrollContentTo($this, p);
    }

    function scrollContentTo($this, p) {
        var data = $this.data('rubberSlider');
        data.contentLeftPosition = p;
        if (data.contentLeftPosition > 0)
            data.contentLeftPosition = 0;
        else if (data.contentLeftPosition < -data.maxGcontentWidthDiff)
            data.contentLeftPosition = -data.maxGcontentWidthDiff;
        data.sliderContent.stop().animate({'left': data.contentLeftPosition + 'px'});
        $this.data('rubberSlider', data);
    }

    $.fn.rubberSlider = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.rubberSlider');
        }
    };
})(jQuery);