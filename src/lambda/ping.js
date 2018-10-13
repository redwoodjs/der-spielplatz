export const handler = (event, context, callback) => {
  callback(null, { body: 'PONG!', statusCode: 200 });
};
