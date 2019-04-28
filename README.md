# @mayachit/mocha-pretty-bunyan

## Description

[bunyan](https://www.npmjs.com/package/bunyan) is a pretty nice package to log in JSON format, and provides an awesome cli to display it in human readable way. However, when you run your test with mocha, you cannot take benefit  of the cli, so you then get raw JSON logs that is a mess to read.

`@mayachit/mocha-pretty-bunyan` displays the _bunyan log stream_ using a pretty/human readable format in the context of a mocha reporter. `@mayachit/mocha-pretty-bunyan` does not actually implement a mocha reporter, rather just wraps the _stdout_ stream of a mocha reporter (_spec_, by default) using [`@ambassify/bunyan-prettystream`](https://www.npmjs.com/package/@ambassify/bunyan-prettystream).

## Install

```bash
npm install @mayachit/mocha-pretty-bunyan --save-dev
```

Note that `@mayachit/mocha-pretty-bunyan` itself does not depend on a version of `mocha` or `bunyan`, but declares them as a `peerDependency` assuming that you already have both `mocha` and `bunyan` installed.

## Usage

```bash
mocha --reporter @mayachit/mocha-pretty-bunyan
```

## Configuration

`@mayachit/mocha-pretty-bunyan` will attempt to load a JSON configuration file from `test/mocha-pretty-bunyan.json`. A custom configuration file can also be specified using the `MOCHA_PRETTY_BUNYAN_CONFIG` environment variable.

The following configurations are supported:

| Key        | Default Value | Description                                  |
| ---------- | ------------- | -------------------------------------------- |
| `mute`     | `false`       | Set to `true` if you want to _mute_ all logs |
| `level`    | `trace`       | Valid bunyan log-level                       |
| `reporter` | `spec`        | Mocha reporter to use                        |

Example configuration file:

```json
{
  "mute": false,
  "level": "debug",
  "reporter": "spec"
}
```

Since `@mayachit/mocha-pretty-bunyan` essentially _require's_ the mocha reporter specified, any `--reporter-options` will be passed through to the reporter specified in the configuration above.

For example, if you want to use [`mocha-multi-reporters`](https://www.npmjs.com/package/mocha-multi-reporters), specify `mocha-multi-reporters` as the reporter in `test/mocha-pretty-bunyan.json` and then run:

```bash
mocha --reporter @mayachit/mocha-pretty-bunyan --reporter-options configFile=test/mocha-multi-reporters.json
```

## Credits

-   [`mocha-pretty-bunyan-nyan`](https://www.npmjs.com/package/mocha-pretty-bunyan-nyan) by [blurab](https://www.npmjs.com/~schretie)
-   [`mocha-pretty-bunyan`](https://www.npmjs.com/package/mocha-pretty-bunyan) by [nihonjinrxs](https://www.npmjs.com/~nihonjinrxs).

* * *
