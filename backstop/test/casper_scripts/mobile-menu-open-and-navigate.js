module.exports = function (casper, scenario, vp) {
    casper.click(".js-mobile-header__menu-button");
    casper.wait(250);
    casper.click(".js-mobile-header-drop-down--to-right");
    casper.wait(2e3);
};