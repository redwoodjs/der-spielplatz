exports.up = function (knex, Promise) {
  return knex.schema.table('categories', t => {
    t.unique('slug');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('categories', t => {
    t.dropUnique('slug');
  });
};
