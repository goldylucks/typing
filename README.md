# Typing
[![Build Status][travis-image]][travis-url] [![GPLv3][license-image]][license-url]
[![Live App][app-image]][app-url] [![Test App][test-app-image]][test-app-url] [![dependencies][dependencies-image]][dependencies-url] [![devDependencies][dev-dependencies-image]][dev-dependencies-url]

## Use
Typing is kindly hosted on Heroku  
[Live App][app-url] (stable, latest release)  
[Test App][test-app-url] (latest master)

## Contact
Issues, features (and Prs!) are always [welcomed][issues-url] :)  
You can also [:envelope: contact me here][contact-url]

## Develop
```bash
$ git clone git@github.com:goldylucks/typing.git
$ cd typing
$ npm install
$ npm run server #starts node server, seeds database
$ npm start # starts webpack
$ npm run test:server -- -w # optional for running server unit testing in watch mode (recommended)
```
open your favorite browser and [hack away][dev-url]!

## Test
```bash
$ npm t # runs server unit tests
$ npm run server
$ npm run start
$ npm run e2e # Runs nightwatch against a selenium chrome driver
```

[travis-image]: https://travis-ci.org/goldylucks/typing.svg?branch=master
[travis-url]: https://travis-ci.org/goldylucks/typing
[license-image]: https://img.shields.io/badge/license-GPL%20v3-green.svg
[license-url]: http://www.gnu.org/licenses/gpl-3.0.en.html
[app-url]: http://gold-typing.herokuapp.com
[app-image]: https://img.shields.io/website-up-down-green-red/http/gold-typing.herokuapp.com.svg?label=live%20app
[test-app-url]: http://gold-typing-test.herokuapp.com
[test-app-image]: https://img.shields.io/website-up-down-green-red/http/gold-typing-test.svg?label=test%20app
[contact-url]: http://gold-typing/contact
[issues-url]: https://github.com/goldylucks/typing/issues
[dependencies-image]: https://img.shields.io/david/goldylucks/typing.svg
[dependencies-url]: https://david-dm.org/goldylucks/typing
[dev-dependencies-image]: https://img.shields.io/david/dev/goldylucks/typing.svg
[dev-dependencies-url]: https://david-dm.org/goldylucks/typing#info=devDependencies
[dev-url]: http://localhost:3000

## License
The code is available under the [GPL v3 license][license-url].
