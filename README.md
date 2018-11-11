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

We use Yarn as our package manager. To get everything going, just do this in the root
directory:

```terminal
yarn install
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
