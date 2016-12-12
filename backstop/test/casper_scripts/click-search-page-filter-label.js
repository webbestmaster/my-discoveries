module.exports = function (casper, scenario, vp) {
    casper.click('.search-page-filter__label');
    casper.wait(250);
};