const pool = require('../lib/utils/pool.js');

module.exports = class Application {
id;
name;

constructor(row) {
  this.id = String(row.id);
  this.name = row.name; 
}
//CRUD
//INSERT
static async insert({ name }) {
  const { rows } = await pool.query(
    'INSERT INTO applications (name) VALUES ($1) RETURNING *',
    [name]
  );
  return new Application(rows[0]);
}
//FIND
static async find() {
  const { rows } = await pool.query('SELECT * FROM applications');
  return rows.map(row => new Application(row)); 
}
//FINDBYID
static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM applications WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No application with id ${id}`);
  return new Application(rows[0]);
}
//UPDATE
static async update(id, { name }) {
  const { rows } = await pool.query(
    `UPDATE applications
        SET name=$1
    WHERE id=$2
    RETURNING *
    `,
    [name, id]
  );
  if(!rows[0]) throw new Error(`No application with id ${id}`);
  return new Application(rows[0]);
}
//DELETE
static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM applications WHERE id=$1 RETURNING *',
    [id]
  );
  if(!rows[0]) throw new Error(`No application with id ${id}`);
  return new Application(rows[0]);
}

};
