exports.up = function (knex, Promise) {
  return knex.schema.createTable('posts', t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').notNull();

    t.string('title').notNull();
    t.text('text').notNull();

    t.integer('categoryId');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('posts');
};
