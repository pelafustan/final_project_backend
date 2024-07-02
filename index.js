require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const { routes } = require('./routes/routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.API_PORT;

routes(app);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
