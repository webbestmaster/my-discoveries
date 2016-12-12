'@fixture TestCafe Example Page';

'@page https://testcafe.devexpress.com/Example';

'@test'['act.type examples-2'] = {
    'Resize to 640px': function () {
        act.resize('act.type examples-2', 640, 400, 640, 400);
    },
    'Type name 2': function () {
        act.type($('#Developer_Name'), 'Peter');
    },
    'Replace with last name 2': function () {
        act.type($('#Developer_Name'), 'Paker-2', {
            replace: true
        });
    },
    'Update last name 2': function () {
        act.type($('#Developer_Name'), 'r', {
            caretPos: 2
        });
    },
    'Check result 2': function () {
        eq($('#Developer_Name').val(), 'Parker');
    }
};

//helpers
var isTransparent = function () {
    return $('.article-header').css('opacity') == 0;
};

var getInput = function () {
    return $('#Developer_Name');
};
