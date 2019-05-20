# egg-swagger

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@zeromake%2Fegg-swagger.svg?style=flat-square
[npm-url]: https://npmjs.org/package/@zeromake%2Fegg-swagger
[travis-image]: https://img.shields.io/travis/zeromake/egg-swagger.svg?style=flat-square
[travis-url]: https://travis-ci.org/zeromake/egg-swagger
[codecov-image]: https://img.shields.io/codecov/c/github/zeromake/egg-swagger.svg?style=flat-square
[codecov-url]: https://codecov.io/github/zeromake/egg-swagger?branch=master
[david-image]: https://img.shields.io/david/zeromake/egg-swagger.svg?style=flat-square
[david-url]: https://david-dm.org/zeromake/egg-swagger
[snyk-image]: https://snyk.io/test/npm/@zeromake%2Fegg-swagger/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/@zeromake%2Fegg-swagger
[download-image]: https://img.shields.io/npm/dm/@zeromake%2Fegg-swagger.svg?style=flat-square
[download-url]: https://npmjs.org/package/@zeromake%2Fegg-swagger


## Install

```bash
$ npm i egg-swagger --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.swagger = {
  enable: true,
  package: '@zeromake/egg-swagger',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.swagger = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

## Questions & Suggestions

Please open an issue [here](https://github.com/zeromake/egg-swagger/issues).

## License

[MIT](LICENSE)
