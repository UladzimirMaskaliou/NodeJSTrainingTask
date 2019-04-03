import app from './mongoose/app';

const port = process.env.PORT || 9080;
app.listen(port, () => console.log(`App listening on port ${port}!`));