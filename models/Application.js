const pool = require('../lib/utils/pool.js');

module.exports = class Application {
id;
name;
computer_id;

constructor(row) {
  this.id = Number(row.id);
  this.name = row.name;
  this.computerId = (row.computer_id);
}

//CRUD

static async insert({ name, computerId }) {
  const { rows } = await pool.query(
    'INSERT INTO applications (name, computer_id) VALUES ($1, $2) RETURNING *',
    [name, computerId]
  );

  return new Application(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM applications');

  return rows.map(row => new Application(row)); 
}

static async findById(id) {
  const { rows } = await pool.query(
    'SELECT * FROM applications WHERE id=$1',
    [id]
  );
  if(!rows[0]) throw new Error(`No application with id ${id}`);

  return new Application(rows[0]);
}

static async update(id, { name, computerId }) {
  const { rows } = await pool.query(
    `UPDATE applications
        SET name=$1,
        computer_id=$2        
    WHERE id=$3
    RETURNING *
    `,
    [name, computerId, id]
  );
  if(!rows[0]) throw new Error(`No application with id ${id}`);

  return new Application(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM applications WHERE id=$1 RETURNING *',
    [id]
  );
  if(!rows[0]) throw new Error(`No application with id ${id}`);

  return new Application(rows[0]);
}

};
