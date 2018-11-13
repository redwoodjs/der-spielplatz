# Der Spielplatz

This is an example Hammer app. In order to figure out what Hammer should be like,
we're first developing a simple app with the technology stack we want and seeing how
it feels. Eventually, the things we learn here will be codified in the Hammer
"architectural style" and a set of command line tools will help generate various
things you need during a Hammer development cycle.

## Production

The `master` branch is deployed to https://spielplatz.netlify.com/.

### Database

This app currently uses an AWS RDS PostgresQL server (Tom's account).

## Development

### PostgresQL

Install PostgresQL locally with:

```terminal
brew install postgresql
brew services start postgresql
createdb derspielplatz
```

### Env

You'll need to create an `api/.env` file to specify database connection info. If you
followed the commands above, you can simply use the following:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=
DB_PASSWORD=
DB_DATABASE=derspielplatz
```

If you set a user or password on your database, you'll need to fill those in as
appropriate.

## Setup

We use Yarn as our package manager. To get the dependencies installed, just do this
in the root directory:

```terminal
yarn install
```

## Migrations

```terminal
yarn run knex migrate:latest
```

## Fire it up!

```terminal
yarn start
```

Browse to `localhost:8080` to see the web app. Netlify functions run on
`localhost:9000` but are proxied to `localhost:8080/.netlify/functions/*`.

### Docz

Speed development and document your components with Docz!

```terminal
cd web
yarn docz dev
```

Browse to `localhost:3000`.
