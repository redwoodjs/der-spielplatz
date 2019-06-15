# Der Spielplatz

This is an example Hammer app. In order to figure out what Hammer should be like,
we're first developing a simple app with the technology stack we want and seeing how
it feels. Eventually, the things we learn here will be codified in the Hammer
"architectural style" and a set of command line tools will help generate various
things you need during a Hammer development cycle.

## Development

We're using Prisma Lift and Photon for migrations and the ORM.

## Migrations

```terminal
npm install -g prisma2@0.0.35
prisma2 -v
prisma2@0.0.35
```

The data model is defined in: `api/datamodel.prisma`, when you modify the data
model you generate a migaration with `cd api; prisma2 lift save`

To apply the migration run `prisma2 lift up`, this will create a SQLite database
in `./api/db/dev.db`

## ORM

You can generate the JavaScript client with `prisma2 generate`, this will be placed
in `./api/generated/photon`

## Setup

We use Yarn as our package manager. To get the dependencies installed, just do this
in the root directory:

```terminal
yarn install
```

## Fire it up!

```terminal
yarn start
```

Browse to `localhost:8911` to see the web app. Lambda functions run on
`localhost:8910` but are proxied to `localhost:8911/.netlify/functions/*`.
