$(function () {
    function onResize() {
        /*var lw = ($('.leftnavbar:visible').width()||0)+'px';
         var rw = ($('.rightnavbar:visible').width()||0)+'px';*/
        var lw = ($('.leftnavbar:visible').outerWidth() || 0) + 'px';
        var rw = ($('.rightnavbar:visible').outerWidth() || 0) + 'px';
        $('#sections').css({marginLeft: lw, marginRight: rw});
    }
    $(window).resize(onResize);
    window.addEventListener("message", function (e) {
        if (e.data === 'onWindowResized') {
            onResize();
        }
    },false);
    onResize();
});