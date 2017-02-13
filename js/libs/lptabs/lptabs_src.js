(function ($) {

    /*var content = [];
     var slider,sliderContent;*/

    var methods = {
        init: function (options) {
            return this.each(function () {
                var $tabs = $(this);
                var data = $tabs.data('LPTabs');

                if (!data) {

                    var $content = $tabs.find('.tabs_content');

                    var _data = {};

                    _data.settings = $.extend({
                        /*itemWidth: 100,
                         itemMarginLeft: 5*/
                    }, options);

                    function switch2TabByN(n) {
                        try {
                            var tid = $tabs.find('.tab_section:eq(' + n + ')').attr('id');
                            switch2Tab(tid);
                        } catch (e) {
                        }
                    }

                    function switch2Tab(tid) {
                        $tabs.find('.tab_section.selected').removeClass('selected');
                        $tabs.find('.tabLabel.selected').removeClass('selected');
                        $('[data-id="' + tid + '"]').addClass('selected');
                        $tabs.find('#' + tid).addClass('selected');
                    }
                    $tabs.on('swToN.LPTabs', function (e, n) {
                        switch2TabByN(n);
                    });
                    $tabs.on('swToNext.LPTabs', function (e) {
                        var n = $tabs.find('.tab_section.selected').index(); // .tablist
                        var c = $tabs.find('.tab_section').length;
                        if (n >= c)
                            n = 0;
                        switch2TabByN(n);
                    });
                    $tabs.on('swToPrev.LPTabs', function (e) {
                        var n = $tabs.find('.tab_section.selected').index() - 2; // .tablist
                        if (n < 0) {
                            n = $tabs.find('.tab_section').length - 1;
                        }
                        switch2TabByN(n);
                    });

                    $tabs.on('click.LPTabs', '.tabLabel', function () {
                        var tid = $(this).attr('data-id');
                        switch2Tab(tid);
                        /*$tabs.find('.tab_section.selected').removeClass('selected');
                         $tabs.find('.tabLabel.selected').removeClass('selected');
                         $(this).addClass('selected');
                         $tabs.find('#'+tid).addClass('selected');*/
                    });

                    $tabs.data('LPTabs', _data);
                }
            });
        },
        destroy: function ( ) {
            return this.each(function () {
                var $tabs = $(this);
                var data = $tabs.data('LPTabs');
                if (data.interval) {
                    clearInterval(data.interval);
                }
                $tabs.off('.LPTabs');
                $tabs.removeData('LPTabs');
            });
        }
    };


    $.fn.LPTabs = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.LPTabs');
        }
    };
})(jQuery);