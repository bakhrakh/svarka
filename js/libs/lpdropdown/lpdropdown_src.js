(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var $dropdown = $(this);
                var data = $dropdown.data('LPDropdown');
                var effect = 'blind';
                var options = {direction: $dropdown.attr('data-direction') || 'up'};

                        var _lastState;
                        function swDD(el, active) {
                            _lastState = active;
                            //var $this = $(el);
                            //var $dropdown = $this.closest('.dropdown');
                            //var duration = 500
                            
                            var $_btn = $dropdown.find('.dropdownbtn');;
                            if (active) {
                                $dropdown.find('> .lp_blockcontainercontent').show(effect, options, duration, function () {
                                    $_btn.addClass('selected');
                                    if (_lastState !== active)
                                        swDD(el, _lastState);
                                });
                            } else {
                                $dropdown.find('> .lp_blockcontainercontent').hide(effect, options, duration, function () {
                                    $_btn.removeClass('selected');
                                    if (_lastState !== active)
                                        swDD(el, _lastState);
                                });
                            }
                        }
                        
                if (!data) {
                    var duration = parseInt($dropdown.attr('data-duration')) || 300;
                    if ($dropdown.attr('data-showon') === 'hover') {
                        $dropdown.off("mouseenter").on('mouseenter', function () {
                            swDD(this, true);
                        });
                        $dropdown.off("mouseleave").on('mouseleave', function () {
                            swDD(this, false);
                        });
                    } else {
                        $dropdown.on('click', '.dropdownbtn', function (e) {
                            e.stopPropagation();
                            swDD(this, !_lastState);
                            /*var $this = $(this);
                            //var $dropdown = $this.closest('.dropdown');
                            var $content = $dropdown.find('> .lp_blockcontainercontent');
                            //$content.slideToggle();
                            //var options = {direction: $dropdown.attr('data-direction')||'up'};
                            //var duration = 500;
                            $content.toggle(effect, options, duration);
                            $this.toggleClass('selected');*/
                        }).on('openDD', function (e) {
                            e.stopPropagation();
                            swDD(this, true);
                        }).on('closeDD', function (e) {
                            e.stopPropagation();
                            swDD(this, false);
                        }).on('toggleDD', function (e) {
                            e.stopPropagation();
                            swDD(this, !_lastState);
                        });
                        if ($dropdown.attr('data-ddHideOnClickToContent') === 'true')
                            $dropdown.on('click onClick', '.lp_blockcontainercontent', function (e) {
                                $dropdown.find('.dropdownbtn').click();
                            });
                    }
                    $dropdown.data('LPDropdown', {});
                }
            });
        },
        destroy: function ( ) {
            return this.each(function () {
                var $dropdown = $(this);
                var data = $dropdown.data('LPDropdown');
                if (data.interval) {
                    clearInterval(data.interval);
                }
                $dropdown.off('.LPDropdown');
                $dropdown.removeData('LPDropdown');
            });
        }
    };


    $.fn.LPDropdown = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.LPDropdown');
        }
    };
})(jQuery);