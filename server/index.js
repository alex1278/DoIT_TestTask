import express from 'express';
import path from 'path';


let app = express();

app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(3000, () => console.log('Server running'));