module.exports = function (casper, scenario, vp) {
    casper.mouse.move('.follow-the-journey-item--type-1');
    casper.wait(250);
};