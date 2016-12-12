module.exports = function (casper, scenario, vp) {
    casper.click('.js-search-page-card__to-bucket-list');
    casper.wait(250);
};