const { Pool } = require('pg');
const Router = require('express-promise-router');

const pool = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'postgres',
    password: '------',
    port: 5432,
});

const router = new Router();
// export our router to be mounted by the parent application
module.exports = router;

router.get('/consultatotalpacientes', async (req, res) => {
    //const { id } = req.params
    const { rows } = await pool.query('SELECT * FROM pacientes');
    res.send(rows);
});

router.post('/insertarpacientes', async (req, res) => {
    const { nombre, apellido, numid } = req.body;
    await pool.query(
        `INSERT INTO pacientes(nombre, apellido, numid) VALUES('${nombre}','${apellido}','${numid}')`
    );
    res.send('INSERTADO!!!');
});

router.put('/actualizarpacientes', async (req, res) => {
    const { id, nombre, apellido, numid } = req.body;
    await pool.query(
        `UPDATE pacientes SET nombre = '${nombre}', apellido = '${apellido}', numid = '${numid}' WHERE id = '${id}'`
    );
    res.send('ACTUALIZADO!!!');
});


router.delete('/borrarpacientes', async (req, res) => {
    const { id } = req.body;
    await pool.query(
        `DELETE FROM pacientes WHERE id = '${id}'`
    );
    res.send('BORRADO!!!');
});
