const pool = require('../lib/utils/pool.js');
const Application = require('./Application.js');

module.exports = class Computer {
id;
brand;
model;
url;

constructor(row) {
  this.id = row.id;
  this.brand = row.brand;
  this.model = row.model;
  this.url = row.url;
  this.computerId = (row.computer_id);
}

//CRUD

static async insert({ brand, model, url, applications }) {
  const { rows } = await pool.query(
    'INSERT INTO computers (brand, model, url) VALUES ($1, $2, $3) RETURNING *',
    [brand, model, url]
  );

  await pool.query(
    `INSERT INTO computers_applications (computer_id, application_id)
    SELECT ${rows[0].id}, id FROM applications WHERE name = ANY($1::brand[], $2::model[], $3::url[])`,
    [applications]
  );

  return new Computer(rows[0]);
}

static async find() {
  const { rows } = await pool.query('SELECT * FROM computers');

  return rows.map(row => new Computer(row)); 
}


//VERY PLAIN FINDBYID
static async findById(id) {
  const { rows } = await pool.query(
    `SELECT 
        computers.* 
        array_agg(applications.name) AS applications
    FROM 
        computers_applications
    JOIN computers
    ON computers_applications.computer_id = computers.id
    WHERE computers.id=$1
    GROUP BY computers.id
    `,
    
    [id]
  );
  if(!rows[0]) throw new Error(`No computer with id ${id}`);
    
  return new Computer(rows[0]);
}

// //ADDING RATING JOIN HERE
// static async findById(id) {
//   const { rows } = await pool.query(
//     `
//       SELECT 
//         computers.*,
//         array_to_json(array_agg(applications.*)) AS applications
//       FROM
//         computers
//       JOIN applications
//       ON computers.id = applications.computer_id
//       WHERE computers.id=$1
//       GROUP BY computers.id     
//      `,

//     [id]
//   );
//   if(!rows[0]) throw new Error(`No computer with id ${id}`);

//   return { 
//     ...new Computer(rows[0]),
//     applications: rows[0].applications.map(rating => new Application(rating))
//   };
  
// }

static async update(id, { brand, model, url }) {
  const { rows } = await pool.query(
    `UPDATE computers
        SET brand=$1,
        model=$2,
        url=$3
    WHERE id=$4
    RETURNING *
    `,
    [brand, model, url, id]
  );
  if(!rows[0]) throw new Error(`No computer with id ${id}`);

  return new Computer(rows[0]);
}

static async delete(id) {
  const { rows } = await pool.query(
    'DELETE FROM computers WHERE id=$1 RETURNING *',
    [id]
  );
  if(!rows[0]) throw new Error(`No computer with id ${id}`);

  return new Computer(rows[0]);
}

};
