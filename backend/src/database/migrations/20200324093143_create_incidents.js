
exports.up = function(knex) {
    return knex.schema.createTable('incidents',function(table){
        table.increments();
        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        //relacionamento: colocando qual ong criou o incident
        table.string('ong_id').notNullable();

        //criando chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');

         
    })  
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};