import { Selector } from 'testcafe';

// Declare the parameterized Selector function
// to get access to a DOM element identified by the `id` attribute
const elementWithId = Selector(id => document.getElementById(id));

fixture `Getting Started`
    .page `http://devexpress.github.io/testcafe/example`;

test('My first test', async t => {
    await t
        .typeText('#developer-name', 'John Smith')
        .click('#submit-button');

    // Use the Selector function to get access to the article header
    const articleHeader = await elementWithId('article-header');

    // Obtain the text of the article header
    let headerText = articleHeader.innerText;

    // Or use a shorthand form to obtain article header text directly
    headerText = await elementWithId('article-header').innerText;
});