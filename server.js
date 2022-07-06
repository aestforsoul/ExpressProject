const express = require('express');
const app = express();

const port = 3000;

app.use(express.json());

const bookRouter = require('./routes/bookRoute');
app.use('/book', bookRouter);

const errorHandler = require('./middleware/errorHandler.js');
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));