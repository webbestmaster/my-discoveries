import { expect } from 'chai';

fixture `Example page`
    .page `https://devexpress.github.io/testcafe/example`;

test('Emulate user actions and perform a verification', async t => {
    await t
        .setNativeDialogHandler(() => true)
        .click('#populate')
        .click('#submit-button');

    const location = await t.eval(() => window.location);

    expect(location.pathname).eql('/testcafe/example/thank-you.html');
});
