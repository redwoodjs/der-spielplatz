exports.up = function (knex, Promise) {
  return knex.schema.table('posts', t => {
    t.string('slug');
    t.unique('slug');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.alterTable('posts', t => {
    t.dropUnique('slug');
    t.dropColumn('slug');
  });
};
