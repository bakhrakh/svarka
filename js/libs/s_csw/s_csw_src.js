(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var $csw = $(this);
                var $_btns = $csw.closest('.tabs2_s').find('.tabs2_button_s');
                var data = $csw.data('s_csw');

                if (!data) {

                    var _data = {};

                    _data.settings = $.extend({
                        /*itemWidth: 100,
                         itemMarginLeft: 5*/
                        elSelector: '.tabs2_tab_s',
                        selectedClass: 'tabs2_tab_active_s',
                        deselectedClass: 'tabs2_tab_deactive_s',
                        //btnsSelector: '.tabs2_button_s',
                        //btnSelectedClass: 'tabs2_button_active_s'
                        btnDeselectTrigger: 'deselectBtn',
                        btnSelectTrigger: 'selectBtn',
                        tabDeselectTrigger: 'deselectTab',
                        tabSelectTrigger: 'selectTab'
                    }, options);
                    
                    var _$currentEl = $csw.find(_data.settings.elSelector+'.'+_data.settings.selectedClass);

                    function switch2ElByN(n) {
                        try {
                            //var tid = $csw.find('.tab_section:eq(' + n + ')').attr('id');
                            var tid = $csw.find(_data.settings.elSelector+':eq(' + n + ')').attr('id');
                            switch2El(tid);
                        } catch (e) {
                        }
                    }

                    function switch2El(tid) {
                        var $_el = $csw.find('#' + tid);
                        if(_$currentEl.attr('id') === $_el.attr('id'))
                            return;
                        
                        $_el.show(0, function(){
                            $_btns.eq(_$currentEl.index()).trigger(_data.settings.btnDeselectTrigger);
                            $_btns.eq($_el.index()).trigger(_data.settings.btnSelectTrigger);
                            $_el.trigger(_data.settings.tabSelectTrigger);
                            _$currentEl.trigger(_data.settings.tabDeselectTrigger);
                            
                            $_el.css('display', '');

                            _$currentEl = $_el;
                        });
                        /*
                        //$csw.find(_data.settings.elSelector+'.'+_data.settings.selectedClass).removeClass(_data.settings.selectedClass);
                        $csw.find(_data.settings.elSelector+'.'+_data.settings.selectedClass).removeClass(_data.settings.selectedClass).addClass(_data.settings.deselectedClass);
                        $_btns.trigger(_data.settings.btnDeselectTrigger);
                        $_btns.eq($_el.index()).trigger(_data.settings.btnSelectTrigger);
                        //$_el.addClass(_data.settings.selectedClass);
                        $_el.addClass(_data.settings.selectedClass).removeClass(_data.settings.deselectedClass);
                         */
                    }
                    $csw.on('swToN.s_csw', function (e, n) {
                        switch2ElByN(n);
                    });
                    $csw.on('swToNext.s_csw', function (e) {
                        //var n = $csw.find(_data.settings.elSelector+'.'+_data.settings.selectedClass).index();
                        var n = _$currentEl.index();
                        var c = $csw.find(_data.settings.elSelector).length;
                        if (n >= c)
                            n = 0;
                        switch2ElByN(n);
                    });
                    $csw.on('swToPrev.s_csw', function (e) {
                        //var n = $csw.find(_data.settings.elSelector+'.'+_data.settings.selectedClass).index() - 2;
                        var n = _$currentEl.index() - 2;
                        if (n < 0) {
                            $csw.find(_data.settings.elSelector).length - 1;
                        }
                        switch2ElByN(n);
                    });
                    
                    $csw.data('s_csw', _data);
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
                $tabs.off('.s_csw');
                $tabs.removeData('s_csw');
            });
        }
    };


    $.fn.s_csw = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.s_csw');
        }
    };
})(jQuery);