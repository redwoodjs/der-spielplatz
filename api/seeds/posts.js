const lipsum = require('lorem-ipsum');

exports.seed = knex => {
  const makeText = () => lipsum({
    count: 25,
    paragraphLowerBound: 2,
    paragraphUpperBound: 5,
  });

  // Deletes ALL existing entries
  return knex('posts')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('posts').insert([
        {
          id: 1,
          title: 'Granola bars',
          slug: 'granola-bars',
          text: makeText(),
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          title: 'Rice printing',
          slug: 'rice-and-art',
          text: makeText(),
          categoryId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          title: 'Chicken soup',
          slug: 'chicken-soup',
          text: makeText(),
          categoryId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          title: 'Rambo vs Robocop',
          slug: 'rambo-vs-robocop',
          text: makeText(),
          categoryId: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    });
};
