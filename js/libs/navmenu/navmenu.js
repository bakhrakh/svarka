/* global DeviceTypes */

(function ($) {
    var methods = {
        init: function (options) {
            return this.each(function () {
                var $navmenu = $(this);
                var _NB = $navmenu.closest('.lp_navbar');
                var menuFrom = DeviceTypes.desktop;
                
                if (_NB.hasClass("asMenuFromTablet"))
                    menuFrom = DeviceTypes.tablet;
                else if (_NB.hasClass("asMenuFromPhone"))
                    menuFrom = DeviceTypes.phone;
                    
                var data = $navmenu.data('Navmenu');
                if (!data) {
                    var $content = $navmenu.find('> .lp_blockcontainercontent');
                    var $navmenuBTN = $navmenu.find('.navbarmenubtn');
                    var lock = false;
                    function swNBDD(on){
			if(lock) return;
			lock = true;
                        if (on) {
                            $content.slideDown(function(){lock = false;});
                            $navmenuBTN.addClass('selected');
                        } else {
                            $content.slideUp(function(){lock = false;});
                            $navmenuBTN.removeClass('selected');
                        }
                    }
                    $navmenu.on('click', '.navbarmenubtn', function (e) {
                        e.stopPropagation();
                        var _dt = getDeviceType();
                        if (_dt === DeviceTypes.desktop && menuFrom !== DeviceTypes.desktop)
                            return;
                        if (_dt === DeviceTypes.tablet && menuFrom !== DeviceTypes.desktop && menuFrom !== DeviceTypes.tablet)
                            return;
                        if (_dt === DeviceTypes.phone && menuFrom !== DeviceTypes.desktop && menuFrom !== DeviceTypes.tablet && menuFrom !== DeviceTypes.phone)
                            return;
                        swNBDD(!$navmenuBTN.hasClass('selected'));
                    }).on('openDD', function (e) {
                        e.stopPropagation();
                        swNBDD(true);
                    }).on('closeDD', function (e) {
                        e.stopPropagation();
                        swNBDD(false);
                    }).on('toggleDD', function (e) {
                        e.stopPropagation();
                        swNBDD(!$navmenuBTN.hasClass('selected'));
                    });
                    /*$navmenu.on('click', '.navbarmenubtn', function () {
                     var $this = $(this);
                     var $navbarmenu = $this.closest('.navbarmenu');
                     var $content = $navbarmenu.find('> .lp_blockcontainercontent');
                     $content.slideToggle();
                     $this.toggleClass('selected');
                     });*/
                    if ($navmenu.attr('data-nbmHideOnClickToContent') === 'true'){
                        $navmenu.on('click onClick', '.lp_blockcontainercontent', function (e) {
                            $navmenu.find('.navbarmenubtn').click();
                        });
                    }
                    $navmenu.data('Navmenu', {});
                }
            });
        },
        destroy: function ( ) {
            return this.each(function () {
                var $navmenu = $(this);
                var data = $navmenu.data('Navmenu');
                if (data.interval) {
                    clearInterval(data.interval);
                }
                $navmenu.off('.Navmenu');
                $navmenu.removeData('Navmenu');
            });
        }
    };


    $.fn.Navmenu = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.Navmenu');
        }
    };
})(jQuery);
