'@fixture TestCafe Example Page';

'@page https://testcafe.devexpress.com/Example';

'@test'['act.type examples'] = {
    'Type name': function () {
        act.type($('#Developer_Name'), 'Peter');
    },
    'Replace with last name': function () {
        act.type($('#Developer_Name'), 'Paker', {
            replace: true
        });
    },
    'Update last name': function () {
        act.type($('#Developer_Name'), 'r', {
            caretPos: 2
        });
    },
    'Check result': function () {
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
