module.exports = function (casper, scenario, vp) {
    casper.click(".js-mobile-show-hide-search");
    casper.wait(250);
};