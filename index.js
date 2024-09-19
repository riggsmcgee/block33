const express = require('express');
const app = express();
const pg = require('pg');
const port = 3000;
const client = new pg.Client('postgres://localhost:5432/block33');

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// console.log('hello');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/employees', async (req, res) => {
  await client.connect();
  const response = await client.query('SELECT * FROM employees');
  console.table(response.rows);
  res.send(response.rows);
});

app.get('/departments', async (req, res) => {
  await client.connect();
  const response = await client.query('SELECT * FROM departments');
  console.table(response.rows);
  res.send(response.rows);
});

app.post('/employees', async (req, res) => {
  const { name, department_id } = req.body;
  await client.connect();
  const response = await client.query(
    'INSERT INTO employees (id, name, department_id) VALUES ($1, $2, $3) RETURNING *',
    [id, name, department_id]
  );
  console.table(response.rows);
  res.send(response.rows);
});

app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;
  await client.connect();
  const response = await client.query(
    'DELETE FROM employees WHERE id = $1 RETURNING *',
    [id]
  );
  console.table(response.rows);
  res.send(response.rows);
});
