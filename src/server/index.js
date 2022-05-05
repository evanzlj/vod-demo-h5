const express = require('express');
const apiRouter = require('./api');

const app = express();
app.use(express.static('dist'));
app.use('/api', apiRouter);

app.listen(8080, () => console.log(`Listening on port ${8080}!`));
