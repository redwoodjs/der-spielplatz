import { createConnection } from 'lambda/lib/database';

import Post from 'lambda/entities/Post';
import Comment from 'lambda/entities/Comment';

createConnection()
  .then(async connection => {
    const post = new Post();
    post.title = 'this is a test';
    post.text = ' yo yo yo sausages';
    const comment = new Comment();
    comment.name = 'peterp';
    comment.comment = 'I kinda really love cheese.';
    post.comments = [comment];
    await connection.manager.save(post);
  })
  .catch(e => {
    console.log('---------------------');
    console.log(e);
    console.log('---------------------');
  });
