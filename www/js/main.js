(function (win, doc, app) {

    "use strict";

    var scriptPathPrefix = '../js/';

    var libList = [
        'lib/jquery-3.1.1.js',
        // like polyfill for IE9
        'polyfill/jquery.placeholder.js',
        'lib/fastclick.js',
        'lib/bootstrap.js',
        'lib/swiper.jquery.js',
        'lib/tweenlite/TweenLite.min.js',
        'lib/tweenlite/TimelineLite.min.js',
        'lib/tweenlite/EasePack.min.js',
        'lib/tweenlite/jquery.gsap.min.js',
        'lib/tweenlite/CSSPlugin.min.js'
    ];

    var serviceList = [
        'service/mediator.js',
        'service/device.js',
        'service/swiper.js',
        'service/modal-filter.js'
    ];

    var chunkList = [
        'chunks/main.js',
        'chunks/fast-click-enable.js',
        'chunks/navigation-drop-down.js',
        'chunks/search-page-card.js'
    ];

    function addScript(path) {

        return new Promise(function (resolve, reject) {

            var scriptNode = document.createElement('script');
            scriptNode.onload = resolve;
            scriptNode.onerror = reject;
            scriptNode.src = scriptPathPrefix + path;
            doc.head.appendChild(scriptNode);

        });

    }

    function importScripts() {

        var p = Promise.resolve();

        Array.prototype.concat(libList, serviceList, chunkList).forEach(function (path) {
            p = p.then(function () {
                return addScript(path).catch(function () {
                    console.error(path + ': NOT FOUND!!!');
                });
            });
        });

        return p;

    }

    win.addEventListener('load', function () {
        importScripts()
            .then(function () {
                console.log('loaded');
                app.mediator.publish('init-swiper');
            });

    }, false);

}(window, document, (window.app || (window.app = {}))));
