module.exports = function (casper, scenario, vp) {
    casper.mouse.move('.footer__item .footer__link');
    casper.wait(250);
};