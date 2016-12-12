# my-discoveries

My discoveries - HTML5-MarkUp project.

# Automatic testing

## BackstopJS

### Installation:

Install BackstopJS platform.
>$ sudo npm install -g backstopjs

### How to...

Create/rewrite ALL images.
>$ sudo backstop reference

Set backstop to other config.
>$ sudo backstop reference --configPath=local_backstop.json

If you don't want BackstopJS do first delete all files in your reference directory you can enable the incremental flag.
>$ sudo backstop reference --i

If you need to update references (or test) for just one scenario you can do so by invoking BackstopJS with the --filter argument...
>$ sudo backstop reference --filter=<scenario.label>

Run test.
>$ sudo backstop test

See in to "backstop reference --filter=<scenario.label>".
>$ sudo backstop test --filter=<scenario.label>

### How to run test

>$ gulp default
>
>$ gulp webserver
>
>$ sudo backstop test

When test is stopped - stop webserver too.

## TestCafe

Install TestCafe platform.
>$ sudo npm install -g testcafe

Install chai.
>$ npm install chai

### How to...

Run tests in chrome/opera/firefox/safari
>$ testcafe chrome testcafe/test/

Run tests in remote device
>$ testcafe remote testcafe/test/


