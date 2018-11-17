exports.seed = async knex => {
  // Deletes ALL existing entries

  await knex('posts').del();

  return knex('categories')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('categories').insert([
        {
          id: 1,
          name: 'Cheese of the world',
          slug: 'cheese-of-the-world',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Salt of the seas',
          slug: 'salt-of-the-seas',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: 'Onions of the soil',
          slug: 'onions-of-the-soil',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    });
};
