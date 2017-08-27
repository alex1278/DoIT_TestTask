import express from 'express';
let router = express.Router();

import MarkerList from '../models/markerList';

router.post('/savemarkers', (req, res) => {
    const {userId, markers } = req.body;
    const newMarkerList = new MarkerList({
        userId: userId, 
        markers: markers
    });
    newMarkerList.save((err, user) => {
        if(err) {
            return res.status(500).send();
        }
        return res.status(200).send('Markers add to db');
    });    
});

export default router;