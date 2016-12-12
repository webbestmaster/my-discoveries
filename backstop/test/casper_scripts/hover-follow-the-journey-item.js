module.exports = function (casper, scenario, vp) {
    casper.mouse.move('.follow-the-journey-item');
    casper.wait(250);
};