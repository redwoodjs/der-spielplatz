import { createConnection } from 'lambda/lib/database';

import Post from 'lambda/entities/Post';

export const handler = (event, context, callback) => {
  createConnection().then(async () => {
    const post = new Post();
    post.title = 'this is a test';
    post.text = ' yo yo yo rambo';
    await post.save();

    callback(null, {
      statusCode: 200,
      body: 'PONG',
    });
  });
};
