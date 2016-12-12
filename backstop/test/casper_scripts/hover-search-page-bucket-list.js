module.exports = function (casper, scenario, vp) {
    casper.mouse.move('.search-page-card__to-bucket-list');
    casper.wait(250);
};