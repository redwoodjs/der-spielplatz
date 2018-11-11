exports.up = function (knex, Promise) {
  return knex.schema.table('posts', t => {
    t.foreign('categoryId')
      .references('id')
      .inTable('categories');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.table('posts', t => {
    t.dropForeign('categoryId');
  });
};
