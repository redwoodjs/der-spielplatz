import { ApolloClient } from 'apollo-client';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink, from, Observable } from 'apollo-link';

class AuthLink extends ApolloLink {
  handleLogout = operation => {
    const { authExpired, response } = operation.getContext();

    if (response && response.redirected) {
      const { url } = response;
      // eslint-disable-next-line no-console
      console.log(`The redirected url is ${url}`);
    }

    if (authExpired) {
      // eslint-disable-next-line no-console
      console.log('logged out');
    }
  };

  request(operation, forward) {
    return new Observable(obs => {
      forward(operation).subscribe({
        next: data => {
          this.handleLogout(operation);
          obs.next(data);
        },
        error: err => {
          this.handleLogout(operation);
          obs.next(err);
        },
        complete: obs.complete.bind(obs),
      });
    });
  }
}

const error = onError(({ operation, networkError }) => {
  const { response } = operation.getContext();
  // this is when you have mixed data + errors
  if (response && response.status === 401) {
    operation.setContext({ authExpired: true });
  }

  // this is from non mixed data or execution failure
  // i.e. { errors } where no { data } field is present
  if (networkError && networkError.statusCode === 401) {
    operation.setContext({ authExpired: true });
  }
});

// TODO: Grab this from configuration file.
const http = new HttpLink({
  uri: '/.netlify/functions/graphql',
});

const auth = new AuthLink();

const link = from([auth, error, http]);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
