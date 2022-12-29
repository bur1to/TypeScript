import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

const app: express.Application = express();

app.use(express.json);
app.use(express.urlencoded);

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/newDb', { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions)
.then(() => console.log('database is successfully connected...'))
.catch((err) => console.log(err));

app.listen(3000, () => {
    console.log('server is running');
})
