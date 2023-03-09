[Nest.js](https://github.com/nestjs/nest) common libraries

## Description

This Nest.js module comes with several modules which provide basic functionality such as loading configuration, making http requests and more.
The module contains a sub module for each service, which can either be imported individually, or collectively by importing the `CommonModule`.
See the [module folder](https://github.com/moesjarraf/nestjs-common/tree/master/src/modules) for the available sub modules that you can import.

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { CommonModule } from '@moesjarraf/nestjs-common';

@Module({
  imports: [CommonModule],
})
export class AppModule {}
```

## Installation

```bash
$ npm install @moesjarraf/nestjs-common
```

## Configuration

The modules by default load their configuration through `.env` files which are placed in the root folder. These can be suffixed with the environment.
The available suffixes can be found below, and are loaded in the order as they are displayed.

```ts
'.env.development.local',
'.env.development',
'.env.staging',
'.env.production',
'.env.test',
'.env',
```

The default configuration for each sub module can be found below, and can be changed by modifying the env variables.

### App

```bash
APP_NAME=Application
APP_SHORT_NAME=App
APP_DESCRIPTION=
NODE_ENV=development
PORT=3000
DEBUG=true # false if NODE_ENV=producition
```

### Frontend

```bash
FRONTEND_INDEX=../frontend/dist/index.html
```

### Cors

```bash
CORS_ORIGIN=*
CORS_CREDENTIALS=false
CORS_EXPOSED_HEADERS=
```

### Cookie

```bash
COOKIE_SAME_SITE=
COOKIE_SECURE=
```

### Body parser

```bash
BODY_PARSER_RAW_PATHS=
```

### MongoDB

```bash
MONGO_DEFAULT_URL=mongodb://0.0.0.0:27017/nestjs
```

### Http auth

```bash
HTTP_AUTH_BEARER_TOKEN=
```

### Logger

```bash
LOGGER_LEVEL=
LOGGER_FORCE=
```

### Rollbar

```bash
ROLLBAR_ACCESS_TOKEN=
ROLLBAR_ENVIRONMENT=
ROLLBAR_LEVEL=
```

### Mailer

```bash
MAILER_TEST=false
MAILER_HOST=
MAILER_PORT=
MAILER_PASS=
```

### Ssl

```bash
SSL_ENABLED=false
```

## Example

See [this](https://github.com/moesjarraf/nestjs-example) repository for an example.

## Contributing

Commit messages should be formatted according to semantic-release standards, see [this](https://github.com/semantic-release/semantic-release#commit-message-format) link for more information. A tool has been added to the project to make adhering to the standards easier.

```bash
# add source files
git add .

# format commit message
npm run commit

# push
git push -u origin master
```
