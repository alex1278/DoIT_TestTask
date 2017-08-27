import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import users from './routes/users';
import markers from './routes/markers';

mongoose.connect('mongodb://localhost:27017/doit');

let app = express();

app.use(bodyParser.json());

app.use('/users', users);
app.use('/markers', markers);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
    console.log('Server running on port ' + app.get('port'));
});