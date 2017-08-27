import express from 'express';
let router = express.Router();

import MarkerList from '../models/markerList';

router.post('/savemarkers', (req, res) => {
    const {userId, markers } = req.body;
    MarkerList.findOne({'userId': userId}, (err, markerList) => {
        if (err) return res.status(500).send();
        if (!markerList) {
            const newMarkerList = new MarkerList({
                userId: userId, 
                markers: markers
            });
            newMarkerList.save((err, markerList) => {
                if(err) return res.status(500).send();
                return res.status(200).send('Markers added to db');
            });    
        } else {
            MarkerList.update({userId: userId}, {$set: {markers: markers}}, (err, markerList) => {
                if(err) return res.status(500).send();
                return res.status(200).send('Markers updated in db');
            })
        }
    })
});

router.post('/showmarkers', (req, res) => {
    const {userId } = req.body;
    MarkerList.findOne({'userId': userId}, (err, markerList) => {
        if (err) return res.status(500).send();
        if (markerList) {
            const {markers} = markerList;
            return res.status(200).json({markers});
        } else {
            return res.status(404).send('You need to save markers at first');
        }
    })
})

export default router;