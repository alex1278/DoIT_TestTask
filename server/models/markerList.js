import mongoose from 'mongoose';

const MarkerListSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    markers: {
        type: Object
    }
});

const MarkerList = mongoose.model('markers', MarkerListSchema);
module.exports = MarkerList;
