import { HASURA_ACCESS_KEY } from './config';

export const handler = (event, context, callback) => {
  console.log(context);

  callback(null, {
    statusCode: 200,
    body: 'TESTY',
  });
};
