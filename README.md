# Der Spielplatz

This is an example Hammer app. In order to figure out what Hammer should be like,
we're first developing a simple app with the technology stack we want and seeing how
it feels. Eventually, the things we learn here will be codified in the Hammer
"architectural style" and a set of command line tools will help generate various
things you need during a Hammer development cycle.

## Development

We're using Prisma Lift and Photon for migrations and the ORM. You can run
`prisma2 dev` which watches for changes to the datamodel and automatically applies
your migrations to your database and generates a new Photon client.

## Migrations: Prisma Lift

The data model is defined in: `api/datamodel.prisma`, when you modify the data
model you generate a migaration with `cd api; yarn prisma2 lift save`

To apply the migration run `cd api; yarn prisma2 lift up`, this will create, or modify, a
SQLite database in `./api/db/dev.db`

## ORM: Prisma Photon

You can generate the JavaScript client with `yarn workspace api generate`, this will be placed
in `./api/node_modules/@generated/photon`

## Seeds

Prisma will offer a solution in the future, but in the meantime I've created
`seed.js` which creates a few users, some documents and comments.

`cd api; yarn babel-node seed.js`

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
