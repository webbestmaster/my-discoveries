module.exports = function (casper, scenario, vp) {
    casper.mouse.move('.proposal-item');
    casper.wait(250);
};