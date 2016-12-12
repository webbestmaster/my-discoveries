module.exports = function (casper, scenario, vp) {
    casper.click(".js-mobile-header__menu-button");
    casper.wait(250);
};