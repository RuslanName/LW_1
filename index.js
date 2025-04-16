const express = require('express');
const app = express();
const todoRouter = require('./router/index');
const { sequelize } = require('./db');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', todoRouter);

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection established');

        await sequelize.sync({ force: false });
        console.log('Database synced');

        app.use((err, req, res, next) => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });

        app.listen(3000, () => console.log('Server started on port 3000'));
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start();