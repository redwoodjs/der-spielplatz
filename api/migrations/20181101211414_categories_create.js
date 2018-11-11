exports.up = function (knex, Promise) {
  return knex.schema.createTable('categories', t => {
    t.increments('id')
      .unsigned()
      .primary();
    t.dateTime('createdAt').notNull();
    t.dateTime('updatedAt').notNull();

    t.string('name').notNull();
    t.string('slug').notNull();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('categories');
};
