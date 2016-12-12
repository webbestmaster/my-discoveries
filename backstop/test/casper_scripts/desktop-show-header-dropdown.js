module.exports = function (casper, scenario, vp) {
    casper.mouse.move('.js-change-navigation-drop-down');
    casper.wait(250);
};