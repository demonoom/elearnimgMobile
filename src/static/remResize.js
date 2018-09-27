//rem-js,适配各种屏幕
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth < 500) {
                docEl.style.fontSize = 200 * (clientWidth / 720) + 'px';
            }else if(clientWidth < 900){
                docEl.style.fontSize = 120 * (clientWidth / 720) + 'px';
            }else {
                docEl.style.fontSize = 150 * (768 / 768) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);